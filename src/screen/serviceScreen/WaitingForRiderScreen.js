import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Divider } from "react-native-paper";

const WaitingForRiderScreen = ({ navigation, route }) => {
  const sourceAddress = route.params.source_address;
  const destainationAddress = route.params.destaination_address;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("FoundRider");
    }, 5000);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Order");
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
              {`รายการทั้งหมด`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
      <View style={{ margin: 10, marginTop: "20%" }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://64.media.tumblr.com/b67db8ee80b61b7417f30a4faf494828/f2f39746a6815e16-b0/s250x400/067749e86ddd099e928dfc3a759d31979cff3bc3.gifv",
            }}
            style={{ width: 300, height: 300 }}
          />
          <Text
            style={{
              fontSize: 24,
              color: "#000000",
              fontFamily: "Kanit",
            }}
          >
            {`กำลังหาคนรับผ้า`}
          </Text>
          <View style={{ marginTop: "5%", marginHorizontal: "5%" }}>
            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`รับผ้าที่: ${sourceAddress}`}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`ที่อยู่จัดส่ง: ${destainationAddress}`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WaitingForRiderScreen;
