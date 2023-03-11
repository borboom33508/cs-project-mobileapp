import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { container, button } from "./SetPasswordScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetApi from "../../api/GetApi";
import SuccessPopUp from "../../components/SuccessPopUp";
import Modal from "react-native-modal";

const SetPasswordScreen = ({ navigation, props }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwd, setPasswd] = useState("");
  const [accountId, setAccountId] = useState("");
  const isFocused = useIsFocused();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getAccountData();
      setShowError(false);
    }
  }, [isFocused]);

  const getPasswordRequest = async (id) => {
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/customer/GetPasswordRequest.php?cus_id= ${id}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          console.log(data.request.cus_password);
          setPasswd(data.request.cus_password);
        } else {
          console.log(data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getAccountData = async () => {
    await AsyncStorage.getItem("@account").then((res) => {
      let data = JSON.parse(res);
      if (data == null) {
        console.log("not found");
      } else {
        console.log(data);
        setAccountId(data);
        getPasswordRequest(data);
      }
    });
  };

  const postChangePassword = async () => {
    var formdata = new FormData();
    formdata.append("cus_password", newPassword);
    formdata.append("cus_id", accountId);
    try {
      await GetApi.useFetch(
        "POST",
        formdata,
        `/customer/PostChangePassword.php`
      ).then((res) => {
        let data = JSON.parse(res);
        console.log(res);
        if (data.success) {
          navigation.navigate("Setting");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = () => {
    if (
      passwd == currentPassword &&
      newPassword == newPasswordConfirm &&
      newPassword !== "" &&
      newPasswordConfirm !== ""
    ) {
      postChangePassword();
      // setIsSuccess(!isSuccess)
    } else {
      console.log("invalid");
      setShowError(true);
    }
  };

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
              error={showError}
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
              error={showError}
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
              error={showError}
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
            />

            {showError ? (
              <Text
                style={{ color: "#F91616", fontSize: 14, fontFamily: "Kanit" }}
              >{`โปรดตรวจสอบความถูกต้อง`}</Text>
            ) : null}
            
          </View>
          <TouchableOpacity style={button} onPress={() => handleSubmit()}>
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
