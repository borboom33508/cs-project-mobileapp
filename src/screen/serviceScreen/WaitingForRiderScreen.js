import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Divider } from "react-native-paper";

const WaitingForRiderScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Main");
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
      <View style={{ margin: 10, marginTop: 20 }}>
        <View style={{ alignItems: "center" }}>
          <MaterialCommunityIcons name="timer-sand" size={300} />
          <Text
            style={{
              fontSize: 24,
              color: "#000000",
              fontFamily: "Kanit",
            }}
          >
            {`กำลังหาคนรับผ้า`}
          </Text>
        </View>
        <View style={{ marginTop: "50%", marginHorizontal: "5%" }}>
          <Text
            style={{
              fontSize: 16,
              color: "#000000",
              fontFamily: "Kanit",
            }}
          >
            {`รับผ้าที่: ซอยงามวงศ์วาน 42...`}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#000000",
              fontFamily: "Kanit",
            }}
          >
            {`ที่อยู่จัดส่ง: 88 ถนน งามวงศ์วาน แขวง ลาดยาว เขต...`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WaitingForRiderScreen;
