import React from "react";
import 'react-native-gesture-handler';
import { View, TouchableOpacity, Image, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
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
import { 
  Nunito_200ExtraLight,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light,
  Nunito_300Light_Italic,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_600SemiBold,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black,
  Nunito_900Black_Italic,
  useFonts
} from '@expo-google-fonts/nunito';
import AppLoading from 'expo-app-loading';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
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
          title: '', //Set Header Title
          headerLeft: () => (
            <Image source={require('./assets/logo_.png')} resizeMode={'cover'}  marginStart={20}/>
          ),
          headerRight: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#F4EFEF', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      {/* <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          title: '', //Set Header Title
          headerLeft: () => (
            <Image source={require('./assets/logo_.png')} resizeMode={'cover'}  marginStart={20}/>
          ),
          headerRight: () => (
            // <View>
            //   <TouchableOpacity style={{}} onPress={()=> {
            //       props.navigation.navigate("Cart")}}>
            //     <FontAwesome5 
            //       name={"shopping-cart"} 
            //       style={{ color: "#FF0080", alignSelf: "center", }}
            //       size={25}/>
            //   </TouchableOpacity>
              <NavigationDrawerStructure navigationProps={navigation} />
            // </View>
          ),
          headerStyle: {
            backgroundColor: '#F4EFEF', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      /> */}
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
          backgroundColor: '#F4EFEF', //Set Header color  #F4EFEF
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: '', //Set Header Title
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: '', //Set Header Title
        }}
      />
      {/* <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          title: '', //Set Header Title
          headerLeft: () => (
            <Image source={require('./assets/logo_.png')} resizeMode={'cover'}  marginStart={20}/>
          ),
          headerRight: () => (
            // <View>
            //   <TouchableOpacity style={{}} onPress={()=> {
            //       props.navigation.navigate("Cart")}}>
            //     <FontAwesome5 
            //       name={"shopping-cart"} 
            //       style={{ color: "#FF0080", alignSelf: "center", }}
            //       size={25}/>
            //   </TouchableOpacity>
              <NavigationDrawerStructure navigationProps={navigation} />
            // </View>
          ),
          headerStyle: {
            backgroundColor: '#F4EFEF', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      /> */}
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
          title: '', //Set Header Title
          headerLeft: () => (
            <Image source={require('./assets/logo_.png')} resizeMode={'cover'}  marginStart={20}/>
          ),
          headerRight: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#F4EFEF', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      {/* <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          title: '', //Set Header Title
          headerLeft: () => (
            <Image source={require('./assets/logo_.png')} resizeMode={'cover'}  marginStart={20}/>
          ),
          headerRight: () => (
            // <View>
            //   <TouchableOpacity style={{}} onPress={()=> {
            //       props.navigation.navigate("Cart")}}>
            //     <FontAwesome5 
            //       name={"shopping-cart"} 
            //       style={{ color: "#FF0080", alignSelf: "center", }}
            //       size={25}/>
            //   </TouchableOpacity>
              <NavigationDrawerStructure navigationProps={navigation} />
            // </View>
          ),
          headerStyle: {
            backgroundColor: '#F4EFEF', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      /> */}
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
          title: '', //Set Header Title
          headerLeft: () => (
            <Image source={require('./assets/logo_.png')} resizeMode={'cover'}  marginStart={20}/>
          ),
          headerRight: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#F4EFEF', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
       <Stack.Screen
        name="ItemList"
        component={ItemList}
        options={{
          title: '', //Set Header Title
          headerLeft: () => (
            <Image source={require('./assets/logo_.png')} resizeMode={'cover'}  marginStart={20}/>
          ),
          headerRight: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#F4EFEF', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="PriceCompare"
        component={PriceCompare}
        options={{
          title: '', //Set Header Title
          headerLeft: () => (
            <Image source={require('./assets/logo_.png')} resizeMode={'cover'}  marginStart={20}/>
          ),
          headerRight: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#F4EFEF', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          title: '', //Set Header Title
          headerLeft: () => (
            <Image source={require('./assets/logo_.png')} resizeMode={'cover'}  marginStart={20}/>
          ),
          headerRight: () => (
            // <View>
            //   <TouchableOpacity style={{}} onPress={()=> {
            //       props.navigation.navigate("Cart")}}>
            //     <FontAwesome5 
            //       name={"shopping-cart"} 
            //       style={{ color: "#FF0080", alignSelf: "center", }}
            //       size={25}/>
            //   </TouchableOpacity>
              <NavigationDrawerStructure navigationProps={navigation} />
            // </View>
          ),
          headerStyle: {
            backgroundColor: '#F4EFEF', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function mainScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerLeft: () => (
          <Image source={require('./assets/logo_.png')} resizeMode={'cover'} marginStart={20}/>
        ),
        headerRight: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#F4EFEF', //Set Header color  #F4EFEF
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          title: '', //Set Header Title
        }}
      />
      <Stack.Screen
        name="UserInfo"
        component={UserInfo}
        options={{
          title: '', //Set Header Title
        }}
      />
      <Stack.Screen
        name="Shop"
        component={Shop}
        options={{
          title: '', //Set Header Title
        }}
      />
     
      <Stack.Screen
        name="PriceCompare"
        component={PriceCompare}
        options={{
          title: '', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function App() {
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
        drawerContent={(props) => <DrawerDesign {...props} />}>
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