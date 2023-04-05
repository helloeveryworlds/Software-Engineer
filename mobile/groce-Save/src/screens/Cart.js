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
  import React, { useRef, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { addToCart, decrementQuantity, incrementQuantity, removeFromCart } from "../components/CartReducer";
  import  Loader  from '../components/Loader';
  import groceSaveItemService from "../service/GroceSaveItemService";

  const { width, height } = Dimensions.get("window");

  const Cart = ({ route, navigation }) => {
    const { array } = route.params;
    const cart = useSelector((state) => state.cart.cart);
    console.log(cart);
    const dispatch = useDispatch();
    const [ isLoading, setIsLoading ] = useState(false);
    const images = [
      {
        id: "0",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqg_OBzcVDnKHv1d3hyVk_WlCo43pzit4CJQ&usqp=CAU",
        name: "icecream",
      },
      {
        id: "1",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT85O96gPiso_j2gaS0cePTBY4mCR3pumV6tw&usqp=CAU",
        name: "biscuit",
      },
      {
        id: "2",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSicQWeRoxxLEr1RLIp8dJtw-NQvSE4xtlhwA&usqp=CAU",
        name: "chocolate",
      },
    ];
    
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
      const list = []
      setIsLoading(true);
      var itemsWithQuantity = {};

      cart.map((items) =>
        (
          itemsWithQuantity[items.name] = items.quantity+""
        ))
      
      const zipCode = "02134"
      list.push({
        zipCode,
        itemsWithQuantity
      })

  console.log(list);

  const onSuccess = ( data ) => {
    setIsLoading(false);
    
    console.log("Dataaa",data);
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
      Alert.alert('Info: ','User not found')
    }
  };

   groceSaveItemService
    .post("/comparePrice", list)
    .then(onSuccess)
    .catch(onFailure);
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
        <Text style={{ textAlign: "center", fontSize: 16 }}>
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
        {cart.length != 0 && 
        <Text style={{ textAlign: "center", fontSize: 14, backgroundColor: "#808080", color: "#FFF", width: width, padding: 10 }}>
          Star Market
        </Text>}
        {cart.map((item,index) => (
          <View style={{padding:10}} key={index}>
            <Text>{item.name}</Text>
            <Image style={{ width: 100, height: 100, borderRadius: 8,marginTop:6 }}
                source={{ uri: item.image }}/>
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
        {cart.length != 0 && 
        <TouchableOpacity 
          style={styles.itemBtn}
          onPress={()=> submitCheckOut()}>
          <Text style={styles.itemBtnDetails}>Checkout</Text>
        </TouchableOpacity>}
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
    itemBtnDetails: {
      fontSize: 17,
      padding: 5,
      textAlign: "center",
    },
    
  });