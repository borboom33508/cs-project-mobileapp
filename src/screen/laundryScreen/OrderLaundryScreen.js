import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import GetApi from "../../api/GetApi";
import {
  container,
  content1,
  content2,
  content3,
  text,
} from "./OrderLaundryScreenStyle";

const OrderLaundryScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [orderData, setOrderData] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getOrderLaundryDetail();
    }
  }, [isFocused]);

  const getOrderLaundryDetail = async () => {
    let accountId;
    await AsyncStorage.getItem("@account").then((res) => {
      accountId = JSON.parse(res).split(",")[0];
    });
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/order/GetAllOrderDataLaundry.php?laundry_id=${accountId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          console.log(data.request);
          setOrderData(data.request);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onRefresh = async () => {
    setIsFetching(true);
    await getOrderLaundryDetail();
    setIsFetching(false);
  };

  const renderItem = ({ item }) => (
    <View style={content2}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("OrderLaundryDetail", {
            order_id: item.order_id,
          })
        }
      >
        <View style={content3}>
          <Ionicons
            name="document-text-outline"
            size={60}
            color="#4691FB"
            style={{ marginLeft: 4 }}
          />
          <View style={{ marginLeft: 16 }}>
            <Text style={text}>{`Order Number: ${item.order_id}`}</Text>
            <Text
              style={[text, { fontSize: 14, color: "#4691FB" }]}
            >{`สถานะ: ${item.order_status}`}</Text>
            <Text
              style={[text, { fontSize: 14 }]}
            >{`ชำระเงิน: ${item.order_payment}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={container}>
      <View style={{ marginTop: getStatusBarHeight(), marginHorizontal: 10 }}>
        <View style={{ marginTop: 10 }}>
          <Text style={[text, { fontSize: 28 }]}>รายการทั้งหมด</Text>
        </View>
      </View>
      <View style={content1}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={orderData}
          renderItem={renderItem}
          keyExtractor={(item) => item.order_id}
          onRefresh={() => onRefresh()}
          refreshing={isFetching}
        />
      </View>
    </View>
  );
};

export default OrderLaundryScreen;
