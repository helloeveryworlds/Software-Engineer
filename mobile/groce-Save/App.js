import React, { useEffect, useState }  from "react";
import 'react-native-gesture-handler';
import { View, TouchableOpacity, Image, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Entypo } from "@expo/vector-icons";
import UserIcon from './assets/svgs/user';
import SignIn from "./src/screens/SignIn";
import Welcome from "./src/screens/Welcome";
import PriceCompare from "./src/screens/PriceCompare";
import UserInfo from "./src/screens/UserInfo";
import Shop from "./src/screens/Shop";
import ItemList from "./src/screens/ItemList";
import DrawerDesign from './src/components/DrawerDesign';
import SignUp from "./src/screens/SignUp";
import { Provider } from 'react-redux';
import Cart from './src/screens/Cart';
import store from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dataSend = (response) => {
  const data = response;
  return data;
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Entypo name="menu" size={30} style={{ right: 20, color: "#000" }}/>
      </TouchableOpacity>
    </View>
  );
};

function firstScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          title: '', 
          headerLeft: () => (
            <Image source={require('./assets/logo_.png')} resizeMode={'cover'}  marginStart={20}/>
          ),
          headerRight: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#F4EFEF', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      />
    </Stack.Navigator>
  );
}

function secondScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerLeft: () => (
          <Image source={require('./assets/logo_.png')} resizeMode={'cover'} marginStart={20}/>
        ),
        headerRight: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#F4EFEF', 
        },
        headerTintColor: '#fff', 
        headerTitleStyle: {
          fontWeight: 'bold', 
        },
      }}>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: '', 
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: '', 
        }}
      />
    </Stack.Navigator>
  );
}

function userInfoScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="UserInfo">
      <Stack.Screen
        name="UserInfo"
        component={UserInfo}
        options={{
          title: '', 
          headerLeft: () => (
            <Image source={require('./assets/logo_.png')} resizeMode={'cover'}  marginStart={20}/>
          ),
          headerRight: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#F4EFEF', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      />
    </Stack.Navigator>
  );
}


function shopScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Shop">
      <Stack.Screen
        name="Shop"
        component={Shop}
        options={{
          title: '', 
          headerLeft: () => (
            <Image source={require('./assets/logo_.png')} resizeMode={'cover'}  marginStart={20}/>
          ),
          headerRight: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#F4EFEF', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      />
       <Stack.Screen
        name="ItemList"
        component={ItemList}
        options={{
          title: '', 
          headerLeft: () => (
            <Image source={require('./assets/logo_.png')} resizeMode={'cover'}  marginStart={20}/>
          ),
          headerRight: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#F4EFEF', 
          },
          headerTintColor: '#000', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      />
      <Stack.Screen
        name="PriceCompare"
        component={PriceCompare}
        options={{
          title: '', 
          headerLeft: () => (
            <Image source={require('./assets/logo_.png')} resizeMode={'cover'}  marginStart={20}/>
          ),
          headerRight: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#F4EFEF', 
          },
          headerTintColor: '#000', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          title: '', 
          headerLeft: () => (
            <Image source={require('./assets/logo_.png')} resizeMode={'cover'}  marginStart={20}/>
          ),
          headerRight: () => (
              <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#F4EFEF', 
          },
          headerTintColor: '#000', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
  const [data, setData] = useState({});
  const _retrieveData = () => {
    AsyncStorage.getItem("userDetails").then((res) => {
      const response = JSON.parse(res);
      if (res !== null) {
        console.log("Response...", response.data);
        // return response;
        setData(response.data)
        // window.myGlobalVar = response.data; 
        
  
      } else {
        console.log("No response...", response);
      }
    });
  }
  
  useEffect(() => {
      _retrieveData()
    });

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Drawer.Navigator
      initialRouteName="Welcome"
        drawerContentOptions={{
          activeTintColor:'red',
          activeBackgroundColor: "#808080",
          itemStyle: { marginVertical: 5, },
          drawerPosition: "right",
        }}
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#F4EFEF',
            width: 240,
          },
          headerShown: false,
        }}
        drawerContent={(props) => <DrawerDesign data={data} {...props} />}>
        <Drawer.Screen
          name="Welcome"
          options={{ drawerLabel: 'Home', color: "#52A860" }}
          component={firstScreenStack}
        />
        <Drawer.Screen
          name="Shop"
          options={{ drawerLabel: 'Shop' }}
          component={shopScreenStack}
        />
        <Drawer.Screen
          name="SignIn"
          options={{ drawerLabel: 'Signin/SignUp' }}
          component={secondScreenStack}
        />
        <Drawer.Screen
           name={"UserInfo"}
           options={{
            title: '',
           drawerIcon:({focused})=> <UserIcon color={focused ? "#52A860" : "black"}/>}}
           component={userInfoScreenStack}
         />
      </Drawer.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;