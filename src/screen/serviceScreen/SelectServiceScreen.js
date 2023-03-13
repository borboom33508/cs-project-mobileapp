import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";

const SelectServiceScreen = ({ navigation, props, route }) => {
  const laundry_id = route.params.laundry_id;

  useEffect(() => {}, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
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
      <View style={{ padding: 10, paddingTop: 40 }}></View>
    </View>
  );
};

export default SelectServiceScreen;
