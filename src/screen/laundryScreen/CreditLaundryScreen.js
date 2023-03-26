import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  NativeModules,
} from "react-native";
import React, { useEffect, useState } from "react";
import GetApi from "../../api/GetApi";
import { getStatusBarHeight } from "react-native-status-bar-height";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { container, button } from "./CreditLaundryScreenStyle";
import { Ionicons } from "@expo/vector-icons";

const CreditLaundryScreen = ({ navigation, props }) => {
  const [laundryId, setLaundryId] = useState("");
  const [credit, setCredit] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getLaundryData();
    }
  }, [isFocused]);

  const fetchLaundryData = async (laundryId) => {
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/laundry/GetCreditLaundry.php?laundry_id=${laundryId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          setCredit(data.request.laundry_credit);
        } else {
          console.log(data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getLaundryData = async () => {
    await AsyncStorage.getItem("@account").then((res) => {
      let accountId = JSON.parse(res);
      if (accountId == null) {
        console.log("not found");
      } else {
        fetchLaundryData(accountId);
        setLaundryId(accountId);
      }
    });
  };

  const alertLogout = () => {
    Alert.alert("ออกจากระบบ", "", [
      {
        text: "ยกเลิก",
        style: "cancel",
      },
      {
        text: "ออกจากระบบ",
        style: "destructive",
        onPress: () => handleLogout(),
      },
    ]);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@account");
    NativeModules.DevSettings.reload();
    // navigation.navigate("Landing");
  };
  return (
    <View style={container}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View
          style={{
            padding: 10,
            paddingTop: 20,
            alignItems: "center",
            marginTop: 36,
          }}
        >
          <Text style={{ fontSize: 26, fontFamily: "Kanit" }}>
            {"ยอดเครดิต " + credit + " บาท"}
          </Text>
        </View>
        <View style={{ marginTop: 32 }}>
          <View>
            <TouchableOpacity
              style={button}
              onPress={() => {
                navigation.navigate("WithdrawLaundry");
              }}
            >
              <Text
                style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
              >
                {"ถอนเงิน"}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={button}
              onPress={() => {
                // navigation.navigate("WithdrawRider");
              }}
            >
              <Text
                style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
              >
                {"ประวัติธุรกรรม"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center", marginTop: 60 }}>
            <TouchableOpacity onPress={() => alertLogout()}>
              <Text
                style={{ fontSize: 18, color: "#F91616", fontFamily: "Kanit" }}
              >
                {"ออกจากระบบ"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreditLaundryScreen;
