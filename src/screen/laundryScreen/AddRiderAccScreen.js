import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import GetApi from "../../api/GetApi";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { container, button, content5 } from "./AddRiderAccScreenStyle";
import { TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

const AddRiderAccScreen = ({ navigation, props }) => {
  const isFocused = useIsFocused();
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [fname, setFname] = useState({ value: "", error: false });
  const [lname, setLname] = useState({ value: "", error: false });
  const [email, setEmail] = useState({ value: "", error: false });
  const [password, setPassword] = useState({ value: "", error: false });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: "",
    error: false,
  });
  const [phone, setPhone] = useState({ value: "", error: false });
  const [licensePlate, setLicensePlate] = useState({ value: "", error: false });
  const [bankName, setBankName] = useState({ value: "", error: false });
  const [accountNumber, setAccountNumber] = useState({
    value: "",
    error: false,
  });

  const validateInput = () => {
    if (
      !fname.value ||
      !lname.value ||
      !email.value ||
      !password.value ||
      !passwordConfirm.value ||
      !phone.value ||
      !licensePlate.value ||
      !bankName.value ||
      !accountNumber.value
    ) {
      if (fname.value == "" || fname.value == null) {
        setFname({ value: "", error: true });
      }
      if (lname.value == "" || lname.value == null) {
        setLname({ value: "", error: true });
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
      if (licensePlate.value == "") {
        setLicensePlate({ value: "", error: true });
      }
      if (bankName.value == "") {
        setBankName({ value: "", error: true });
      }
      if (accountNumber.value == "") {
        setAccountNumber({ value: "", error: true });
      }
    } else {
      console.log("Success");
      // navigation.navigate("OTPForm", {
      //   page: "SignIn",
      //   description: "สร้างบัญชีผู้ใช้เรียบร้อย",
      //   account: {
      //     name: username.value,
      //     email: email.value,
      //     password: password.value,
      //     phone: phone.value,
      //   },
      // });
    }
  };

  return (
    <View style={container}>
      <View style={{ paddingHorizontal: 10, marginTop: getStatusBarHeight() }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LaundryMain");
          }}
        >
          <Ionicons name="arrow-back" size={30} color="#4691FB" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10, paddingTop: 28 }}>
          <Text
            style={{
              fontSize: 26,
              fontFamily: "Kanit",
              textAlign: "center",
            }}
          >
            {"เพิ่มบัญชีไรเดอร์"}
          </Text>

          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"ชื่อจริง"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              error={fname.error}
              onChangeText={(text) => {
                setFname({ value: text, error: false });
              }}
              value={fname.value}
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
              label={<Text style={{ fontFamily: "Kanit" }}>{"นามสกุล"}</Text>}
              mode="outlined"
              style={{
                backgroundColor: "#ffffff",
                height: 60,
                marginTop: 5,
              }}
              error={lname.error}
              onChangeText={(text) => {
                setLname({ value: text, error: false });
              }}
              value={lname.value}
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
                setEmail({ value: text, error: false });
              }}
              value={email.value}
              error={email.error}
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
              label={<Text style={{ fontFamily: "Kanit" }}>{"รหัสผ่าน"}</Text>}
              mode="outlined"
              style={{
                backgroundColor: "#ffffff",
                marginTop: 5,
                height: 60,
              }}
              onChangeText={(text) => {
                setPassword({ value: text, error: false });
              }}
              value={password.value}
              error={password.error}
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
                <Text style={{ fontFamily: "Kanit" }}>{"ยืนยันรหัสผ่าน"}</Text>
              }
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
              error={passwordConfirm.error}
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
                setPhone({ value: text, error: false });
              }}
              error={phone.error}
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
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"ทะเบียนรถ"}</Text>}
              mode="outlined"
              style={{
                backgroundColor: "#ffffff",
                height: 60,
                marginTop: 5,
              }}
              onChangeText={(text) => {
                setLicensePlate({ value: text, error: false });
              }}
              value={licensePlate.value}
              activeOutlineColor="#4691FB"
              error={licensePlate.error}
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
            />
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"ธนาคาร"}</Text>}
              mode="outlined"
              style={{
                backgroundColor: "#ffffff",
                height: 60,
                marginTop: 5,
              }}
              onChangeText={(text) => {
                setBankName({ value: text, error: false });
              }}
              value={bankName.value}
              error={bankName.error}
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
              label={<Text style={{ fontFamily: "Kanit" }}>{"เลขบัญชี"}</Text>}
              mode="outlined"
              style={{
                backgroundColor: "#ffffff",
                height: 60,
                marginTop: 5,
              }}
              onChangeText={(text) => {
                setAccountNumber({ value: text, error: false });
              }}
              value={accountNumber.value}
              error={accountNumber.error}
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
        </View>
      </ScrollView>
      <View style={content5}>
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
            {"ในการสร้างบัญชีผู้ใช้จำเป็นต้องยอมรับนโยบายของทางแอปพลิเคชั่น"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AddRiderAccScreen;
