import { View, Dimensions, StyleSheet, Button, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

const MapTest = () => {
  const [mapRegion, setMapRegion] = useState({
    // latitude: 13.845880018908929,
    // longitude: 100.5640425554577,
    // latitudeDelta: 0.012,
    // longitudeDelta: 0.013,
    latitude: 13.807398684169788,
    longitude: 100.55551417909844,
    latitudeDelta: 0.012,
    longitudeDelta: 0.013,
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
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.012,
      longitudeDelta: 0.013,
    });
    // setMapRegion({
    //   latitude: 13.807398684169788,
    //   longitude: 100.55551417909844,
    //   latitudeDelta: 0.012,
    //   longitudeDelta: 0.013,
    // });
    // console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    // userLocation();
    console.log("Test");
  }, [mapRegion]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion} provider={PROVIDER_GOOGLE}>
        <Marker coordinate={mapRegion} title="marker" />
      </MapView>
      <Button title="Get Location" onPress={() => userLocation()} />
      <Text style={{ alignItems: "center", justifyContent: "center" }}>
        Hello World
      </Text>
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
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    position: "absolute",
  },
});

export default MapTest;
