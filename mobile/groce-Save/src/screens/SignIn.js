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
  Platform
} from "react-native";
import groceSaveService, {
  setClientOnboardToken,
} from ".././service/GroceSaveService";
import  Loader  from '../components/Loader';

const { width, height } = Dimensions.get("window");

const initialState = {
  username: "",
  us: "",
  password: "", 
  pa: "",
  token: "",
  embu: "",
  correct: "",
  checked: false,
  checkedDB: false,
  isAuthorized: false, 
  isLoading: false, 
  secureTextEntry: true,
};

class SignIn extends React.Component {
  state = initialState;

  constructor(props) {
    super(props);
  }

  handleUsername = (username) => {
    if(username != ""){
        this.setState({ username: username, embu: "", us: "" });
        this.validate(username);
      }else{
       this.setState({ username: username, embu: "empty", us: "empty" });
      }
  };

  handlePassword = (password) => {  
    if(password != ""){
      this.setState({ password: password, pa: "" });
    }else {
      this.setState({ password: password, pa: "empty" });
    } 
  };

  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      this.setState({ username: text, correct: false })
      return false;
    }
    else {
      this.setState({ username: text, correct: true })
      console.log("Email is Correct");
    }
  }

  onPressLogin() {
    this.setState({ isLoading: true });

    const { username, password, embu, correct } = this.state;
    
    if(username == ""){
      this.setState({ isLoading: false, us: "empty" });
    }else if(username != "" && embu == "empty"){
      this.setState({ isLoading: false, embu: "empty" });
    }else if(password == ""){
      this.setState({ isLoading: false, pa: "empty" });
    }else{
    const payload = { username, password };
    this.signnIn(payload);
  }
  } 

  signnIn(payload){
    console.log("Payloadddddd",payload);

    const onSuccess = ({ data }) => {
    this.setState({ isLoading: false });

      console.log("Dataaa:::::",data);
        if(data){
          console.log("Hereeeeeeeeeeeeeeeeeeeeeee")
        Alert(null,"Login successfully");
        this.props.navigation.navigate("Shop");
      }
    };

    const onFailure = (error) => {
      console.log(error);
      if(error.response.status){
        this.setState({ isLoading: false });
          if (error.response.status == 400) {
              this.setState({ isLoading: false });
              Alert.alert('Info: ', 'Ensure you enter the details required')
          } else if (error.response.status == 500) {
              this.setState({ isLoading: false });
              Alert.alert('Info: ', 'Ensure you enter the details required')
          } else if (error.response.status == 401) {
              this.setState({ isLoading: false });
              Alert.alert('Info: ', 'UnAunthorized')
          } else if (error.response.status == 404) {
              this.setState({ isLoading: false });
              Alert.alert('Info: ', 'Not Found')
          }
        }
    };

    groceSaveService
      .post(`/login?username=${payload.username}&password=${payload.password}`)
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

    } catch (error) {
    }
    console.log("This is for storing data...", value);
  };

  componentWillMount = ()=> {
    console.log("I don mount o");
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
          <Loader loading={this.state.isLoading} />
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
                value={this.state.username}
                onChangeText={this.handleUsername}
              />
              </View>
              {this.state.us == "empty" && this.state.username == "" && <Text style={styles.invalidPasswordTextStyle}>E-mail is empty</Text>}
              {!this.state.correct && this.state.username != "" && <Text style={styles.invalidPasswordTextStyle}>E-mail is not correct</Text>}
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
              </View>
              {this.state.password == "12345" && this.state.pa == "empty" && <Text style={styles.invalidPasswordTextStyle}>Invalid Password</Text>}
            {this.state.pa == "empty" && this.state.password == "" && <Text style={styles.invalidPasswordTextStyle}>Password is empty</Text>}
            </View>

            <TouchableOpacity
                onPress={()=> this.onPressLogin()}
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
    // width: 100,
    paddingVertical: Platform.OS === "ios" ? 10 : 10,
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
    marginTop: 35,
    marginBottom: 40,
    // fontFamily: "Nunito_700Bold",
    opacity: 1,
  },
  usernameTextStyle: {
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
  usernameTextStyleView: {
    marginTop: Platform.OS === "ios" ? 15 : 15,
    alignSelf: "center",
  },
  passwordTextStyleView: {
    marginTop: Platform.OS === "ios" ? 30 : 30,
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
    fontSize: Platform.OS === "ios" ? 16 : 16,
    color: "#52A860",
    marginEnd: 25,
    // fontFamily: "Nunito_400Regular",
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
    // fontFamily: "Nunito_400Regular",
    alignSelf: "center",
  },
  dontHaveAccountMintTextStyle: {
    fontSize: Platform.OS === "ios" ?  16 : 16,
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
    fontSize: Platform.OS === "ios" ? 20 : 20,
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