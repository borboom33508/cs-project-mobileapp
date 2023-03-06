import { Text, View, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { container, button, text, input } from "./SignInScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import GetApi from "../../api/GetApi";

const SignInScreen = ({ navigation, props }) => {
  const isFocused = useIsFocused();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [showError, setshowError] = useState(false);

  useEffect(() => {
    setUsername("");
    setPassword("");
    setshowError(false);
    setIsPasswordSecure(true);
  }, [isFocused]);

  const userAuthentication = async () => {
    try {
      await GetApi
        .useFetch(
          "GET",
          "",
          `/customer/GetLoginRequest.php?cus_email=${username}&cus_phone=${username}&cus_password=${password}`
        )
        .then((data) => {
          console.log(data);
          if (data.success) {
            // console.log("true");
          } else {
            setshowError(true);
            setPassword("");
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={container}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Onboarding");
            }}
          >
            <Ionicons name="arrow-back" size={30} color="#4691FB" />
          </TouchableOpacity>
        </View>

        <View style={{ padding: 10, paddingTop: 40 }}>
          <Text style={{ fontSize: 26, fontFamily: "Kanit" }}>
            {"กรอกบัญชีเพื่อเข้าสู่ระบบ"}
          </Text>

          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={
                <Text style={{ fontFamily: "Kanit" }}>
                  {"อีเมล หรือเบอร์โทรศัพท์"}
                </Text>
              }
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              onChangeText={setUsername}
              value={username}
              activeOutlineColor="#4691FB"
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
              error={showError}
            />

            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"รหัสผ่าน"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", marginTop: 10, height: 60 }}
              onChangeText={setPassword}
              value={password}
              activeOutlineColor="#4691FB"
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
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
              error={showError}
            />
          </View>

          <View
            style={{
              marginTop: 5,
              marginHorizontal: 10,
              flexDirection: "row",
              justifyContent: showError ? "space-between" : "flex-end",
            }}
          >
            {showError ? (
              <Text
                style={{ color: "#F91616", fontSize: 14, fontFamily: "Kanit" }}
              >{`ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง`}</Text>
            ) : null}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PreChangePassword");
              }}
            >
              <Text
                style={{ color: "#4691FB", fontSize: 14, fontFamily: "Kanit" }}
              >
                {"ลืมรหัสผ่าน?"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={button}
            onPress={() => {
              userAuthentication();
            }}
          >
            <Text
              style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
            >
              {"เข้าสู่ระบบ"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
