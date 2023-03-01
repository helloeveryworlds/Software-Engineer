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
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Dropdown } from "react-native-material-dropdown";
import UserIcon from "../../assets/svgs/user";
import { SimpleLineIcons, Foundation, Entypo, AntDesign, MaterialCommunityIcons, MaterialIcons, FontAwesome, FontAwesome5, Feather } from "@expo/vector-icons";
// import groceSaveService, {
//   setClientOnboardToken,
// } from "../service/GroceSaveService";
// import  Loader  from '../config/Loader';

const { width, height } = Dimensions.get("window");

const initialState = {
  email: "",
  em: "",
  embu: "",
  us: "",
  username: "",
  password: "", 
  pa: "",
  name: "",
  cpa: "",
  showCpa: "",
  buId: "",
  bui: "",
  userType: "Select Option",
  uty: "",
  address: "",
  cod: "",
  backendCode: 0,
  errors: {}, 
  role: "",
  first_name: "",
  last_name: "",
  zipcode: "",
  qu: "",
  answer: "",
  ans: "",
  token: "",
  showCountDown: false,
  checked: false,
  checkedDB: false,
  isAuthorized: false, 
  isLoading: false, 
  secureTextEntry: true,
  seconds: 30,
  time: {}, 
  questList: [],
  optionList: [
    {
      value: "Select Option",
      label: "Select Option",
    },
    {
        value: "student",
        label: "Student",
    },
    {
        value: "prof",
        label: "Professor",
    }
],
};

class SignUp extends Component {
  state = initialState;

