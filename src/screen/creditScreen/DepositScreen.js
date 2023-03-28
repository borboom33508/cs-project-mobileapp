import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { container, button, text_amount } from "./DepositScreenStyle";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import SuccessPopup from "../../components/SuccessPopUp";
import GetApi from "../../api/GetApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const DepositScreen = ({ navigation, props }) => {
  const isFocused = useIsFocused();
  const [balance, setBalance] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const [showError, setShowError] = useState(false);
  // const [accountId, setAccountId] = useState("");
  // const [timestamp, setTimestamp] = useState(""); //timestamp
  // const [qrCodeUri, setQrcodeUri] = useState(
  //   "https://promptpay.io/0625491524/"
  // );
  const qrCodeUri = "https://promptpay.io/0625491524/"

  useEffect(() => {
    if (isFocused) {
      // getAccountData();
      setShowError(false);
    } else {
      setBalance("0");
      setIsPress(false);
      setIsSuccess(false);
    }
  }, [isFocused]);

  // const formatterTimestamp = (unix_time) => {
  //   var timestamp = moment(unix_time).format("YYYY-MM-DD HH-mm-ss");
  //   setTimestamp(timestamp);
  // };

  const validateInput = (x) => {
    if (x > 99) {
      setShowError(false);
      setBalance(x);
      setIsPress(true);
      setTimeout(() => {
        // formatterTimestamp(Date.now());
        postCreditCustomer();
      }, 3000);
    } else {
      // console.log("Invalid Input");
      setShowError(true);
    }
  };

  const postCreditCustomer = async () => {
    let account;
    await AsyncStorage.getItem("@account").then((res) => {
      account = JSON.parse(res).split(",")[0];
    });
    var formdata = new FormData();
    formdata.append("cus_id", account);
    formdata.append("deposit", balance);
    formdata.append("tx_paymentType", "เติมเครดิต");
    formdata.append("tx_amount", balance);

    try {
      await GetApi.useFetch(
        "POST",
        formdata,
        `/customer/DepositCredit.php`
      ).then((res) => {
        let data = JSON.parse(res);
        // console.log(res);
        if (data.success) {
          setIsSuccess(!isSuccess);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  // const getAccountData = async () => {
  //   await AsyncStorage.getItem("@account").then((res) => {
  //     let accountId = JSON.parse(res);
  //     if (accountId == null) {
  //       console.log("not found");
  //     } else {
  //       setAccountId(accountId);
  //       console.log(accountId);
  //     }
  //   });
  // };

  return (
    <View style={container}>
      <KeyboardAvoidingView>
        <View style={{ marginTop: getStatusBarHeight() }}>
          <View style={{ paddingHorizontal: 10 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Credit");
              }}
            >
              <Ionicons name="arrow-back" size={30} color="#4691FB" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ padding: 10, paddingTop: 40 }}>
          <Text style={{ fontSize: 26, fontFamily: "Kanit" }}>
            {"กรอกจำนวนเงิน (บาท)"}
          </Text>
          <View style={{ paddingVertical: 28 }}>
            <TextInput
              label={
                <Text style={{ fontFamily: "Kanit" }}>
                  {"ยอดขั้นต่ำ 100 บาท"}
                </Text>
              }
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              onChangeText={setBalance}
              value={balance}
              activeOutlineColor="#4691FB"
              keyboardType="name-phone-pad"
              disabled={isPress}
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
          <TouchableOpacity
            style={button}
            onPress={() => {
              validateInput(balance);
            }}
            disabled={isPress}
          >
            <Text
              style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
            >
              {"ยืนยัน"}
            </Text>
          </TouchableOpacity>
        </View>
        {isPress ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Image
              source={require("../../../assets/promptpay.png")}
              style={{ width: 200, height: 80, resizeMode: "contain" }}
            />
            <Image
              source={{ uri: `${qrCodeUri}${balance}` }}
              style={{ width: 200, height: 200 }}
            ></Image>
            <Text style={{ fontSize: 24, fontFamily: "Montserrat" }}>
              {balance + " บาท"}
            </Text>
            <Text
              style={{ fontSize: 16, fontFamily: "Montserrat", marginTop: 10 }}
            >
              {"Suck and Reed Services"}
            </Text>
          </View>
        ) : null}
        {isSuccess ? (
          <SuccessPopup
            props={{ description: "เติมเงินสำเร็จ", fromPage: "Deposit" }}
            navigation={navigation}
          />
        ) : null}
      </KeyboardAvoidingView>
    </View>
  );
};

export default DepositScreen;
