import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { container, button } from "./PreChangePasswordScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TextInput } from "react-native-paper";

const PreChangePasswordScreen = ({ navigation, props }) => {
  const [phone, setPhone] = useState("");

  return (
    <View style={container}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={{ marginTop: getStatusBarHeight() }}>
            <View style={{ paddingHorizontal: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignIn");
                }}
              >
                <Ionicons name="arrow-back" size={30} color="#4691FB" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ padding: 10, paddingTop: 40 }}>
            <Text style={{ fontSize: 26, fontFamily: "Kanit" }}>
              {"กรอกเบอร์โทรศัพท์"}
            </Text>
            <View style={{ paddingVertical: 10 }}>
              <TextInput
                label={
                  <Text style={{ fontFamily: "Kanit" }}>{"เบอร์โทรศัพท์"}</Text>
                }
                mode="outlined"
                style={{ backgroundColor: "#ffffff", height: 60 }}
                onChangeText={setPhone}
                value={phone}
                activeOutlineColor="#4691FB"
                keyboardType="phone-pad"
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
                navigation.navigate("OTPForm", {
                  page: "ChangePassword",
                }); //ทำ handle ทีหลัง
              }}
            >
              <Text
                style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
              >
                {"ส่งรหัสยืนยัน"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PreChangePasswordScreen;
