import {
  KeyboardAvoidingView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { container, button, text, input } from "./SignInScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TextInput } from "react-native-paper";
import GetApi from "../../api/GetApi";
import { useIsFocused } from "@react-navigation/native";

const SignUpScreen = ({ navigation, props }) => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const isFocused = useIsFocused();
  const [username, setUsername] = useState({ value: "", error: false });
  const [email, setEmail] = useState({ value: "", error: false });
  const [password, setPassword] = useState({ value: "", error: false });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    error: false,
  });
  const [phone, setPhone] = useState({ value: "", error: false });

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isFocused) {
    } else {
      setIsSuccess(false);
    }
  }, [isFocused]);

  const validateInput = () => {
    if (
      !username.value ||
      !email.value ||
      !password.value ||
      !passwordConfirm.value ||
      !phone.value
    ) {
      if (username.value == "" || username.value == null) {
        setUsername({ value: "", error: true });
      }
      if (
        email.value == "" ||
        email.value == null ||
        !email.value.includes("@") ||
        !email.value.includes(".")
      ) {
        setEmail({ value: "", error: true });
      }
      if (password.value == "" || password.value != passwordConfirm.value) {
        setPassword({ value: "", error: true });
        setPasswordConfirm({ value: "", error: true });
      }
      if (
        passwordConfirm.value == "" ||
        password.value != passwordConfirm.value
      ) {
        setPasswordConfirm({ value: "", error: true });
      }
      if (phone.value == "") {
        setPhone({ value: "", error: true });
      }
    } else {
      navigation.navigate("OTPForm", {
        page: "SignIn",
        description: "สร้างบัญชีผู้ใช้เรียบร้อย",
        account: {
          name: username.value,
          email: email.value,
          password: password.value,
          phone: phone.value,
        },
      });
    }
  };

  return (
    <View style={container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView showsVerticalScrollIndicator={false}>
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
                {"สร้างบัญชี"}
              </Text>

              <View style={{ paddingVertical: 10 }}>
                <TextInput
                  label={<Text style={{ fontFamily: "Kanit" }}>{"ชื่อ"}</Text>}
                  mode="outlined"
                  style={{ backgroundColor: "#ffffff", height: 60 }}
                  onChangeText={(text) => {
                    setUsername({ value: text, error: false });
                  }}
                  value={username.value}
                  activeOutlineColor="#4691FB"
                  error={username.error}
                  theme={{
                    fonts: {
                      regular: {
                        fontFamily: "Kanit",
                      },
                    },
                  }}
                />

                <TextInput
                  label={<Text style={{ fontFamily: "Kanit" }}>{"อีเมล"}</Text>}
                  mode="outlined"
                  style={{
                    backgroundColor: "#ffffff",
                    height: 60,
                    marginTop: 5,
                  }}
                  error={email.error}
                  onChangeText={(text) => {
                    setEmail({ value: text, error: false });
                  }}
                  value={email.value}
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
                    <Text style={{ fontFamily: "Kanit" }}>{"รหัสผ่าน"}</Text>
                  }
                  mode="outlined"
                  style={{
                    backgroundColor: "#ffffff",
                    marginTop: 5,
                    height: 60,
                  }}
                  error={password.error}
                  onChangeText={(text) => {
                    setPassword({ value: text, error: false });
                  }}
                  value={password.value}
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
                />

                <TextInput
                  label={
                    <Text style={{ fontFamily: "Kanit" }}>
                      {"ยืนยันรหัสผ่าน"}
                    </Text>
                  }
                  error={passwordConfirm.error}
                  mode="outlined"
                  style={{
                    backgroundColor: "#ffffff",
                    marginTop: 5,
                    height: 60,
                  }}
                  onChangeText={(text) => {
                    setPasswordConfirm({ value: text, error: false });
                  }}
                  value={passwordConfirm.value}
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
                />

                <TextInput
                  label={
                    <Text style={{ fontFamily: "Kanit" }}>
                      {"เบอร์โทรศัพท์ (+66)"}
                    </Text>
                  }
                  mode="outlined"
                  style={{
                    backgroundColor: "#ffffff",
                    height: 60,
                    marginTop: 5,
                  }}
                  error={phone.error}
                  onChangeText={(text) => {
                    setPhone({ value: text, error: false });
                  }}
                  maxLength={10}
                  value={phone.value}
                  keyboardType="phone-pad"
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
                  validateInput();
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: "#ffffff",
                    fontFamily: "Kanit",
                  }}
                >
                  {"สร้างบัญชี"}
                </Text>
              </TouchableOpacity>

              <View style={{ marginTop: 20, alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#000000",
                    fontFamily: "Kanit",
                  }}
                >
                  {
                    "ในการสร้างบัญชีผู้ใช้จำเป็นต้องยอมรับนโยบายของทางแอปพลิเคชั่น"
                  }
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUpScreen;
