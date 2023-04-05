import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  Alert,
  Dimensions,
  LogBox,
  ImageBackground,
  Platform
} from "react-native";
import UserIcon from "../../assets/svgs/user";
import { SimpleLineIcons, Foundation, Entypo, AntDesign, MaterialCommunityIcons, MaterialIcons, FontAwesome, FontAwesome5, Feather } from "@expo/vector-icons";
import groceSaveService, {
  setClientOnboardToken,
} from "../service/GroceSaveService";
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
  zipcode: "",
  correct: ""
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

  handleZipcode = (zipcode) => {  
    if(zipcode != ""){
      this.setState({ zipcode: zipcode, zc: "" });
    }else {
      this.setState({ zipcode: zipcode, zc: "empty" });
    } 
  };

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

  zipcodesList() {
    this.setState({ isLoading: true });

    const questList = [];
    questList.push({
      value: "Select zipcode",
      label: "Select zipcode",
    });
    // groceSaveService
    //     .get("/user/allzipcode")
    //     .then(data => {
    //       console.log("list: questList", data.data);
    //       this.setState({ isLoading: false });
    //       data.data.data.forEach(element => {
    //         questList.push({
    //           value: `${element.zipcodeName}`,
    //           label: `${element.zipcodeName}`,
    //         }); 
    //     })
        
    //       this.setState({questList: questList});
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       this.setState({ isLoading: false, isAuthorized: true });
  
    //     });
    }

  componentDidMount() {
    this.zipcodesList()
  }

  onPressSubmit() {
    this.setState({ isLoading: true });

    const { email, password, userType, name, code, backendCode, zipcode, address} = this.state;
    
    if(name == ""){
      this.setState({ isLoading: false, us: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(email == ""){
      this.setState({ isLoading: false, em: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(password == ""){
      this.setState({ isLoading: false, pa: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(address == ""){
      this.setState({ isLoading: false, ad: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(zipcode == "Select zipcode"){
      this.setState({ isLoading: false, zc: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else{
      const payload = { email, password, address, name, zipcode };
      this.signUp(payload)
  }
  } 

  signUp(payload){
  this.setState({ isLoading: false, isAuthorized: true });

  console.log(payload);

  const onSuccess = ({ data }) => {
    // insert into db...
    // this._storeData(data);
    
    this.setState({ isLoading: false, isAuthorized: true });
    console.log("Dataaa",data);
    if (data){
      Alert.alert(null, "Register successfully", [{
        text: 'Ok', onPress: () => this.props.navigation.navigate("SignIn")
      }])
    }else{
      Alert.alert(data.msg)
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
      Alert.alert('Info: ',error.response.data.non_field_errors[0])
    } else if(error.response.status == 500){
      this.setState({ isLoading: false });
      Alert.alert('Info: ','Ensure your Network is Stable')
    } else if(error.response.status == 401){
      this.setState({ isLoading: false });
      Alert.alert(null,error.response.data)
    } else if(error.response.status == 404){
      this.setState({ isLoading: false });
      Alert.alert('Info: ','User not found')
    }
    this.setState({ errors: error.response.data, isLoading: false });
  };

  this.setState({ isLoading: true });
   groceSaveService
    .post("/signup", payload)
    .then(onSuccess)
    .catch(onFailure);
  }

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  }

  _storeData = async (value) => {
    await this.removeItemValue("userDetails");
    try {
      await AsyncStorage.setItem("userDetails", JSON.stringify(value));
      // await AsyncStorage.setItem("checkedBoxBoolean", JSON.stringify(payload));

    } catch (error) {
    }
    console.log("This is for storing data...", value);
    // console.log("This is for storing data...", payload);

  };

  _retrieveData() {
  }

  componentWillMount = ()=> {
    console.log("I don mount o");
    // this._retrieveData();
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
            {this.state.us == "empty" && this.state.name == "" && <Text style={styles.invalidPasswordTextStyle}>Name is empty</Text>}
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
              borderColor={this.state.em == "empty" ? 'red' : "transparent"}
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
            {!this.state.correct && this.state.email != "" && <Text style={styles.invalidPasswordTextStyle}>E-mail is not correct</Text>}
            {this.state.em == "empty" && this.state.email == "" && <Text style={styles.invalidPasswordTextStyle}>E-mail is empty</Text>}
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
              // borderRadius= {10}
              paddingTop = {8}
              paddingBottom = {8}
              paddingStart ={15}
              paddingEnd= {22}
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
            </TouchableOpacity> : null} 
            </View>

            </View>
          {this.state.pa == "empty" && this.state.password == "" && <Text style={styles.invalidPasswordTextStyle}>Password is empty</Text>}
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
              borderColor={this.state.ad == "empty" ? 'red' : "transparent"}
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
              placeholder={"Zip code"}
              placeholderTextColor={"#979797"}
              ref={(input) => { this.zipcodeTextInput = input; }}
              blurOnSubmit={false}
              value={this.state.zipcode}
              onChangeText={this.handleZipcode}
            />
            </View>
            {this.state.zc == "empty" && this.state.zipcode == "" && <Text style={styles.invalidPasswordTextStyle}>Zip code is empty</Text>}
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
    // width: width,
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
    // fontFamily: "Nunito_700Bold",
    opacity: 1,
  },
  headerTextStyle_: {
    fontSize: Platform.OS === "ios" ? 20 : 20,
    color: "black",
    alignSelf: "center",
    paddingEnd: 10,
    // width: 100,
    paddingVertical: 10,
    // fontFamily: "Nunito_700Bold",
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
    // fontFamily: "Nunito_700Bold",
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
    // height: height * 0.718,
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
    // this.state.us == "empty" ? 'pink' : 
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
    marginBottom: 15,
  },
  passwordTextStyleView: {
    marginTop: Platform.OS === "ios" ? 15 : 15,
    alignSelf: "center",
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
  invalidPasswordTextStyle: {
    fontSize: 12,
    color: "#FF0000",
    fontFamily: "Nunito_400Regular",
    alignSelf: "flex-start",
    paddingLeft: 5,
    textAlign: "left",
    opacity: 1,
    top: 5,
    // marginBottom: 10
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