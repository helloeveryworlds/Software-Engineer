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
} from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Dropdown } from "react-native-material-dropdown";
import { SimpleLineIcons, Foundation, Entypo, AntDesign, MaterialCommunityIcons, MaterialIcons, FontAwesome, FontAwesome5, Feather } from "@expo/vector-icons";
// import bUSuggestBoxService, {
//   setClientOnboardToken,
// } from "../service/BUSuggestBoxService";
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
  confirmPassword: "",
  cpa: "",
  showCpa: "",
  buId: "",
  bui: "",
  userType: "Select Option",
  uty: "",
  code: "",
  cod: "",
  backendCode: 0,
  errors: {}, 
  role: "",
  first_name: "",
  last_name: "",
  question: "Select Question",
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

  handleConfirmPassword = (confirmPassword) => {  
    if(confirmPassword != ""){
      if(confirmPassword != this.state.password){
        this.setState({ confirmPassword: confirmPassword, showCpa: "empty", cpa: "empty" });
      }else{
        this.setState({ confirmPassword: confirmPassword, cpa: "" });
      }
    }else {
      this.setState({ confirmPassword: confirmPassword, cpa: "empty", showCpa: "" });
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

  handleCode = (code) => {  
    if(code != ""){
      this.setState({ code: code, cod: "" });
    }else {
      this.setState({ code: code, cod: "empty" });
    } 
  };

  handleQuestion = (question) => {  
    if(question != "Select Question"){
      this.setState({ question: question, qu: "" });
    }else {
      this.setState({ question: question, qu: "empty" });
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

    // bUSuggestBoxService
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

  questionsList() {
    this.setState({ isLoading: true });

    const questList = [];
    questList.push({
      value: "Select Question",
      label: "Select Question",
    });
    // bUSuggestBoxService
    //     .get("/user/allQuestion")
    //     .then(data => {
    //       console.log("list: questList", data.data);
    //       this.setState({ isLoading: false });
    //       data.data.data.forEach(element => {
    //         questList.push({
    //           value: `${element.questionName}`,
    //           label: `${element.questionName}`,
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
    this.questionsList()
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  onPressLogin() {
    this.setState({ isLoading: true });

    const { embu, email, password, userType, username, buId, confirmPassword, code, backendCode, question, answer } = this.state;
    
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
    }else if(confirmPassword == ""){
      this.setState({ isLoading: false, cpa: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(password != confirmPassword){
      this.setState({ isLoading: false, cpa: "empty", showCpa: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(userType == "prof" && code == ""){
      this.setState({ isLoading: false, cod: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(question == "Select Question"){
      this.setState({ isLoading: false, qu: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else if(answer == ""){
      this.setState({ isLoading: false, ans: "empty" });
      // Alert.alert(null,'Password field is empty')
    }else{
      const role = userType
      const buID = buId
      const userName = username
      const payload = { email, password, role, buID, userName, question, answer };
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
  //  bUSuggestBoxService
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
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
          
          <StatusBar backgroundColor="#E5E5E5" barStyle="dark-content"/>
          {/* <Loader loading={this.state.isLoading} /> */}
          
            <View style={styles.cardStyleLong}>
            <View style={{ flexDirection: "row", alignSelf: "center", borderRadius: 10, borderWidth: 0.5, borderColor: "maroon", paddingHorizontal: 10 }}>
            {/* <Image source={require('../../assets/dogcirclesmall.png')} resizeMode={'cover'} top={-1} alignSelf={"center"} height={20} width={20}/>  */}
            <Text style={styles.welcomeTextStyle}>Sign Up in BU Community</Text>
            </View>
            <View style={styles.emailTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.uty == "empty" ? 'red' : "maroon",
                fontFamily: "Nunito_400Regular",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 12,
                opacity: 1,
                fontWeight: "400",
                marginTop: 8,
              }}>Are you a Student or Professor?</Text>

            <Dropdown
                  value={"Select Option"}
                  data={this.state.optionList}
                  baseColor={"#FFF"}
                  textColor={"maroon"}
                  fontSize={15}
                  selectedItemColor={"maroon"}
                  style={{fontFamily: "Nunito_400Regular",}}
                  itemPadding={8}
                  itemTextStyle={{ marginLeft: 5, fontFamily: "Nunito_400Regular", }}
                  dropdownMargins={{ min:8, max:6 }}
                  overlayStyle={{bottom: 10, alignSelf: "center", }}
                  dropdownOffset={{top: 12, left: 0}}
                  containerStyle={{
                    borderColor: this.state.uty == "empty" ? 'red' : "maroon",
                    backgroundColor: "#FFF",
                    borderWidth: 1,
                    borderRadius: 10,
                    marginHorizontal: 10,
                    paddingLeft: 15,
                    height: 56,
                    alignSelf: "center",
                    width: width * 0.80,
                    fontFamily: "Nunito_400Regular",
                  }}
                  onChangeText={(value) => this.handleUserType(value)}
                />
                <AntDesign
                  name="down"
                  color="maroon"
                  style={{ alignSelf: "flex-end", right: 30, bottom: 32, opacity: 1 }}
                  size={13}/>
            {this.state.uty == "empty" && this.state.userType == "Select Option" && <Text style={styles.invalidDropdownTextStyle}>Please select an option</Text>}
            </View>

            {this.state.userType == "prof" ?
            <View>
            <View style={styles.answerTextStyleView}>
              <Text style={{
                fontSize: 12,
                fontFamily: "Nunito_400Regular",
                textAlign: "left",
                paddingBottom: 3,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                color: this.state.em == "empty" ? 'red' : "maroon"
                }}>BU E-mail</Text>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>  

              <TextInput
                backgroundColor = "#FFF"
                borderWidth = {1}
                borderColor={this.state.em == "empty" ? 'red' : "maroon"}
                width = {width * 0.81}
                height= {56}
                borderRadius = {10}
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
                placeholder={"johndoe@bu.edu"}
                
                style={{fontFamily: "Nunito_400Regular",}}
                returnKeyType="next"
                onSubmitEditing={() => { this.userTextInput.focus(); }}
                blurOnSubmit={false}
                value={this.state.email}
                onChangeText={this.handleEmail}
              />
              
              </View>
              {this.state.em == "empty" && this.state.email == "" && <Text style={styles.invalidPasswordTextStyle}>BU E-mail is Empty</Text>}
              {this.state.embu == "empty" && this.state.email != "" && <Text style={styles.invalidPasswordTextStyle}>This BU E-mail does not exist</Text>}

            </View>

            <View style={styles.userNameTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.us == "empty" ? 'red' : "maroon",
                fontFamily: "Nunito_400Regular",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                marginTop: 8,
              }}>Username</Text>

              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <View style={{flexDirection: "row", }}>
              <TextInput
                backgroundColor= "#FFF"
                borderWidth = {1}
                fontSize={16}
                borderColor={this.state.us == "empty" ? 'red' : "maroon"}
                width= {width * 0.81}
                height= {56}
                borderRadius= {10}
                paddingTop = {8}
                paddingBottom = {8}
                paddingStart ={15}
                paddingEnd= {22}
                opacity= {1}
                placeholder={"john"}
                
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                style={{fontFamily: "Nunito_400Regular",}}
                ref={(input) => { this.userTextInput = input; }}
                returnKeyType="next"
                onSubmitEditing={() => { this.buIdTextInput.focus(); }}
                blurOnSubmit={false}
                value={this.state.username}
                onChangeText={this.handleUsername}
              />
              </View>
              </View>
      
            {this.state.us == "empty" && this.state.username == "" && <Text style={styles.invalidPasswordTextStyle}>Username is empty</Text>}
              
            </View>
            <View style={styles.passwordTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.bui == "empty" ? 'red' : "maroon",
                fontFamily: "Nunito_400Regular",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                marginTop: 8,
              }}>BU ID</Text>

              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <View style={{flexDirection: "row", }}>
              <TextInput
                backgroundColor= "#FFF"
                borderWidth = {1}
                fontSize={16}
                borderColor={this.state.bui == "empty" ? 'red' : "maroon"}
                width= {width * 0.81}
                height= {56}
                borderRadius= {10}
                paddingTop = {8}
                paddingBottom = {8}
                paddingStart ={15}
                paddingEnd= {22}
                opacity= {1}
                placeholder={"U********"}
                
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                style={{fontFamily: "Nunito_400Regular",}}
                ref={(input) => { this.buIdTextInput = input; }}
                returnKeyType="next"
                onSubmitEditing={() => { this.codeTextInput.focus(); }}
                blurOnSubmit={false}
                value={this.state.buId}
                onChangeText={this.handleBUId}
              />
              </View>
              </View>
      
            {this.state.bui == "empty" && this.state.buId == "" && <Text style={styles.invalidPasswordTextStyle}>BU Id is empty</Text>}
              
            </View>

            <View style={styles.passwordTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.pa == "empty" ? 'red' : "maroon",
                fontFamily: "Nunito_400Regular",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                marginTop: 8,
              }}>Password</Text>

              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <View style={{flexDirection: "row", }}>
              <TextInput
                backgroundColor= "#FFF"
                borderWidth = {1}
                fontSize={16}
                borderColor={this.state.pa == "empty" ? 'red' : "maroon"}
                width= {width * 0.81}
                height= {56}
                borderRadius= {10}
                paddingTop = {8}
                paddingBottom = {8}
                paddingStart ={15}
                paddingEnd= {22}
                opacity= {1}
                placeholder={"********"}
                
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                style={{fontFamily: "Nunito_400Regular",}}
                ref={(input) => { this.passwordTextInput = input; }}
                returnKeyType="next"
                onSubmitEditing={() => { this.confirmPasswordTextInput.focus(); }}
                blurOnSubmit={false}
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
            {this.state.pa == "empty" && this.state.password == "" && <Text style={styles.invalidPasswordTextStyle}>Password is empty</Text>}
              
            </View>

            <View style={styles.passwordTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.cpa == "empty" ? 'red' : "maroon",
                fontFamily: "Nunito_400Regular",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                marginTop: 8,
              }}>Confirm Password</Text>

              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10,
              }}>
              <View style={{flexDirection: "row" }}>
              <TextInput
                backgroundColor= "#FFF"
                borderWidth = {1}
                fontSize={16}
                borderColor={this.state.cpa == "empty" ? 'red' : "maroon"}
                width= {width * 0.81}
                height= {56}
                borderRadius= {10}
                paddingTop = {8}
                paddingBottom = {8}
                paddingStart ={15}
                paddingEnd= {22}
                opacity= {1}
                placeholder={"********"}
                
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                style={{fontFamily: "Nunito_400Regular",}}
                ref={(input) => { this.confirmPasswordTextInput = input; }}
                value={this.state.confirmPassword}
                secureTextEntry={this.state.secureTextEntry?true:false}
                onChangeText={this.handleConfirmPassword}
              />
              {this.state.confirmPassword ? 
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
            {this.state.cpa == "empty" && this.state.showCpa == "" && this.state.confirmPassword == "" && <Text style={styles.invalidPasswordTextStyle}>Confirm Password is empty</Text>}
            {this.state.cpa == "empty" && this.state.showCpa == "empty" && this.state.confirmPassword != "" && <Text style={styles.invalidPasswordTextStyle}>Passwords don't match</Text>}
            </View>

            <View style={styles.passwordTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.cod == "empty" ? 'red' : "maroon",
                fontFamily: "Nunito_400Regular",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                marginTop: 8,
              }}>Code</Text>

              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <View style={{flexDirection: "row", marginBottom: 10 }}>
              <TextInput
                backgroundColor= "#FFF"
                borderWidth = {1}
                fontSize={16}
                borderColor={this.state.cod == "empty" ? 'red' : "maroon"}
                width= {width * 0.81}
                height= {56}
                borderRadius= {10}
                paddingTop = {8}
                paddingBottom = {8}
                paddingStart ={15}
                paddingEnd= {22}
                opacity= {1}
                maxLength={4}
                placeholder={"Enter Code"}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                style={{fontFamily: "Nunito_400Regular",}}
                ref={(input) => { this.codeTextInput = input; }}
                value={this.state.code}
                onChangeText={this.handleCode}
              />
              </View>
              </View>
      
            {this.state.cod == "empty" && this.state.code == "" && <Text style={styles.invalidPasswordTextStyle}>Code is empty</Text>}
              
            </View>
            <TouchableOpacity onPress={this.startTimer} disabled={this.state.time.s == 30 | this.state.time.s == 0 ? false : true}>
                <View flexDirection={"row"} alignSelf={"center"}>
                {showCountDown == true ? 
                <View flexDirection={"row"} alignSelf={"center"}>
                <SimpleLineIcons name="reload" style={styles.reloadIconStyle}/>
                <Text style={{color: "grey", fontWeight: "500", fontSize: 15, marginLeft: 10, textAlign: "left", top: 2 }}>{this.state.time.s} sec</Text>
                </View> : null}
                {showCountDown ? 
                <Text style={{color: "maroon", fontWeight: "400", fontSize: 12, marginLeft: 5, textAlign: "center", marginTop: 24, marginBottom: 15 }}>Didn’t receive Code?{"  "}
                <Text style={{color: "maroon", fontWeight: "600", fontSize: 14, marginLeft: 30, textAlign: "left", textDecorationLine: "underline", lineHeight: 15 }}>Resend Code</Text>
                </Text> : 
                <View style={{ alignSelf: "flex-end", width: width * 0.8 }}>
                <Text style={{color: "maroon", fontWeight: "600", fontSize: 14, marginTop: 10, textDecorationLine: "underline", alignSelf: "flex-end", alignContent: "flex-end" }}
                // onPress={()=> Alert.alert(null, "You will receive the code via E-mail..", [{text: 'Ok', onPress: this.startTimer.bind(this)}] )}
                >Send Code</Text>
                </View>}
                </View>
                </TouchableOpacity>

                <View style={styles.codeTextStyleView}>
                <Text style={{
                  fontSize: 12,
                  color: this.state.qu == "empty" ? 'red' : "maroon",
                  fontFamily: "Nunito_400Regular",
                  textAlign: "left",
                  paddingBottom: 5,
                  paddingLeft: 12,
                  opacity: 1,
                  fontWeight: "400",
                  marginTop: 8,
                }}>Secret Question</Text>

              <Dropdown
                    value={"Select Question"}
                    data={this.state.questList}
                    baseColor={"#FFF"}
                    textColor={"maroon"}
                    fontSize={15}
                    selectedItemColor={"maroon"}
                    style={{fontFamily: "Nunito_400Regular",}}
                    itemPadding={8}
                    itemTextStyle={{ marginLeft: 5, fontFamily: "Nunito_400Regular", }}
                    dropdownMargins={{ min:8, max:6 }}
                    overlayStyle={{bottom: 10, alignSelf: "center", }}
                    dropdownOffset={{top: 12, left: 0}}
                    containerStyle={{
                      borderColor: this.state.qu == "empty" ? 'red' : "maroon",
                      backgroundColor: "#FFF",
                      borderWidth: 1,
                      borderRadius: 10,
                      marginHorizontal: 10,
                      paddingLeft: 15,
                      height: 56,
                      alignSelf: "center",
                      width: width * 0.80,
                      fontFamily: "Nunito_400Regular",
                    }}
                    onChangeText={(value) => this.handleQuestion(value)}
                  />
                  <AntDesign
                    name="down"
                    color="maroon"
                    style={{ alignSelf: "flex-end", right: 30, bottom: 32, opacity: 1 }}
                    size={13}/>
              {this.state.qu == "empty" && this.state.question == "Select Question" && <Text style={styles.invalidDropdownTextStyle}>Please select a secret Question</Text>}
              </View>

              <View style={styles.answerTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.ans == "empty" ? 'red' : "maroon",
                fontFamily: "Nunito_400Regular",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                marginTop: 8,
              }}>Secret Answer</Text>

              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <View style={{flexDirection: "row", }}>
              <TextInput
                backgroundColor= "#FFF"
                borderWidth = {1}
                fontSize={16}
                borderColor={this.state.ans == "empty" ? 'red' : "maroon"}
                width= {width * 0.81}
                height= {56}
                borderRadius= {10}
                paddingTop = {8}
                paddingBottom = {8}
                paddingStart ={15}
                paddingEnd= {22}
                opacity= {1}
                placeholder={"Answer"}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                style={{fontFamily: "Nunito_400Regular",}}
                value={this.state.answer}
                onChangeText={this.handleAnswer}
              />
              </View>
              </View>
      
            {this.state.ans == "empty" && this.state.answer == "" && <Text style={styles.invalidPasswordTextStyle}>Secret Answer is empty</Text>}
              
            </View>
              </View> : null}

            {userType == "student" && <View>
            <View style={styles.answerTextStyleView}>
              <Text style={{
                fontSize: 12,
                fontFamily: "Nunito_400Regular",
                textAlign: "left",
                paddingBottom: 3,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                color: this.state.em == "empty" ? 'red' : "maroon"
                }}>BU E-mail</Text>
              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>  

              <TextInput
                backgroundColor = "#FFF"
                borderWidth = {1}
                borderColor={this.state.em == "empty" ? 'red' : "maroon"}
                width = {width * 0.81}
                height= {56}
                borderRadius = {10}
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
                placeholder={"johndoe@bu.edu"}
                
                style={{fontFamily: "Nunito_400Regular",}}
                onSubmitEditing={() => { this.usernameSTextInput.focus(); }}
                blurOnSubmit={false}
                value={this.state.email}
                onChangeText={this.handleEmail}
              />
              
              </View>
              {this.state.em == "empty" && this.state.email == "" && <Text style={styles.invalidPasswordTextStyle}>BU E-mail is empty</Text>}
              {this.state.embu == "empty" && this.state.email != "" && <Text style={styles.invalidPasswordTextStyle}>This BU E-mail does not exist</Text>}
            </View>

            <View style={styles.userNameTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.us == "empty" ? 'red' : "maroon",
                fontFamily: "Nunito_400Regular",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                marginTop: 8,
              }}>Username</Text>

              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <View style={{flexDirection: "row", }}>
              <TextInput
                backgroundColor= "#FFF"
                borderWidth = {1}
                fontSize={16}
                borderColor={this.state.us == "empty" ? 'red' : "maroon"}
                width= {width * 0.81}
                height= {56}
                borderRadius= {10}
                paddingTop = {8}
                paddingBottom = {8}
                paddingStart ={15}
                paddingEnd= {22}
                opacity= {1}
                placeholder={"john"}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                style={{fontFamily: "Nunito_400Regular",}}
                returnKeyType="next"
                onSubmitEditing={() => { this.buIdSTextInput.focus(); }}
                blurOnSubmit={false}
                ref={(input) => { this.usernameSTextInput = input; }}
                value={this.state.username}
                onChangeText={this.handleUsername}
              />
              </View>
              </View>
      
            {this.state.us == "empty" && this.state.username == "" && <Text style={styles.invalidPasswordTextStyle}>Username is empty</Text>}
              
            </View>

            <View style={styles.passwordTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.bui == "empty" ? 'red' : "maroon",
                fontFamily: "Nunito_400Regular",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                marginTop: 8,
              }}>BU ID</Text>

              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <View style={{flexDirection: "row", }}>
              <TextInput
                backgroundColor= "#FFF"
                borderWidth = {1}
                fontSize={16}
                borderColor={this.state.bui == "empty" ? 'red' : "maroon"}
                width= {width * 0.81}
                height= {56}
                borderRadius= {10}
                paddingTop = {8}
                paddingBottom = {8}
                paddingStart ={15}
                paddingEnd= {22}
                opacity= {1}
                placeholder={"U********"}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                style={{fontFamily: "Nunito_400Regular",}}
                returnKeyType="next"
                onSubmitEditing={() => { this.passwordTextInput.focus(); }}
                blurOnSubmit={false}
                ref={(input) => { this.buIdSTextInput = input; }}
                value={this.state.buId}
                onChangeText={this.handleBUId}
              />
              </View>
              </View>
      
            {this.state.bui == "empty" && this.state.buId == "" && <Text style={styles.invalidPasswordTextStyle}>BU Id is empty</Text>}
              
            </View>
            <View style={styles.passwordTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.pa == "empty" ? 'red' : "maroon",
                fontFamily: "Nunito_400Regular",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                marginTop: 8,
              }}>Password</Text>

              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <View style={{flexDirection: "row", }}>
              <TextInput
                backgroundColor= "#FFF"
                borderWidth = {1}
                fontSize={16}
                borderColor={this.state.pa == "empty" ? 'red' : "maroon"}
                width= {width * 0.81}
                height= {56}
                borderRadius= {10}
                paddingTop = {8}
                paddingBottom = {8}
                paddingStart ={15}
                paddingEnd= {22}
                opacity= {1}
                placeholder={"********"}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                style={{fontFamily: "Nunito_400Regular",}}
                ref={(input) => { this.passwordTextInput = input; }}
                returnKeyType="next"
                onSubmitEditing={() => { this.confirmPasswordTextInput.focus(); }}
                blurOnSubmit={false}
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
            {this.state.pa == "empty" && this.state.password == "" && <Text style={styles.invalidPasswordTextStyle}>Password is empty</Text>}
              
            </View>

            <View style={styles.passwordTextStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.cpa == "empty" ? 'red' : "maroon",
                fontFamily: "Nunito_400Regular",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                marginTop: 8,
              }}>Confirm Password</Text>

              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10,
              }}>
              <View style={{flexDirection: "row" }}>
              <TextInput
                backgroundColor= "#FFF"
                borderWidth = {1}
                fontSize={16}
                borderColor={this.state.cpa == "empty" ? 'red' : "maroon"}
                width= {width * 0.81}
                height= {56}
                borderRadius= {10}
                paddingTop = {8}
                paddingBottom = {8}
                paddingStart ={15}
                paddingEnd= {22}
                opacity= {1}
                placeholder={"********"}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                style={{fontFamily: "Nunito_400Regular",}}
                ref={(input) => { this.confirmPasswordTextInput = input; }}
                value={this.state.confirmPassword}
                secureTextEntry={this.state.secureTextEntry?true:false}
                onChangeText={this.handleConfirmPassword}
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
            {this.state.cpa == "empty" && this.state.confirmPassword == "" && <Text style={styles.invalidPasswordTextStyle}>Confirm Password is empty</Text>}
            {this.state.cpa == "empty" && this.state.showCpa == "empty" && this.state.confirmPassword != "" && <Text style={styles.invalidPasswordTextStyle}>Passwords don't match</Text>}
            </View>

            <View style={styles.codeTextSStyleView}>
                <Text style={{
                  fontSize: 12,
                  color: this.state.qu == "empty" ? 'red' : "maroon",
                  fontFamily: "Nunito_400Regular",
                  textAlign: "left",
                  paddingBottom: 5,
                  paddingLeft: 12,
                  opacity: 1,
                  fontWeight: "400",
                  marginTop: 8,
                }}>Secret Question</Text>

              <Dropdown
                    value={"Select Question"}
                    data={this.state.questList}
                    baseColor={"#FFF"}
                    textColor={"maroon"}
                    fontSize={15}
                    selectedItemColor={"maroon"}
                    style={{fontFamily: "Nunito_400Regular",}}
                    itemPadding={8}
                    itemTextStyle={{ marginLeft: 5, fontFamily: "Nunito_400Regular", }}
                    dropdownMargins={{ min:8, max:6 }}
                    overlayStyle={{bottom: 10, alignSelf: "center", }}
                    dropdownOffset={{top: 12, left: 0}}
                    containerStyle={{
                      borderColor: this.state.qu == "empty" ? 'red' : "maroon",
                      backgroundColor: "#FFF",
                      borderWidth: 1,
                      borderRadius: 10,
                      marginHorizontal: 10,
                      paddingLeft: 15,
                      height: 56,
                      alignSelf: "center",
                      width: width * 0.80,
                      fontFamily: "Nunito_400Regular",
                    }}
                    onChangeText={(value) => this.handleQuestion(value)}
                  />
                  <AntDesign
                    name="down"
                    color="maroon"
                    style={{ alignSelf: "flex-end", right: 30, bottom: 32, opacity: 1 }}
                    size={13}/>
              {this.state.qu == "empty" && this.state.question == "Select Question" && <Text style={styles.invalidDropdownTextStyle}>Please select a secret Question</Text>}
              </View>

              <View style={styles.answerTextSStyleView}>
              <Text style={{
                fontSize: 12,
                color: this.state.ans == "empty" ? 'red' : "maroon",
                fontFamily: "Nunito_400Regular",
                textAlign: "left",
                paddingBottom: 5,
                paddingLeft: 5,
                opacity: 1,
                fontWeight: "400",
                marginTop: 8,
              }}>Secret Answer</Text>

              <View style={{
                width: width * 0.81,
                height: 54,
                padding: 1,
                borderRadius: 10
              }}>
              <View style={{flexDirection: "row", }}>
              <TextInput
                backgroundColor= "#FFF"
                borderWidth = {1}
                fontSize={16}
                borderColor={this.state.ans == "empty" ? 'red' : "maroon"}
                width= {width * 0.81}
                height= {56}
                borderRadius= {10}
                paddingTop = {8}
                paddingBottom = {8}
                paddingStart ={15}
                paddingEnd= {22}
                opacity= {1}
                placeholder={"Answer"}
                
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                style={{fontFamily: "Nunito_400Regular",}}
                // returnKeyType="next"
                // onSubmitEditing={() => { this.buIdSTextInput.focus(); }}
                // blurOnSubmit={false}
                // ref={(input) => { this.usernameSTextInput = input; }}
                value={this.state.answer}
                onChangeText={this.handleAnswer}
              />
              </View>
              </View>
      
            {this.state.ans == "empty" && this.state.answer == "" && <Text style={styles.invalidPasswordTextStyle}>Secret Answer is empty</Text>}
              
            </View>
            </View>}
            <TouchableOpacity
                onPress={this.onPressLogin.bind(this)}
                style={{ alignSelf: "center", width: width * 0.81, height: 40, backgroundColor: "maroon", borderRadius: 10, opacity: 1, marginTop: 22, marginBottom: 22  }}>
                <Text style={styles.loginButtonText}>SUBMIT</Text>
            </TouchableOpacity>

            
            <View flexDirection="row" alignSelf="center" marginTop={10} marginBottom={10}>
            <Text style={styles.dontHaveAccountTextStyle}>Have an account?{" "}</Text>
            <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Welcome")
                }>
            <Text style={styles.dontHaveAccountMintTextStyle}>Sign in</Text>
            </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
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
    width: width,
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
    marginTop: 15,
    alignSelf: "center",
  },
  passwordTextStyleView: {
    marginTop: 15,
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
    fontFamily: "Nunito_400Regular",
    textAlign: "right",
    marginTop: 18, 
    marginBottom: 22
  },
  dontHaveAccountTextStyle: {
    fontSize: 12,
    color: "#000000",
    marginBottom: 1,
    opacity: 1,
    marginStart: 5,
    fontWeight: "400",
    fontFamily: "Nunito_400Regular",
    alignSelf: "center",
  },
  dontHaveAccountMintTextStyle: {
    fontSize: 16,
    color: "maroon",
    marginBottom: 1,
    fontWeight: "600",
    opacity: 1,
    fontFamily: "Nunito_400Regular",
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
    fontFamily: "Nunito_400Regular",
    padding: 5,
    fontWeight: "400",
    fontSize: 20,
  },
  signUpButtonText: {
    color: "#4848FF",
    textAlign: "center",
    fontFamily: "Nunito_400Regular",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#E5E5E5",
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