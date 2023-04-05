import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons";

const color = (status) => {
  let color = "";
  if (status == 3) {
    color = "#FF0000";
  } else if (status == 2) {
    color = "#FBA243";
  } else {
    color = "#4848FF";
  }
  return color;
};
                  
const { width } = Dimensions.get("window");
const item = (props) => {
  return (
    <View>
      <View style={styles.cardStyle}>
        <View style={styles.cardHeader} flexDirection="row">
          <View style={styles.cardHeaderLeft} flexDirection="row">
            <AntDesign name="car" size={20} color="#4848ff" />
            <Text style={styles.cardHeaderText}>Outgoing/Moving Vehicle</Text>
          </View>
          
        </View>
        <View style={styles.cardStyleInner}>
          <View style={styles.cardStyleInnerLeftColumn}>
            <Image
              source={require("../../assets/fru.png")}
              size={10}
              style={styles.imageStyle}
            />
          </View>

          <View style={styles.cardStyleInnerRightColumn}>
            <Text style={styles.cardDescription}>
              This driver assigned to this vehicle is{" "}
              <Text style={styles.staffName}>{props} </Text>
            </Text>
            <View flexDirection="row">
              <FontAwesome name="square-o" size={14} color="black" />
              <Text style={styles.cardListTextTwo}>
                Trip Type: {props}
              </Text>
            </View>
            <View flexDirection="row">
              <FontAwesome
                name="location-arrow"
                size={14}
                color="black"
                style={styles.icons}
              />
                
            </View>

            <View flexDirection="row">
              <MaterialIcons name="info" size={14} color="black" />
                <Text style={styles.cardListTextTwoGreen}>{props.array}</Text>
            </View>
            <View flexDirection="row">
              <MaterialIcons name="person" size={14} color="black" />
              <Text style={styles.cardListTextTwo}>
                Assigned by: {props}
              </Text>
            </View>
            
          </View>
        </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F6",
    top: 182,
    left: 19,
    right: 20,
    width: 164,
    height: 99,
  },
  imageStyle: {
    marginBottom: 10,
    color: "#4848FF",
  },
  descriptionText: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 15,
    marginBottom: 27,
    left: 17,
    width: 111,
    marginEnd: 40,
    textAlign: "left",
    color: "#414D5B",
  },
  imageScoreText: {
    fontSize: 15,
    alignSelf: "center",
    color: "#323C47",
    fontWeight: "bold",
  },
  cardTitle: {
    fontWeight: "normal",
    fontSize: 20,
  },
  cardListTextTwo: {
    fontSize: 10,
    marginBottom: 5,
    fontWeight: "bold",
    flexWrap: "wrap",
    textAlign: "left",
    marginStart: 4,
    color: "#7C7C7C",
  },
  cardStyle: {
    alignSelf: "center",
    justifyContent: "space-between",
    width: width * 0.94,
    padding: 20,
    opacity: 1,
    borderLeftWidth: 8,
    marginBottom: 15,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    elevation: 10,
  },
  cardStyleInner: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardStyleInnerLeftColumn: {
    flexDirection: "column",
    width: width * 0.2,
  },
  cardStyleInnerRightColumn: {
    flexDirection: "column",
    width: width * 0.58,
  },
  cardHeaderText: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 10,
  },
  cardListTextTwoRed: {
    fontSize: 10,
    marginBottom: 5,
    fontWeight: "bold",
    flexWrap: "wrap",
    textAlign: "left",
    marginStart: 4,
    color: "#FF0000",
  },
  cardListTextTwoGreen: {
    fontSize: 10,
    marginBottom: 5,
    fontWeight: "bold",
    flexWrap: "wrap",
    textAlign: "left",
    marginStart: 4,
    color: "#4848FF",
  },
  cardHeader: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  approvedLabel: {
    paddingTop: 5,
    borderRadius: 3,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
  },
  cardApprovedLabelText: {
    fontSize: 10,
    flex: 1,
    color: "#fff",
    flexWrap: "wrap",
    alignSelf: "center",
    fontWeight: "bold",
  },
  cardDescription: {
    marginBottom: 10,
  },
  staffName: {
    fontWeight: "bold",
  },
  ButtonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  Button: {
    backgroundColor: "#4848FF",
    borderRadius: 5,
    marginTop: 7,
    justifyContent: "center",
    alignContent: "center",
    width: width * 0.4,
    height: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    alignItems: "center",
  },
});

export default item;