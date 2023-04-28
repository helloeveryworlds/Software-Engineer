import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  LogBox,
  Alert,
  TextInput,
  Platform
} from "react-native";
import groceSaveService from ".././service/GroceSaveService";
import DetailsIcon from "../../assets/svgs/details";
import LocationIcon from "../../assets/svgs/location";
import TimedIcon from "../../assets/svgs/timed";
import  Loader  from '../components/Loader';
import { useDispatch, useSelector } from "react-redux";
import { login, updateLogin } from "../reducers/LoginReducer";

const { width, height } = Dimensions.get("window");

const UserInfo = ({ navigation }) => { 
const dispatch = useDispatch();
const loginInfo = useSelector((state) => state.login.login);

const [ isLoading, setIsLoading ] = useState(false);
const [ update, setUpdate ] = useState(false);
const [ us, setUs ] = useState("");
const [ zip, setZip ] = useState("");
const [addressText, onChangeAddressText] = React.useState(loginInfo[0].address);
const [zipCodeText, onChangeZipCodeText] = React.useState(loginInfo[0].zipCode);

const zipCodeInput = useRef();

const updateUserDetails = () => {
const check = zipCodeCheck(zipCodeText);
console.log("Zipcode..................",check);

  if(zipCodeText == ""){
    setIsLoading(false);
    setZip("empty");
  }else if(zipCodeText != "" && !check){
    setIsLoading(false);
    setZip("empty");
  }else if(addressText == ""){
    setIsLoading(false);
    setUs("empty");
  }else{
  const onSuccess = ( data ) => {
    let newItem = [];
    newItem.push({
      address : addressText,
      cart: loginInfo.cart,
      email: loginInfo.email,
      enable: loginInfo.enable,
      name: loginInfo.name,
      password: loginInfo.password,
      zipCode: zipCodeText
    })

    // dispatch(login(newItem));
    dispatch(updateLogin(newItem));

    setZip("");
    setUs("");
    setIsLoading(false);
    if (data.status == 200){
    Alert.alert(null, "Your details have been updated successfully!", [{
      text: 'Ok', onPress: () => setUpdate(false)
    }]);
    }
  };

  const onFailure = (error) => {
    console.log(error && error.response);
      setIsLoading(false);
    if(error.response == null){
      setIsLoading(false);
      Alert.alert('Info: ','Network Error')
    }
    if(error.response.status == 400){
      setIsLoading(false);
      Alert.alert('Info: ',"Something went wrong, Please try again")
    } else if(error.response.status == 500){
      setIsLoading(false);
      Alert.alert('Info: ','Ensure your Network is Stable')
    } else if(error.response.status == 401){
      setIsLoading(false);
      Alert.alert(null,error.response.data)
    } else if(error.response.status == 404){
      setIsLoading(false);
      Alert.alert('Info: ','Not found')
    }
  };

    groceSaveService
      .post(`/update?address=${addressText}&zipcode=${zipCodeText}`)
      .then(onSuccess)
      .catch(onFailure);
    }
  }

  const zipCodeCheck = (zipCode) => {
    return /^[0-9]+$/.test(zipCode);
  }

    LogBox.ignoreAllLogs(true);
      return (
        <ScrollView
          keyboardShouldPersistTaps="always" backgroundColor="#FFF">
          
          <StatusBar backgroundColor="#F4EFEF" barStyle="dark-content"/>
            <Loader loading={isLoading}/>
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
                {update ? 
                <TextInput 
                  placeholder="zipcode"
                  autoFocus={true}
                  returnKeyType="next"
                  onSubmitEditing={() => zipCodeInput.current.focus()}
                  blurOnSubmit={false}
                  value={zipCodeText}
                  style={{
                    fontSize: 18,
                    padding: 4,
                    width: width * 0.35,
                    textAlign: "left",
                    borderWidth: 1,
                    borderColor: !zipCodeCheck(zipCodeText) && zipCodeText != "" ? "pink" : "transparent",
                    backgroundColor: zip == "empty" && zipCodeText == "" ? "pink" : "transparent"
                  }}
                  onChangeText={onChangeZipCodeText}
                  /> :
                <View>
                {loginInfo.length != 0 ? <Text style={styles.userDetails_}>{loginInfo[0].zipCode}</Text> : <Text style={styles.userDetails_}>nil</Text>}
                </View> }
                </View>
                {zip == "empty" && zipCodeText == "" && <Text style={styles.invalidZTextStyle}>Zip code is empty</Text>}
                {!zipCodeCheck(zipCodeText) && zipCodeText != "" && <Text style={styles.invalidEmailTextStyle}>Zip code is not numeric</Text>}

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginStart: 10, marginTop: 20, }}>
                <Text style={styles.userDetails}>Address:</Text>
                {update ? 
                <TextInput 
                  placeholder="address"
                  style={{
                    fontSize: 18,
                    padding: 4,
                    width: width * 0.35,
                    textAlign: "left",
                    borderWidth: 1,
                    borderColor:  us == "empty" && addressText == "" ? "pink" : "transparent",
                    backgroundColor: us == "empty" && addressText == "" ? "pink" : "transparent"
                  }}
                  onChangeText={onChangeAddressText}
                  ref={zipCodeInput}
                  value={addressText}
                  /> :
                 <View>
                {loginInfo.length != 0 ? <Text style={styles.userDetails_}>{loginInfo[0].address}</Text> : <Text style={styles.userDetails_}>nil</Text>}
                </View>}
                </View>
                {us == "empty" && addressText == "" && <Text style={styles.invalidETextStyle}>Address is empty</Text>}


                <View style={{ flexDirection: "row", justifyContent: "space-between", marginStart: 10, marginTop: 20 }}>
                <Text style={styles.userDetailsE}>Email:</Text>
                {loginInfo.length != 0 ? <Text style={styles.userDetailsEmail}>{loginInfo[0].email}</Text> : <Text style={styles.userDetails_}>nil</Text>}
                </View>
                </View>
                <View style={{ alignContent: "center", width: width * 0.78, marginTop: 20 }}>
                   {update ? 
                   <TouchableOpacity
                      style={styles.itemBtnBlue}
                      onPress={()=> updateUserDetails()}>
                      <Text style={styles.itemBtnDetails}>Save</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                      style={styles.itemBtnGreen}
                      onPress={()=>  setUpdate(true)}>
                      <Text style={styles.itemBtnDetails}>Update</Text>
                  </TouchableOpacity>}
                  </View>
                </View>
                </View>
            </View>
        </ScrollView>
      );
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
  invalidEmailTextStyle: {
    fontSize: 8,
    color: "#FF0000",
    backgroundColor: "pink",
    alignSelf: "flex-end",
    paddingHorizontal: 3,
    left: 15,
    textAlign: "right",
    opacity: 1,
    top: 5,
  },
  invalidETextStyle: {
    fontSize: 8,
    color: "#FF0000",
    backgroundColor: "pink",
    alignSelf: "flex-end",
    paddingHorizontal: 3,
    textAlign: "right",
    opacity: 1,
    right: 10,
    top: 5,
  },
  invalidZTextStyle: {
    fontSize: 8,
    color: "#FF0000",
    backgroundColor: "pink",
    alignSelf: "flex-end",
    paddingHorizontal: 3,
    textAlign: "right",
    opacity: 1,
    right: 7,
    top: 5,
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
    width: width * 0.4,
    height: 40,
    alignSelf: "center",
    marginTop: 10,
  },
  itemBtnBlue: {
    backgroundColor: "#25B8D9",
    width: width * 0.4,
    height: 40,
    alignSelf: "center",
    marginTop: 10,
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
  userDetailsEdit: {
    fontSize: 18,
    padding: 4,
    width: width * 0.35,
    textAlign: "left",
  },
  userDetails_: {
    fontSize: 18,
    padding: 6,
    width: width * 0.45,
    textAlign: "left",
  },
  userDetailsE: {
    fontSize: 18,
    padding: 6,
    width: width * 0.25,
    textAlign: "left",
    backgroundColor: "#DDDDDD"
  },
  userDetailsEmail: {
    fontSize: 18,
    padding: 6,
    width: width * 0.4,
    textAlign: "left",
    backgroundColor: "#DDDDDD"
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