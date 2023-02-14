import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  StatusBar,
  Alert,
  Dimensions,
  LogBox,
} from "react-native";
import UserIcon from "../../assets/svgs/user";

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import groceSaveService, {
//   setClientOnboardToken,
// } from ".././service/GroceSaveService";
// import  Loader  from '../config/Loader';

const { width, height } = Dimensions.get("window");

const initialState = {
  email: "",
  us: "",
  password: "", 
  pa: "",
  errors: {}, 
  role: "",
  first_name: "",
  last_name: "",
  token: "",
  embu: "",
  checked: false,
  checkedDB: false,
  isAuthorized: false, 
  isLoading: false, 
  secureTextEntry: true,
};

class SignIn extends Component {
  state = initialState;

  handleEmail = (email) => {
    var e = "@bu.edu"
    if(email != ""){
      console.log("Ah ah ah",email.includes(e))
      if(email.includes(e) && email.endsWith(e)){
      this.setState({ email: email, embu: "", us: "" });
      }else if(email == "admin"){
        this.setState({ email: email, embu: "", us: "" });
      }else{
       this.setState({ email: email, embu: "empty", us: "empty" });
      }
    }else {
      this.setState({ email: email, us: "empty" });
    }
  };

  handlePassword = (password) => {  
    if(password != ""){
      this.setState({ password: password, pa: "" });
    }else {
      this.setState({ password: password, pa: "empty" });
    } 
  };

  onPressLogin() {
    this.setState({ isLoading: true });

    const { email, password, embu } = this.state;
    
    if(email == ""){
      this.setState({ isLoading: false, us: "empty" });
    }else if(email != "" && embu == "empty"){
      this.setState({ isLoading: false, embu: "empty" });
    }else if(password == ""){
      this.setState({ isLoading: false, pa: "empty" });
    }else{
    const payload = { email, password };
  }
  } 

  signIn(payload, route, role, roleCheck ){
    this.setState({ isLoading: false, isAuthorized: true });

    console.log(payload);

    const onSuccess = ({ data }) => {
      // insert into db...
      this._storeData(data);  
      console.log("Dataaa",data);
      this.setState({ isLoading: false })
      
      if (data.msg == "Login successfully" ) {
        if(data.data.role == roleCheck){
        this.props.navigation.navigate(route, {
          username: data.data.userName,
          email: data.data.email,
          role: role
        });
      }else{
        Alert.alert(null,data.data.role == "prof" ? role+" isn't your role. Your role is professor" : role+" isn't your role. Your role is "+data.data.role)
      }
      } else {
        Alert.alert(null,data.msg)
      }
    };

    const onFailure = (error) => {
      console.log(error);
        this.setState({ isLoading: false });
        Alert.alert('Info: ','Network Error')
    };

    this.setState({ isLoading: true });
    // groceSaveService
    //   .post("/user/login",payload)
    //   .then(onSuccess)
    //   .catch(onFailure);
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
    // this.setState({initialState})
        
    // AsyncStorage.getItem("userDetails").then((res) => {
    //   const response = JSON.parse(res);
    //   if (res !== null) {
    //     this.setState({
    //       role: response.role,
    //       first_name: response.first_name,
    //       last_name: response.last_name,
    //     });

    //     console.log("There is no role dey...", response);
    //     console.log("I role to make role o", this.state.role);
    //   } else {
    //     console.log("There is no role dey...", response);
    //   }
    // });
  
    // AsyncStorage.getItem("checkedBoxBoolean").then((res) => {
    //   const response = JSON.parse(res);
    //   if (res !== null) {
    //     if(response != null && response.checked == true){
    //       console.log("Reached.......----",this.state);
    //         this.setState({
    //         email: response.email,
    //         password: response.password,
    //         checked: response.checked,
    //         });       
    //     }
    //   } else {
    //     console.log("Check box response... Error...", response);
    //   }
    // });
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

    return (
      <ImageBackground
        source={require("./../../assets/splashh.png")}
        style={styles.image}
      >
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
          
          <StatusBar backgroundColor="#F4EFEF" barStyle="dark-content"/>
            <View style={styles.headerContainer}>
              <Image source={require('../../assets/logo_.png')} resizeMode={'cover'} marginBottom={5}  marginStart={30}/>
              <View flexDirection="row">
              
              <Text style={styles.headerTextStyle_}>Login</Text>
              <View style={{ marginVertical: 16 }}>
              <UserIcon/>
              </View>
              </View>
            </View>

            <View>
            <Text style={styles.displayTextStyle}>Signin</Text>
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
                keyboardType="email-address"
                returnKeyType="next"
                placeholder={"Email"}
                placeholderTextColor={"#979797"}
                // style={{fontFamily: "Nunito_400Regular",}}
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                blurOnSubmit={false}
                value={this.state.email}
                onChangeText={this.handleEmail}
              />
              </View>
              {this.state.us == "empty" && this.state.email == "" && <Text style={styles.invalidPasswordTextStyle}>E-mail is empty</Text>}
              {this.state.embu == "empty" && this.state.email != "" && <Text style={styles.invalidPasswordTextStyle}>E-mail does not exist</Text>}
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
                // style={{fontFamily: "Nunito_400Regular",}}
                ref={(input) => { this.secondTextInput = input; }}
                value={this.state.password}
                secureTextEntry={this.state.secureTextEntry?true:false}
                onChangeText={this.handlePassword}
              />
              {this.state.password ? 
              <TouchableOpacity 
              onPress={this.updateSecureTextEntry.bind(this)}>
                {/* {this.state.secureTextEntry ?
                <View
                style={{alignSelf: "flex-end", right: 33, marginTop: 20, }}>
                <EyeOpenIcon/>
                </View>
                 :
                 <View
                 style={{alignSelf: "flex-end", right: 33, marginTop: 20, }}>
                 <EyeCloseIcon/>
                 </View>
                } */}
                
              </TouchableOpacity> : null} 
              </View>
              
              {/* <View      
                  style={styles.iconViewStyle}>
                  <LockIcon/>
              </View> */}
                      {/* {!this.state.secureTextEntry ?
                      <TouchableOpacity 
                      onPress={this.updateSecureTextEntry.bind(this)}>
                        
                        <Feather
                          name="eye-off"
                          color="#000000"
                          size={15}
                          style={{alignSelf: "flex-end", marginEnd: 10, bottom: 50, }}
                          />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity 
                      onPress={this.updateTrueSecureTextEntry.bind(this)}>
                        <Feather
                          name="eye"
                          color="#000000"
                          size={15}
                          style={{alignSelf: "flex-end", marginEnd: 10, bottom: 50, }}
                        />
                       </TouchableOpacity>} */}

              </View>
              {this.state.password == "12345" && this.state.pa == "empty" && <Text style={styles.invalidPasswordTextStyle}>Invalid Password</Text>}
            {this.state.pa == "empty" && this.state.password == "" && <Text style={styles.invalidPasswordTextStyle}>Password is empty</Text>}
            </View>

            <TouchableOpacity
                onPress={this.onPressLogin.bind(this)}
                style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#52A860", marginBottom: 5, opacity: 1, marginTop: 60,  }}>
                <Text style={styles.loginButtonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("ForgotPassword")
                }>             
              <Text style={styles.forgetTextStyle}>Forgot your Password? </Text>
              </TouchableOpacity>

            
            <View flexDirection="row" alignSelf="center" marginTop={10} marginBottom={10}>
            <Text style={styles.dontHaveAccountTextStyle}>Other issues{" "}</Text>
            <TouchableOpacity
                onPress={() =>
                  // Alert.alert(null, "Signup")
                  this.props.navigation.navigate("SignUp")
                }>
            <Text style={styles.dontHaveAccountMintTextStyle}>with Sign up</Text>
            </TouchableOpacity>
            </View>

            </View>
        </ScrollView>
     </ImageBackground>
    );
  }
}


export default SignIn;

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
    height: height
  },
  headerContainer: {
    width: width,
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
    paddingLeft: width * 0.2,
    // fontFamily: "Nunito_700Bold",
    opacity: 1,
  },
  headerTextStyle_: {
    fontSize: 20,
    color: "black",
    alignSelf: "center",
    paddingEnd: 10,
    // width: 100,
    paddingVertical: 10,
    // fontFamily: "Nunito_700Bold",
    opacity: 1,
  },
  displayTextStyle: {
    fontSize: 22,
    color: "black",
    alignSelf: "center",
    paddingEnd: 10,
    fontWeight: "600",
    paddingVertical: 10,
    marginTop: 35,
    marginBottom: 40,
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
    // fontFamily: "Nunito_400Regular",
    textAlign: "left",
    paddingBottom: 5,
    paddingLeft: 5,
    opacity: 1,
    fontWeight: "400",
    // this.state.us == "empty" ? 'pink' : 
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
  emailTextStyleView: {
    marginTop: 15,
    alignSelf: "center",
  },
  passwordTextStyleView: {
    marginTop: 30,
    alignSelf: "center",
  },
  passwordTextStyle: {
    fontSize: 12,
    color: "#002A14",
    // fontFamily: "Nunito_400Regular",
    textAlign: "left",
    paddingBottom: 5,
    paddingLeft: 5,
    opacity: 1,
    fontWeight: "400",
  },
  invalidPasswordTextStyle: {
    fontSize: 12,
    color: "#FF0000",
    // fontFamily: "Nunito_400Regular",
    alignSelf: "flex-start",
    paddingLeft: 5,
    textAlign: "left",
    opacity: 1,
    top: 5,
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
    color: "#52A860",
    marginEnd: 25,
    // fontFamily: "Nunito_400Regular",
    textAlign: "right",
    marginTop: 5, 
    marginBottom: 2,
    fontWeight: "600"
  },
  dontHaveAccountTextStyle: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 1,
    opacity: 1,
    marginStart: 5,
    fontWeight: "700",
    // fontFamily: "Nunito_400Regular",
    alignSelf: "center",
  },
  dontHaveAccountMintTextStyle: {
    fontSize: 16,
    color: "#52A860",
    marginBottom: 1,
    fontWeight: "700",
    opacity: 1,
    // fontFamily: "Nunito_400Regular",
    alignSelf: "center",
    // textDecorationLine: "underline"
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
    // fontFamily: "Nunito_400Regular",
    padding: 5,
    fontWeight: "400",
    fontSize: 20,
  },
  signUpButtonText: {
    color: "#4848FF",
    textAlign: "center",
    // fontFamily: "Nunito_400Regular",
  },
  scrollView: {
    flex: 1,
    // backgroundColor: "#E5E5E5",
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