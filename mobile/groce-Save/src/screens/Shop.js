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
  name: "",
};

class Shop extends Component {
  state = initialState;

  render() {
    LogBox.ignoreAllLogs(true);
    const { name } = this.state;

      return (
        <ScrollView
          keyboardShouldPersistTaps="always" backgroundColor="#FFF">
          
          <StatusBar backgroundColor="#DDDDDD" barStyle="dark-content"/>
              <View style={{ marginVertical: 5 }}>
              <TextInput 
              style={styles.optionContainer}
              onChangeText={(value) => this.setState({ name: value })}
              />
              <View style={{ bottom: 35, paddingStart: width * 0.16 }}>
              <SearchIcon/>
              </View>
              <Text style={styles.infoTextStyle}>Categories</Text>
              <View
                width={width * 0.9} 
                height={1.5} 
                backgroundColor={"#DDD"} 
                alignSelf={"center"} 
                marginVertical={15}
                />
            {name == "" ? 
            <View>
            <Image 
                source={require("../../assets/item.png")}
                style={{
                    resizeMode: 'center',
                    width: width * 0.9,
                    height: height * 0.4,
                    borderRadius: 8 / 2,
                    alignSelf: "center",
                    marginTop: 10
                }}
                />

            <Image 
                source={require("../../assets/item2.png")}
                style={{
                    resizeMode: 'center',
                    width: width * 0.9,
                    height: height * 0.4,
                    borderRadius: 8 / 2,
                    alignSelf: "center",
                    marginTop: 10
                }}
                />

            <Image 
                source={require("../../assets/item3.png")}
                style={{
                    resizeMode: 'center',
                    width: width * 0.9,
                    height: height * 0.4,
                    borderRadius: 8 / 2,
                    alignSelf: "center",
                    marginTop: 10
                }}
                />

            <Image 
                source={require("../../assets/item4.png")}
                style={{
                    resizeMode: 'center',
                    width: width * 0.9,
                    height: height * 0.4,
                    borderRadius: 8 / 2,
                    alignSelf: "center",
                    marginVertical: 10
                }}
                />
            </View> : name == "Fruit" ? 
            <TouchableOpacity
                onPress={()=> this.props.navigation.navigate("ItemList")}>
                <Image 
                source={require("../../assets/item2.png")}
                style={{
                    resizeMode: 'center',
                    width: width * 0.9,
                    height: height * 0.4,
                    borderRadius: 8 / 2,
                    alignSelf: "center",
                    marginTop: 10
                }}
                />
            </TouchableOpacity>
             : null}
            </View>
        </ScrollView>
      );
    }
}


export default Shop;

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
      width: width * 0.7,
      height: 50,
      alignSelf: "center",
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
    fontSize: 25,
    color: "black",
    marginTop: 5,
    paddingLeft: 25,
    textAlign: "left",
    fontWeight: "700",
    // fontFamily: "Nunito_700Bold",
    opacity: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFFF",
  },
});