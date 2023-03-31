import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import GetApi from "../../api/GetApi";
import {
  button,
  container,
  content1,
  content2,
  content3,
  content4,
  text,
} from "./JobListScreenStyle";
import * as Location from "expo-location";

const JobListScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [isFetching, setIsFetching] = useState(false);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (isFocused) {
      fetchJobAndGetCurrentPosition();
    }
  }, [isFocused]);

  const fetchJobAndGetCurrentPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/rider/GetJobFromOrder.php?order_status=กำลังค้นหาไรเดอร์`
      ).then((res) => {
        let data = JSON.parse(res);
        let distance = [];
        let dataList = [];
        if (data.success) {
          data.request.map((item, index) => {
            distance[index] = calculatorDistance(
              location.coords.latitude + "," + location.coords.longitude,
              item.order_source_location1
            );
            if (distance[index] <= 20) {
              dataList[index] = {
                order_id: item.order_id,
                order_firstRideCost: item.order_firstRideCost,
                order_source_location1: item.order_source_location1,
                order_dest_location1: item.order_dest_location1,
                order_firstRideCost: item.order_firstRideCost,
                laundry_name: item.laundry_name,
                cus_placeName: item.cus_placeName,
                distance: distance[index],
              };
            }
          });
          setOrderData(
            dataList.map((item, index) => ({
              order_id: item.order_id,
              order_firstRideCost: item.order_firstRideCost,
              order_source_location1: item.order_source_location1,
              order_dest_location1: item.order_dest_location1,
              order_firstRideCost: item.order_firstRideCost,
              laundry_name: item.laundry_name,
              cus_placeName: item.cus_placeName,
              distance: distance[index],
            }))
          );
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const calculatorDistance = (current, dest) => {
    let destination;
    //currentPosition
    let lat1 = parseFloat(current.split(",")[0]);
    let lon1 = parseFloat(current.split(",")[1]);
    //destination
    let lat2 = parseFloat(dest.split(",")[0]);
    let lon2 = parseFloat(dest.split(",")[1]);

    const R = 6371e3; // earth radius in meters
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const finalDistance = (R * c) / 1000;
    destination = finalDistance.toFixed(1);
    return destination;
  };

  const onRefresh = async () => {
    setIsFetching(true);
    await fetchJobAndGetCurrentPosition();
    setIsFetching(false);
  };

  const renderItem = ({ item }) => (
    <View style={content2}>
      <View style={content3}>
        <MaterialIcons
          name="directions-bike"
          size={60}
          color="#4691FB"
          style={{ marginLeft: 4 }}
        />
        <View style={{ marginLeft: 16 }}>
          <Text
            style={[text, { color: "#25BD2B" }]}
          >{`รายได้: +${item.order_firstRideCost} บาท`}</Text>
          <Text
            style={[text, { fontSize: 14 }]}
          >{`ที่อยู่ลูกค้า: ${item.cus_placeName}`}</Text>
          <Text
            style={[text, { fontSize: 14 }]}
          >{`ชื่อร้าน: ${item.laundry_name}`}</Text>
          <Text
            style={[text, { fontSize: 14 }]}
          >{`ระยะห่าง: ${item.distance} กม.`}</Text>
        </View>
      </View>
      <View style={content4}>
        <TouchableOpacity
          onPress={() => console.log("test")}
          style={[button, { backgroundColor: "#D9534F" }]}
        >
          <Text style={[text, { fontSize: 14, color: "#ffffff" }]}>ยกเลิก</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log("test")}
          style={[button, { backgroundColor: "#4691FB" }]}
        >
          <Text style={[text, { fontSize: 14, color: "#ffffff" }]}>ยืนยัน</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={container}>
      <View style={{ marginTop: getStatusBarHeight(), marginHorizontal: 10 }}>
        <View style={{ marginTop: 10, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ alignItems: "center", flexDirection: "row" }}
          >
            <Ionicons name="arrow-back" size={30} color="#4691FB" />
          </TouchableOpacity>
          <Text style={[text, { fontSize: 28, marginLeft: 10 }]}>รับงาน</Text>
        </View>
      </View>
      <View style={content1}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={orderData}
          renderItem={renderItem}
          keyExtractor={(item) => item.order_id}
          onRefresh={() => onRefresh()}
          refreshing={isFetching}
        />
      </View>
    </View>
  );
};

export default JobListScreen;
