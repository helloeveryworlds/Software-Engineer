import React, { Component } from "react";
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
  ImageBackground,
  Alert,
  Platform
} from "react-native";
// import Toast from 'react-native-tiny-toast';
import SearchIcon from "../../assets/svgs/search";
import UserIcon from "../../assets/svgs/user";

const { width, height } = Dimensions.get("window");

const initialState = { 
  isLoading: false, 
};

class Welcome extends Component {
  state = initialState;

  render() {
    LogBox.ignoreAllLogs(true);
      return (
      <ImageBackground
        source={require('../../assets/splashh.png')}
        style={{ height: height, backgroundColor: "#FFF" }}>
        <ScrollView
          keyboardShouldPersistTaps="always">
          
          <StatusBar backgroundColor="#F4EFEF" barStyle="dark-content"/>
            <View style={styles.headerContainer}>
              <Image source={require('../../assets/logo_.png')} resizeMode={'cover'} marginBottom={5}/>
              <View flexDirection="row">
              <TouchableOpacity onPress={()=> Alert.alert(null,"Shop")}>
              <Text style={styles.headerTextStyle}>Shop{"  "}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> this.props.navigation.navigate("SignIn")}>
              <Text style={styles.headerTextStyle_}>Signup/Signin</Text>
              </TouchableOpacity>
              </View>
              <View style={{ marginVertical: 16, }}>
              <UserIcon/>
              </View>
            </View>
            
            <View style={{ marginVertical: height * 0.2 }}>
              <TextInput style={styles.optionContainer}/>
              <View style={{ bottom: 35, paddingStart: 20 }}>
              <SearchIcon/>
              </View>
            <View flexDirection="row" alignSelf="center" marginTop={10} marginBottom={10}>
            <Text style={styles.infoTextStyle}>The right store with the right price</Text>
            </View>
            </View>
        </ScrollView>
        </ImageBackground>
      );
    }
}


export default Welcome;

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
  optionContainer: {
      borderRadius: 20,
      width: width * 0.9,
      height: 50,
      justifyContent: "space-between",
      marginHorizontal: 16,
      paddingVertical: 10,
      paddingStart: 40,
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
  headerTextStyle: {
    fontSize: 20,
    color: "black",
    alignSelf: "center",
    paddingVertical: 10,
    paddingLeft: Platform.OS === "ios" ? width * 0.2 : width * 0.2,
    // fontFamily: "Nunito_700Bold",
    opacity: 1,
  },
  headerTextStyle_: {
    fontSize: Platform.OS === "ios" ? 20 : 20,
    color: "black",
    alignSelf: "center",
    paddingLeft: 17,
    width: 100,
    // fontFamily: "Nunito_700Bold",
    opacity: 1,
  },
  infoTextStyle: {
    fontSize: 25,
    color: "black",
    marginTop: 20,
    paddingLeft: 5,
    width: width * 0.6,
    textAlign: "center",
    fontWeight: "500",
    // fontFamily: "Nunito_700Bold",
    opacity: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFFF",
  },
});