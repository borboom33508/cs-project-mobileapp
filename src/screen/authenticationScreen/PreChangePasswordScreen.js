import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { container, button } from "./PreChangePasswordScreenStyle";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";

const PreChangePasswordScreen = ({ navigation, props }) => {
  const isFocused = useIsFocused();
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (isFocused) {
      setIsError(false);
      setIsSuccess(false);
    }
    else {
      setIsError(false);
      setIsSuccess(false);
    }

  }, [isFocused])

  const validateInput = () => {
    if (phone == "" || phone == null) {
      setIsError(true);
    }
    else {
      setIsSuccess(true);
      navigation.navigate("OTPForm", {
        page: "SignIn",
        description: "เปลี่ยนรหัสผ่านเรียบร้อย",
        account: {
          phone: phone 
        },
      });
    }
  }

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
                error={isError}
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
                validateInput();
                if (isSuccess) {
                  navigation.navigate("OTPForm", {
                    page: "ChangePassword",
                  }); //ทำ handle ทีหลัง
                }
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
