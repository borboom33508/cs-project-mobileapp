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
import GetApi , { API } from "../../api/GetApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UNKNOWN_PICTURE = ""

const RiderMainScreen = ({ navigation, props }) => {
  const [currentPosition, setCurrentPosition] = useState({});
  const [riderId, setRiderId] = useState("")
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [rating, setRating] = useState("");
  const [picture, setPicture] = useState("");
  const [isActive, setIsActive] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getCurrentPosition();
      getRiderData();
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

  const fetchRiderData = async (riderId) => {
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/rider/GetMainRiderRequest.php?rider_id= ${riderId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          setFname(data.request.rider_fname);
          setLname(data.request.rider_lname);
          setRating(data.request.rider_rating);
          setPicture(data.request.rider_picture);
        } else {
          console.log(data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  
  const getRiderData = async () => {
    await AsyncStorage.getItem("@account").then((res) => {
      let riderId = JSON.parse(res);
      if (riderId == null) {
        console.log("not found");
      } else {
        fetchRiderData(riderId);
        setRiderId(riderId)
      }
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
            source={{ uri: API.urlRiderImage + picture }}
            style={{ width: 80, height: 80 }}
          />
          <Text>{fname + " " + lname}</Text>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="star" color="orange" />
            <Text style={{ marginLeft: 8 }}>{parseFloat(rating).toFixed(1)}</Text>
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
