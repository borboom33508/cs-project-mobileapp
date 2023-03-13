import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { container, text, button } from "./ProfitScreenStyle";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";

const ProfitScreen = ({ navigation, props }) => {
  const [credit, setCredit] = useState(0);
  const isFocused = useIsFocused();

//   useEffect(() => {}, isFocused);

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
        <View style={{ padding: 10, paddingTop: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 26, fontFamily: "Kanit" }}>
            {"ยอดเครดิต " + credit + " บาท"}
          </Text>
        </View>
        <View style={{ marginTop: 32 }}>
          <View>
            <TouchableOpacity
              style={button}
              onPress={() => {
                navigation.navigate("WithdrawRider");
              }}
            >
              <Text
                style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
              >
                {"ถอนเงิน"}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              style={button}
              onPress={() => {
                navigation.navigate("JobHistory");
              }}
            >
              <Text
                style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
              >
                {"ประวัติการรับงาน"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfitScreen;
