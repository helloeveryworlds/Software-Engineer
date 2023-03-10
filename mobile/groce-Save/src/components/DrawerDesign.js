import * as React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    Text,
    Alert,
    StatusBar,
    TouchableOpacity
  } from 'react-native';
import UserIcon from '../../assets/svgs/user';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
  
const DrawerDesign = (props) => {
  // console.log(props)
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#F4EFEF" barStyle="dark-content"/>
        {/*Top Large Image */}
        <Image
          source={require('../.././assets/logo_.png')} 
          resizeMode={'cover'}
          style={styles.sideMenuProfileIcon}
        />
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          
          <TouchableOpacity style={styles.customItem} onPress={()=> {
            Alert.alert(null, "User Profile")
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
  });
  
  export default DrawerDesign;
  