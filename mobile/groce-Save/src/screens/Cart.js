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
    Dimensions
  } from "react-native";
  import React, { useRef, useState, useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from "../components/CartReducer";
  import  Loader  from '../components/Loader';
  import groceSaveItemService from "../service/GroceSaveItemService";
  import groceSaveService from ".././service/GroceSaveService";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  const { width, height } = Dimensions.get("window");

  const Cart = ({ route, navigation }) => {
    const { array } = route.params;
    const cart = useSelector((state) => state.cart.cart);
    // console.log(cart);
    const dispatch = useDispatch();

    const [ isLoading, setIsLoading ] = useState(false);
    const [userData, setUserData] = useState({});
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
    });
    
    const addItemToCart = (item) => {
      dispatch(addToCart(item));
    };
    const removeItemFromCart = (item) => {
      dispatch(removeFromCart(item));
    };
    const increaseQuantity = (item) => {
      dispatch(incrementQuantity(item));
    }
    const decreaseQuantity = (item) => {
      if(item.quantity == 1){
        dispatch(removeFromCart(item));
      }else{
        dispatch(decrementQuantity(item));
      }
    }
    
    const submitCheckOut = () => {
      if(Object.keys(userData).length != 0){
      
      setIsLoading(true);
      let name = ""
      let URL = ""

      cart.map((items) =>
        (
          name = items.name,
          URL = items.image
        ))
      
      const payload = {
        name,
        URL
      }
      
  const onSuccess = ( data ) => {
    setIsLoading(false);
    console.log("Donneeee",data)
    if (data.status == 200){
      Alert.alert(null, "Checkout successfully,\nIt's free so no need to pay!", [{
        text: 'Ok', onPress: () => navigation.navigate("Shop")
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
      Alert.alert('Info: ',error.response.data.non_field_errors[0])
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

    const submitComparePrice = () => {
      if(Object.keys(userData).length != 0){
      const list = []
      setIsLoading(true);
      var itemsWithQuantity = {};

      cart.map((items) =>
        (
          itemsWithQuantity[items.name] = items.quantity+""
        ))
      
      const zipCode = userData.zipCode
      list.push({
        zipCode,
        itemsWithQuantity
      })

  console.log(list);

  const onSuccess = ( data ) => {
    // const { bestByCategory } = data;
    setIsLoading(false);
    
    console.log("Dataaa", data.data[0].bestByCategory);
    if (data.status == 200){
      if(data.data[0].msg == "The zip code is'nt currently covered under our services"){
        Alert.alert(null, data.data[0].msg);
      }else{
        setCartResponse(data.data[0].bestByCategory)
      Alert.alert(null, "Price compare option was successful,\nPlease view and checkout!", [{
        // text: 'Ok', onPress: () => navigation.navigate("Shop")
      }])
    }
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
      Alert.alert('Info: ',error.response.data.non_field_errors[0])
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

    const scrollRef = useRef();

    const onPressTouch = () => {
      scrollRef.current?.scrollToEnd({
        animated: true,
      });
    }

    return (
      <ScrollView  ref={scrollRef}  onContentSizeChange={() => onPressTouch()} style={{ backgroundColor: "#FFF" }}>
      <SafeAreaView>
        <Loader loading={isLoading} />
        <Text style={{ textAlign: "center", fontSize: 16, marginTop: 7 }}>
          Cart
        </Text>
        {!array ? null : 
        array.map((item) => (
          <Pressable
            key={item.id}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <View style={{ margin: 10 }}>
              <Image
                style={{ width: 100, height: 100, borderRadius: 8 }}
                source={{ uri: item.image }}
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
                addItemToCart(item)}}>
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
        {cart.length != 0 && cartResponse.lowestAvgStoreName ?
        <Text style={{ textAlign: "center", fontSize: 14, backgroundColor: "#808080", color: "#FFF", width: width, padding: 10 }}>
          {cartResponse.lowestAvgStoreName.toUpperCase()}
        </Text> : <View
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
                source={{ uri: item.image }}/>
               {cartResponse.lowestAvgStoreName &&
                <View>
                <Text style={{ fontWeight: "bold", marginTop: 30, marginStart: 10 }}>Lowest Price: ${cartResponse.lowestAvgTotalPrice}</Text>
                <Text style={{ fontWeight: "bold", marginTop: 10, marginStart: 10 }}>Store: {cartResponse.lowestAvgStoreName}</Text>
                </View>}
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
        {cart.length != 0 ?
         !cartResponse.lowestAvgStoreName ? 
        <TouchableOpacity 
          style={styles.itemCompareBtn}
          onPress={()=> submitComparePrice()}>
          <Text style={styles.itemBtnDetails}>Compare prices</Text>
        </TouchableOpacity> :
        <TouchableOpacity 
        style={styles.itemBtn}
        onPress={()=> submitCheckOut()}>
        <Text style={styles.itemBtnDetails}>Checkout</Text>
      </TouchableOpacity> : null}
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
    itemCompareBtn: {
      backgroundColor: "#FFA50090",
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
    
  });