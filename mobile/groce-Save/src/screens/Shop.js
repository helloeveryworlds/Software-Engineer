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
  Platform,
  Alert
} from "react-native";
 import groceSaveItemService from "../service/GroceSaveItemService";
import SearchIcon from "../../assets/svgs/search";
import  Loader  from '../components/Loader';
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const initialState = { 
  isLoading: false, 
  click: "",
  input: "",
  updatedList: [],
  list: [],
  mainList: [],
  mainData: {},
  indexes: [],
  indexesCount: [],
  indexesCountSub: [],
  indexesSub: [],
  newCartList: [],
  selectedItemsList: [],
  filteredData: [],
  newlyList: [],
  latestList: []
};

class Shop extends Component {
  state = initialState;

  handleInput = (input) => {  
    if(input != ""){
      this.search(input)
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
        Alert.alert(null, err.substring(item.indexOf(":") + 1).trim())
        this.setState({ isLoading: false, isAuthorized: true });

      });
    
    }

    componentDidMount(){
      this.itemList();
    }

    addToCart(item, key){
      this.scrollView.scrollTo({x: 0, y: 0, animated: true}) 
      this.state.selectedItemsList.push({
        id: key+"",
        image: item.substring(item.indexOf(",") + 1),
        name: item.split(',')[0].trim(),
      });

      this.setState({ newCartList: [...this.state.selectedItemsList] });
      console.log("itemitemitem",this.checkRight(item.split(',')[0].trim()))

      let input = this.state.input

      //Testing list..
      const array1 = this.state.selectedItemsList;
      const array2 = [];

      this.state.list.forEach((data)=>{
      // Find the object with id = 2 in array1
      const foundObject = array1.find(item => item.name === data.split(',')[0].trim());

      // Add the found object to array2
      array2.push(foundObject);
      }
      )
      var filtered = array2.filter(function(x) {
        return x !== undefined;
      });

      if(this.state.newlyList.includes(input)){ 
      }else{
        filtered.forEach((data)=>{
      let obj = {
        [input + ""]: data
      }

      this.state.newlyList.push(
        JSON.parse(JSON.stringify(obj))
      )

      this.setState({ latestList: [...this.state.newlyList] });
      console.log("chino xssssssssssss",this.state.newlyList);
      })
      }
    }

    toCart(){
      this.props.navigation.navigate("Cart", {
        array: this.state.newCartList
      })
    }

    removeFromCart(index){
      let newList = this.state.selectedItemsList;

      var removeIndex = newList.map(function(item) { return item.id; }).indexOf(index);
      newList.splice(removeIndex,1); 
      newList.splice()

      // newList = newList.filter(function(item) {
      //   return item.id !== index
      // })

      this.setState({ newCartList: newList })
      console.log("Hiiiiiiiiiii", newList)
    }

    componentWillMount() {
      this.setState({ newCartList: [...this.state.selectedItemsList] });
      console.log("newCartList", this.state.selectedItemsList);
    }

    checkRight(name){
      return this.state.selectedItemsList.some(el => el.name === name)
    }

    sendIndex(index){
      this.state.indexesCount.push(
        index
      );

      this.setState({ indexes: [...this.state.indexesCount] });
    }

    sendIndexSub(index){
      this.state.indexesCountSub.push(
        index
      );

      this.setState({ indexesSub: [...this.state.indexesCountSub] });
    }

    changeColorState(index) {
      let indexes = this.state.indexes.slice(0);
      if(indexes.indexOf(index) == -1)
          indexes.push(index);
      else{
          let id = indexes.indexOf(index);
          indexes.splice(id, 1)
      }
      this.setState({indexes});
  }

  changeColorStateSub(index) {
    let indexesSub = this.state.indexesSub.slice(0);
    if(indexesSub.indexOf(index) == -1)
    indexesSub.push(index);
    else{
        let id = indexesSub.indexOf(index);
        indexesSub.splice(id, 1)
    }
    this.setState({indexesSub});
  }

  search = (text) => {
    if (text) {
      const newData = this.state.mainList.filter(
        function (item) {
          const itemData = item
            ? item.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      
      this.setState({ filteredData: newData, text: text })
      if(text != ""){
        this.setState({ input: text, in: "" });
      }else {
        this.setState({ input: text, in: "empty" });
      } 

    } else {
      this.setState({ filteredData: this.state.mainList })
    }
  };

  itemView = ({item, index}) => {
    return (
      <Text
        style={styles.itemStyle}
        onPress={() => this.getItem(item, index)}>
        {item}
      </Text>
    );
  };

  itemSeparatorView = () => {
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

  getItem = (item, index) => {
    this.setState({ input: item, filteredData: [], click: "clicked" })
    if(this.state.mainList.includes(item)){
    this.itemList(item)
    }else{
      Alert.alert(null,"Catergory not here")
    }
  };

  renderElement(item, key){
    const { mainData, list, click } = this.state;
    const selectedItems = []

    selectedItems.push({ key })
    console.log("selectedItems selectedItems selectedItems",this.state.selectedItemsList )
    return(
      <View style={styles.itemContainer} key={key}>
      
      <View style={styles.details}>
      <View style={{ backgroundColor: "#FFF" }}>
      {click ? 
        <Image 
          source={{ uri: item.substring(item.indexOf(",") + 1) }}
          style={{ width: width * 0.35, height: 100, borderRadius: 6, marginBottom: 3, alignSelf: "center" }}
          key={key}
          /> 
          : 
        <Image 
          source={{url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsUhUsM8JuZ4MKDjlPNox4QuV81hnoccTW_A&usqp=CAU"}}//require("../../assets/grocery.png")}
          style={{ width: 100, height: 100, alignSelf: "center" }}
          />}
      </View>
      <View style={{ backgroundColor: "#F6F6F6", padding: 12, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
      {!list ? <Text key={key} style={styles.mainTextDetails}>{item.split(',')[0].trim()}</Text> : 
      <Text key={key} style={styles.textDetails}>{item.split(',')[0].trim()} </Text>}
      {!list ? <View style={styles.viewSpace}/> :
      <View>
      <Text style={styles.numDetails}>$0.71/LB</Text>
      <Text style={styles.soldDetails}>Sold by <Text style={styles.locDetails}>Target</Text></Text>
      </View>
      }

      {!list ? 
      <TouchableOpacity
          key={key}
          style={{ 
          backgroundColor: this.state.indexes.includes(key) ? "#808080" : "green",
          width: width * 0.30,
          height: 35,
          borderRadius: 50,
          alignSelf: "center",
          marginTop: Platform.OS === "ios" ? -10: -10,}}
          onPress={()=> { 
          this.sendIndex(key)
          this.scrollView.scrollTo({x: 0, y: 0, animated: true}) 
          this.setState({ list: mainData[item], click: "clicked", input: item })}}>
          <Text style={styles.viewBtnDetails}>View Category</Text>
      </TouchableOpacity> : 
      !this.checkRight(item.split(',')[0].trim(),key) ?
      <TouchableOpacity
        key={key}
        style={{
          backgroundColor: this.checkRight(item.split(',')[0].trim(),key) ? "#1B6EBB60" : "#1B6EBB" ,
          width: width * 0.30, 
          height: 35,
          borderRadius: 50,
          alignSelf: "center",
          marginTop: Platform.OS === "ios" ? -10: -10,
        }}
        onPress={()=> { 
          // this.sendIndexSub(key)
          this.addToCart(item, key)
        }}>
      <Text style={styles.itemBtnDetails}>Add to cart</Text>
      </TouchableOpacity> : 
      <TouchableOpacity
      key={key}
      style={{
        backgroundColor: this.checkRight(item.split(',')[0].trim(),key)  ? "#1B6EBB60" : "#1B6EBB" ,
        width: width * 0.30, 
        height: 35,
        borderRadius: 50,
        alignSelf: "center",
        marginTop: Platform.OS === "ios" ? -10: -10,
      }}
      onPress={()=> this.removeFromCart(key)}>
    <Text style={styles.itemBtnDetails}>Remove</Text>
    </TouchableOpacity>}
      </View>
      </View>
      </View>
    );
  }

  render() {
    LogBox.ignoreAllLogs(true);
    const { click, list, mainList, input, newCartList, indexesCountSub,  } = this.state;
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
              value={this.state.input}
              onChangeText={(text)=> this.search(text)}
              />
              <View style={{ bottom: 35, paddingStart: width * 0.16 }}>
              <SearchIcon/>
              </View>

              <FlatList
                data={this.state.filteredData}
                style={{ backgroundColor: "#FFF" }}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.itemSeparatorView}
                renderItem={this.itemView}
              />

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

                {newCartList.length != 0 && 
                <View>
                  <View style={styles.best}>
                  <Text style={{ fontSize: newCartList.length > 9 ? 9.5 : 12, paddingTop: newCartList.length > 9 ? 2 : 0, paddingHorizontal: newCartList.length > 9 ? 7 : 9,  }}>{newCartList.length}</Text>
                  </View>
                <TouchableOpacity onPress={()=> this.toCart()}>
                  <FontAwesome5 
                  name={"shopping-cart"} 
                  style={{ color: "#FF0080", alignSelf: "flex-end", marginEnd : 30, marginBottom: 10 }}
                  size={25}/>
                  </TouchableOpacity>
                  </View>}
                {!list ? 
                  <FlatList
                    data={mainList}
                    renderItem={({ item, index }) => (
                      this.renderElement(item, index)
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                  />
                   :
                  <FlatList
                   data={list}
                   renderItem={({ item, index }) => (
                     this.renderElement(item, index)
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
  containerr: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
    marginStart: 70,
    width: width * 0.5
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
  
  itemContainer: {
    flex: 1,
    borderRadius: 30,
    width: width * 0.6,
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
    marginTop: Platform.OS === "ios" ? -10: -10,
  },
  viewBtn: {
    backgroundColor: "green",
    width: width * 0.30,
    height: 35,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: Platform.OS === "ios" ? -10: -10,
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
    color: "blue",
    marginBottom: 10
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