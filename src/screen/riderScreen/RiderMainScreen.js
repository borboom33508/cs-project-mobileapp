import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  container,
  button,
  text,
  content1,
  activeButton,
  inactiveButton,
} from "./RiderMainScreenStyle";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";

const RiderMainScreen = ({ navigation, props }) => {
  const [currentPosition, setCurrentPosition] = useState({});
  const [fname, setFname] = useState("จอห์น");
  const [lname, setLname] = useState("เบียร์ด");
  const [rating, setRating] = useState("5.0");
  const [picture, setPicture] = useState("20230313191544_johnbeard.jpg");
  const [isActive, setIsActive] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getCurrentPosition();
    }
  }, [isFocused]);

  const getCurrentPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setCurrentPosition({
      latitude: 13.814960922983204, //change -> location.coords.latitude to test
      longitude: 100.56503558421038, //change -> location.coords.longitude to test
      latitudeDelta: 0.012,
      longitudeDelta: 0.013,
    });
  };

  return (
    <View style={container}>
      <View style={content1}>
        <TouchableOpacity
          style={button}
          onPress={() => {
            navigation.navigate("ProfitRider");
          }}
        >
          <Text style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}>
            {"รายได้"}
          </Text>
        </TouchableOpacity>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../../../assets/unknown-user.png")}
            style={{ width: 80, height: 80 }}
          />
          <Text>{fname + " " + lname}</Text>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="star" color="orange" />
            <Text style={{ marginLeft: 8 }}>{rating}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffff",
          alignItems: "center",
          justifyContent: "center",
          // position: "absolute"
        }}
      >
        <MapView region={currentPosition} style={styles.map}>
          <Marker coordinate={currentPosition} title={"คุณอยู่ที่นี่"} />
        </MapView>
      </View>
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <TouchableOpacity
          style={isActive == true ? activeButton : inactiveButton}
          onPress={() => {
            setIsActive(!isActive);
          }}
        >
          <Text style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}>
            {isActive == true ? "Active" : "Inactive"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("screen").width - 20,
    height: Dimensions.get("screen").height - 300,
  },
});

export default RiderMainScreen;
