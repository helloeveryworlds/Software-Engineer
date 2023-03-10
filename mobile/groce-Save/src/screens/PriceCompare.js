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

class PriceCompare extends Component {
  state = initialState;

  render() {
    LogBox.ignoreAllLogs(true);
    const { name } = this.state;

      return (
        <ScrollView
          keyboardShouldPersistTaps="always" backgroundColor="#FFF">
          
          <StatusBar backgroundColor="#DDDDDD" barStyle="dark-content"/>
              <View style={{ marginVertical: 15 }}>
              <TextInput 
              style={styles.optionContainer}
              onChangeText={(value) => this.setState({ name: value })}
              />
              <View style={{ bottom: 35, paddingStart: width * 0.16 }}>
              <SearchIcon/>
              </View>
              {/* <Text style={{ marginStart: 25,}}>
              <Text style={styles.count}>{"  "}Banana X{"  "}</Text><Text style={{ backgroundColor: "#FFF" }}> : 0</Text>
              </Text> */}

              <Text style={styles.infoTextStyle}>Result:</Text>
              <View
                width={width * 0.9} 
                height={1.5} 
                backgroundColor={"#DDD"} 
                alignSelf={"center"} 
                marginVertical={15}
                />
            <View style={styles.itemContainer}>
            <Text style={styles.best}>Best</Text>
            <Image 
                source={require("../../assets/fru.png")}
                style={{
                    resizeMode: 'center',
                    marginTop: -40,
                    alignSelf: "center",
                    paddingVertical: 10,
                }}
                />
            <View style={styles.details}>
            <Text style={styles.textDetails}>Banana</Text>
            <Text style={styles.numDetails}>$0.71/LB</Text>
            <Text style={styles.soldDetails}>Sold by <Text style={styles.locDetails}>Target</Text></Text>
            </View>
            <TouchableOpacity
                style={styles.itemBtn}
                onPress={()=> Alert.alert(null,"Details of Banana")}>
                <Text style={styles.itemBtnDetails}>Details</Text>
            </TouchableOpacity>
            </View>
            
            <View style={styles.itemContainer}>
            <Image 
                source={require("../../assets/fru.png")}
                style={{
                    resizeMode: 'center',
                    marginTop: -40,
                    alignSelf: "center",
                    paddingVertical: 20,
                }}
                />
            <View style={styles.details}>
            <Text style={styles.textDetails}>Banana</Text>
            <Text style={styles.numDetails}>$0.71/LB</Text>
            <Text style={styles.soldDetails}>Sold by <Text style={styles.locDetails}>Target</Text></Text>
            </View>
            <TouchableOpacity
                style={styles.itemBtn}
                onPress={()=> Alert.alert(null,"Details of Banana")}>
                <Text style={styles.itemBtnDetails}>Details</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.itemContainer}>
            <Image 
                source={require("../../assets/fru.png")}
                style={{
                    resizeMode: 'center',
                    marginTop: -40,
                    alignSelf: "center",
                    paddingVertical: 20,
                }}
                />
            <View style={styles.details}>
            <Text style={styles.textDetails}>Banana</Text>
            <Text style={styles.numDetails}>$0.71/LB</Text>
            <Text style={styles.soldDetails}>Sold by <Text style={styles.locDetails}>Target</Text></Text>
            </View>
            <TouchableOpacity
                style={styles.itemBtn}
                onPress={()=> Alert.alert(null,"Details of Banana")}>
                <Text style={styles.itemBtnDetails}>Details</Text>
            </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
      );
    }
}


export default PriceCompare;

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
    width: 45,
    position: "absolute",
    right: -20,
    top: -10
  },
  count: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 11,
    width: width * 0.3,
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
  itemBtn: {
    backgroundColor: "#1B6EBB",
    width: width * 0.35,
    height: 40,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? -10: 10,
  },
  itemBtnDetails: {
    fontSize: 18,
    padding: 6,
    textAlign: "center",
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