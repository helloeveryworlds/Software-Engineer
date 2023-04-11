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
import DetailsIcon from "../../assets/svgs/details";
import LocationIcon from "../../assets/svgs/location";
import TimedIcon from "../../assets/svgs/timed";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");

const initialState = { 
  isLoading: false, 
  name: "",
  email: "",
  zipcode: "",
  address: ""
};

class UserInfo extends Component {
  state = initialState;

  _retrieveData = () => {
    AsyncStorage.getItem("userDetails").then((res) => {
      const response = JSON.parse(res);
      if (res !== null) {
        console.log("Response...", response.data);
        this.setState({
          name: response.data.name,
          email: response.data.email,
          zipcode: response.data.zipCode,
          address: response.data.address
        });

  
      } else {
        console.log("No response...", response);
      }
    });
  }

  componentDidMount(){
    this._retrieveData();
  }
  
  render() {
    LogBox.ignoreAllLogs(true);
    const { name,
            email,
            zipcode,
            address 
          } = this.state;

      return (
        <ScrollView
          keyboardShouldPersistTaps="always" backgroundColor="#FFF">
          
          <StatusBar backgroundColor="#F4EFEF" barStyle="dark-content"/>
              <View style={{ marginVertical: 15 }}>
              <View style={{ flexDirection: "row" }}>
              <View style={{ marginTop: 50, }}>
                <View style={{ paddingVertical: 20, }}>
                <DetailsIcon/>
                </View>

                <View style={{ paddingVertical: 20, }}>
                <LocationIcon/>
                </View>

                <View style={{ paddingVertical: 20, }}>
                <TimedIcon/>
                </View>
              </View>

              <View
                width={1.5} 
                height={height * 0.9} 
                backgroundColor={"#DDD"} 
                alignSelf={"flex-start"} 
                />
                <View style={{ marginTop: 15 }}>
                <Text style={styles.infoTextStyle}>ADDRESS</Text>

                <View style={{ marginHorizontal: 10, marginTop: 30, width: width * 0.5 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginStart: 10, }}>
                <Text style={styles.userDetails}>Zip code:</Text>
                {zipcode ? <Text style={styles.userDetails_}>{zipcode}</Text> : <Text style={styles.userDetails_}>nil</Text>}
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginStart: 10, marginTop: 20, }}>
                <Text style={styles.userDetails}>Address:</Text>
                {address ? <Text style={styles.userDetails_}>{address}</Text> : <Text style={styles.userDetails_}>nil</Text>}
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginStart: 10, marginTop: 20, }}>
                <Text style={styles.userDetails}>Email:</Text>
                {email ? <Text style={styles.userDetails_}>{email}</Text> : <Text style={styles.userDetails_}>nil</Text>}
                </View>
                </View>

                <View style={{ flexDirection: "row", alignSelf: "center", justifyContent: "space-between", width: width * 0.5, marginStart: 30, marginTop: 50 }}>
                  <TouchableOpacity
                      style={styles.itemBtnBlue}
                      onPress={()=> Alert.alert(null,"Save")}>
                      <Text style={styles.itemBtnDetails}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.itemBtnGreen}
                      onPress={()=> Alert.alert(null,"Update")}>
                      <Text style={styles.itemBtnDetails}>Update</Text>
                  </TouchableOpacity>
                </View>
                </View>
                </View>
            </View>
        </ScrollView>
      );
    }
}


export default UserInfo;

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
  best: {
    backgroundColor: "#EFDB6F",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 11,
    width: 50,
    position: "absolute",
    right: -20,
    top: -10
  },
  itemContainer: {
    backgroundColor: "#F6F6F6",
    borderRadius: 30,
    width: width * 0.6,
    height: height * 0.35,
    marginTop: 30,
    padding: 20,
    alignSelf: "center",
  },
  itemBtnGreen: {
    backgroundColor: "#52A860",
    width: width * 0.22,
    height: 40,
    alignSelf: "center",
    marginTop: 10,
    marginStart: 25,
  },
  itemBtnBlue: {
    backgroundColor: "#25B8D9",
    width: width * 0.22,
    height: 40,
    alignSelf: "center",
    marginTop: 10,
    marginEnd: 25,
  },
  itemBtnDetails: {
    fontSize: 18,
    padding: 6,
    textAlign: "center",
  },
  userDetails: {
    fontSize: 18,
    padding: 6,
    width: width * 0.25,
    textAlign: "left",
  },
  userDetails_: {
    fontSize: 18,
    padding: 6,
    width: width * 0.45,
    textAlign: "left",
  },
  details: {
    marginTop: -30, 
    marginHorizontal: 20
  },
  textDetails: {
    fontSize: 14,
  },
  numDetails: {
    fontSize: 14,
  },
  soldDetails: {
    fontSize: 14,
    marginBottom: 17,
  },
  locDetails: {
    fontSize: 14,
    color: "#1A3CF1",
    textDecorationLine: "underline",
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
    opacity: 1,
  },
  infoTextStyle: {
    fontSize: 25,
    color: "black",
    paddingLeft: 25,
    textAlign: "left",
    fontWeight: "400",
    opacity: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFFF",
  },
});