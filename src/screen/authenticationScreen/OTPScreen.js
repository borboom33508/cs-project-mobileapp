import { View, Text, TouchableOpacity } from "react-native";

import { getStatusBarHeight } from "react-native-status-bar-height";
import OTPTextInput from "react-native-otp-textinput";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import SuccessPopUp from "../../components/SuccessPopUp";
import { useIsFocused } from "@react-navigation/native";

const OTPScreen = ({ navigation, route, props }) => {
  const isFocused = useIsFocused();
  const [otp, setOTP] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const page = route.params.page;
  const description = route.params.description;

  useEffect(() => {
    setOTP("");
    setIsSuccess(false);
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
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

        <View style={{ marginHorizontal: 20, marginTop: "20%" }}>
          <Text style={{ fontSize: 32, fontFamily: "Montserrat" }}>
            {"OTP"}
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: "15%",
          }}
        >
          <OTPTextInput
            handleTextChange={(value) => {
              setOTP(value);
            }}

            ref={(value) => {

            }}
            tintColor="#4691FB"
            inputCellLength={1}
            containerStyle={{ width: "80%" }}
            textInputStyle={{ fontFamily: "Kanit", fontSize: 32 }}
          />

          <TouchableOpacity
            style={{
              marginTop: "10%",
              borderRadius: 10,
              alignItems: "center",
              backgroundColor: "#4691FB",
              padding: 20,
              width: "90%",
            }}
            onPress={() => {
              page == "ChangePassword"
                ? navigation.navigate(page)
                : setIsSuccess(!isSuccess);
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#ffffff",
                fontFamily: "Kanit",
              }}
            >
              {"ยืนยัน"}
            </Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", marginTop: 50 }}>
            <Text
              style={{ color: "#000000", fontSize: 14, fontFamily: "Kanit" }}
            >
              {"ไม่ได้รับ OTP ? "}
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={{ color: "#4691FB", fontSize: 14, fontFamily: "Kanit" }}
              >
                {"ส่งอีกครั้ง"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {isSuccess ? (
        <SuccessPopUp
          props={{ description: description }}
          navigation={navigation}
        />
      ) : null}
    </View>
  );
};

export default OTPScreen;
