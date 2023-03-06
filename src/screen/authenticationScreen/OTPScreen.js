import { View, Text, TouchableOpacity } from "react-native";

import { getStatusBarHeight } from "react-native-status-bar-height";
import OTPTextInput from "react-native-otp-textinput";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import SuccessPopUp from "../../components/SuccessPopUp";
import { useIsFocused } from "@react-navigation/native";
import SendOTP from "../../api/SendOTP";
import GetApi from "../../api/GetApi";

const OTPScreen = ({ navigation, route, props }) => {
  const isFocused = useIsFocused();
  const [otp, setOTP] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOTPError, setIsOTPError] = useState(false);

  const page = route.params.page;
  const description = route.params.description;
  const account = route.params.account;

  useEffect(() => {
    return () => {
      setOTP("");
      setOtpCode("");
      setIsSuccess(false);
      setIsOTPError(false);
    };
  }, [isFocused]);

  const genAndSendOTP = () => {
    let tpm = Math.floor(Math.random() * (9999 - 1111 + 1) + 1111).toString(); // String
    SendOTP.useFetch(account.phone.value, tpm);
    setOtpCode(tpm);
  };

  const verifyOTP = () => {
    if (otp == otpCode && otp !== "") {
      setIsOTPError(false);
      addAccount();
      page == "ChangePassword"
        ? navigation.navigate(page)
        : setIsSuccess(!isSuccess);
      console.log("OTP ถูกต้อง");
    } else {
      setIsOTPError(true);
      console.log(`OTP ที่ถูกคือ ${otpCode}`);
    }
  };

  const addAccount = async () => {
    var formdata = new FormData();
    formdata.append("cus_email", account.email.value);
    formdata.append("cus_phone", account.phone.value);
    formdata.append("cus_password", account.password.value);
    formdata.append("cus_name", account.name.value);
    try {
      await GetApi.useFetch(
        "POST",
        formdata,
        `/customer/PostAccountRequest.php`
      ).then((data) => {
        console.log(data);
      });
    } catch (e) {
      console.log(e);
    }
  };

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
            defaultValue={otp}
            handleTextChange={(value) => {
              setOTP(value);
            }}
            tintColor="#4691FB"
            inputCellLength={1}
            containerStyle={{ width: "80%" }}
            textInputStyle={{ fontFamily: "Kanit", fontSize: 32 }}
          />

          {isOTPError ? (
            <View style={{ marginTop: "5%" }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#F91616",
                  fontFamily: "Kanit",
                }}
              >
                {"OTP ไม่ถูกต้อง"}
              </Text>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => verifyOTP()}
            style={{
              marginTop: "10%",
              borderRadius: 10,
              alignItems: "center",
              backgroundColor: "#4691FB",
              padding: 20,
              width: "90%",
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
            <TouchableOpacity
              onPress={() => {
                genAndSendOTP();
              }}
            >
              <Text
                style={{ color: "#4691FB", fontSize: 14, fontFamily: "Kanit" }}
              >
                {"ส่ง OTP"}
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
