import {
  View,
  Dimensions,
  StyleSheet,
  Button,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

const MapTest = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 13.845880018908929,
    longitude: 100.5640425554577,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: 13.814960922983204, 
      longitude: 100.56503558421038,
      latitudeDelta: 0.04,
      longitudeDelta: 0.05,
    });
    // console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    // userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="marker" />
      </MapView>
      <Button title="Get Location" onPress={userLocation} />
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
    height: Dimensions.get("window").height - 100,
  },
});

export default MapTest;
