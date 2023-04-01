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
} from "./RiderMainScreenStyle";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";
import GetApi, { API } from "../../api/GetApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStatusBarHeight } from "react-native-status-bar-height";

const RiderMainScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 13.847468594271557,
    longitude: 100.56969677482991,
    latitudeDelta: 0.012,
    longitudeDelta: 0.013,
  });
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [picture, setPicture] = useState("");

  useEffect(() => {
    if (isFocused) {
      getCurrentPosition();
      getRiderData();
      // fetchJobFromOrder();
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
      latitude: location.coords.latitude, //change -> location.coords.latitude to test or 13.814960922983204
      longitude: location.coords.longitude, //change -> location.coords.longitude to test or 100.56503558421038
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
      }
    });
  };

  return (
    <View style={container}>
      <View style={{ position: "absolute" }}>
        <MapView
          region={currentPosition}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
        >
          <Marker coordinate={currentPosition} title={"คุณอยู่ที่นี่"} />
        </MapView>
      </View>
      <View style={[content1, { marginTop: getStatusBarHeight() }]}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={button}
            onPress={() => navigation.navigate("ProfitRider")}
          >
            <Text style={[text, { fontSize: 18, color: "#ffffff" }]}>
              {"รายได้"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={activeButton}
            onPress={() => navigation.navigate("JobList")}
          >
            <Text style={[text, { fontSize: 18, color: "#ffffff" }]}>
              รับงาน
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={{ uri: API.urlRiderImage + picture }}
            style={{ width: 80, height: 80 }}
          />
          <Text style={text}>{fname + " " + lname}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
});

export default RiderMainScreen;
