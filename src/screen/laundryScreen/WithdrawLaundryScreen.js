import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { container, button, text } from "./WithdrawLaundryScreenStyle";
import { getStatusBarHeight } from "react-native-status-bar-height";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import GetApi from "../../api/GetApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SuccessPopup from "../../components/SuccessPopUp";

const WithdrawLaundryScreen = ({ navigation, props }) => {
  const [laundryId, setLaundryId] = useState("");
  const [credit, setCredit] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const isFocused = useIsFocused();
  const [isPress, setIsPress] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setIsPress(false)
      getLaundryAccountData();
    }
  }, [isFocused]);

  const fetchLaundryAccountData = async (accountId) => {
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/laundry/GetWithdrawLaundry.php?laundry_id= ${accountId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          setCredit(data.request.laundry_credit);
          setAccountNumber(data.request.laundry_accountNumber);
          setBank(data.request.laundry_bankName);
          setFname(data.request.laundry_ownerFname);
          setLname(data.request.laundry_ownerLname);
          setPhone(data.request.laundry_phone)
        } else {
          console.log(data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getLaundryAccountData = async () => {
    await AsyncStorage.getItem("@account").then((res) => {
      let accountId = JSON.parse(res);
      if (accountId == null) {
        console.log("not found");
      } else {
        fetchLaundryAccountData(accountId);
        setLaundryId(accountId);
      }
    });
  };

  const validateInput = (x) => {
    console.log(credit);
    if (parseInt(x) > 99 && parseInt(x) <= credit) {
      setShowError(false);
      setWithdrawAmount(x);
      setIsPress(true);
      setTimeout(() => {
        navigation.navigate("OTPForm", {
          page: "WithdrawLaundry",
          description: "ถอนเงินเรียบร้อย",
          account: {
            laundryId: laundryId[0],
            withdraw: withdrawAmount,
            phone: phone
          },
        });
      }, 3000);
    } else {
      console.log("Invalid Input");
      setShowError(true);
    }
  };

  return (
    <View style={container}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={30} color="#4691FB" />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={{ padding: 10, paddingTop: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 26, fontFamily: "Kanit" }}>
              {"ยอดเครดิต " + credit + " บาท"}
            </Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={
                <Text style={{ fontFamily: "Kanit" }}>
                  {"ยอดถอนขั้นต่ำ 100 บาท"}
                </Text>
              }
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              onChangeText={setWithdrawAmount}
              value={withdrawAmount}
              activeOutlineColor="#4691FB"
              disabled={isPress}
              error={showError}
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
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={
                <Text style={{ fontFamily: "Kanit" }}>{"เลขบัญชีธนาคาร"}</Text>
              }
              mode="outlined"
              disabled="true"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              value={accountNumber}
              activeOutlineColor="#4691FB"
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
            ></TextInput>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"ธนาคาร"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              disabled="true"
              value={bank}
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
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"ชื่อบัญชี"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              disabled="true"
              value={fname + " " + lname}
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
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Text style={{ fontSize: 12, fontFamily: "Kanit" }}>
              {
                "โปรดตรวจสอบข้อมูลให้ถูกต้องครบถ้วน\n   ใช้เวลาในการถอนประมาณ 24 ชั่วโมง"
              }
            </Text>
          </View>
          <TouchableOpacity
            style={button}
            onPress={() => {
              validateInput(withdrawAmount);
            }}
            disabled={isPress}
          >
            <Text
              style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
            >
              {"ถอนเงิน"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isSuccess ? (
        <SuccessPopup
          props={{
            description: "ส่งคำขอการถอนเงินเรียบร้อย",
            fromPage: "WithdrawLaundry",
          }}
          navigation={navigation}
        />
      ) : null}
    </View>
  );
};

export default WithdrawLaundryScreen;
