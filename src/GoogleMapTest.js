import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Dimensions, StyleSheet, View, Button, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";

const GoogleMapTest = () => {
  const { width, height } = Dimensions.get("window");
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 13.847468594271557,
    longitude: 100.56969677482991,
  });

  // const [selectedPosition, setSelectedPosition] = useState({
  //   latitude: 0,
  //   longitude: 0,
  // });

  const [destinationCords, setDestinationCords] = useState({
    latitude: 13.856590317284635,
    longitude: 100.54181361119001,
  });

  const [time, setTime] = useState("");
  const [distance, setDistance] = useState("");

  useEffect(() => {
    getCurrentPosition();


  }, []);

  const getDistance = () => {

  }

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const INITIAL_POSITION = {
    latitude: 13.65502803948876,
    longitude: 100.59427609882063,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const getCurrentPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setCurrentPosition({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.012,
      longitudeDelta: 0.013,
    });
  };

  const onPlaceSelected = async (lat, lng) => {
    setCurrentPosition({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.012,
      longitudeDelta: 0.013,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={currentPosition}
      >
        <Marker coordinate={currentPosition} title="Home" />
        <MapViewDirections
          apikey="AIzaSyCRIHZm8hYtb2iJp1-0ITTVxLZVoNP8UWM"
          origin={currentPosition}
          destination={destinationCords}
          onReady={result => {
            setDistance(parseFloat(result.distance).toFixed(1));
            setTime(parseFloat(result.duration).toFixed(1));
            console.log(`ระยะทาง: ${parseFloat(result.distance).toFixed(1)} กม`);
            console.log(`เวลา: ${parseFloat(result.duration).toFixed(1)} นาที`);
          }}
          onError={(err) => {
            console.log(err);
          }}
        />


      </MapView>

      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          styles={{ textInput: styles.input }}
          placeholder="Search"
          fetchDetails
          onPress={(data, details = null) => {
            let tmp = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            onPlaceSelected(
              details.geometry.location.lat,
              details.geometry.location.lng
            );
            // console.log(data, details);
            // console.log(details.geometry.location.lat);
            // console.log(details.geometry.location.lng);
            // setSelectedPosition(tmp)
            // console.log(selectedPosition);
          }}
          query={{
            key: "AIzaSyCRIHZm8hYtb2iJp1-0ITTVxLZVoNP8UWM",
            language: "th",
          }}
          // currentLocation={true}
          // currentLocationLabel="current location"
        />
        <Text>{`ระยะห่าง : ~${distance} กม.`}</Text>
        <Text>{`เวลาประมาณ : ~${time} นาที`}</Text>
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    height: "20%",
    backgroundColor: "#ffff",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    padding: 8,
    borderRadius: 8,
    top: 44,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
  },
});

export default GoogleMapTest;
