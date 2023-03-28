import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  container,
  content1,
  content2,
  text1,
  text2,
} from "./RiderTransactionScreenStyle";
import GetApi from "../../api/GetApi";
import moment from "moment/moment";
import AsyncStorage from "@react-native-async-storage/async-storage";


const RiderTransactionScreen = ({ navigation, props }) => {
  const isFocused = useIsFocused();
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    if (isFocused) {
      getTransactionData();
      // console.log(transaction);
    }
  }, [isFocused]);

  const getTransactionData = async () => {
    let account;
    await AsyncStorage.getItem("@account").then((res) => {
      account = JSON.parse(res).split(",")[0];
    });
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/transaction/GetTransactionDataRider.php?rider_id=${account}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          setTransaction(data.request);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={content1}>
      <TouchableOpacity>
        <View style={[content2, { justifyContent: "space-between" }]}>
          <View style={content2}>
            <AntDesign
              name="creditcard"
              size={60}
              color="#4691FB"
              style={{ marginLeft: 4 }}
            />
            <View style={{ marginLeft: 16 }}>
              <Text style={text1}>{`รูปแบบ: ${item.tx_paymentType}`}</Text>
              <Text style={text1}>{`เวลา: ${moment(item.tx_timestamp).format(
                "YYYY-MM-DD HH:mm"
              )}`}</Text>
            </View>
          </View>
          {item.tx_paymentType == "ถอนเงิน" ? (
            <Text
              style={[text2, { color: "#F91616" }]}
            >{`- ${item.tx_amount}`}</Text>
          ) : (
            <Text
              style={[text2, { color: "#25BD2B" }]}
            >{`+ ${item.tx_amount}`}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

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
      </View>
      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        <Text
          style={{
            fontSize: 28,
            color: "#000000",
            fontFamily: "Kanit",
          }}
        >
          {"ประวัติธุรกรรม"}
        </Text>
      </View>
      <View style={{ flex: 1, marginHorizontal: 5, marginBottom: 5 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={transaction}
          renderItem={renderItem}
          keyExtractor={(item) => item.tx_id}
        />
      </View>
    </View>
  );
};

export default RiderTransactionScreen;
