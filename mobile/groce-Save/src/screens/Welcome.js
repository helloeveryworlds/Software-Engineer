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
import GitHubIcon from "../../assets/svgs/github"
import Loader from "../components/Loader";

const { width, height } = Dimensions.get("window");

const initialState = { 
  isLoading: false, 
};

class Welcome extends Component {
  state = initialState;

  render() {
    LogBox.ignoreAllLogs(true);
      return (
      <ScrollView
          keyboardShouldPersistTaps="always">
        <ImageBackground
          source={require('../../assets/splashh.png')}
          style={{ height: height, backgroundColor: "#FFF" }}>
          <Loader loading={this.state.isLoading} />
          
          <StatusBar backgroundColor="#DDDDDD" barStyle="dark-content"/>
            <View style={{ marginVertical: height * 0.2 }}>
              <TextInput style={styles.optionContainer}/>
              <View style={{ bottom: 35, paddingStart: 20 }}>
              <SearchIcon/>
              </View>
            <View flexDirection="row" alignSelf="center" marginTop={10} marginBottom={10}>
            <Text style={styles.infoTextStyle}>The right store with the right price</Text>
            </View>
            </View>
          </ImageBackground>
        <View  style={{ height: height, backgroundColor: "#F4EFEF", padding: 25 , marginBottom: Platform.OS === "ios" ? 100 : 10 }}>
        <Text style={styles.bigText}>Shop</Text>
          <View
            width={90} 
            height={4} 
            marginLeft={5}
            backgroundColor={"#E91E63"} 
            alignSelf={"flex-start"} 
            marginVertical={5}
            />
        <TouchableOpacity onPress={()=> this.props.navigation.navigate("Shop")}>
        <Text style={styles.smallText_}>Shopping Page</Text>
        </TouchableOpacity>
        <Text style={styles.bigText}>Students</Text>
        <View
            width={90} 
            height={4} 
            marginLeft={5}
            backgroundColor={"#E91E63"} 
            alignSelf={"flex-start"} 
            marginVertical={5}
            />
        <Text style={styles.smallText}>Ratan J Naik</Text>
        <Text style={styles.smallText}>Fuhao Ruan</Text>
        <Text style={styles.smallText}>Chibundom Ejimuda</Text>
        <Text style={styles.smallText}>Zijie Wang</Text>
        <Text style={styles.smallText}>Zheng Zhang</Text>
        <Text style={styles.smallText}>Bauyrzhan Kussayev</Text>
        <Text style={styles.smallText}>Qiwei Li</Text>
        <Text style={styles.smallText_}>Shweta Mishra</Text>

        <Text style={styles.bigText}>Boss Mode</Text>
        <View
            width={90} 
            height={4} 
            backgroundColor={"#E91E63"} 
            alignSelf={"flex-start"} 
            marginTop={5}
            marginLeft={5}
            marginBottom={20}
            />
        <GitHubIcon/>
        </View>
        </ScrollView>
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
  bigText:{
    fontSize: 36,
    fontWeight: "400",
    marginTop: 10,
    lineHeight: 43.57,
  },
  smallText:{
    fontSize: 24,
    fontWeight: "400",
    marginTop: 10,
    lineHeight: 29.05,
  },
  smallText_:{
    fontSize: 24,
    fontWeight: "400",
    marginTop: 10,
    lineHeight: 29.05,
    marginBottom: 40
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
    fontSize: 26,
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