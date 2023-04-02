import { View, Text, TouchableOpacity, Linking, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetApi from "../../api/GetApi";

const ShowMapDestinationScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
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
    orderId: "",
    customerPlaceName: "",
    laundryPlaceName: "",
    customerPhone: "",
    laundryPhone: "",
    orderStatus: "",
  });

  useEffect(() => {
    if (isFocused) {
      fetchOrderData();
    }
  }, [isFocused]);

  const GetCurrentPosition = async () => {
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

  const fetchOrderData = async () => {
    let riderId;
    await AsyncStorage.getItem("@account").then((res) => {
      riderId = JSON.parse(res).split(",")[0];
    });
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/rider/GetOrderData.php?rider_id=${riderId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
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
            orderId: data.request.order_id,
            customerPlaceName: data.request.cus_placeName,
            laundryPlaceName: data.request.laundry_name,
            customerPhone: data.request.cus_phone,
            laundryPhone: data.request.laundry_phone,
            orderStatus: data.request.order_status,
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const PostUpdateStatus = async () => {
    var formdata = new FormData();
    formdata.append("order_id", orderData.orderId);
    formdata.append(
      "order_status",
      orderData.orderStatus == "คนขับถึงที่อยู่ลูกค้าแล้ว"
        ? "คนขับกำลังไปส่งผ้า"
        : "คนขับถึงที่อยู่ลูกค้าแล้ว"
    );
    try {
      await GetApi.useFetch(
        "POST",
        formdata,
        `/rider/PostUpdateStatusByRider.php`
      ).then((data) => {
        console.log(data);
      });
    } catch (e) {
      console.log(e);
    } finally {
      fetchOrderData();
    }
  };

  const CheckState = (status) => {
    if (status == "คนขับกำลังไปรับผ้า") {
      return "ถึงที่อยู่ลูกค้าแล้ว";
    } else if (status == "คนขับถึงที่อยู่ลูกค้าแล้ว") {
      return "คนขับกำลังไปส่งผ้า";
    } else if (status == "คนขับกำลังไปส่งผ้า") {
      return "คนขับถึงร้านแล้ว";
    }
  };

  const AlertSubmit = () => {
    Alert.alert("โปรดยืนยัน", "", [
      {
        text: "ยกเลิก",
        style: "cancel",
      },
      {
        text: "ยืนยัน",
        style: "default",
        onPress: () =>
          orderData.orderStatus == "คนขับกำลังไปส่งผ้า"
            ? navigation.navigate("FinishJob", {
                order_id: orderData.orderId,
                order_status: orderData.orderStatus,
              })
            : PostUpdateStatus(),
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: "5%",
            marginTop: "5%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="arrow-up-circle"
              size={40}
              color={
                orderData.orderStatus == "คนขับกำลังไปส่งผ้า"
                  ? "#D9534F"
                  : "#25BD2B"
              }
            />
            <Text
              style={{
                fontSize: 18,
                color: "#000000",
                fontFamily: "Kanit",
                marginLeft: 10,
              }}
            >
              {`${orderData.customerPlaceName}`}
            </Text>
          </View>
          {orderData.orderStatus != "คนขับกำลังไปส่งผ้า" ? (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `https://www.google.com/maps/search/?api=1&query=${orderData.customerPlaceName}`
                )
              }
            >
              <MaterialCommunityIcons
                name="compass-outline"
                size={40}
                color="black"
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: "5%",
            marginVertical: "5%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="arrow-down-circle"
              size={40}
              color={
                orderData.orderStatus == "คนขับกำลังไปส่งผ้า"
                  ? "#25BD2B"
                  : "#D9534F"
              }
            />
            <Text
              style={{
                fontSize: 18,
                color: "#000000",
                fontFamily: "Kanit",
                marginLeft: 10,
              }}
            >
              {`${orderData.laundryPlaceName}`}
            </Text>
          </View>
          {orderData.orderStatus == "คนขับกำลังไปส่งผ้า" ? (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  `https://www.google.com/maps/search/?api=1&query=${orderData.laundryPlaceName}`
                )
              }
            >
              <MaterialCommunityIcons
                name="compass-outline"
                size={40}
                color="black"
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <MapView
          style={{ width: "90%", height: "58%", marginHorizontal: "5%" }}
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
        <View
          style={{
            marginHorizontal: "5%",
            marginTop: "10%",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons name="phone" size={40} color="black" />
            <Text
              style={{
                fontSize: 18,
                color: "#000000",
                fontFamily: "Kanit",
                marginLeft: 10,
              }}
            >
              โทร
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${orderData.customerPhone}`)}
              style={{
                backgroundColor: "#25BD2B",
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 8,
                alignItems: "center",
                marginLeft: "10%",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#ffffff",
                  fontFamily: "Kanit",
                }}
              >
                ลูกค้า
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${orderData.laundryPhone}`)}
              style={{
                backgroundColor: "#25BD2B",
                borderRadius: 10,
                paddingHorizontal: 30,
                paddingVertical: 8,
                alignItems: "center",
                marginLeft: "5%",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#ffffff",
                  fontFamily: "Kanit",
                }}
              >
                ร้านค้า
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: "10%" }}>
            <TouchableOpacity
              onPress={() => AlertSubmit()}
              style={{
                backgroundColor: "#4691FB",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <View style={{ alignItems: "center", marginHorizontal: 5 }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: "#ffffff",
                    fontFamily: "Kanit",
                  }}
                >
                  {CheckState(orderData.orderStatus)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ShowMapDestinationScreen;
