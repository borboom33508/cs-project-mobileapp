import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Divider } from "react-native-paper";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import GetApi from "../../api/GetApi";
import { API } from "../../api/GetApi";

const FoundARiderScreen = ({ navigation, route }) => {
  const order_id = route.params.order_id;
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.012,
    longitudeDelta: 0.013,
  });
  const [customerPosition, setCustomerPosition] = useState({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.012,
    longitudeDelta: 0.013,
  });
  const [laundryPosition, setLaundryPosition] = useState({
    latitude: 0.0,
    longitude: 0.0,
    latitudeDelta: 0.012,
    longitudeDelta: 0.013,
  });
  const [orderData, setOrderData] = useState({
    orderStatus: "",
    riderFname: "",
    riderLname: "",
    riderPhone: "",
    riderLicensePlate: "",
    riderPicture: "",
  });

  useEffect(() => {
    console.log(order_id);
    fetchFoundRiderData();
  }, []);

  const fetchFoundRiderData = async () => {
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/customer/GetFoundRiderData.php?order_id=${order_id}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          console.log(data);
          setCurrentPosition({
            latitude: parseFloat(
              data.request.order_rider_location.split(",")[0]
            ),
            longitude: parseFloat(
              data.request.order_rider_location.split(",")[1]
            ),
            latitudeDelta: 0.012,
            longitudeDelta: 0.013,
          });
          setCustomerPosition({
            latitude: parseFloat(
              data.request.order_source_location1.split(",")[0]
            ),
            longitude: parseFloat(
              data.request.order_source_location1.split(",")[1]
            ),
            latitudeDelta: 0.012,
            longitudeDelta: 0.013,
          });
          setLaundryPosition({
            latitude: parseFloat(
              data.request.order_dest_location1.split(",")[0]
            ),
            longitude: parseFloat(
              data.request.order_dest_location1.split(",")[1]
            ),
            latitudeDelta: 0.012,
            longitudeDelta: 0.013,
          });
          setOrderData({
            orderStatus: data.request.order_status,
            riderFname: data.request.rider_fname,
            riderLname: data.request.rider_lname,
            riderPhone: data.request.rider_phone,
            riderLicensePlate: data.request.rider_license_plate,
            riderPicture: data.request.rider_picture,
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

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
        initialRegion={currentPosition}
      >
        <Marker
          coordinate={
            orderData.orderStatus == "คนขับกำลังไปส่งผ้า"
              ? laundryPosition
              : customerPosition
          }
          pinColor="#25BD2B"
        />
        <Marker coordinate={currentPosition}>
          <MaterialCommunityIcons name="bike" size={36} color="black" />
        </Marker>
        <MapViewDirections
          apikey="AIzaSyCRIHZm8hYtb2iJp1-0ITTVxLZVoNP8UWM"
          origin={currentPosition}
          destination={
            orderData.orderStatus == "คนขับกำลังไปส่งผ้า"
              ? laundryPosition
              : customerPosition
          }
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
          {`${orderData.orderStatus}`}
        </Text>
        <Image
          source={{ uri: API.urlRiderImage + orderData.riderPicture }}
          style={{ width: 80, height: 80, marginVertical: 10 }}
          resizeMode="contain"
        />
        <Text
          style={{
            fontSize: 16,
            color: "#000000",
            fontFamily: "Kanit",
          }}
        >
          {`นาย${orderData.riderFname} ${orderData.riderLname}`}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#000000",
            fontFamily: "Kanit",
          }}
        >
          {`โทร ${orderData.riderPhone}`}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#000000",
            fontFamily: "Kanit",
          }}
        >
          {`ทะเบียน ${orderData.riderLicensePlate}`}
        </Text>

        {orderData.orderStatus == "คนขับกำลังไปรับผ้า" ||
        orderData.orderStatus == "คนขับถึงที่อยู่ลูกค้าแล้ว" ? (
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
        ) : null}
      </View>
    </View>
  );
};

export default FoundARiderScreen;
