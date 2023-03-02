import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { button, container } from "./ChangePasswordScreenStyle";
import { TextInput } from "react-native-paper";
import SuccessPopUp from "../../components/SuccessPopUp";

const ChangePasswordScreen = ({ navigation, props }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const description = "เปลี่ยนรหัสผ่านเรียบร้อย";

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <View style={container}>
      <KeyboardAvoidingView>
        <View style={{ marginTop: getStatusBarHeight() }}>
          <View style={{ paddingHorizontal: 10 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Ionicons name="close" size={30} color="#4691FB" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 10, paddingTop: 40 }}>
          <Text style={{ fontSize: 26, fontFamily: "Kanit" }}>
            {"เปลี่ยนรหัสผ่าน"}
          </Text>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"รหัสผ่าน"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              onChangeText={setPassword}
              secureTextEntry={isPasswordSecure}
              right={
                <TextInput.Icon
                  icon={isPasswordSecure ? "eye-off" : "eye"}
                  style={{ marginTop: 15 }}
                  onPress={() => {
                    setIsPasswordSecure(!isPasswordSecure);
                  }}
                />
              }
              value={password}
              activeOutlineColor="#4691FB"
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
            />
            <TextInput
              label={
                <Text style={{ fontFamily: "Kanit" }}>{"ยืนยันรหัสผ่าน"}</Text>
              }
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              onChangeText={setPasswordConfirm}
              secureTextEntry
              value={passwordConfirm}
              activeOutlineColor="#4691FB"
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
              setIsSuccess(!isSuccess);
            }}
          >
            <Text
              style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
            >
              {"ยืนยัน"}
            </Text>
          </TouchableOpacity>
        </View>
        {isSuccess ? (
          <SuccessPopUp
            props={{ description: description }}
            navigation={navigation}
          />
        ) : null}
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChangePasswordScreen;
