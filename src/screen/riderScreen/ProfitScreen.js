import { View, Text, TouchableOpacity, Alert, NativeModules } from "react-native";
import React, { useEffect, useState } from "react";
import { container, text, button } from "./ProfitScreenStyle";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetApi from "../../api/GetApi";

const ProfitScreen = ({ navigation, props }) => {
  const [riderId, setRiderId] = useState("")
  const [credit, setCredit] = useState("");
  const isFocused = useIsFocused();

    useEffect(() => {
      getRiderData();
    }, [isFocused]);

    const fetchRiderData = async (riderId) => {
      try {
        await GetApi.useFetch(
          "GET",
          "",
          `/rider/GetCreditRider.php?rider_id= ${riderId}`
        ).then((res) => {
          let data = JSON.parse(res);
          if (data.success) {
            setCredit(data.request.rider_credit);
          } else {
            console.log(data);
          }
        });
      } catch (e) {
        console.log(e);
      }
    };
    
    const getRiderData = async () => {
      await AsyncStorage.getItem("@account").then((res) => {
        let riderId = JSON.parse(res);
        if (riderId == null) {
          console.log("not found");
        } else {
          fetchRiderData(riderId);
          setRiderId(riderId)
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
        <View style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={30} color="#4691FB" />
          </TouchableOpacity>
        </View>
        <View style={{ padding: 10, paddingTop: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 26, fontFamily: "Kanit" }}>
            {"ยอดเครดิต " + credit + " บาท"}
          </Text>
        </View>
        <View style={{ marginTop: 32 }}>
          <View>
            <TouchableOpacity
              style={button}
              onPress={() => {
                navigation.navigate("WithdrawRider");
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
                navigation.navigate("JobHistory");
              }}
            >
              <Text
                style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
              >
                {"ประวัติการรับงาน"}
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

export default ProfitScreen;
