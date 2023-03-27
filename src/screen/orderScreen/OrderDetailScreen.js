import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import GetApi from "../../api/GetApi";
import {
  container,
  content1,
  content2,
  content3,
  text,
} from "./OrderDetailScreenStyle";

const OrderDetailScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const orderId = route.params.order_id;
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    if (isFocused) {
      getOrderDetail();
      // console.log(orderData);
    }
  }, [isFocused]);

  const getOrderDetail = async () => {
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/order/GetOrderDataCustomer.php?order_id=${orderId}`
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

  return (
    <View style={container}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Order")}
            style={{ alignItems: "center", flexDirection: "row" }}
          >
            <Ionicons name="arrow-back" size={30} color="#4691FB" />
            <Text style={[text, { marginLeft: 10 }]}>{`รายการทั้งหมด`}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
      <View style={{ margin: 10, marginTop: 20 }}>
        <View style={{ marginHorizontal: 5, marginBottom: 10 }}>
          <Text
            style={[text, { fontSize: 18 }]}
          >{`Order Number: ${orderId}`}</Text>
        </View>
        <View style={content1}>
          <Text style={[text, { fontSize: 18 }]}>{`รายละเอียดการส่งซัก`}</Text>
          <View style={{ marginHorizontal: 10, marginTop: 5 }}>
            <Text style={text}>{`*ส่งคืนภายใน ${
              orderData.order_service_type?.split("_")[0]
            } ชั่วโมง`}</Text>
            <View style={{ marginHorizontal: 15 }}>
              <View style={content2}>
                <Text style={text}>{`ซักผ้า`}</Text>
                <Text style={text}>{`${orderData.order_washingKg} กิโล`}</Text>
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
      <View style={content3}>
        <View style={{ marginHorizontal: 5, marginBottom: 5 }}>
          <View style={content2}>
            <Text style={text}>{`เครดิตคงเหลือ:`}</Text>
            <View style={[content2, { alignItems: "center" }]}>
              <Text style={text}>{`฿${orderData.cus_credit}`}</Text>
              <TouchableOpacity
                style={{ marginLeft: 5 }}
                onPress={() => navigation.navigate("Deposit")}
              >
                <Ionicons name="add-circle-outline" size={20} color="#4691FB" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={content2}>
            <Text style={text}>{`ราคาที่ต้องชำระ`}</Text>
            {orderData.order_finalCost ? (
              <Text style={text}>{`${orderData.order_finalCost} บาท`}</Text>
            ) : (
              <Text style={text}>{`กำลังดำเนินการ`}</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          //   onPress={() => navigation.navigate("WaitingForRider")}
          style={{
            backgroundColor: orderData.order_finalCost ? "#4691FB" : "#767577",
            padding: 10,
            borderRadius: 5,
          }}
          disabled={orderData.order_finalCost ? false : true}
        >
          <View style={{ alignItems: "center", marginHorizontal: 5 }}>
            <Text style={[text, { color: "#ffffff" }]}>{`ชำระเงิน`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderDetailScreen;
