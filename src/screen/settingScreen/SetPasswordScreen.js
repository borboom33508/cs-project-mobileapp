import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { container, button } from "./SetPasswordScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { getStatusBarHeight } from "react-native-status-bar-height";

const SetPasswordScreen = ({ navigation, props }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <View style={container}>
      <KeyboardAvoidingView>
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
        <View style={{ padding: 10, paddingTop: 40 }}>
          <Text style={{ fontSize: 26, fontFamily: "Kanit" }}>
            {"เปลี่ยนรหัสผ่าน"}
          </Text>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"รหัสผ่าน"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              onChangeText={setCurrentPassword}
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
              value={currentPassword}
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
                <Text style={{ fontFamily: "Kanit" }}>{"รหัสผ่านใหม่"}</Text>
              }
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              onChangeText={setNewPassword}
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
              value={newPassword}
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
              onChangeText={setNewPasswordConfirm}
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
              value={newPasswordConfirm}
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
            // onPress={() => {
            //   setIsSuccess(!isSuccess);
            // }}
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

export default SetPasswordScreen;
