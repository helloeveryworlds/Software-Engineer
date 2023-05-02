import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  LogBox,
  Image,
  TextInput,
  FlatList,
  Platform,
  Alert
} from "react-native";
import groceSaveService from ".././service/GroceSaveService";
import groceSaveItemService from "../service/GroceSaveItemService";
import SearchIcon from "../../assets/svgs/search";
import  Loader  from '../components/Loader';
import Blink from "../components/Blink";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../reducers/CartReducer";
import { addToShoppingList, removeFromShop } from "../reducers/ShopReducer";

const { width } = Dimensions.get("window");

const Shop = ({ navigation }) => {
  const shop = useSelector((state) => state.shop.shop);
  const cart = useSelector((state) => state.cart.cart);
  const login = useSelector((state) => state.login.login);
  
  console.log("Carttttttttt", cart)
  const dispatch = useDispatch();

  const [ isLoading, setIsLoading ] = useState(false);
  const [click, setClick] = useState("");
  const [hide, setHide] = useState(true);
  const [list, setList] = useState([]);
  const [mainList, setMainList] = useState([]);
  const [mainData, setMainData] = useState({});
  const [newCartList, setNewCartList] = useState([]);
  const [currentCartList, setCurrentCartList] = useState([]);
  const [selectedItemsList, setSelectedItemsList] = useState([]);
  const [selectedMainItemsList, setSelectedMainItemsList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [input, setInput] = useState("");
  const [inputSub, setInputSub] = useState("");

  const scrollRef = useRef();

  const handleInput = (input) => {  
    if(input != ""){
      search(input)
      setInput(input);
    }else {
      setInput(input);
    } 
  };

  const handleSubInput = (inputSub) => {  
    if(inputSub != ""){
      searchSubCat(inputSub)
      setInputSub(inputSub);
    }else {
    setInputSub(inputSub);
    } 
  };

  const itemList = (input) => {
    setIsLoading(true);

    groceSaveItemService
      .get('/itemList')
      .then(data => {
        if(data){
            setIsLoading(false);
        if(input != ""){
        const info = data.data[input];
        setList(info);
        setFilteredData(info);
        
        const mainList = Object.keys(data.data);
        console.log("Yaaaaay!!!",data.data[input])
        console.log("Mainlist Yaaaaay!!!",mainList)
        setMainList(mainList)
        setMainData(data.data)   
             
        }
        } else {
            setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err)
        Alert.alert(null, err.substring(item.indexOf(":") + 1).trim())
        setIsLoading(false);
      });
  }

    useEffect(() => {
        itemList()
        getCurrentCart()
    },[]);
      
    const addItemToShop = (item) => {
        dispatch(addToShoppingList(item));
      };

      const removeItemFromShop = (item) => {
        dispatch(removeFromShop(item));
      };
      
    const addSelectedMainCat = (item, key) =>{
      selectedMainItemsList.push({
        id: key+"",
        name: item
      });
      setSelectedMainItemsList([...selectedMainItemsList]);
    }

    const addToShop = (item, key) => {
      if(cart.length != 0){
        scrollRef.current?.scrollTo({x: 0, y: 0, animated: true}) 
        const itemDataWithQuant = {
          id: key+"",
          image: item.substring(item.indexOf(",") + 1),
          name: item.split(',')[0].trim(),
          quantity: 1
        }

        dispatch(addToCart(itemDataWithQuant));
        submitOrderItems(itemDataWithQuant);
        selectedItemsList.push({
          id: key+"",
          image: item.substring(item.indexOf(",") + 1),
          name: item.split(',')[0].trim(),
        });
        setNewCartList([...selectedItemsList]);
        addItemToShop(itemDataWithQuant)
        // Alert.alert(null,"Please Empty and checkout other items left in the cart before you continue..")
      }else{
      scrollRef.current?.scrollTo({x: 0, y: 0, animated: true}) 
      selectedItemsList.push({
        id: key+"",
        image: item.substring(item.indexOf(",") + 1),
        name: item.split(',')[0].trim(),
      });

      const itemData = {
        id: key+"",
        image: item.substring(item.indexOf(",") + 1),
        name: item.split(',')[0].trim(),
      }

      setNewCartList([...selectedItemsList]);
      addItemToShop(itemData)
    }
    }

    const toCart = () => {
      if(cart.length != 0){
        navigation.navigate("Cart", {
          array: cart
        })
        setCurrentCartList([]);
      }else{
      navigation.navigate("Cart", {
        array: shop
      })
    }
    }

    const removeFromShopItem = (item, index) => {
      if(cart.length != 0){
        let dataForLife = {}
        const itemDataWithQuant = {
          id: index+"",
          image: item.substring(item.indexOf(",") + 1),
          name: item.split(',')[0].trim(),
          quantity: 1
        }
        removeOrderedItem(itemDataWithQuant)
        // removeFromCart(itemDataWithQuant)
        const filteredItem = selectedItemsList.filter(o =>
        o.name.includes(item));
        filteredItem.forEach((dataItem)=>{
            dataForLife = dataItem
        })
        // console.log("fgfdfzdsfdxgchvjbn", itemDataWithQuant)
        // removeItemFromShop(dataForLife)
        removeItemFromShop(itemDataWithQuant)
      }else{
        let dataForLife = {}
        const filteredItem = selectedItemsList.filter(o =>
        o.name.includes(item.split(',')[0].trim()));
        filteredItem.forEach((dataItem)=>{
            dataForLife = dataItem
        })
        removeItemFromShop(dataForLife)
      }
    }

    const checkRightMain = (name) => {
      return selectedMainItemsList.some(el => el.name === name)
    }

    const search = (text) => {
      if (text) {
        const newData = mainList.filter(
          function (item) {
            const itemData = item
              ? item.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        
        setFilteredData(newData)
        if(text != ""){
          setInput(text);
        }else {
          setInput(text);
        } 

      } else {
        setFilteredData(mainList)
      }
    };

    const searchSubCat = (text) => {
      if (text) {
        const newData = list.filter(
          function (item) {
            const itemData = item
              ? item.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        
        setFilteredData(newData)
        if(text != ""){
          setInputSub(text);
        }else {
          setInputSub(text);
        } 

      } else {
          setFilteredData(list)
      }
    };

    const itemView = ({item, index}) => {
      return (
        <View>
        {list && click != "" ? 
        <Text
          style={styles.itemStyle}
          onPress={() => getSubItem(item, index)}>
          {item.split(',')[0].trim()}
        </Text> :
        <Text
          style={styles.itemStyle}
          onPress={() => getItem(item, index)}>
          {item}
        </Text>}
        </View>
      );
    };

    const itemSeparatorView = () => {
      return (
        <View
          style={{
            height: 0.5,
            width: '100%',
            backgroundColor: '#C8C8C8',
          }}
        />
      );
    };

    const getItem = (item, index) => {
      if(mainList.includes(item)){
      itemList(item)
      addSelectedMainCat(item, index)
      setInput(item)
      setFilteredData([])
      setClick("clicked");
      }else{
        Alert.alert(null,"Catergory not here")
      }
    };

    const getSubItem = (item, index) => {
      if(list.includes(item)){
      if(list && click != ""){
          setInputSub(item.split(',')[0].trim())
          setFilteredData([])
          setClick("clicked");
      }
      } else {
        Alert.alert(null,"Item not here")
      }
    }

    const renderElement = (item, key) => {
      const selectedItems = []
      const sampleImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsUhUsM8JuZ4MKDjlPNox4QuV81hnoccTW_A&usqp=CAU";

      selectedItems.push({ key })
      return(
        <View style={styles.itemContainer} key={key}>
        
        <View style={styles.details}>
        <View style={{ backgroundColor: "#FFF" }}>
        {click ? 
          <Image 
            source={{ uri: item.substring(item.indexOf(",") + 1) }}
            style={{ width: width * 0.35, height: 100, borderRadius: 6, marginBottom: 3, alignSelf: "center" }}
            key={key}
            /> 
            : 
          <Image 
            source={{url: sampleImage }}
            style={{ width: 100, height: 100, alignSelf: "center" }}
            />}
        </View>
        <View style={{ backgroundColor: "#F6F6F6", padding: 12, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
        {!list ? <Text key={key} style={styles.mainTextDetails}>{item.split(',')[0].trim()}</Text> : 
        <Text key={key} style={styles.textDetails}>{item.split(',')[0].trim()} </Text>}
        {!list ? <View style={styles.viewSpace}/> :
        <View>
        </View>
      }

      {!list ? 
      <TouchableOpacity
          key={key}
          style={{ 
          backgroundColor: checkRightMain(item,key) ? "#808080" : "green",
          width: width * 0.30,
          height: 35,
          borderRadius: 50,
          alignSelf: "center",
          marginTop: Platform.OS === "ios" ? -10: -10,}}
          onPress= {
            cart.length == 0 && login.length != 0 ? 
            ()=> { 
              addSelectedMainCat(item,key) 
              scrollRef.current?.scrollTo({x: 0, y: 0, animated: true}) 
              setList(mainData[item])
              setFilteredData(mainData[item])
              setClick("clicked")
              setInput(item)} : cart.length != 0 && login.length != 0 ?
            ()=> {
              addSelectedMainCat(item,key) 
              scrollRef.current?.scrollTo({x: 0, y: 0, animated: true}) 
              setList(mainData[item])
              setFilteredData(mainData[item])
              setClick("clicked")
              setInput(item)
              } : ()=> { Alert.alert(null,"Please Login to continue")}}>
          <Text style={styles.viewBtnDetails}>View Category</Text>
      </TouchableOpacity> : 
      !shop.some((value) => value.name == item.split(',')[0].trim()) ?
      <TouchableOpacity
        key={key}
        style={{
          backgroundColor: shop.some((value) => value.name == item.split(',')[0].trim()) ? "#1B6EBB60" : "#1B6EBB" ,
          width: width * 0.30, 
          height: 35,
          borderRadius: 50,
          alignSelf: "center",
          marginTop: Platform.OS === "ios" ? 15: 10,
        }}
        onPress={()=> { 
          addToShop(item, key)
        }}>
      <Text style={styles.itemBtnDetails}>Add to cart</Text>
      </TouchableOpacity> : 
      <TouchableOpacity
      key={key}
      style={{
        backgroundColor: shop.some((value) => value.name == item.split(',')[0].trim())  ? "#1B6EBB60" : "#1B6EBB" ,
        width: width * 0.30, 
        height: 35,
        borderRadius: 50,
        alignSelf: "center",
        marginTop: Platform.OS === "ios" ? 15: 10,
      }}
      onPress={()=> removeFromShopItem(item, key)}>
    <Text style={styles.itemBtnDetails}>Remove</Text>
    </TouchableOpacity>}
      </View>
      </View>
      </View>
    );
  }

  const getCurrentCart = () => {
    const onSuccess = ( data ) => {
      setIsLoading(false);
      if (data.status == 200){
      console.log("Data data data data donneeee",data)
      if(data){
        if(data.data.orderItemList.length != 0){
          data.data.orderItemList.forEach((item)=> {
            dispatch(addToCart(item));
            setCurrentCartList(data.data.orderItemList)
          })
        }else if(data.data.orderItemList == null){
          setCurrentCartList([]);
        }
      }else{
        setCurrentCartList([])
      }
      }
    };

    const onFailure = (error) => {
      console.log(error && error.response);
        setIsLoading(false);
      // if(error.response == null){
      //   setIsLoading(false);
      //   Alert.alert('Info: ','Network Error')
      // }
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
      .get("/cart")
      .then(onSuccess)
      .catch(onFailure);
    }

    const submitOrderItems = (items) => {
      if(login.length != 0){
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

      const removeOrderedItem = (items) => {
        if(login.length != 0){
          setIsLoading(true);
          getCurrentCart();
          let name = items.name
          let quantity = +items.quantity
          let url = items.image ? items.image : items.url
          
          const payload = {
            name,
            quantity,
            url
          }

          console.log("Donneeee payload........",payload)
          
          
      const onSuccess = ( data ) => {
        setIsLoading(false);
        if (data.status == 201){
          getCurrentCart();
          console.log("Donneeee order........yyyyyyyy",data)
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
        .post("/delete", payload)
        .then(onSuccess)
        .catch(onFailure);
        } else {
          Alert.alert(null, "Please sign in to Checkout successfully!", [{
            text: 'Ok', onPress: () => navigation.navigate("SignIn")
          }])
        }
        }

    LogBox.ignoreAllLogs(true);
    console.log("currentCartList currentCartListcurrentCartList", currentCartList)
      return (
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="always" backgroundColor="#FFF">
          <StatusBar backgroundColor="#F4EFEF" barStyle="dark-content"/>
          <Loader loading={isLoading} />

              <View style={{ marginVertical: 5 }}>
              {list && click != "" ? 
              <TextInput 
                style={styles.optionContainer}
                value={inputSub}
                placeholder={"Search SubCategories"}
                onChangeText={(text)=> handleSubInput(text)}
                />
               : 
               <TextInput 
                style={styles.optionContainer}
                value={input}
                editable={!mainList ? false : true}
                placeholder={"Search Categories"}
                onChangeText={(text)=> handleInput(text)}
                />
                  }
              <View style={{ bottom: 35, paddingStart: width * 0.16 }}>
              <SearchIcon/>
              </View>

              {!list ?
               <FlatList
                data={filteredData}
                style={{ backgroundColor: "#FFF" }}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={itemSeparatorView}
                renderItem={itemView}
              /> : null}

              {!list ? 
              <Text style={styles.infoTextStyle}>Categories</Text> : <Text style={styles.infoTextStyle}>{input}</Text>}
              
              <View
                width={width * 0.9} 
                height={1.5} 
                backgroundColor={"#DDD"} 
                alignSelf={"center"} 
                marginVertical={15}
                />

              {list && click != "" ? 
                <TouchableOpacity style={{ marginStart: 18, marginEnd: 0 }} onPress={()=> {
                    setClick("");
                    setInput("")
                    setInputSub("")
                    setList(null)
                    setFilteredData([])
                }}>
                <Text style={styles.backText}>{"<< "}Back to Categories</Text>
                </TouchableOpacity>
                : null} 

                {cart.length != 0 && cart.length != 0 ?
                <View>
                  <Blink duration={600}>
                  <View style={styles.best}>
                  <Text style={{ fontSize: cart.length > 9 ? 9.5 : 12, paddingTop: cart.length > 9 ? 2 : 1, paddingHorizontal: cart.length > 9 ? 7.5 : 9,  }}>{cart.length}</Text>
                  </View>
                    <TouchableOpacity onPress={()=> toCart()}>
                    <FontAwesome5 
                      name={"shopping-cart"} 
                      style={{ color: "#FF0080", alignSelf: "flex-end", marginEnd : 30, marginBottom: 10 }}
                      size={25}/>
                    </TouchableOpacity>
                    </Blink>
                  </View> : 
                  cart.length == 0 && shop.length != 0 &&
                  <View>
                    <View style={styles.best}>
                    <Text style={{ fontSize: shop.length > 9 ? 9.5 : 12, paddingTop: shop.length > 9 ? 2 : 1, paddingHorizontal: shop.length > 9 ? 7.5 : 9,  }}>{shop.length}</Text>
                    </View>
                      <TouchableOpacity onPress={()=> toCart()}>
                      <FontAwesome5 
                        name={"shopping-cart"} 
                        style={{ color: "#FF0080", alignSelf: "flex-end", marginEnd : 30, marginBottom: 10 }}
                        size={25}/>
                    </TouchableOpacity>
                  </View>}

                {!mainList && <Text style={styles.invalidTextStyle}>No available Categories. Please check your network...</Text>}
                {!list ? 
                  <FlatList
                    data={mainList}
                    renderItem={({ item, index }) => (
                      renderElement(item, index)
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                  />
                   :
                  <FlatList
                   data={click != "" ? filteredData : list}
                   renderItem={({ item, index }) => (
                     renderElement(item, index)
                   )}
                   numColumns={2}
                   keyExtractor={(item, index) => index}
                 />} 
            </View>
        </ScrollView>
      );
    }

export default Shop;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: Platform.OS === "ios" ? width : width,
  },
  containerr: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
    marginStart: 70,
    width: width * 0.5
  },
  optionContainer: {
      borderRadius: 20,
      width: width * 0.7,
      height: 50,
      alignSelf: "center",
      marginHorizontal: 16,
      paddingVertical: 10,
      paddingStart: 40,
      paddingEnd: 10,
      backgroundColor: "#D3DEDD",
      marginTop: 30
  },
  headerContainer: {
    width: Platform.OS === "ios" ? width : width,
    height: 70,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#F4EFEF",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  image: {
    flex: 1,
    width: Platform.OS === "ios" ? width : width,
  },
  best: {
    backgroundColor: "#EFDB6F",
    paddingVertical: 4,
    fontSize: 11,
    width: 25,
    height: 25,
    position: "absolute",
    right: 3,
    top: -15,
    marginRight: 10,
    borderRadius: 100,
  },
  itemContainer: {
    flex: 1,
    borderRadius: 30,
    width: width * 0.6,
    marginTop: 20,
    padding: 0,
    alignSelf: "center",
  },
  itemBtn: {
    backgroundColor: "#1B6EBB",
    width: width * 0.30,
    height: 35,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? -10: -10,
  },
  invalidTextStyle: {
    fontSize: 12,
    color: "#FF0000",
    backgroundColor: "pink",
    alignSelf: "center",
    margin: 50,
    opacity: 1,
    padding: 20
  },
  viewBtn: {
    backgroundColor: "green",
    width: width * 0.30,
    height: 35,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? -10: -10,
  },
  itemBtnDetails: {
    fontSize: 16,
    padding: 5,
    textAlign: "center",
  },
  viewBtnDetails: {
    fontSize: 14,
    padding: 7,
    textAlign: "center",
  },
  details: {
    marginTop: -30, 
    marginHorizontal: 20,
    padding: 10,
    width: width * 0.4
  },
  textDetails: {
    fontSize: 14,
    fontWeight: "600"
  },
  backText: {
    textDecorationLine: "underline",
    fontWeight: "500",
    color: "blue",
    marginBottom: 10
  },
  mainTextDetails: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    color: "purple"
  },
  numDetails: {
    fontSize: 14,
  },
  viewSpace: {
    marginVertical: 12,
  },
  soldDetails: {
    fontSize: 14,
    marginBottom: 17,
  },
  locDetails: {
    fontSize: 14,
    color: "#1A3CF1",
    textDecorationLine: "underline",
  },
  optionContainer: {
      borderRadius: 20,
      width: width * 0.7,
      height: 50,
      alignSelf: "center",
      marginHorizontal: 16,
      paddingVertical: 10,
      paddingStart: 40,
      paddingEnd: 10,
      backgroundColor: "#D3DEDD",
      marginTop: 30
  },
  headerTextStyle: {
    fontSize: 20,
    color: "black",
    alignSelf: "center",
    paddingVertical: 10,
    paddingLeft: Platform.OS === "ios" ? width * 0.2 : width * 0.2,
    opacity: 1,
  },
  headerTextStyle_: {
    fontSize: Platform.OS === "ios" ? 20 : 20,
    color: "black",
    alignSelf: "center",
    paddingLeft: 17,
    width: 100,
    opacity: 1,
  },
  infoTextStyle: {
    fontSize: 25,
    color: "black",
    marginTop: 5,
    paddingLeft: 25,
    textAlign: "left",
    fontWeight: "700",
    opacity: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFFF",
  },
});