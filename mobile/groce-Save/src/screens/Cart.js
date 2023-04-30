import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Alert,
    Modal,
    Dimensions
  } from "react-native";
  import React, { useRef, useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { addToCart, decrementQuantity, incrementQuantity, removeFromCart, clearCart } from "../reducers/CartReducer";
  import { clearShop } from "../reducers/ShopReducer";
  import  Loader  from '../components/Loader';
  import { Ionicons } from "@expo/vector-icons";
  import groceSaveItemService from "../service/GroceSaveItemService";
  import groceSaveService from ".././service/GroceSaveService";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const { width, height } = Dimensions.get("window");

  const Cart = ({ route, navigation }) => {
    const { array } = route.params;
    const cart = useSelector((state) => state.cart.cart);
    const loginInfo = useSelector((state) => state.login.login);
    console.log(array);
    const dispatch = useDispatch();

    const [ isLoading, setIsLoading ] = useState(false);
    const [ visible, setVisible ] = useState(false);
    const [ showItem, setShowItem ] = useState("");
    const [userData, setUserData] = useState({});
    const [storeName, setStoreName] = useState("");
    const [isImageAvailable, setIsImageAvailable] = useState(true);
    const [isImageItemAvailable, setIsImageItemAvailable] = useState(true);
    const [storeData, setStoreData] = useState({});
    const [storeValue, setStoreValue] = useState("");
    const [storeList, setStoreList] = useState([]);
    const [cartResponse, setCartResponse] = useState({});

    const _retrieveData = () => {
      AsyncStorage.getItem("userDetails").then((res) => {
        const response = JSON.parse(res);
        if (res !== null) {
          setUserData(response.data) 
        } else {
          console.log("No response...", response);
        }
      });
    }
  
    useEffect(() => {
      _retrieveData()
      isBest();
    });

    const handleImageError = () => {
      setIsImageAvailable(false);
    };

    const handleImageItemError = () => {
      setIsImageItemAvailable(false);
    };

    const addItemToCart = (item) => {
      submitOrderItems(item);
      dispatch(addToCart(item));
    };
    const removeItemFromCart = (item) => {
      dispatch(removeFromCart(item));
    };
    const increaseQuantity = (item) => {
      submitOrderItems(item);
      dispatch(incrementQuantity(item));
    }
    const decreaseQuantity = (item) => {
      if(item.quantity == 1){
        dispatch(removeFromCart(item));
      }else{
        // submitOrderItems(item);
        dispatch(decrementQuantity(item));
      }
    }
    
    const submitCheckOut = () => {
      if(loginInfo.length != 0){
      setShowItem("")
      setVisible(false)
      setIsImageAvailable(true)
      setIsImageItemAvailable(true)
      setStoreData({})
      setIsLoading(true);
    
    const onSuccess = ( data ) => {
      setIsLoading(false);
      console.log("Donneeee",data)
      if (data.status == 200){
        Alert.alert(null, "Checkout successfully,\nIt's free so no need to pay!", [{
          text: 'Ok', onPress: () => {
            navigation.navigate("Shop")
            dispatch(clearShop([]));
            dispatch(clearCart([]));
          }
        }])
      }
    };

    const onFailure = (error) => {
      console.log(error && error.response);
        setIsLoading(false);
      if(error.response == null){
        setIsLoading(false);
        Alert.alert('Info: ','Network Error')
      }
      if(error.response.status == 400){
        setIsLoading(false);
        Alert.alert('Info: ',"Something went wrong, Please try again")
      } else if(error.response.status == 500){
        setIsLoading(false);
        Alert.alert('Info: ','Ensure your Network is Stable')
      } else if(error.response.status == 401){
        setIsLoading(false);
        Alert.alert(null,error.response.data)
      } else if(error.response.status == 404){
        setIsLoading(false);
        Alert.alert('Info: ','Not found')
      }
    };

    groceSaveService
      .get("/checkout")
      .then(onSuccess)
      .catch(onFailure);
      } else {
        Alert.alert(null, "Please sign in to Checkout successfully!", [{
          text: 'Ok', onPress: () => navigation.navigate("SignIn")
        }])
      }
    }

    const submitComparePrice = () => {
      if(loginInfo.length != 0){
      const list = []
      setIsLoading(true);
      var itemsWithQuantity = {};

      cart.map((items) =>
        (
          itemsWithQuantity[items.name] = items.quantity+""
        ))
      
      const zipCode = loginInfo[0].zipCode
      list.push({
        zipCode,
        itemsWithQuantity
      })

  console.log(list);

  const onSuccess = ( data ) => {
    setIsLoading(false);
    console.log("Dataaa", data.data[0].storeValue);
    if (data.status == 200){
      // if(data.data[0].msg == "The zip code is'nt currently covered under our services"){
      //   Alert.alert(null, data.data[0].msg);
      // }else{
      setCartResponse(data.data[0].bestByCategory)
      setStoreValue(data.data[0].storeValue)
      setStoreList(Object.keys(data.data[0].storeValue))
      Alert.alert(null, "Price compare option was successful,\nPlease view and checkout!", [{
      }])
    // }
    }
  };

  const onFailure = (error) => {
    console.log(error && error.response);
      setIsLoading(false);
    if(error.response == null){
      setIsLoading(false);
      Alert.alert('Info: ','Network Error')
    }
    if(error.response.status == 400){
      setIsLoading(false);
      Alert.alert('Info: ',"Something went wrong, Please try again")
    } else if(error.response.status == 500){
      setIsLoading(false);
      Alert.alert('Info: ','Ensure your Network is Stable')
    } else if(error.response.status == 401){
      setIsLoading(false);
      Alert.alert(null,error.response.data)
    } else if(error.response.status == 404){
      setIsLoading(false);
      Alert.alert('Info: ','User not found')
    }
  };

   groceSaveItemService
    .post("/comparePrice", list)
    .then(onSuccess)
    .catch(onFailure);
    } else {
      Alert.alert(null, "Please sign in to continue!", [{
        text: 'Ok', onPress: () => navigation.navigate("SignIn")
      }])
    }
    }

    const submitOrderItems = (items) => {
    if(loginInfo.length != 0){
      setIsLoading(true);
      let name = items.name
      let quantity = +items.quantity
      let url = items.image ? items.image : items.url
      
      const payload = {
        name,
        quantity,
        url
      }
      
  const onSuccess = ( data ) => {
    setIsLoading(false);
    if (data.status == 201){
      console.log("Donneeee order........",data)
    }
  };

  const onFailure = (error) => {
    console.log(error && error.response);
      setIsLoading(false);
    if(error.response == null){
      setIsLoading(false);
      Alert.alert('Info: ','Network Error')
    }
    if(error.response.status == 400){
      setIsLoading(false);
      Alert.alert('Info: ',"Something went wrong, Please try again")
    } else if(error.response.status == 500){
      setIsLoading(false);
      Alert.alert('Info: ','Ensure your Network is Stable')
    } else if(error.response.status == 401){
      setIsLoading(false);
      Alert.alert(null,error.response.data)
    } else if(error.response.status == 404){
      setIsLoading(false);
      Alert.alert('Info: ','Not found')
    }
  };

  groceSaveService
    .post("/order", payload)
    .then(onSuccess)
    .catch(onFailure);
    } else {
      Alert.alert(null, "Please sign in to Checkout successfully!", [{
        text: 'Ok', onPress: () => navigation.navigate("SignIn")
      }])
    }
    }

    const scrollRef = useRef();

    const onPressTouch = () => {
      scrollRef.current?.scrollToEnd({
        animated: true,
      });
    }

    const info = () => {
      Alert.alert(null, "Please sign in to Checkout successfully!", [{
        text: 'Ok', onPress: () => navigation.navigate("SignIn")
      }])
    }
    
    const isBest = () => {
      const innerObject = storeData[showItem]; // accessing the object stored at key1
      // const innerValue = myObject['key1']['innerKey1'];

      // if(Object.keys(storeData).length != 0){
      // let data = innerObject
      // let best = 0;
      // Object.values(data).map((items, index) => (
      //   items.avgTotalPrice 
      //   ))
      // best = Math.min(...Object.values(data.avgTotalPrice))
      // console.log("Besttttt", best)
      // return best;
      // }
  };

    function stringSentenceCase(str) {
      return str.replace(/\.\s+([a-z])[^\.]|^(\s*[a-z])[^\.]/g, s => s.replace(/([a-z])/,s => s.toUpperCase()))
    }

    const sampleImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsUhUsM8JuZ4MKDjlPNox4QuV81hnoccTW_A&usqp=CAU";

    return (
      <ScrollView  ref={scrollRef}  onContentSizeChange={() => onPressTouch()} style={{ backgroundColor: "#FFF" }}>
      <SafeAreaView>
        <Loader loading={isLoading} />
        <Text style={{ textAlign: "center", fontSize: 16, marginTop: 7 }}>
          Cart
        </Text>
        <Modal
          transparent={true}
          animationType={'none'}
          visible={visible}
          onRequestClose={() =>
              {console.log('close modal');}
          }>
            <View style={styles.modalBackground}>
            <View style={styles.modalForeground}>
            <TouchableOpacity style={{ position: "absolute", right: 5, top: 4 }} 
              onPress={()=>{             
                setShowItem("")
                setVisible(false)
                setIsImageAvailable(true)
                setIsImageItemAvailable(true)
                setStoreData({}) }}>
              <Ionicons
                name={"close"}
                size={25}/>
            </TouchableOpacity>
            {showItem == "star" ? 
           <Text style={{ textAlign: "center", fontSize: 16, backgroundColor: "#C3C1C1", color: "#000", marginBottom: 10, width: width * 0.8, padding: 10, marginTop: 35 }}>
              {stringSentenceCase(showItem)}{" "}Market
            </Text> :
            <Text style={{ textAlign: "center", fontSize: 16, backgroundColor: "#C3C1C1", color: "#000", marginBottom: 10, width: width * 0.8, padding: 10, marginTop: 35 }}>
              {stringSentenceCase(showItem)}
            </Text>}
            <ScrollView>
            <View>
            {Object.values(storeData).map((storeItems, index) => (
            <View>
            
            <View style={{flexDirection: "row", justifyContent: "space-between", width: width * 0.8,  }}>
              {Object.keys(storeData).map((item,index) => (
              <Text style={{ fontSize: 14, }}>{item}({storeItems.lowestUnit})</Text>
              ))}
              <Text style={{ alignSelf: "flex-end", textAlign: "right", width: width * 0.43, }}>Average Total Price: {storeItems.avgTotalPrice}</Text>
            </View>

            <View style={{ flexDirection: "row", width: width * 0.8, alignItems: "center", marginTop: 0  }}>
            <View>
            {isImageAvailable ? 
            <Image style={{ width : 100, height: 100, borderRadius: 8,marginTop:6 }}
              source={{ uri: storeItems.lowestUnitItemImgUrl }} onError={handleImageError}/>
            :
            <Image style={{ width : 100, height: 100, borderRadius: 8,marginTop:6 }}
              source={{ uri: sampleImage }}/>}
            </View>
            <View style={{ marginLeft: 10 }}>
            <Text style={{ textAlign: "left", fontSize: 14, color: "#000", width: width * 0.5, marginTop: 10 }}>
              Lowest Unit Item: {storeItems.lowestUnitItemName}
            </Text>
            <Text style={{ textAlign: "left", fontSize: 14, color: "#000", width: width * 0.5, marginTop: 10 }}>
              Lowest Unit Price Total: {storeItems.lowestUnitPriceTotal}
            </Text>
            </View>
            </View>

            <View style={{ flexDirection: "row", width: width * 0.8, alignItems: "center", marginTop: 5  }}>
            <View style={{ }}>
              {isImageItemAvailable ? 
                <Image style={{ width : 100, height: 100, borderRadius: 8,marginTop:6 }}
                  source={{ uri: storeItems.lowestItemImgUrl }} onError={handleImageItemError}/>
                :
                <Image style={{ width : 100, height: 100, borderRadius: 8,marginTop:6 }}
                  source={{ uri: sampleImage }}/>}
            </View>
            <View style={{ marginLeft: 10 }}>
            <Text style={{ textAlign: "left", fontSize: 14, color: "#000", width: width * 0.5, marginTop: 10 }}>
              Lowest Item Name: {storeItems.lowestItemName}
            </Text>
            <Text style={{ textAlign: "left", fontSize: 14, color: "#000", width: width * 0.5, marginTop: 10 }}>
              Lowest Price Total: {storeItems.lowestPriceTotal}
            </Text>
            </View>
            </View>
            </View>))}
            </View>
            </ScrollView>

            <TouchableOpacity 
              style={styles.itemBtnCheckout}
              onPress={()=> submitCheckOut()}>
              <Text style={styles.itemBtnDetails}>Checkout</Text>
            </TouchableOpacity>
            </View>
            </View>
        </Modal>
        {array.length == 0 ? <Text style={styles.invalidTextStyle}>No available Cart Items. Please go to shop to add Items...</Text> : 
        array.map((item) => (
          <Pressable
            key={item.id}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View style={{ margin: 10 }}>
              <Image
                style={{ width: 100, height: 100, borderRadius: 8 }}
                source={{ uri: item.image ? item.image: item.url }}
              />
            </View>
            <View>
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              {cart.some((value) => value.id == item.id) ? (
                <Pressable onPress={() => removeItemFromCart(item)}>
                  <Text
                    style={{
                      borderColor: "gray",
                      borderWidth: 1,
                      marginVertical: 10,
                      padding: 5,
                    }}
                  >
                    REMOVE FROM CART
                  </Text>
                </Pressable>
              ) : (
                <Pressable onPress={() => { 
                onPressTouch()
                loginInfo.length != 0 ? addItemToCart(item) : info()}}>
                  <Text
                    style={{
                      borderColor: "gray",
                      borderWidth: 1,
                      marginVertical: 10,
                      padding: 5,
                    }}
                  >
                    ADD TO CART
                  </Text>
                </Pressable>
              )}
            </View>
          </Pressable>
        ))
        }
        {cart.length == 0 &&  
            <View
                width={width * 0.9} 
                height={1.5} 
                backgroundColor={"#DDD"} 
                alignSelf={"center"} 
                marginVertical={15}
                />}

        {cart.map((item,index) => (
          <View style={{padding:10}} key={index}>
            <Text>{item.name}</Text>
            <View style={{ flexDirection: "row" }}>
            <Image style={{ width: 100, height: 100, borderRadius: 8,marginTop:6 }}
                source={{ uri: item.image ? item.image: item.url }}/>
            </View>
            <Pressable
              style={{
                flexDirection: "row",
                marginTop:20,
                alignItems: "center",
                backgroundColor: "#FF3366",
                borderRadius: 5,
                width: 120,
              }}
            >
              <Pressable onPress={() => decreaseQuantity(item)}>
                <Text
                  style={{
                    fontSize: 25,
                    color: "white",
                    paddingHorizontal: 10,
                  }}
                >
                  -
                </Text>
              </Pressable>
  
              <Pressable>
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    paddingHorizontal: 10,
                  }}
                >
                  {item.quantity}
                </Text>
              </Pressable>
  
              <Pressable onPress={() => increaseQuantity(item)}>
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    paddingHorizontal: 10,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>
        ))}

        <TouchableOpacity 
          style={styles.itemCompareBtn}
          onPress={cart.length == 0 ? ()=> { Alert.alert(null,"Please add item to cart")} : ()=>  submitComparePrice()}>
          <Text style={styles.itemBtnDetails}>Compare prices</Text>
        </TouchableOpacity>
        
        {!Object.keys(cartResponse).length == 0 &&
        <View>
        <Text style={{ textAlign: "center", fontSize: 14, backgroundColor: "#C3C1C1", color: "#000", width: width, padding: 10 }}>
          Best By Categories
        </Text>
        
        <View style={{ backgroundColor: "#F4EFEF", color: "#000", width: width * 0.9, alignSelf: "center", padding: 10, marginTop: 15 }}>
        <Text style={{ textAlign: "left", fontSize: 14, color: "#000", width: width * 0.8, marginTop: 10 }}>
          Lowest Unit Price Store: {stringSentenceCase(cartResponse.lowestUnitPriceStoreName)}
        </Text>
        <Text style={{ textAlign: "left", fontSize: 14, color: "#000", width: width * 0.8, marginTop: 10 }}>
          Lowest Unit Price: {cartResponse.lowestUnitPriceStorePrice}
        </Text>
        
          <View
                width={width * 0.9} 
                height={1.5} 
                backgroundColor={"#DDD"} 
                alignSelf={"center"} 
                marginVertical={15}
                />
        <Text style={{ textAlign: "left", fontSize: 14, color: "#000", width: width * 0.8, marginTop: 10 }}>
          Lowest Total Price Store: {stringSentenceCase(cartResponse.lowestTotalPriceStoreName)}
        </Text>
        <Text style={{ textAlign: "left", fontSize: 14, color: "#000", width: width * 0.8, marginTop: 10 }}>
          Lowest Total Price: {cartResponse.lowestTotalPriceStorePrice}
        </Text>

              <View
                width={width * 0.9} 
                height={1.5} 
                backgroundColor={"#DDD"} 
                alignSelf={"center"} 
                marginVertical={15}
                />
        <Text style={{ textAlign: "left", fontSize: 14, color: "#000", width: width * 0.8, marginTop: 10 }}>
          Lowest Average Store: {stringSentenceCase(cartResponse.lowestAvgStoreName)}
        </Text>
        <Text style={{ textAlign: "left", fontSize: 14, color: "#000", width: width * 0.8, marginTop: 10 }}>
          Lowest Average Total Store: {cartResponse.lowestAvgTotalPrice}
        </Text>

        </View>
        <View style={{ flexDirection: "row", width: width, justifyContent: "space-around" }}>

        {storeList.map((item,index) => (
        <View>
        <TouchableOpacity 
          style={{
            backgroundColor: item == showItem ? "#9BC0F1" :"#FF3366",
            width: width * 0.40,
            height: 35,
            borderRadius: 50,
            alignSelf: "center",
            marginVertical: Platform.OS === "ios" ? 20: 20,
          }}
          onPress={stringSentenceCase(cartResponse.lowestAvgStoreName) != "Not all items are available. Check individual stores." ?
          ()=> {
            setShowItem(item)
            setVisible(true)
            setStoreData(Object.values(storeValue)[index])
            console.log("Object Dataaa", Object.values(storeValue)[index]);
          }: ()=> {Alert.alert(null, "Not all items are available. Check individual stores.")}} 
          >
          {item == "star" ? 
          <Text style={styles.itemBtnDetails}>{stringSentenceCase(item)} Market</Text> :
          <Text style={styles.itemBtnDetails}>{stringSentenceCase(item)}</Text>}
        </TouchableOpacity>
        <Text style={styles.best}>Best</Text>
        </View>))}
        </View>
        </View> }
      </SafeAreaView>
      </ScrollView>
    );
  };
  
  export default Cart;
  
  const styles = StyleSheet.create({
    itemBtn: {
      backgroundColor: "#9BC0F1",
      width: width * 0.40,
      height: 35,
      borderRadius: 50,
      alignSelf: "center",
      marginVertical: Platform.OS === "ios" ? 20: 20,
    },
    itemBtnCheckout: {
      backgroundColor: "#9BC0F1",
      width: width * 0.40,
      height: 35,
      borderRadius: 50,
      alignSelf: "flex-end",
      marginEnd: 20,
      marginTop: Platform.OS === "ios" ? 5: 5,
      marginBottom: 10,
    },
    modalBackground:{
      flex:1,
      alignItems:'center',
      flexDirection:'column',
      justifyContent:'space-around',
      backgroundColor:'#00000040'
    },
    modalForeground:{
      backgroundColor:'#ffffff',
      height: height * 0.6,
      width: width * 0.9,
      borderRadius:10,
      alignItems:'center',
    },
    itemCompareBtn: {
      backgroundColor: "#FFA50090",
      width: width * 0.40,
      height: 35,
      borderRadius: 50,
      alignSelf: "center",
      marginVertical: Platform.OS === "ios" ? 20: 20,
    },
    itemStoreBtn: {
      backgroundColor: "#FF3366",
      width: width * 0.40,
      height: 35,
      borderRadius: 50,
      alignSelf: "center",
      marginVertical: Platform.OS === "ios" ? 20: 20,
    },
    itemBtnDetails: {
      fontSize: 17,
      padding: 5,
      textAlign: "center",
    },
    best: {
      backgroundColor: "#EFDB6F",
      paddingVertical: 5,
      paddingHorizontal: 10,
      fontSize: 11,
      width: 45,
      position: "absolute",
      right: -20,
      marginTop: 5,
      marginEnd: 5
    },
    bestS: {
      backgroundColor: "#EFDB6F",
      paddingVertical: 5,
      paddingHorizontal: 10,
      fontSize: 11,
      width: 45,
      position: "absolute",
      left: 1,
      top: 10,
      marginLeft: 5
    },  
    invalidTextStyle: {
      fontSize: 12,
      color: "#FF0000",
      backgroundColor: "pink",
      alignSelf: "center",
      margin: 50,
      opacity: 1,
      padding: 20
    }
  });