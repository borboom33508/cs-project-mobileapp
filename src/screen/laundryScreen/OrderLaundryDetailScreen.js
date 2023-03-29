import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import GetApi from "../../api/GetApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  container,
  content1,
  content2,
  content3,
  text,
} from "./OrderLaundryDetailScreenStyle";
import { ScrollView } from "react-native";

const OrderLaundryDetailScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const orderId = route.params.order_id;
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    if (isFocused) {
      fetchOrderLaundryData();
      // console.log(orderData);
    }
  }, [isFocused]);

  const fetchOrderLaundryData = async () => {
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/order/GetOrderDataLaundry.php?order_id=${orderId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          setOrderData(data.request);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteOrder = async () => {
    var formdata = new FormData();
    formdata.append("order_id", orderId);
    formdata.append("order_detail_id", orderData.order_detail_id);
    try {
      await GetApi.useFetch(
        "POST",
        formdata,
        `/order/DeleteOrderData.php`
      ).then((data) => {
        console.log(data);
      });
    } catch (e) {
      console.log(e);
    } finally {
      navigation.navigate("OrderLaundry");
    }
  };

  const postUpdateStatus = async () => {
    var formdata = new FormData();
    formdata.append("order_id", orderId);
    formdata.append("order_status", "กำลังค้นหาไรเดอร์");
    try {
      await GetApi.useFetch(
        "POST",
        formdata,
        `/order/PostUpdateStatus.php`
      ).then((data) => {
        console.log(data);
      });
    } catch (e) {
      console.log(e);
    } finally {
      fetchOrderLaundryData();
    }
  };

  const alertSubmit = (header) => {
    Alert.alert("โปรดยืนยัน", "", [
      {
        text: "ยกเลิก",
        style: "cancel",
      },
      {
        text: "ยืนยัน",
        style: "default",
        onPress: () =>
          header == "delete" || header == "submit"
            ? header == "delete"
              ? deleteOrder()
              : postUpdateStatus()
            : null,
      },
    ]);
  };

  return (
    <View style={container}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("OrderLaundry")}
            style={{ alignItems: "center", flexDirection: "row" }}
          >
            <Ionicons name="arrow-back" size={30} color="#4691FB" />
            <Text style={[text, { marginLeft: 10 }]}>{`รายการทั้งหมด`}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: 10, marginTop: 20 }}>
          <View style={{ marginHorizontal: 5, marginBottom: 10 }}>
            <Text
              style={[text, { fontSize: 18 }]}
            >{`Order Number: ${orderId}`}</Text>
          </View>
          <View style={content1}>
            <Text style={[text, { fontSize: 18 }]}>{`รายละเอียดลูกค้า`}</Text>
            <View style={{ marginHorizontal: 10, marginTop: 5 }}>
              <Text style={text}>{`ชื่อ: ${orderData.cus_name}`}</Text>
              <Text
                style={text}
              >{`เบอร์โทรศัพท์: ${orderData.cus_phone}`}</Text>
            </View>
          </View>
          <View style={content1}>
            <Text
              style={[text, { fontSize: 18 }]}
            >{`รายละเอียดการส่งซัก`}</Text>
            <View style={{ marginHorizontal: 10, marginTop: 5 }}>
              <Text style={text}>{`*ส่งคืนภายใน ${
                orderData.order_service_type?.split("_")[0]
              } ชั่วโมง`}</Text>
              <View style={{ marginHorizontal: 15 }}>
                <View style={content2}>
                  <Text style={text}>{`ซักผ้า`}</Text>
                  <Text
                    style={text}
                  >{`${orderData.order_washingKg} กิโล`}</Text>
                </View>
                {orderData.order_isReed ? (
                  <Text style={text}>{`รีด`}</Text>
                ) : null}
              </View>

              <Text style={text}>
                {`คำแนะนำเพิ่มเติม: ${orderData.order_description}`}
              </Text>
              <View style={content2}>
                <Text style={text}>{`ราคาโดยประมาณ`}</Text>
                <Text
                  style={text}
                >{`<= ${orderData.order_fixedCost_by_laundry} บาท`}</Text>
              </View>
              <View style={content2}>
                <Text style={text}>{`ราคาค่าจัดส่ง`}</Text>
                <Text style={text}>{`${
                  parseInt(orderData.order_firstRideCost) +
                  parseInt(orderData.order_secondRideCost)
                } บาท`}</Text>
              </View>
            </View>
          </View>

          <View style={content1}>
            <View style={{ marginHorizontal: 10, marginTop: 5 }}>
              <Text style={text}>{`สถานะผ้า: ${orderData.order_status}`}</Text>
              <Text style={text}>{`ชำระเงิน: ${orderData.order_payment}`}</Text>
              <Text
                style={text}
              >{`เวลาทำการ: ${orderData.laundry_hours} น.`}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={content3}>
        {orderData.order_status == "รอร้านยืนยันรายการ" ? (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => alertSubmit("delete")}
              style={{
                backgroundColor: "#D9534F",
                padding: 10,
                borderRadius: 5,
                width: "48%",
              }}
            >
              <View style={{ alignItems: "center", marginHorizontal: 5 }}>
                <Text style={[text, { color: "#ffffff" }]}>{`ยกเลิกรายการ`}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alertSubmit("submit")}
              style={{
                backgroundColor: "#4691FB",
                padding: 10,
                borderRadius: 5,
                width: "48%",
              }}
            >
              <View style={{ alignItems: "center", marginHorizontal: 5 }}>
                <Text style={[text, { color: "#ffffff" }]}>{`ยืนยัน`}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => alertSubmit()}
            style={{
              backgroundColor:
                orderData.order_status == "คนขับถึงร้านแล้ว"
                  ? "#4691FB"
                  : "#767577",
              padding: 10,
              borderRadius: 5,
            }}
            disabled={
              orderData.order_status == "คนขับถึงร้านแล้ว" ? false : true
            }
          >
            <View style={{ alignItems: "center", marginHorizontal: 5 }}>
              <Text
                style={[text, { color: "#ffffff" }]}
              >{`กำลังดำเนินการ`}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OrderLaundryDetailScreen;
