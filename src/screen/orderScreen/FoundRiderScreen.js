import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Divider } from "react-native-paper";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const FoundARiderScreen = ({ navigation }) => {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 13.847468594271557,
    longitude: 100.56969677482991,
  });
  const [destinationCords, setDestinationCords] = useState({
    latitude: 13.856590317284635,
    longitude: 100.54181361119001,
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate("AssignRatingRider");
  //   }, 2000);
  // }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ alignItems: "center", flexDirection: "row" }}
          >
            <Ionicons name="arrow-back" size={30} color="#4691FB" />
            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontFamily: "Kanit",
                marginLeft: 10,
              }}
            >
              {`แจ้งเตือน`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
      <MapView
        style={{ width: "100%", height: "55%" }}
        provider={PROVIDER_GOOGLE}
        region={currentPosition}
      >
        <Marker coordinate={currentPosition} title="ตำแหน่งของคุณ" />
        <Marker coordinate={destinationCords} title="ไรเดอร์" />
        <MapViewDirections
          apikey="AIzaSyCRIHZm8hYtb2iJp1-0ITTVxLZVoNP8UWM"
          origin={currentPosition}
          destination={destinationCords}
          onReady={(result) => {
            let cords = {
              latitude: parseFloat(result.coordinates[0].latitude),
              longitude: parseFloat(result.coordinates[0].longitude),
              latitudeDelta: 0.012,
              longitudeDelta: 0.013,
            };
            setCurrentPosition(cords);
          }}
          strokeColor="#4691FB"
          strokeWidth={8}
          onError={(err) => {
            console.log(err);
          }}
        />
      </MapView>
      <View style={{ marginHorizontal: 10, alignItems: "center" }}>
        <Text
          style={{
            fontSize: 16,
            color: "#000000",
            fontFamily: "Kanit",
            marginTop: 20,
          }}
        >
          {`คนขับกำลังไปรับผ้า`}
        </Text>
        {/* <Image
            source={{ uri: API.urlCustomerImage + picture }}
            style={{ width: 80, height: 80, marginVertical: 10 }}
            resizeMode="contain"
          /> */}
        <Image
          source={require("../../../assets/unknown-user.png")}
          style={{ width: 80, height: 80, marginVertical: 10 }}
        />
        <Text
          style={{
            fontSize: 16,
            color: "#000000",
            fontFamily: "Kanit",
          }}
        >
          {`นายโรชานย์ น้ำทิพย์`}
        </Text>
        {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`Rating:`}
            </Text>
            <FontAwesome
              name="star"
              size={18}
              color="orange"
              style={{ marginHorizontal: 5 }}
            />
            <Text
              style={{
                fontSize: 14,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`(${parseFloat(4.7).toFixed(1)})`}
            </Text>
          </View> */}
        <Text
          style={{
            fontSize: 14,
            color: "#000000",
            fontFamily: "Kanit",
          }}
        >
          {`โทร +66 91-123-4567`}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#000000",
            fontFamily: "Kanit",
          }}
        >
          {`ทะเบียน 69กข-122`}
        </Text>

        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontSize: 14,
              color: "#000000",
              fontFamily: "Kanit",
            }}
          >
            {`*กรุณาเตรียมผ้าให้พร้อม`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FoundARiderScreen;
