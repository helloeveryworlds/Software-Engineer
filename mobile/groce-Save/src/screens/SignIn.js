import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  StatusBar,
  Alert,
  Dimensions,
  LogBox,
  Platform
} from "react-native";
import groceSaveService from ".././service/GroceSaveService";
import { FontAwesome } from "@expo/vector-icons";
import  Loader  from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import { useDispatch, useSelector } from "react-redux";
import { login,logout } from "../reducers/LoginReducer";

const { width, height } = Dimensions.get("window");

const SignIn = ({ route, navigation }) => {
  const loginInfo = useSelector((state) => state.login.login);
  console.log("loginInfo loginInfo loginInfo",loginInfo)
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [us, setUs] = useState("");
  const [password, setPassword] = useState("");
  const [pa, setPa] = useState("");
  const [token, setToken] = useState("");
  const [embu, setEmbu] = useState("");
  const [correct, setCorrect] = useState(false);
  const [correctPassword, setcorrectPassword] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const usernameInput = useRef();
  
  const handleUsername = (username) => {
    if(username != ""){
        setUsername(username);
        setEmbu("");
        setUs("");
        validate(username);
      }else{
        setUsername(username);
        setEmbu("empty");
        setUs("empty");
      }
  };

  const handlePassword = (password) => {  
    if(password != ""){
        setPassword(password);
        setPa("");
        validatePassword(password);
    }else {
        setPassword(password);
        setPa("empty");
    } 
  };

  const validatePassword = (password) => {
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(regularExpression.test(password) === false){
        setPassword(password);
        setPa("empty");
        setcorrectPassword(false);
      console.log("Password is Not Correct");
      return false;
    } else {
        setPassword(password);
        setPa("");
        setcorrectPassword(true);
      console.log("Password is Correct");
      return true;
    }
  }

  const validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      setUsername(text);
      setCorrect(false);
      return false;
    }
    else {
      setUsername(text);
      setCorrect(true);
      console.log("Email is Correct");
    }
  }

  const onPressLogin = () => {
    setIsLoading(true);
    
    if(username == ""){
      setIsLoading(false);
      setUs("empty");
    }else if(username != "" && embu == "empty" && !correct){
      setIsLoading(false);
      setEmbu("empty");
    }else if(password == ""){
        setIsLoading(false);
        setPa("empty");
    }else if(password != "" && pa == "empty" && !correctPassword){
        setIsLoading(false);
        setPa("empty");
    }else{
    const payload = { username, password };
    submitSignIn(payload);
    }
  } 

  const submitSignIn = (payload) => {
    setIsLoading(false);
    
      console.log(payload);
    
      const onSuccess = ( data ) => {
        // insert into db...
        _storeData(data.data);
        dispatch(login(data.data));

        setIsLoading(false);
        console.log("Dataaa",data.data);
        if (data.status == 200){
          Alert.alert(null, "Login successfully", [{
            text: 'Ok', onPress: () => navigation.navigate("Welcome")
          }])
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
          Alert.alert('Info: ','Invalid Credentials')
        } else if(error.response.status == 500){
          setIsLoading(false);
          Alert.alert('Info: ','Ensure your Network is Stable')
        } else if(error.response.status == 401){
          setIsLoading(false);
          Alert.alert(null,"Unauthorized")
        } else if(error.response.status == 404){
          setIsLoading(false);
          Alert.alert('Info: ','Not found')
        }
        setIsLoading(false);
      };
    
      setIsLoading(true);
       groceSaveService
        .post(`/login?username=${payload.username}&password=${payload.password}`)
        .then(onSuccess)
        .catch(onFailure);
    }

  const removeItemValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  }

  const _storeData = async (value) => {
    await removeItemValue("userDetails");
    try {
      await AsyncStorage.setItem("userDetails", JSON.stringify(value));

    } catch (error) {
    }
    console.log("This is for storing data...", value);
  };

    const updateSecureTextEntry = () => {
        setSecureTextEntry(!secureTextEntry)
    } 

    LogBox.ignoreAllLogs(true);
    return (
      <ImageBackground
        source={require("./../../assets/splashh.png")}
        style={styles.image}>
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
          
          <StatusBar backgroundColor="#F4EFEF" barStyle="dark-content"/>
          <Loader loading={isLoading} />
            <View>
            <Text style={styles.displayTextStyle}>Signin</Text>
            <View style={styles.usernameTextStyleView}>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>  

              <TextInput
                backgroundColor={"#F4EFEF"}
                borderWidth = {1}
                borderColor={us == "empty" || !correct && username != "" ? 'red' : "transparent"}
                width = {width * 0.81}
                height= {56}
                textAlign = "left"
                paddingTop = {8}
                paddingBottom ={8}
                paddingStart ={15}
                paddingEnd= {22}
                opacity= {1}
                fontSize={16}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder={"Email"}
                placeholderTextColor={"#979797"}
                autoFocus={true}
                returnKeyType="next"
                onSubmitEditing={() => usernameInput.current.focus()}
                blurOnSubmit={false}
                value={username}
                onChangeText={handleUsername}
              />
              </View>
              {us == "empty" && username == "" && <Text style={styles.invalidEmailTextStyle}>E-mail is empty</Text>}
              {!correct && username != "" && <Text style={styles.invalidEmailTextStyle}>E-mail is not correct</Text>}
            </View>
            
            <View style={styles.passwordTextStyleView}>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <View style={{flexDirection: "row", }}>
              <TextInput
                backgroundColor={"#F4EFEF"}
                borderWidth = {1}
                fontSize={16}
                borderColor={pa == "empty" ? 'red' : "transparent"}
                width= {width * 0.81}
                height= {56}
                paddingTop = {8}
                paddingBottom = {8}
                paddingStart ={15}
                paddingEnd= {35}
                opacity= {1}
                placeholder={"Password"}
                placeholderTextColor={"#979797"}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                ref={usernameInput}
                value={password}
                secureTextEntry={secureTextEntry?true:false}
                onChangeText={handlePassword}
              />

              {password ? 
              <TouchableOpacity 
              onPress={updateSecureTextEntry.bind(this)}>
                {secureTextEntry ?
                <View
                style={{alignSelf: "flex-end", right: 33, marginTop: 20, }}>
                  <FontAwesome
                    name="eye"
                    size={16}/>
                </View>
                 :
                 <View
                 style={{alignSelf: "flex-end", right: 33, marginTop: 20, }}>
                  <FontAwesome
                    name="eye-slash"
                    size={16}/>
                 </View>
                }
                
              </TouchableOpacity> : null} 
              </View>
              </View>
              {!correctPassword && pa == "empty" && password != "" && <Text style={styles.invalidPasswordTextStyle}>Password is not strong</Text>}
              {pa == "empty" && password == "" && <Text style={styles.invalidEmailTextStyle}>Password is empty</Text>}
              {!correctPassword && pa == "empty" && password != "" &&
              <BarPasswordStrengthDisplay
                  password={password}
                  width= {width * 0.81}
                  alignSelf={"center"}
                  marginTop={5}
                />}

              {!correctPassword && pa == "empty" &&
              <View style={{ backgroundColor: "#FFFFFF97", marginTop: 16, width: width * 0.81 }}>
                <Text style={styles.invalidPasswordInfoStyle}>Password must contain a capital letter from A-Z</Text>
                <Text style={styles.invalidPasswordInfoStyle}>Password must contain small letters from a-z</Text>
                <Text style={styles.invalidPasswordInfoStyle}>Password must contain a number from 0-9</Text>
                <Text style={styles.invalidPasswordInfoStyle}>Password must be greater than 5 characters</Text>
                <Text style={styles.invalidPasswordInfoStyle}>Password must contain a symbol from !, @, #, $, %, ^, &, *</Text>
              </View>}
              </View>
            
            <TouchableOpacity
                onPress={()=> onPressLogin()}
                style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#52A860", marginBottom: 5, opacity: 1, marginTop: 60,  }}>
                <Text style={styles.loginButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ForgotPassword")
                }>             
              <Text style={styles.forgetTextStyle}>Forgot your Password? </Text>
              </TouchableOpacity>

            <View flexDirection="row" alignSelf="center" marginTop={10} marginBottom={10}>
            <Text style={styles.dontHaveAccountTextStyle}>Other issues{" "}</Text>
            <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SignUp")
                }>
            <Text style={styles.dontHaveAccountMintTextStyle}>with Sign up</Text>
            </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
     </ImageBackground>
  );
}

