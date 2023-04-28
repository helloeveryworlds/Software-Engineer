import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Dimensions,
  LogBox,
  ImageBackground,
  Platform
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import groceSaveService from "../service/GroceSaveService";
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import  Loader  from '../components/Loader';

const { width, height } = Dimensions.get("window");

const initialState = {
  email: "",
  em: "",
  ad: "",
  us: "",
  username: "",
  password: "", 
  pa: "",
  name: "",
  zc: "",
  address: "",
  zipCode: "",
  correct: false,
  correctPassword: false,
  isLoading: false, 
  secureTextEntry: true,
};

class SignUp extends Component {
  state = initialState;

  handleEmail = (email) => {
    if(email != ""){
      this.validate(email);
      this.setState({ email: email, em: "" });
    }else {
      this.setState({ email: email, em: "empty" });
    }
  };

  handlePassword = (password) => {  
    if(password != ""){
      this.setState({ password: password, pa: "" });
      this.validatePassword(password);
    }else {
      this.setState({ password: password, pa: "empty" });
    } 
  };

  handleName = (name) => {  
    if(name != ""){
        this.setState({ name: name, us: ""});
    }else{
        this.setState({ name: name, us: "empty" });
    }
  };

  handleAddress = (address) => {  
    if(address != ""){
      this.setState({ address: address, ad: "" });
    }else {
      this.setState({ address: address, ad: "empty" });
    } 
  };

  handleZipcode = (zipCode) => {  
    if(zipCode != ""){
      this.zipCodeCheck(zipCode);
      this.setState({ zipCode: zipCode, zc: "" });
    }else {
      this.setState({ zipCode: zipCode, zc: "empty" });
    } 
  };

