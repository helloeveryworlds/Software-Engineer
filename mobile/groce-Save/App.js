import React from "react"
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import SignIn from "./src/screens/SignIn";
import Welcome from "./src/screens/Welcome";
import SignUp from "./src/screens/SignUp";
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

export default function App() {
    let [fontsLoaded, error] = useFonts({
      Nunito_400Regular,
      Nunito_700Bold,
      Nunito_600SemiBold,
      Nunito_300Light,
    })
  
      if (!fontsLoaded) {
      return <AppLoading/>;
    } else{
      return <AppContainer/>;
    }
  }

const Navigator = createStackNavigator(
  {
    SignIn: {
        screen: SignIn,
        navigationOptions: {
          headerShown: true,
          headerTransparent: true,
          title: "",
          headerTintColor: "black",
        },
      },
      Welcome: {
        screen: Welcome,
        navigationOptions: {
          headerShown: true,
          title: "",
          headerTransparent: true,
        },
      },
      SignUp: {
        screen: SignUp,
        navigationOptions: {
          headerShown: true,
          headerTransparent: true,
          title: "",
          headerTintColor: "black",
        },
      },
      // AssignSuggestScreen: {
      //   screen: AssignSuggestScreen,
      //   navigationOptions: {
      //     headerShown: true,
      //     headerTransparent: true,
      //     title: "Assign a Suggest",
      //     headerTintColor: "maroon",
      //   },
      // },
  },
  {
    initialRouteName: "Welcome",
    defaultNavigationOptions: {
      // title: "",
      headerStyle: {
        backgroundColor: "#F4EFEF",//"#1e5228", 
        opacity: 0.90
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontFamily: "Nunito_600SemiBold",
        fontSize: 17
      },
    },
  }
);

const AppContainer = createAppContainer(Navigator);