export default SignIn ;

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
    height:  Platform.OS === "ios" ? height : height
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
  headerTextStyle_: {
    fontSize: Platform.OS === "ios" ? 20 : 20,
    color: "black",
    alignSelf: "center",
    paddingEnd: 10,
    paddingVertical: Platform.OS === "ios" ? 10 : 10,
    opacity: 1,
  },
  displayTextStyle: {
    fontSize: Platform.OS === "ios" ? 22 : 22,
    color: "black",
    alignSelf: "center",
    paddingEnd: 10,
    fontWeight: "600",
    paddingVertical: 10,
    marginTop: 35,
    marginBottom: 40,
    opacity: 1,
  },
  usernameTextStyle: {
    fontSize: 12,
    color: "#002A14",
    textAlign: "left",
    paddingBottom: 5,
    paddingLeft: 5,
    opacity: 1,
    fontWeight: "400",
  },
  welcomeTextStyle: {
    fontSize: 20,
    color: "black",
    alignSelf: "center",
    paddingLeft: 5,
    marginTop: 15,
    fontFamily: "Nunito_700Bold",
    opacity: 1,
  },
  usernameTextStyleView: {
    marginTop: Platform.OS === "ios" ? 15 : 15,
    alignSelf: "center",
  },
  passwordTextStyleView: {
    marginTop: Platform.OS === "ios" ? 30 : 30,
    alignSelf: "center",
    alignItems: "center"
  },
  passwordTextStyle: {
    fontSize: 12,
    color: "#002A14",
    textAlign: "left",
    paddingBottom: 5,
    paddingLeft: 5,
    opacity: 1,
    fontWeight: "400",
  },
  invalidEmailTextStyle: {
    fontSize: 12,
    color: "#FF0000",
    backgroundColor: "pink",
    alignSelf: "flex-start",
    paddingLeft: 5,
    textAlign: "left",
    opacity: 1,
    top: 5,
  },
  invalidPasswordTextStyle: {
    fontSize: 12,
    color: "#FF0000",
    backgroundColor: "pink",
    alignSelf: "flex-start",
    paddingLeft: 5,
    marginLeft: 10,
    textAlign: "left",
    opacity: 1,
    top: 5,
  },
  invalidPasswordInfoStyle: {
    fontSize: 12,
    color: "#FF0000",
    backgroundColor: "pink",
    alignSelf: "flex-start",
    paddingLeft: 5,
    marginBottom: 5,
    textAlign: "left",
    opacity: 1,
  },
  linearGradient: {
    flex: 1,
    height: 88,
    width: width,
  },
  checkBoxStyle: {
    borderColor: "#fff",
  },
  footer: {
    width: width * 0.6,
    marginTop: 5,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  forgetTextStyle: {
    fontSize: Platform.OS === "ios" ? 16 : 16,
    color: "#52A860",
    marginEnd: 25,
    textAlign: "right",
    marginTop: 5, 
    marginBottom: 2,
    fontWeight: "600"
  },
  dontHaveAccountTextStyle: {
    fontSize: Platform.OS === "ios" ? 16 : 16,
    color: "#FFF",
    marginBottom: 1,
    opacity: 1,
    marginStart: 5,
    fontWeight: "700",
    alignSelf: "center",
  },
  dontHaveAccountMintTextStyle: {
    fontSize: Platform.OS === "ios" ?  16 : 16,
    color: "#52A860",
    marginBottom: 1,
    fontWeight: "700",
    opacity: 1,
    alignSelf: "center",
  },
  buttonView: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    alignSelf: "center",
    flexDirection: "row",
    marginBottom: 5,
    height: 40,
    width: width * 0.81,
  },
  loginButton: {
    backgroundColor: "#002A14",
    padding: 8,
    width: width * 0.8,
    alignItems: "center",
    borderColor: "white",
    borderRadius: 8,
  },
  signUpButton: {
    backgroundColor: "#ffffff",
    padding: 15,
    width: width * 0.35,
    left: 15,
    borderColor: "#ffffff",
    borderRadius: 1,
    opacity: 1,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
    alignItems: "center",
    padding: 5,
    fontWeight: "400",
    fontSize: Platform.OS === "ios" ? 20 : 20,
  },
  signUpButtonText: {
    color: "#4848FF",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  errorMessageContainerStyle: {
    backgroundColor: "#fee8e6",
    borderRadius: 4,
    left: 150,
    bottom: 75,
    alignContent: "flex-start",
    width: 170,
  },
  errorMessageTextStyle: {
    color: "#db2828",
    textAlign: "center",
    fontSize: 12,
  },
});