  validatePassword = (password) => {
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if(regularExpression.test(password) === false){
      this.setState({ password: password, correctPassword: false, pa: "empty" });
      console.log("Password is Not Correct");
      return false;
    } else {
      this.setState({ password: password, correctPassword: true, pa: "" });
      console.log("Password is Correct");
      return true;
    }
  }

  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      this.setState({ email: text, correct: false })
      return false;
    }
    else {
      this.setState({ email: text, correct: true })
      console.log("Email is Correct");
    }
  }

  zipCodeCheck = (zipCode) => {
    return /^[0-9]+$/.test(zipCode);
  }

  onPressSubmit() {
    this.setState({ isLoading: true });

    const { email, password, em, name, pa, zipCode, address, correctPassword, correct} = this.state;
    const zipCodeCheck = this.zipCodeCheck(zipCode);

    if(name == ""){
      this.setState({ isLoading: false, us: "empty" });
    }else if(email == ""){
      this.setState({ isLoading: false, em: "empty" });
    }else if(email != "" && em == "empty" && !correct){
        this.setState({ isLoading: false, em: "empty" });
    }else if(password == ""){
      this.setState({ isLoading: false, pa: "empty" });
    }else if(password != "" && pa == "empty" && !correctPassword){
      this.setState({ isLoading: false, pa: "empty" });
    }else if(address == ""){
      this.setState({ isLoading: false, ad: "empty" });
    }else if(zipCode == ""){
      this.setState({ isLoading: false, zc: "empty" });
    }else if(zipCode != "" && !zipCodeCheck){
      this.setState({ isLoading: false, zc: "empty" });
    }else{
      const payload = { email, password, address, name, zipCode };
      this.signUp(payload)
  }
  } 

  signUp(payload){
  this.setState({ isLoading: false });

  console.log(payload);

  const onSuccess = ( data ) => {
    this.setState({ isLoading: false });
    console.log("Dataaa",data);
    if (data.status == 201){
      Alert.alert(null, "Register successfully", [{
        text: 'Ok', onPress: () => this.props.navigation.navigate("SignIn")
      }]);
    }else{
      Alert.alert(null, "Try Again");
    }
  };

  const onFailure = (error) => {
    console.log(error && error.response);
    this.setState({ isLoading: false });
    if(error.response == null){
      this.setState({ isLoading: false });
      Alert.alert('Info: ','Network Error')
    }
    if(error.response.status == 400){
      this.setState({ isLoading: false });
      Alert.alert('Info: ','Invalid Credentials')
    } else if(error.response.status == 500){
      this.setState({ isLoading: false });
      Alert.alert('Info: ','Ensure your Network is Stable')
    } else if(error.response.status == 401){
      this.setState({ isLoading: false });
      Alert.alert(null,"Unauthorized")
    } else if(error.response.status == 404){
      this.setState({ isLoading: false });
      Alert.alert('Info: ','Not found')
    }
    this.setState({ errors: error.response.data, isLoading: false });
  };

  this.setState({ isLoading: true });
   groceSaveService
    .post("/signup", payload)
    .then(onSuccess)
    .catch(onFailure);
  }

  updateSecureTextEntry(){
    this.setState({ secureTextEntry: !this.state.secureTextEntry})
  } 

  render() {
    LogBox.ignoreAllLogs(true);
    const { userType, showCountDown } = this.state;
      return (
      <ImageBackground
        source={require("./../../assets/splashh.png")}
        style={styles.image}
      >
      <ScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps="always">
        
        <StatusBar backgroundColor="#F4EFEF" barStyle="dark-content"/>
        <Loader loading={this.state.isLoading} />
          <View>
          <Text style={styles.displayTextStyle}>CREATE ACCOUNT</Text>
          <View style={styles.emailTextStyleView}>
            <View style={{
              width: width * 0.81,
              height: 54,
              padding: 1,
              borderRadius: 10
            }}>  

            <TextInput
              backgroundColor={"#F4EFEF"}
              borderWidth = {1}
              borderColor={this.state.us == "empty" ? 'red' : "transparent"}
              width = {width * 0.81}
              height= {56}
              // borderRadius = {10}
              textAlign = "left"
              paddingTop = {8}
              paddingBottom ={8}
              paddingStart ={15}
              paddingEnd= {22}
              opacity= {1}
              fontSize={16}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              returnKeyType="next"
              placeholder={"Name"}
              placeholderTextColor={"#979797"}
              onSubmitEditing={() => { this.emailTextInput.focus(); }}
              blurOnSubmit={false}
              value={this.state.name}
              onChangeText={this.handleName}
            />
            </View>
            {this.state.us == "empty" && this.state.name == "" && <Text style={styles.invalidEmailTextStyle}>Name is empty</Text>}
          </View>
          
          <View style={styles.emailTextStyleView}>
            <View style={{
              width: width * 0.81,
              height: 54,
              padding: 1,
              borderRadius: 10
            }}>  

            <TextInput
              backgroundColor={"#F4EFEF"}
              borderWidth = {1}
              borderColor={this.state.em == "empty" || !this.state.correct && this.state.email != "" ? 'red' : "transparent"}
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
              returnKeyType="next"
              placeholder={"Email"}
              placeholderTextColor={"#979797"}
              ref={(input) => { this.emailTextInput = input; }}
              onSubmitEditing={() => { this.passwordTextInput.focus(); }}
              blurOnSubmit={false}
              value={this.state.email}
              onChangeText={this.handleEmail}
            />
            </View>
            {!this.state.correct && this.state.email != "" && <Text style={styles.invalidEmailTextStyle}>E-mail is not correct</Text>}
            {this.state.em == "empty" && this.state.email == "" && <Text style={styles.invalidEmailTextStyle}>E-mail is empty</Text>}
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
              borderColor={this.state.pa == "empty" ? 'red' : "transparent"}
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
              ref={(input) => { this.passwordTextInput = input; }}
              onSubmitEditing={() => { this.addressTextInput.focus(); }}
              value={this.state.password}
              secureTextEntry={this.state.secureTextEntry?true:false}
              onChangeText={this.handlePassword}
            />
            {this.state.password ? 
            <TouchableOpacity 
            onPress={this.updateSecureTextEntry.bind(this)}>
              {this.state.secureTextEntry ?
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
            {!this.state.correctPassword && this.state.pa == "empty" && this.state.password != "" && <Text style={styles.invalidPasswordTextStyle}>Password is not strong</Text>}
            {this.state.pa == "empty" && this.state.password == "" && <Text style={styles.invalidEmailTextStyle}>Password is empty</Text>}

            {!this.state.correctPassword && this.state.pa == "empty" && this.state.password != "" &&
                <BarPasswordStrengthDisplay
                    password={this.state.password}
                    width= {width * 0.81}
                    alignSelf={"center"}
                    marginTop={5}
                  />}
            {!this.state.correctPassword && this.state.pa == "empty" &&
              <View style={{ backgroundColor: "#FFFFFF97", marginTop: 16, width: width * 0.81 }}>
                <Text style={styles.invalidPasswordInfoStyle}>Password must contain a capital letter from A-Z</Text>
                <Text style={styles.invalidPasswordInfoStyle}>Password must contain small letters from a-z</Text>
                <Text style={styles.invalidPasswordInfoStyle}>Password must contain a number from 0-9</Text>
                <Text style={styles.invalidPasswordInfoStyle}>Password must be greater than 5 characters</Text>
                <Text style={styles.invalidPasswordInfoStyle}>Password must contain a symbol from !, @, #, $, %, ^, &, *</Text>
              </View>}
            </View>

          <View style={styles.passwordTextStyleView}>
            <View style={{
              width: width * 0.81,
              height: 54,
              padding: 1,
              borderRadius: 10
            }}>  

            <TextInput
              backgroundColor={"#F4EFEF"}
              borderWidth = {1}
              borderColor={this.state.ad == "empty" ? 'red' : "transparent"}
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
              returnKeyType="next"
              placeholder={"Address"}
              placeholderTextColor={"#979797"} 
              ref={(input) => { this.addressTextInput = input; }}
              onSubmitEditing={() => { this.zipcodeTextInput.focus(); }}
              blurOnSubmit={false}
              value={this.state.address}
              onChangeText={this.handleAddress}
            />
            </View>
            {this.state.ad == "empty" && this.state.address == "" && <Text style={styles.invalidPasswordTextStyle}>Address is empty</Text>}
          </View>

          <View style={styles.emailTextStyleView}>
            <View style={{
              width: width * 0.81,
              height: 54,
              padding: 1,
              borderRadius: 10
            }}>  

            <TextInput
              backgroundColor={"#F4EFEF"}
              borderWidth = {1}
              borderColor={this.state.zc == "empty" ? 'red' : "transparent"}
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
              returnKeyType="next"
              placeholder={"Zip code"}
              placeholderTextColor={"#979797"}
              ref={(input) => { this.zipcodeTextInput = input; }}
              blurOnSubmit={false}
              value={this.state.zipCode}
              onChangeText={this.handleZipcode}
            />
            </View>
            {this.state.zc == "empty" && this.state.zipCode == "" && <Text style={styles.invalidEmailTextStyle}>Zip code is empty</Text>}
            {!this.zipCodeCheck(this.state.zipCode) && this.state.zipCode != "" && <Text style={styles.invalidEmailTextStyle}>Zip code is not numeric</Text>}

          </View>

          <TouchableOpacity
              onPress={this.onPressSubmit.bind(this)}
              style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#52A860", marginBottom: 5, opacity: 1, marginTop: 60,  }}>
              <Text style={styles.loginButtonText}>Submit</Text>
          </TouchableOpacity>
          <View flexDirection="row" alignSelf="center" marginTop={10} marginBottom={10}>
            <Text style={styles.dontHaveAccountTextStyle}>Have an account?{" "}</Text>
            <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("SignIn")
                }>
            <Text style={styles.dontHaveAccountMintTextStyle}>Sign in</Text>
            </TouchableOpacity>
          </View>

          </View>
      </ScrollView>
   </ImageBackground>
    );
  }
}


