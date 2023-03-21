import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { container, button } from "./WithdrawRiderScreenStyle";
import { TextInput } from "react-native-paper";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useIsFocused } from "@react-navigation/native";
import GetApi from "../../api/GetApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SuccessPopup from "../../components/SuccessPopUp";

const WithdrawRiderScreen = ({ navigation, props }) => {
  const [riderId, setRiderId] = useState("")
  const [credit, setCredit] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const isFocused = useIsFocused();
  const [isPress, setIsPress] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getRiderAccountData();
    }
  }, [isFocused]);

  const fetchRiderAccountData = async (accountId) => {
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/rider/GetRiderWithdrawData.php?rider_id= ${accountId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          setCredit(data.request.rider_credit);
          setAccountNumber(data.request.rider_accountNumber);
          setBank(data.request.rider_bankName);
          setFname(data.request.rider_fname);
          setLname(data.request.rider_lname);
        } else {
          console.log(data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getRiderAccountData = async () => {
    await AsyncStorage.getItem("@account").then((res) => {
      let riderId = JSON.parse(res);
      if (riderId == null) {
        console.log("not found");
      } else {
        fetchRiderAccountData(riderId);
        setRiderId(riderId)
      }
    });
  };

  const validateInput = (x) => {
    console.log(credit);
    if (x > 99 && x <= credit) {
      setWithdrawAmount(x);
      setIsPress(true);
      setTimeout(() => {
        postWithdrawRider();
      }, 3000);
    } else {
      console.log("Invalid Input");
      setShowError(true);
    }
  };

  const postWithdrawRider = async () => {
    var formdata = new FormData();
    console.log("account " + riderId.split(",")[0]);
    console.log("withdraw " + withdrawAmount);
    formdata.append("rider_id", riderId.split(",")[0]);
    formdata.append("withdraw", withdrawAmount);

    try {
      await GetApi.useFetch(
        "POST",
        formdata,
        `/rider/WithdrawCreditRider.php`
      ).then((res) => {
        let data = JSON.parse(res);
        console.log(res);
        if (data.success) {
          setIsSuccess(!isSuccess);
        }
      });
    } catch (e) {
      console.log(e);
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
              label={<Text style={{ fontFamily: "Kanit" }}>{"ยอดถอน"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              onChangeText={setWithdrawAmount}
              value={withdrawAmount}
              activeOutlineColor="#4691FB"
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
            fromPage: "WithdrawRider",
          }}
          navigation={navigation}
        />
      ) : null}
    </View>
  );
};

export default WithdrawRiderScreen;
