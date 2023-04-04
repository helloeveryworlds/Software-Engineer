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
  FlatList,
  Platform
} from "react-native";
 import groceSaveItemService from "../service/GroceSaveItemService";
import SearchIcon from "../../assets/svgs/search";
import  Loader  from '../components/Loader';

const { width, height } = Dimensions.get("window");

const initialState = { 
  isLoading: false, 
  click: "",
  input: "",
  list: [],
  mainList: [],
  mainData: {},
};

class Shop extends Component {
  state = initialState;

  handleInput = (input) => {  
    if(input != ""){
      this.itemList(input)
      // this.search(input)
      this.setState({ input: input, in: "" });
    }else {
      this.setState({ input: input, in: "empty" });
    } 
  };

  itemList(input) {
    this.setState({ isLoading: true });

    groceSaveItemService
      .get('/itemList')
      .then(data => {
        if(data){
          this.setState({ isLoading: false });
        if(input != ""){
        const info = data.data[input];
        this.setState({ list: info })
        
        const mainList = Object.keys(data.data);
        console.log("Yaaaaay!!!",data.data[input])
        console.log("Mainlist Yaaaaay!!!",mainList)
        this.setState({ mainList: mainList })
        this.setState({ mainData: data.data })        
        }
        } else {
          this.setState({ isLoading: true });
        }
      })
      .catch((err) => {
        console.log(err)
        this.setState({ isLoading: false, isAuthorized: true });

      });
    }

    componentDidMount(){
      this.itemList();
    }

    search = txt => {
      if(txt == ""){
        this.setState({ mainData: {} })
      }else{
      let text = txt.toLowerCase()
      let tracks = this.state.mainData[txt]
      let filterTracks =  tracks.filter(item => {
      if(item.toLowerCase().match(text)) {
        return item
      }
      })
      if(filterTracks.length != 0){
        this.setState({ mainData: filterTracks })
      }else{
        this.setState({ mainData: {} })
      }
    }
    }

    renderElement(item, key){
      const { mainData, list } = this.state;
      return(
        <View style={styles.itemContainer}>
        
        <View style={styles.details}>
        <View style={{ backgroundColor: "#FFF"}}>
        <Image 
            source={require("../../assets/fru.png")}
            style={{
                resizeMode: 'center',
                marginTop: 0,
                alignSelf: "center",
                paddingVertical: 20,
            }}
            />
        </View>
        <View style={{ backgroundColor: "#F6F6F6", padding: 12, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
        {!list ? <Text key={key} style={styles.mainTextDetails} > { item } </Text> : 
        <Text key={key} style={styles.textDetails} > { item } </Text>}
        {!list ? <View style={styles.viewSpace}/> :
        <View>
        <Text style={styles.numDetails}>$0.71/LB</Text>
        <Text style={styles.soldDetails}>Sold by <Text style={styles.locDetails}>Target</Text></Text>
        </View>
        }

        {!list ? 
        <TouchableOpacity
            style={styles.viewBtn}
            onPress={()=> {this.scrollView.scrollTo({x: 0, y: 0, animated: true}) 
            this.setState({ list: mainData[item], click: "clicked", input: item })}}>
            <Text style={styles.viewBtnDetails}>View Category</Text>
        </TouchableOpacity> :
        <TouchableOpacity
        style={styles.itemBtn}
        onPress={()=> this.props.navigation.navigate("Cart")}>
        <Text style={styles.itemBtnDetails}>Add to cart</Text>
        </TouchableOpacity>}
        </View>
        </View>
        </View>
      );
    }

  render() {
    LogBox.ignoreAllLogs(true);
    const { click, list, mainList, input } = this.state;
    console.log(list)

      return (
        <ScrollView
          ref={scrollView => this.scrollView = scrollView}
          keyboardShouldPersistTaps="always" backgroundColor="#FFF">
          <StatusBar backgroundColor="#F4EFEF" barStyle="dark-content"/>
          <Loader loading={this.state.isLoading} />

              <View style={{ marginVertical: 5 }}>
              <TextInput 
              style={styles.optionContainer}
              onChangeText={this.handleInput}
              />
              <View style={{ bottom: 35, paddingStart: width * 0.16 }}>
              <SearchIcon/>
              </View>
              {!list ? 
              <Text style={styles.infoTextStyle}>Categories</Text> : <Text style={styles.infoTextStyle}>{input}</Text>}
              
              <View
                width={width * 0.9} 
                height={1.5} 
                backgroundColor={"#DDD"} 
                alignSelf={"center"} 
                marginVertical={15}
                />

              {list && click != "" ? 
                <TouchableOpacity style={{ marginStart: 18 }} onPress={()=> this.setState({ click: "", input: "", list: null  })}>
                <Text style={styles.backText}>{"<< "}Back to Categories</Text>
                </TouchableOpacity>
                : null}

                {!list ? 
                  <FlatList
                    data={mainList}
                    renderItem={({ item, key }) => (
                      this.renderElement(item, key)
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                  />
                   :
                  <FlatList
                   data={list}
                   renderItem={({ item, key }) => (
                     this.renderElement(item, key)
                   )}
                   numColumns={2}
                   keyExtractor={(item, index) => index}
                 />} 
            </View>
        </ScrollView>
      );
    }
}


export default Shop;

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
  image: {
    flex: 1,
    width: Platform.OS === "ios" ? width : width,
  },
  itemContainer: {
    flex: 1,
    borderRadius: 30,
    width: width * 0.6,
    // height: height * 0.35,
    marginTop: 20,
    padding: 0,
    alignSelf: "center",
  },
  itemBtn: {
    backgroundColor: "#1B6EBB",
    width: width * 0.30,
    height: 35,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? -10: 10,
  },
  viewBtn: {
    backgroundColor: "green",
    width: width * 0.30,
    height: 35,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? -10: 10,
  },
  itemBtnDetails: {
    fontSize: 16,
    padding: 5,
    textAlign: "center",
  },
  viewBtnDetails: {
    fontSize: 14,
    padding: 7,
    textAlign: "center",
  },
  details: {
    marginTop: -30, 
    marginHorizontal: 20,
    padding: 10,
    width: width * 0.4
  },
  textDetails: {
    fontSize: 14,
    fontWeight: "600"
  },
  backText: {
    textDecorationLine: "underline",
    fontWeight: "500",
    color: "blue"
  },
  mainTextDetails: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    color: "purple"
  },
  numDetails: {
    fontSize: 14,
  },
  viewSpace: {
    marginVertical: 12,
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