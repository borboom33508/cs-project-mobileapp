import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { container, textHeader, textTitle, text } from "./AboutUsScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";

const AboutUsScreen = ({ navigation, props }) => {
  return (
    <View style={container}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={30} color="#4691FB" />
          </TouchableOpacity>
        </View>

        <Text style={textHeader}>{"เกี่ยวกับเรา"}</Text>
        <View style={{ alignItems: "center", marginVertical: 24 }}>
          <Image
            source={require("../../../assets/kasetsart.jpg")}
            style={{ width: 200, height: 100, resizeMode: "contain" }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#fff5",
            marginHorizontal: 30,
            marginTop: 16,
          }}
        >
          <Text style={textTitle}>{"แอปพลิเคชันนี้จัดทำโดย"}</Text>
          <Text style={text}>
            นายภีมภัทณ์ พรหมนุช 6210451373 {"\n"}
            นายวชิรวิทย์ อุดมวรกุลชัย 6210450709{"\n"}
            {"\n"}
            เป็นส่วนหนึ่งของวิชา{"\n"}
            {"\n"} 01418499 Computer Science Project
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AboutUsScreen;
