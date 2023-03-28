import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Animated, AnimatedRegion } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import React, { useEffect, useRef, useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons } from "@expo/vector-icons";
import { container } from "./SelectPositionScreenStyle";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetApi from "../../api/GetApi";

const SelectPositionScreen = ({ navigation, props }) => {
  const isFocused = useIsFocused();
  const mapRef = useRef();
  const [cusId, setCusId] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
    // latitudeDelta: 0.012,
    // longitudeDelta: 0.013,
  });
  const [selectedPosition, setSelectedPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (isFocused) {
      getCustomerData();
    }
  }, [isFocused]);

  const fetchCustomerData = async (cusId) => {
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/customer/GetCustomerPosition.php?cus_id= ${cusId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          setCurrentPosition({
            latitude: data.request.cus_lat,
            longitude: data.request.cus_lng,
          });
        } else {
          console.log(data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getCustomerData = async () => {
    await AsyncStorage.getItem("@account").then((res) => {
      let accountId = JSON.parse(res);
      if (accountId == null) {
        console.log("not found");
      } else {
        fetchCustomerData(accountId);
        setCusId(accountId);
      }
    });
  };

  const onPlaceSelected = async (name, lat, lng) => {
    setCurrentPosition({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.012,
      longitudeDelta: 0.013,
    });
    setSelectedPosition({latitude: lat, longitude: lng})
    setPlaceName(name)
  }

  const postCustomerLocation = async () => { 
    var formdata = new FormData();
    formdata.append("cus_id", cusId.split(",")[0]);
    formdata.append("placeName", placeName);
    formdata.append("latitude", selectedPosition.latitude);
    formdata.append("longitude", selectedPosition.longitude);
    try {
      await GetApi.useFetch(
        "POST",
        formdata,
        `/customer/PostLocationCustomer.php`
      ).then((res) => {
        let data = JSON.parse(res);
        console.log(res);
        if (data.success) {
          navigation.goBack();
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={container}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View style={{ paddingHorizontal: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={30} color="#4691FB" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            postCustomerLocation()
          }}>
            <Text style={{color: "#4691FB"}}>{"บันทึก"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={currentPosition}
        region={currentPosition}
      >
        <Marker coordinate={currentPosition} title="You're here"></Marker>
      </MapView>

      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder="ค้นหาตำแหน่ง"
          fetchDetails
          onPress={(data, details = null) => {
            console.log(details.name, details.geometry.location.lat, details.geometry.location.lng);
            setPlaceName(details.name);
            onPlaceSelected(details.name, details.geometry.location.lat, details.geometry.location.lng);
          }}
          query={{
            key: "AIzaSyCRIHZm8hYtb2iJp1-0ITTVxLZVoNP8UWM",
            language: "th",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#ffff",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: 44,
    marginTop: 50,
  },
  input: {
    borderColor: "#4691FB",
    borderWidth: 1,
  },
});

export default SelectPositionScreen;
