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
} from "./NotificationScreenStyle";
import moment from "moment/moment";
import "moment/locale/th";

const NotificationScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [notificationData, setNotificationData] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getOrderDetail();
    }
  }, [isFocused]);

  const getOrderDetail = async () => {
    let account;
    await AsyncStorage.getItem("@account").then((res) => {
      account = JSON.parse(res).split(",")[0];
    });
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/order/GetNotificationDataCustomer.php?cus_id=${account}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          console.log(data);
          setNotificationData(data.request);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onRefresh = async () => {
    setIsFetching(true);
    await getOrderDetail();
    setIsFetching(false);
  };

  const renderItem = ({ item }) => (
    <View style={content2}>
      <TouchableOpacity
        onPress={() => {
          if (item.order_status == "กำลังค้นหาไรเดอร์") {
            navigation.navigate("WaitingForRider", {
              source_address: item.cus_placename,
              destaination_address: item.laundry_name,
            });
          } else if (
            item.order_status == "คนขับกำลังไปรับผ้า" ||
            item.order_status == "คนขับถึงที่อยู่ลูกค้าแล้ว" ||
            item.order_status == "คนขับกำลังไปส่งผ้า"
          ) {
            navigation.navigate("FoundRider");
          }
          console.log("test");
        }}
      >
        <View style={content3}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="notifications-outline"
              size={60}
              color="#4691FB"
              style={{ marginLeft: 4 }}
            />
            <View style={{ marginLeft: 12, }}>
              <Text style={text}>{`Order Number: ${item.order_id}`}</Text>
              <Text
                style={[text, { fontSize: 14 }]}
              >{`${item.laundry_name}`}</Text>
              <Text
                style={[text, { fontSize: 14 }]}
              >{`สถานะ: ${item.order_status}`}</Text>
              {item.order_status == "คนขับกำลังไปรับผ้า" ? (
                <Text
                  style={[text, { fontSize: 14 }]}
                >{`กำลังไปที่: ${(item.cus_placename).slice(0,21)}...`}</Text>
              ) : null}
              {item.order_status == "คนขับกำลังไปส่งผ้า" && !item.rider_id2 ? (
                <Text
                  style={[text, { fontSize: 14 }]}
                >{`กำลังไปที่: ${(item.laundry_name).slice(0,21)}...`}</Text>
              ) : null}
              {item.order_status == "คนขับกำลังไปส่งผ้า" && item.rider_id2 ? (
                <Text
                  style={[text, { fontSize: 14 }]}
                >{`กำลังไปที่: ${(item.cus_placename).slice(0,21)}...`}</Text>
              ) : null}
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={[text, { fontSize: 14 }]}>{`${moment(
              item.order_timestamp
            )
              .locale("th")
              .add(543, "years")
              .format("D MMM YY")}`}</Text>
            <Text style={[text, { fontSize: 14 }]}>{`${moment(
              item.order_timestamp
            ).format("HH:mm")} น.`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={container}>
      <View style={{ marginTop: getStatusBarHeight(), marginHorizontal: 10 }}>
        <View style={{ marginTop: 10 }}>
          <Text style={[text, { fontSize: 28 }]}>แจ้งเตือน</Text>
        </View>
      </View>
      <View style={content1}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={notificationData}
          renderItem={renderItem}
          keyExtractor={(item) => item.order_id}
          onRefresh={() => onRefresh()}
          refreshing={isFetching}
        />
      </View>
    </View>
  );
};

export default NotificationScreen;