export default SignUp;

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
    height: Platform.OS === "ios" ? height : height
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
    paddingEnd: 10,
    paddingVertical: 10,
    opacity: 1,
  },
  displayTextStyle: {
    fontSize: Platform.OS === "ios" ? 22 : 22,
    color: "black",
    alignSelf: "center",
    paddingEnd: 10,
    fontWeight: "600",
    paddingVertical: 10,
    marginTop: 30,
    marginBottom: 30,
    opacity: 1,
  },
  emailInput: {
    borderColor: "#EEF4FE",
    backgroundColor: "#EEF4FE",
    borderWidth: 1,
    width: width * 0.85,
    height: 55,
    borderRadius: 20,
    textAlign: "left",
    paddingTop: 15,
    paddingBottom: 17,
    paddingStart: 30,
    paddingEnd: 40,
  },
  reloadIconStyle: {
    fontSize: 20,
    color: "maroon",
    left: 5,
    top: 2,
    alignSelf: "flex-start",
  },
  iconViewStyle: {
      fontSize: 20,
      bottom: 56,
      marginLeft: 0,
      alignSelf: "flex-start",
      backgroundColor: "#507C543D",
      borderColor: "#507C543D",
      height: 56,
      width: 52,
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 16,
  },
  textBgdIconViewStyle: {
    marginLeft: 18,
    alignSelf: "flex-start",
    backgroundColor: "#507C543D",
    height: 56
  },
  passwordInput: {
    borderColor: "#EEF4FE",
    backgroundColor: "#EEF4FE",
    borderWidth: 1,
    width: width * 0.85,
    height: 55,
    borderRadius: 20,
    textAlign: "left",
    paddingTop: 20,
    paddingBottom: 17,
    paddingStart: 30,
    paddingEnd: 22,
    opacity: 1,
  },
  cardStyleLong: {
    marginTop: height * 0.12,
    marginBottom: 10,
    alignSelf: "center",
    width: width * 0.92,
    padding: 15,
    color: "#ffffff",
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    elevation: 5
  },
  textStyle: {
    fontSize: 25,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: -0.35,
  },
  textStyle_: {
    fontSize: 25,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: -0.35,
  },
  textStyleView: {
    justifyContent: "center",
    top: 20,
    borderColor: "white",
    borderWidth: 2,
    padding: 7,
  },
  emailTextStyle: {
    fontSize: 12,
    color: "#002A14",
    fontFamily: "Nunito_400Regular",
    textAlign: "left",
    paddingBottom: 5,
    paddingLeft: 5,
    opacity: 1,
    fontWeight: "400",
  },
  welcomeTextStyle: {
    fontSize: 20,
    color: "maroon",
    alignSelf: "center",
    paddingLeft: 5,
    marginVertical: 15,
    fontFamily: "Nunito_700Bold",
    opacity: 1,
  },
  emailTextStyleView: {
    marginTop: Platform.OS === "ios" ? 15 : 15,
    alignSelf: "center",
  },
  passwordTextStyleView: {
    marginTop: Platform.OS === "ios" ? 15 : 15,
    alignSelf: "center",
    alignItems: "center"
  },
  userNameTextStyleView: {
    marginTop: 1,
    alignSelf: "center",
  },
  answerTextStyleView: {
    marginTop: 5,
    marginBottom: 20,
    alignSelf: "center",
  },
  codeTextStyleView: {
    marginTop: 1,
    alignSelf: "center",
  },
  answerTextSStyleView: {
    marginBottom: 20,
    alignSelf: "center",
  },
  codeTextSStyleView: {
    marginTop: 15,
    alignSelf: "center",
  },
  passwordTextStyle: {
    fontSize: 12,
    color: "#002A14",
    fontFamily: "Nunito_400Regular",
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
  invalidDropdownTextStyle: {
    fontSize: 12,
    color: "#FF0000",
    fontFamily: "Nunito_400Regular",
    alignSelf: "flex-start",
    paddingLeft: 5,
    textAlign: "left",
    opacity: 1,
    top: -10,
    left: 8
    // marginBottom: 10
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
    fontSize: 16,
    color: "maroon",
    right: 10,
    // fontFamily: "Nunito_400Regular",
    textAlign: "right",
    marginTop: 18, 
    marginBottom: 22
  },
  dontHaveAccountTextStyle: {
    fontSize: 14,
    color: "#000000",
    marginBottom: 1,
    opacity: 1,
    marginStart: 5,
    fontWeight: "400",
    // fontFamily: "Nunito_400Regular",
    alignSelf: "center",
  },
  dontHaveAccountMintTextStyle: {
    fontSize: 16,
    color: "#52A860",
    marginBottom: 1,
    fontWeight: "600",
    opacity: 1,
    // fontFamily: "Nunito_400Regular",
    alignSelf: "center",
    textDecorationLine: "underline"
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
    fontWeight: "500",
    fontSize: 20,
  },
  signUpButtonText: {
    color: "#4848FF",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF60"
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