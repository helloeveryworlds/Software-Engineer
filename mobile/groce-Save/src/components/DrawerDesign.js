import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    Text,
    StatusBar,
    TouchableOpacity
  } from 'react-native';
import UserIcon from '../../assets/svgs/user';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawerDesign = (props) => {
  const [data, setData] = useState("");
  const _retrieveData = () => {
    AsyncStorage.getItem("userDetails").then((res) => {
      const response = JSON.parse(res);
      if (res !== null) {
        setData(response.data.name) 
      } else {
        console.log("No response...", response);
      }
    });
  }

  useEffect(() => {
    _retrieveData()
  });

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#F4EFEF" barStyle="dark-content"/>
        <Image
          source={require('../.././assets/logo_.png')} 
          resizeMode={'cover'}
          style={styles.sideMenuProfileIcon}
        />

          {data ? 
          <Text style={{ fontSize: 16, textAlign: 'center',  backgroundColor: 'grey', color: "#FFF", padding: 5,  }}>
          {data}
        </Text> : <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          User
        </Text>}
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          
          <TouchableOpacity style={styles.customItem} onPress={()=> {
            props.navigation.navigate("UserInfo")}}>
            <UserIcon/>
          </TouchableOpacity>
        </DrawerContentScrollView>

        <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          Groce Save
        </Text>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    sideMenuProfileIcon: {
      // resizeMode: 'center',
      // width: 100,
      // height: 100,
      // borderRadius: 100 / 2,
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
  