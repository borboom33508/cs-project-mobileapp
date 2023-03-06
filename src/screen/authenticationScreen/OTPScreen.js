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
  const [otpCode, setOtpCode] = useState("default");
  const [isSuccess, setIsSuccess] = useState(false);

  const page = route.params.page;
  const description = route.params.description;
  const account = route.params.account;

  const getRandomArbitrary = () => {
    return Math.floor(Math.random() * (9999 - 1111 + 1) + 1111).toString(); // String
  };

  const sendOTP = () => {
    var tmp = getRandomArbitrary()
    fetch("https://19lp31.api.infobip.com/sms/2/text/advanced", {
      'method': 'POST',
      'hostname': '19lp31.api.infobip.com',
      'path': '/sms/2/text/advanced',
      'headers': {
          'Authorization': 'App 4f984a95564887480f80c719347b2656-151ff6fb-5a39-4352-a684-658365c4a0f5',
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      'maxRedirects': 20,
      body: JSON.stringify({
        "messages": [
          {
              "destinations": [
                  {
                      "to": `66${account.phone.value}`
                  }
              ],
              "from": "Suck$Reed",
              "text": `Suck&Reed Service: รหัส OTP ของคุณคือ ${tmp}`
          }
      ]
      })
    })
    setOtpCode(tmp); //String
    // .then(res => res.json())
  }
  
  const verifyOTp = () => {
    if (otp.toString() == otpCode.toString()) {
      setIsSuccess(true)
      console.log("OTP ถูกต้อง");
    }
    else {
      console.log(`OTP ที่ถูกคือ ${otpCode}`);
    }
  }


  useEffect(() => {
    // if (isFocused) {
      // sendOTP("660625491524")
      // sendingOTP();
      // SendOTP();
    // }
    return () => {
      // setOTP("");
      console.log(`66${account.phone.value}`)
      setIsSuccess(false);
    };
  }, [isFocused]);


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
            handleTextChange={(value) => {
              setOTP(value);
            }}
            tintColor="#4691FB"
            inputCellLength={1}
            containerStyle={{ width: "80%" }}
            textInputStyle={{ fontFamily: "Kanit", fontSize: 32 }}
          />

          <TouchableOpacity
            onPress={() => verifyOTp()}
            style={{
              marginTop: "10%",
              borderRadius: 10,
              alignItems: "center",
              backgroundColor: "#4691FB",
              padding: 20,
              width: "90%",
            }}
            // onPress={() => {
            //   page == "ChangePassword"
            //     ? navigation.navigate(page)
            //     : setIsSuccess(!isSuccess);
            // }}
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
            <TouchableOpacity onPress={() => sendOTP()}>
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