  constructor() {
    super();
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  handleEmail = (email) => {
    var e = "@bu.edu"
    if(email != ""){
      console.log("Ah ah ah",email.includes(e))
      if(email.includes(e) && email.endsWith(e)){
      this.setState({ email: email, embu: "", em: "" });
      }else{
       this.setState({ email: email, embu: "empty", em: "empty" });
      }
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
      if(name != this.state.password){
        this.setState({ name: name, showCpa: "empty", cpa: "empty" });
      }else{
        this.setState({ name: name, cpa: "" });
      }
    }else {
      this.setState({ name: name, cpa: "empty", showCpa: "" });
    } 
    
  };

  handleUsername = (username) => {  
    if(username != ""){
      this.setState({ username: username, us: "" });
    }else {
      this.setState({ username: username, us: "empty" });
    } 
  };

  handleBUId = (buId) => {  
    if(buId != ""){
      this.setState({ buId: buId, bui: "" });
    }else {
      this.setState({ buId: buId, bui: "empty" });
    } 
  };

  handleUserType = (userType) => {  
    if(userType != "Select Option"){
      this.setState({ userType: userType, uty: "" });
    }else {
      this.setState({ userType: userType, uty: "empty" });
    } 
  };

  handleAddress = (address) => {  
    if(address != ""){
      this.setState({ address: address, cod: "" });
    }else {
      this.setState({ address: address, cod: "empty" });
    } 
  };

  handleZipcode = (zipcode) => {  
    if(zipcode != "Select zipcode"){
      this.setState({ zipcode: zipcode, qu: "" });
    }else {
      this.setState({ zipcode: zipcode, qu: "empty" });
    } 
  };

  handleAnswer = (answer) => {  
    if(answer != ""){
      this.setState({ answer: answer, ans: "" });
    }else {
      this.setState({ answer: answer, ans: "empty" });
    } 
  };

  startTimer() {
    this.getProfCode();
    // Alert.alert(null, "You will receive the code via E-mail..", [{text: 'Ok', onPress: ()=> {
      if(this.state.email != ""){
      this.setState({ seconds: 30, showCountDown: true })
      this.timer = setInterval(this.countDown, 1000);
      }else{
        this.setState({ isLoading: false, em: "empty" });
        Alert.alert(null,'Email not yet entered.')
      }
    // }}] )
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer);
    }
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  getProfCode() {
    this.setState({ isLoading: true });
    if(this.state.email){
    const fbList = [];

    // groceSaveService
    //   .get(`/user/getCode?email=${this.state.email}`)
    //   .then((data) => {
    //     if(data.data.data != null){
    //     this.setState({ isLoading: false, isAuthorized: true, visible: true, backendCode: data.data.data });
    //     console.log("Dataaaaaaaaaa: ", data.data.data);
    //     Alert.alert(null, "Your code is "+data.data.data)
    //     }else {
    //       this.setState({ isLoading: false, visible: true });
    //       Alert.alert(null,data.data.msg)
    //     this.setState({ message: "No Available Feedback" });
        
    //     console.log("fbList: ", fbList);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     this.setState({ isLoading: false, isAuthorized: true });
    //   });
    }else{
      this.setState({ isLoading: false, em: "empty" });
      Alert.alert(null,'Email not yet entered.')
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
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  onPressLogin() {
    this.setState({ isLoading: true });

    const { embu, email, password, userType, username, buId, name, code, backendCode, zipcode, answer } = this.state;
    
    if(userType == "Select Option"){
      this.setState({ isLoading: false, uty: "empty" });
      // Alert.alert(null,'Email field is empty')
    }else if(email == ""){
      this.setState({ isLoading: false, em: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(email != "" && embu == "empty"){
      this.setState({ isLoading: false, embu: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(username == ""){
      this.setState({ isLoading: false, us: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(buId == ""){
      this.setState({ isLoading: false, bui: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(password == ""){
      this.setState({ isLoading: false, pa: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(name == ""){
      this.setState({ isLoading: false, cpa: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(password != name){
      this.setState({ isLoading: false, cpa: "empty", showCpa: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(userType == "prof" && code == ""){
      this.setState({ isLoading: false, cod: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(zipcode == "Select zipcode"){
      this.setState({ isLoading: false, qu: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(answer == ""){
      this.setState({ isLoading: false, ans: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else{
      const role = userType
      const buID = buId
      const userName = username
      const payload = { email, password, role, buID, userName, zipcode, answer };
      if(userType == "prof" && code != ""){
        if(code == backendCode){
          this.signUp(payload)
        }else{
          this.setState({ isLoading: false, cod: "empty" });
          Alert.alert(null,"Code isn't correct!")
        }
      } else if(userType == "student"){
      this.signUp(payload)
      }
      
  }
  } 

  signUp(payload){
  // const checkedPayload = { email, password, checked };
  this.setState({ isLoading: false, isAuthorized: true });

  console.log(payload);

  const onSuccess = ({ data }) => {
    // insert into db...
    // this._storeData(data);
    
  //   setClientOnboardToken(data.token);
    this.setState({ isLoading: false, isAuthorized: true });
    console.log("Dataaa",data);
    if (data.msg == "Register successfully"){
      Alert.alert(null, data.msg+": Account created, Click Ok to login..", [{
        text: 'Ok', onPress: () => this.props.navigation.navigate("Welcome")
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
  //  groceSaveService
  //   .post("/user/register", payload)
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
        
        <StatusBar backgroundColor="#DDDDDD" barStyle="dark-content"/>
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
              // style={{fontFamily: "Nunito_400Regular",}}
              onSubmitEditing={() => { this.secondTextInput.focus(); }}
              blurOnSubmit={false}
              value={this.state.name}
              onChangeText={this.handleName}
            />
            </View>
            {/* {this.state.us == "empty" && this.state.email == "" && <Text style={styles.invalidPasswordTextStyle}>E-mail is empty</Text>}
            {this.state.embu == "empty" && this.state.email != "" && <Text style={styles.invalidPasswordTextStyle}>E-mail does not exist</Text>} */}
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
            </TouchableOpacity> : null} 
            </View>

            </View>
            {this.state.password == "12345" && this.state.pa == "empty" && <Text style={styles.invalidPasswordTextStyle}>Invalid Password</Text>}
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
              placeholder={"Address"}
              placeholderTextColor={"#979797"}
              // style={{fontFamily: "Nunito_400Regular",}}
              onSubmitEditing={() => { this.secondTextInput.focus(); }}
              blurOnSubmit={false}
              value={this.state.address}
              onChangeText={this.handleAddress}
            />
            </View>
            {/* {this.state.us == "empty" && ///this.state.email == "" && <Text style={styles.invalidPasswordTextStyle}>E-mail is empty</Text>}
            {this.state.embu == "empty" && this.state.email != "" && <Text style={styles.invalidPasswordTextStyle}>E-mail does not exist</Text>} */}
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
              placeholder={"Zip code"}
              placeholderTextColor={"#979797"}
              // style={{fontFamily: "Nunito_400Regular",}}
              onSubmitEditing={() => { this.secondTextInput.focus(); }}
              blurOnSubmit={false}
              value={this.state.zipcode}
              onChangeText={this.handleZipcode}
            />
            </View>
            {/* {this.state.us == "empty" && this.state.email == "" && <Text style={styles.invalidPasswordTextStyle}>E-mail is empty</Text>}
            {this.state.embu == "empty" && this.state.email != "" && <Text style={styles.invalidPasswordTextStyle}>E-mail does not exist</Text>} */}
          </View>

          <TouchableOpacity
              onPress={this.onPressLogin.bind(this)}
              style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "#52A860", marginBottom: 5, opacity: 1, marginTop: 60,  }}>
              <Text style={styles.loginButtonText}>Submit</Text>
          </TouchableOpacity>
          <View flexDirection="row" alignSelf="center" marginTop={10} marginBottom={10}>
            <Text style={styles.dontHaveAccountTextStyle}>Have an account?{" "}</Text>
            <TouchableOpacity
                onPress={() =>
                  // Alert.alert(null, "Signup")
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