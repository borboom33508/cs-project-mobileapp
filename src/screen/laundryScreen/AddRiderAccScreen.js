import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import GetApi from "../../api/GetApi";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { container, button } from "./AddRiderAccScreenStyle";
import { TextInput } from "react-native-paper";

const AddRiderAccScreen = ({ navigation, props }) => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [account, setAccount] = useState({
    fname: { value: "", error: "" },
    lname: { value: "", error: "" },
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    passwordConfirm: { value: "", error: "" },
    phone: { value: "", error: "" },
    licensePlate: { value: "", error: "" },
    bankName: { value: "", error: "" },
    accountNumbeer: { value: "", error: "" },
  });

  return (
    <View style={container}>
      <KeyboardAvoidingView behavior="height">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginTop: getStatusBarHeight() }}>
            <View style={{ paddingHorizontal: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("LaundryMain");
                }}
              >
                <Ionicons name="arrow-back" size={30} color="#4691FB" />
              </TouchableOpacity>
            </View>

            <View style={{ padding: 10, paddingTop: 28 }}>
              <Text style={{ fontSize: 26, fontFamily: "Kanit", textAlign: "center" }}>
                {"เพิ่มบัญชีไรเดอร์"}
              </Text>

              <View style={{ paddingVertical: 10 }}>
                <TextInput
                  label={
                    <Text style={{ fontFamily: "Kanit" }}>{"ชื่อจริง"}</Text>
                  }
                  mode="outlined"
                  style={{ backgroundColor: "#ffffff", height: 60 }}
                  onChangeText={(text) => {
                    setAccount({
                      ...account,
                      fname: { value: text, error: "" },
                    });
                  }}
                  value={account.fname.value}
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
                    <Text style={{ fontFamily: "Kanit" }}>{"นามสกุล"}</Text>
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
                      lname: { value: text, error: "" },
                    });
                  }}
                  value={account.lname.value}
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
                <TextInput
                  label={
                    <Text style={{ fontFamily: "Kanit" }}>{"ทะเบียนรถ"}</Text>
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
                      licensePlate: { value: text, error: "" },
                    });
                  }}
                  value={account.licensePlate.value}
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
                    <Text style={{ fontFamily: "Kanit" }}>{"ธนาคาร"}</Text>
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
                      bankName: { value: text, error: "" },
                    });
                  }}
                  value={account.bankName.value}
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
                    <Text style={{ fontFamily: "Kanit" }}>{"เลขบัญชี"}</Text>
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
                      accountNumbeer: { value: text, error: "" },
                    });
                  }}
                  value={account.accountNumbeer.value}
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

export default AddRiderAccScreen;
