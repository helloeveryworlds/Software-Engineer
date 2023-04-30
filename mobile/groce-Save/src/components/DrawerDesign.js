import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    Text,
    StatusBar,
    TouchableOpacity,
    Alert
  } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList
  } from '@react-navigation/drawer';
import groceSaveService from ".././service/GroceSaveService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import  Loader  from '../components/Loader';
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { login,logout } from "../reducers/LoginReducer";


const DrawerDesign = (props) => {
  const loginInfo = useSelector((state) => state.login.login);
  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(false);

  console.log("login info::", loginInfo)
  const _retrieveData = () => {
    AsyncStorage.getItem("userDetails").then((res) => {
      const response = JSON.parse(res);
      if (res !== null) {
        console.log("userdetails info::", response)
        if(loginInfo.length == 0){
          dispatch(login(response));
        }
      } else {
        dispatch(logout([]));
        console.log("No response...", response);
      }
    });
  }

  const removeItemValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  }

  const logOutt = async () => {
    Alert.alert(
      'Logout? ',
      'Are you sure you want to logout?',
      [
        {
          text: 'Yes', onPress: () => {
             removeItemValue("userDetails");
             dispatch(logout([]));
              _retrieveData()
              submitLogout();
              if(loginInfo.length != 0){
              Alert.alert(null, "You just logged out now,\nSign in to do actions successfully!",[
                {
                  text: 'Ok', onPress: () => {
                  props.navigation.navigate("SignIn");
                } }]);
              }else{
                Alert.alert("You are already logged out", "Sign in to do actions successfully!",[
                  {
                    text: 'Ok', onPress: () => {
                    props.navigation.navigate("SignIn");
                  } }]);
              }
          }
        },
          { text: 'No', onPress: () => console.log('NO Pressed') }
        ],
        { cancelable: false },
        );
  }

  const submitLogout = () => {
      setIsLoading(true);
    const onSuccess = ( data ) => {
      setIsLoading(false);
      if (data.status == 200){
      console.log("Donneeee logou........",data)
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
    .get("/logout")
    .then(onSuccess)
    .catch(onFailure);
    }

  useEffect(() => {
    _retrieveData()
  },[]);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#F4EFEF" barStyle="dark-content"/>
        <Loader loading={isLoading} />
        <TouchableOpacity style={{ alignSelf: "flex-end", marginEnd: 10, marginBottom: -10 }} onPress={()=> logOutt()}>
          <Ionicons
            name={"log-out-outline"}
            color={"orange"}
            size={30}/>
        </TouchableOpacity>
        <Image
          source={require('../.././assets/logo_.png')} 
          resizeMode={'cover'}
          style={styles.sideMenuProfileIcon}
        />

        {loginInfo.length != 0 ? 
          <Text style={{ fontSize: 16, textAlign: 'center',  backgroundColor: 'grey', color: "#FFF", padding: 5,  }}>
          {loginInfo[0].name}
        </Text> : <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          User
        </Text>}
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
        
        </DrawerContentScrollView>

        <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          Groce Save
        </Text>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    sideMenuProfileIcon: {
      marginTop: 35,
      marginHorizontal: 15,
      alignSelf: 'center',
    },
    iconStyle: {
      width: 15,
      height: 15,
      marginHorizontal: 5,
    },
    customItem: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    cart:{
      alignSelf: "center"
    }
  });
  
  export default DrawerDesign;
  