import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Divider } from "react-native-paper";

const AssignRatingRiderScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Notification");
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
      <View style={{ margin: 10, marginTop: 20 }}></View>
    </View>
  )
}

export default AssignRatingRiderScreen