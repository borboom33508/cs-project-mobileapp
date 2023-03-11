import { View, Text, TouchableOpacity } from "react-native";
import { container, button } from "./CreditScreenStyle";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetApi from "../../api/GetApi";
import { useIsFocused } from "@react-navigation/native";


const CreditScreen = ({ navigation, props }) => {
  const [credit, setCredit] = useState(0);
  const isFocused = useIsFocused;


  useEffect(() => {
    getAccountData()
  }, [isFocused]);

  const fetchAccountData = async (accountId) => {
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/customer/GetAccountForSetting.php?cus_id= ${accountId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          setCredit(data.request.cus_credit);
        } else {
          console.log(data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getAccountData = async () => {
    await AsyncStorage.getItem("@account").then((res) => {
      let accountId = JSON.parse(res);
      if (accountId == null) {
        console.log("not found");
      } else {
        fetchAccountData(accountId);
      }
    });
  };


  return (
    <View style={container}>
      <View style={{ padding: 10, paddingTop: 100, alignItems: "center" }}>
        <Text style={{ fontSize: 26, fontFamily: "Kanit" }}>
          {"ยอดเครดิต " + credit + " บาท"}
        </Text>
      </View>
      <View style={{ marginTop: 32 }}>
        <View>
          <TouchableOpacity style={button} onPress={() => {
            navigation.navigate("Deposit")
          }}>
            <Text
              style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
            >
              {"เติมเงิน"}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={button} onPress={() => {
            navigation.navigate("Transaction")
          }}>
            <Text
              style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
            >
              {"ประวัติธุรกรรม"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreditScreen;
