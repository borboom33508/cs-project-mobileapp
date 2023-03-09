import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { container } from "./AboutUsScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";

const AboutUsScreen = ({ navigation, props }) => {
  return (
    <View>
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
      </View>
    </View>
  );
};

export default AboutUsScreen;
