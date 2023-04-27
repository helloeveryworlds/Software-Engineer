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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { login,logout } from "../reducers/LoginReducer";


const DrawerDesign = (props) => {
  const loginInfo = useSelector((state) => state.login.login);
  const dispatch = useDispatch();

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
          }
        },
          { text: 'No', onPress: () => console.log('NO Pressed') }
        ],
        { cancelable: false },
        );
  }

  useEffect(() => {
    _retrieveData()
  },[]);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#F4EFEF" barStyle="dark-content"/>
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
  