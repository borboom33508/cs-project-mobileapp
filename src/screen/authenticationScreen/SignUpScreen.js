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

const SignUpScreen = ({ navigation, props }) => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [account, setAccount] = useState({
    name: { value: "", error: "" },
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    passwordConfirm: { value: "", error: "" },
    phone: { value: "", error: "" },
  });

  // const addAccount = async () => {
  //   var formdata = new FormData();
  //   formdata.append("cus_email", account.email.value);
  //   formdata.append("cus_phone", account.phone.value);
  //   formdata.append("cus_password", account.password.value);
  //   formdata.append("cus_name", account.name.value);
  //   try {
  //     await GetApi
  //       .useFetch("POST", formdata, `/customer/PostAccountRequest.php`)
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

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
                    setAccount({
                      ...account,
                      name: { value: text, error: "" },
                    });
                  }}
                  value={account.name.value}
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
                  label={<Text style={{ fontFamily: "Kanit" }}>{"อีเมล"}</Text>}
                  mode="outlined"
                  style={{
                    backgroundColor: "#ffffff",
                    height: 60,
                    marginTop: 5,
                  }}
                  onChangeText={(text) => {
                    setAccount({
                      ...account,
                      email: { value: text, error: "" },
                    });
                  }}
                  value={account.email.value}
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
                  onChangeText={(text) => {
                    setAccount({
                      ...account,
                      password: { value: text, error: "" },
                    });
                  }}
                  value={account.password.value}
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
                  mode="outlined"
                  style={{
                    backgroundColor: "#ffffff",
                    marginTop: 5,
                    height: 60,
                  }}
                  onChangeText={(text) => {
                    setAccount({
                      ...account,
                      passwordConfirm: { value: text, error: "" },
                    });
                    console.log(text);
                  }}
                  value={account.passwordConfirm.value}
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
                  onChangeText={(text) => {
                    setAccount({
                      ...account,
                      phone: { value: text, error: "" },
                    });
                  }}
                  maxLength={10}
                  value={account.phone.value}
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
                  // addAccount();
                  navigation.navigate("OTPForm", {
                    page: "SignIn",
                    description: "สร้างบัญชีผู้ใช้เรียบร้อย",
                    account: account,
                  });
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
