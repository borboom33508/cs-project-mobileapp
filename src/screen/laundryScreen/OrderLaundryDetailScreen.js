import { View, Text, TouchableOpacity, Alert, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
import CreatePaymentSlip from "../../components/CreatePaymentSlip";

const OrderLaundryDetailScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const orderId = route.params.order_id;
  const [orderData, setOrderData] = useState({});
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    if (isFocused) {
      fetchOrderLaundryData();
      console.log(orderData);
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

  const postUpdateStatus = async (header, price) => {
    console.log(header);
    var formdata = new FormData();
    formdata.append("order_id", orderId);
    formdata.append("order_detail_id", orderData.order_detail_id);
    formdata.append(
      "order_status",
      header == "submit" || header == "process" || header == "delivery"
        ? header == "submit" || header == "process"
          ? header == "submit"
            ? "กำลังค้นหาไรเดอร์"
            : "กำลังดำเนินการ"
          : "ผ้าพร้อมส่งคืนโปรดชำระเงิน"
        : "เสร็จสิ้นรายการ"
    );
    formdata.append("order_payment", "โปรดชำระเงิน");
    formdata.append(
      "order_finalCost",
      price && header != "finish" ? price : ""
    );
    if (header == "finish") {
      formdata.append("laundry_id", orderData.laundry_id);
      formdata.append("tx_paymentType", "เงินเข้า");
      formdata.append(
        "tx_amount",
        parseInt(orderData.order_finalCost) -
          parseInt(orderData.order_firstRideCost)
      );
    }
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
        onPress: () => {
          header == "submit" || header == "delete" || header == "process"
            ? header == "submit" || header == "delete"
              ? header == "delete"
                ? deleteOrder()
                : postUpdateStatus(header)
              : postUpdateStatus(header)
            : postUpdateStatus(header);
        },
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
              <View style={{ flexDirection: "row" }}>
                <Text style={text}>{`เบอร์โทรศัพท์: `}</Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(`tel:${orderData.cus_phone}`)}
                >
                  <Text
                    style={[text, { color: "#4691FB" }]}
                  >{`${orderData.cus_phone}`}</Text>
                </TouchableOpacity>
              </View>
            </View>
            {orderData.order_status == "ร้านกำลังดำเนินการส่งผ้าคืน" ? (
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `https://www.google.com/maps/search/?api=1&query=${orderData.cus_placeName}`
                  )
                }
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={[text, { color: "#4691FB" }]}
                >{`กดปุ่มนำทาง`}</Text>
                <MaterialCommunityIcons
                  name="compass-outline"
                  size={40}
                  color="#4691FB"
                  style={{ marginLeft: 5 }}
                />
              </TouchableOpacity>
            ) : null}
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
          {orderData.order_finalCost ? (
            <View style={content1}>
              <View style={{ marginHorizontal: 10, marginTop: 5 }}>
                <Text style={[text, { fontSize: 18 }]}>{`ใบชำระเงิน`}</Text>
                <Text
                  style={text}
                >{`ยอดชำระ: ${orderData.order_finalCost} บาท`}</Text>
              </View>
            </View>
          ) : null}
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
                <Text
                  style={[text, { color: "#ffffff" }]}
                >{`ยกเลิกรายการ`}</Text>
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
        ) : null}
        {orderData.order_status == "คนขับถึงร้านแล้ว" ? (
          <TouchableOpacity
            onPress={() => alertSubmit("process")}
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
        ) : null}
        {orderData.order_status == "กำลังดำเนินการ" ? (
          <TouchableOpacity
            onPress={() => setSuccess(true)}
            style={{
              backgroundColor:
                orderData.order_status == "กำลังดำเนินการ"
                  ? "#4691FB"
                  : "#767577",
              padding: 10,
              borderRadius: 5,
            }}
            disabled={orderData.order_status == "กำลังดำเนินการ" ? false : true}
          >
            <View style={{ alignItems: "center", marginHorizontal: 5 }}>
              <Text
                style={[text, { color: "#ffffff" }]}
              >{`ผ้าพร้อมส่งคืนโปรดชำระเงิน`}</Text>
            </View>
          </TouchableOpacity>
        ) : null}
        {orderData.order_status == "ร้านกำลังดำเนินการส่งผ้าคืน" ? (
          <TouchableOpacity
            onPress={() => alertSubmit("finish")}
            style={{
              backgroundColor:
                orderData.order_status == "ร้านกำลังดำเนินการส่งผ้าคืน"
                  ? "#4691FB"
                  : "#767577",
              padding: 10,
              borderRadius: 5,
            }}
            disabled={
              orderData.order_status == "ร้านกำลังดำเนินการส่งผ้าคืน"
                ? false
                : true
            }
          >
            <View style={{ alignItems: "center", marginHorizontal: 5 }}>
              <Text
                style={[text, { color: "#ffffff" }]}
              >{`เสร็จสิ้นรายการ`}</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>

      {isSuccess ? (
        <CreatePaymentSlip
          props={{
            order_fixedCost_by_laundry: orderData.order_fixedCost_by_laundry,
            order_firstRideCost: orderData.order_firstRideCost,
            order_secondRideCost: orderData.order_secondRideCost,
          }}
          onChange={(event) => {
            if (event.type == "set") {
              postUpdateStatus("delivery", event.price);
            }
            setSuccess(false);
          }}
        />
      ) : null}
    </View>
  );
};

export default OrderLaundryDetailScreen;
