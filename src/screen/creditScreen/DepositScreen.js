import { View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { container, button } from './DepositScreenStyle'
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";

const DepositScreen = ({ navigation, props }) => {
    const [balance, setBalance] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);

  return (
    <View style={container}>
      <KeyboardAvoidingView>
          <View style={{ marginTop: getStatusBarHeight() }}>
            <View style={{ paddingHorizontal: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Credit");
                }}
              >
                <Ionicons name="arrow-back" size={30} color="#4691FB" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ padding: 10, paddingTop: 40 }}>
            <Text style={{ fontSize: 26, fontFamily: "Kanit" }}>
              {"กรอกจำนวนเงิน (บาท)"}
            </Text>
            <View style={{ paddingVertical: 28 }}>
              <TextInput
                label={
                  <Text style={{ fontFamily: "Kanit" }}>{"ยอด"}</Text>
                }
                mode="outlined"
                style={{ backgroundColor: "#ffffff", height: 60 }}
                onChangeText={setBalance}
                value={balance.toString()} //ถ้าไม่แปลง จะระเบิด
                activeOutlineColor="#4691FB"
                keyboardType="name-phone-pad"
                theme={{
                  fonts: {
                    regular: {
                      fontFamily: "Kanit",
                    },
                  },
                }}
              />
            </View>
            <TouchableOpacity
              style={button}
              onPress={() => {
                console.log(balance);
                console.log(typeof balance);
              }}
            >
              <Text
                style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
              >
                {"ยืนยัน"}
              </Text>
            </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default DepositScreen