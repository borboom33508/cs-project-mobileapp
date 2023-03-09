import { View, Text, TouchableOpacity } from "react-native";
import { container, button } from "./CreditScreenStyle";
import React, { useState } from "react";

const CreditScreen = ({ navigation, props }) => {
  const [credit, setCredit] = useState(300);

  return (
    <View style={container}>
      <View style={{ padding: 10, paddingTop: 100, alignItems: "center" }}>
        <Text style={{ fontSize: 26, fontFamily: "Kanit" }}>
          {"ยอดเครดิต " + credit + " บาท"}
        </Text>
      </View>
      <View style={{ marginTop: 32 }}>
        <View>
          <TouchableOpacity style={button} onPress={() => {
            navigation.navigate("Deposit")
          }}>
            <Text
              style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
            >
              {"เติมเงิน"}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={button} onPress={() => {
            navigation.navigate("Transaction")
          }}>
            <Text
              style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
            >
              {"ประวัติธุรกรรม"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreditScreen;
