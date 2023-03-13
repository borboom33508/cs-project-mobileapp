import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { container, text, button } from "./JobHistoryScreenStyle";

const JobHistoryScreen = ({ navigation, props }) => {
  const isFocused = useIsFocused();

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
      </View>
    </View>
  );
};

export default JobHistoryScreen;
