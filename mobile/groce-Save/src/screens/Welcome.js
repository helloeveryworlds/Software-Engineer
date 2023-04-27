import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  LogBox,
  FlatList,
  TextInput,
  ImageBackground,
  Alert,
  Platform
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from "@expo/vector-icons";

import SearchIcon from "../../assets/svgs/search";
import GitHubIcon from "../../assets/svgs/github"
import Loader from "../components/Loader";

const { width, height } = Dimensions.get("window");


const Welcome = ({ route, navigation }) => {
  const loginInfo = useSelector((state) => state.login.login);
  const [ isLoading, setIsLoading ] = useState(false);
  const [text, setText] = useState("");
  const [list, setList] = useState([
    { store: "Whole Food" },
    { store: "Target" },
    { store: "Star Market" }
  ]);
  const [filteredData, setFilteredData] = useState([]);
  
  const toCart = () => {
    if(loginInfo[0].cart.orderItemList.length != 0){
      navigation.navigate("Cart", {
        array: loginInfo[0].cart.orderItemList
      })
    }else{
    navigation.navigate("Cart", {
      array: []
    })
    }
  }

  const search = (text) => {
    if (text) {
      const newData = list.filter(
        function (item) {
          const itemData = item.store
            ? item.store.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      
      setFilteredData(newData)
      setText(text);
    } else {
      setFilteredData(list)
    }
  };

  const itemView = ({item}) => {
    return (
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
        {item.store}
      </Text>
    );
  };

  const itemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    Alert.alert(null,"Yes we have "+item.store+" on our list of stores to search!")
  };

    LogBox.ignoreAllLogs(true);
      return (
      <ScrollView
          keyboardShouldPersistTaps="always">
        <ImageBackground
          source={require('../../assets/splashh.png')}
          style={{ height: height, backgroundColor: "#FFF" }}>
          <Loader loading={isLoading} />
          
          <StatusBar backgroundColor="#F4EFEF" barStyle="dark-content"/>
          
              {/* {loginInfo.length != 0 &&
                <View style={{ marginTop: 20, right: -5 }}>
                  
                   <View style={styles.best}>
                  {loginInfo.length != 0 ? 
                  <Text style={{ fontSize: loginInfo[0].cart.orderItemList.length > 9 ? 9.5 : 12, paddingTop: loginInfo[0].cart.orderItemList.length > 9 ? 2 : 1, paddingHorizontal: loginInfo[0].cart.orderItemList.length > 9 ? 7.5 : 9,  }}>{loginInfo[0].cart.orderItemList.length}</Text>
                   : 
                   null}
                  </View>
                <TouchableOpacity onPress={()=> toCart()}>
                  <FontAwesome5 
                    name={"shopping-cart"} 
                    style={{ color: "#FF0080", alignSelf: "flex-end", marginEnd : 30, marginBottom: 10 }}
                    size={25}/>
                  </TouchableOpacity>
                  </View>} */}

            <View style={{ marginVertical: height * 0.2 }}>
              <TextInput 
              style={styles.optionContainer}
              placeholder={"Search available stores"}
              onChangeText={(input) => search(input)}
              />

              <View style={{ bottom: 35, paddingStart: 20 }}>
              <SearchIcon/>
              </View>
              <FlatList
                data={filteredData}
                style={{ backgroundColor: "#FFF" }}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={itemSeparatorView}
                renderItem={itemView}
              />
            <View flexDirection="row" alignSelf="center" marginTop={10} marginBottom={10}>
            <Text style={styles.infoTextStyle}>The right store with the right price</Text>
            </View>
            </View>
          </ImageBackground>
        <View  style={{ height: height, backgroundColor: "#F4EFEF", padding: 25 , marginBottom: Platform.OS === "ios" ? 100 : 10 }}>
        <Text style={styles.bigText}>Shop</Text>
          <View
            width={90} 
            height={4} 
            marginLeft={5}
            backgroundColor={"#E91E63"} 
            alignSelf={"flex-start"} 
            marginVertical={5}
            />
        <TouchableOpacity onPress={()=> navigation.navigate("Shop")}>
        <Text style={styles.smallText_}>Shopping Page</Text>
        </TouchableOpacity>
        <Text style={styles.bigText}>Students</Text>
        <View
            width={90} 
            height={4} 
            marginLeft={5}
            backgroundColor={"#E91E63"} 
            alignSelf={"flex-start"} 
            marginVertical={5}
            />
        <Text style={styles.smallText}>Ratan J Naik</Text>
        <Text style={styles.smallText}>Fuhao Ruan</Text>
        <Text style={styles.smallText}>Chibundom Ejimuda</Text>
        <Text style={styles.smallText}>Zijie Wang</Text>
        <Text style={styles.smallText}>Zheng Zhang</Text>
        <Text style={styles.smallText}>Bauyrzhan Kussayev</Text>
        <Text style={styles.smallText}>Qiwei Li</Text>
        <Text style={styles.smallText_}>Shweta Mishra</Text>

        <Text style={styles.bigText}>Boss Mode</Text>
        <View
            width={90} 
            height={4} 
            backgroundColor={"#E91E63"} 
            alignSelf={"flex-start"} 
            marginTop={5}
            marginLeft={5}
            marginBottom={20}
            />
        <GitHubIcon/>
        </View>
        </ScrollView>
      );
    }

export default Welcome;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerr: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    width: width * 0.50,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  bigText:{
    fontSize: 36,
    fontWeight: "400",
    marginTop: 10,
    lineHeight: 43.57,
  },
  smallText:{
    fontSize: 24,
    fontWeight: "400",
    marginTop: 10,
    lineHeight: 29.05,
  },
  smallText_:{
    fontSize: 24,
    fontWeight: "400",
    marginTop: 10,
    lineHeight: 29.05,
    marginBottom: 40
  },
  best: {
    backgroundColor: "#EFDB6F",
    paddingVertical: 4,
    fontSize: 11,
    width: 25,
    height: 25,
    position: "absolute",
    right: 3,
    top: -15,
    marginRight: 10,
    borderRadius: 100,
  },
  image: {
    flex: 1,
    width: Platform.OS === "ios" ? width : width,
  },
  optionContainer: {
      borderRadius: 20,
      width: width * 0.9,
      height: 50,
      justifyContent: "space-between",
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
    fontSize: 26,
    color: "black",
    marginTop: 20,
    paddingLeft: 5,
    width: width * 0.6,
    textAlign: "center",
    fontWeight: "500",
    opacity: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFFF",
  },
});