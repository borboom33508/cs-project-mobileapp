import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  button1,
  content1,
  content2,
  content3,
  content4,
  content5,
  text,
} from "./CreateOrderStyle";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Divider, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetApi from "../../api/GetApi";

const CreateOrderScreen = ({ navigation, route }) => {
  const laundryId = route.params.laundry_id;
  const laundryName = route.params.laundry_name;
  const laundryService = route.params.laundry_service;
  const [isEnabled, setIsEnabled] = useState({ reed: false, QR: false });
  const [orderData, setOrderData] = useState({
    washingKgValue: 1,
    description: "",
  });
  
  const postCreateOrder = async () => {
    let account;
    await AsyncStorage.getItem("@account").then((res) => {
      account = JSON.parse(res).split(",")[0];
    });

    var formdata = new FormData();
    formdata.append("laundry_id", laundryId);
    formdata.append("cus_id", account);
    formdata.append("order_service_type", laundryService);
    formdata.append("order_washingKg", orderData.washingKgValue);
    formdata.append("order_isReed", isEnabled.reed);
    formdata.append("order_description", orderData.description);
    formdata.append("order_fixedCost_by_laundry", calculateEstimateCost());
    formdata.append("order_firstRideCost", 40);
    formdata.append("order_secondRideCost", 40);
    formdata.append("order_status", "รอร้านยืนยันรายการ");
    formdata.append(
      "order_source_location",
      "13.81480277932051,100.56665129748043"
    );
    formdata.append(
      "order_dest_location",
      "13.793047980709705,100.57274527599726"
    );
    // console.log(formdata);
    try {
      await GetApi.useFetch(
        "POST",
        formdata,
        `/order/PostCreateOrder.php`
      ).then((data) => {
        console.log(data);
      });
    } catch (e) {
      console.log(e);
    } finally {
      navigation.navigate("WaitingForRider");
    }
  };

  const calculateEstimateCost = () => {
    if (isEnabled.reed) {
      return (
        orderData.washingKgValue * laundryService.split("_")[1] +
        orderData.washingKgValue * 100
      );
    } else {
      return orderData.washingKgValue * laundryService.split("_")[1];
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ alignItems: "center", flexDirection: "row" }}
          >
            <Ionicons name="arrow-back" size={30} color="#4691FB" />
            <Text style={[text, { marginLeft: 10 }]}>{laundryName}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: 10, marginTop: 20 }}>
          <View style={content1}>
            <Text style={[text, { fontSize: 14, marginLeft: 10 }]}>
              {`ที่อยู่จัดส่ง: 88 ถนน งามวงศ์วาน แขวง ลาดยาว เขต...`}
            </Text>
          </View>

          <View style={content2}>
            <View>
              <Text style={[text, { fontSize: 28 }]}>{`ซัก`}</Text>
              <Text style={[text, { fontSize: 14 }]}>
                {`~กิโลกรัมละ ${laundryService.split("_")[1]} บาท`}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  orderData.washingKgValue > 1
                    ? setOrderData({
                        washingKgValue: orderData.washingKgValue - 1,
                      })
                    : null;
                }}
              >
                <MaterialCommunityIcons
                  name="minus-box"
                  size={40}
                  color="#4691FB"
                />
              </TouchableOpacity>
              <Text style={[text, { fontSize: 28, marginHorizontal: 10 }]}>
                {orderData.washingKgValue}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setOrderData({ washingKgValue: orderData.washingKgValue + 1 })
                }
              >
                <MaterialCommunityIcons
                  name="plus-box"
                  size={40}
                  color="#4691FB"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={content2}>
            <View>
              <Text style={[text, { fontSize: 28 }]}>{`รีด`}</Text>
              <Text style={[text, { fontSize: 14 }]}>{`~ตัวละ 20 บาท`}</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled.reed ? "#4691FB" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setIsEnabled({ ...isEnabled, reed: !isEnabled.reed })
              }
              value={isEnabled.reed}
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            />
          </View>

          <View style={{ marginTop: "5%", marginHorizontal: "8%" }}>
            <Text style={[text, { fontSize: 20 }]}>{`คำแนะนำเพิ่มเติม`}</Text>
            <TextInput
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 120 }}
              onChangeText={(text) => {
                setOrderData({ ...orderData, description: text });
              }}
              value={orderData.description}
              activeOutlineColor="#767577"
              multiline
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
            />
          </View>

          <View style={{ marginTop: "5%", marginHorizontal: "8%" }}>
            <Text style={[text, { fontSize: 20 }]}>{`สรุปรายการ`}</Text>
            <View style={[content3, { marginTop: "2%" }]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="circle" size={8} />
                <Text style={[text, { marginLeft: 10 }]}>{`ซักทั้งหมด`}</Text>
              </View>
              <Text style={text}>{`${orderData.washingKgValue} กิโลกรัม`}</Text>
            </View>
            {isEnabled.reed ? (
              <View style={content3}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text style={[text, { marginLeft: 10 }]}>{`รีด`}</Text>
                </View>
              </View>
            ) : null}

            <View style={[content3, { marginTop: "2%", marginHorizontal: 0 }]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[text, { marginLeft: 10 }]}>
                  {`ราคาโดยประมาณ`}
                </Text>
              </View>
              <Text style={text}>{`<= ${calculateEstimateCost()} บาท`}</Text>
            </View>

            <View style={[content3, { marginTop: "2%", marginHorizontal: 0 }]}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={[text, { marginLeft: 10 }]}>{`จัดส่ง`}</Text>
              </View>
              <Text style={text}>{`40 บาท`}</Text>
            </View>

            <View style={content4}>
              <Text style={text}>{`ชำระเงินผ่าน QR Code (บังคับ)`}</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled.QR ? "#4691FB" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() =>
                  setIsEnabled({ ...isEnabled, QR: !isEnabled.QR })
                }
                value={isEnabled.QR}
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
              />
            </View>

            <View style={content4}>
              <Text style={text}>{`โปรโมชั่น`}</Text>
              <TouchableOpacity style={button1}>
                <Text style={[text, { color: "#ffffff" }]}>{`ตรวจสอบ`}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={content5}>
        <TouchableOpacity
          onPress={() => postCreateOrder()}
          style={{
            backgroundColor: isEnabled.QR ? "#4691FB" : "#767577",
            padding: 10,
            borderRadius: 5,
          }}
          disabled={!isEnabled.QR}
        >
          <View style={[content3, { marginHorizontal: 5 }]}>
            <Text style={[text, { color: "#ffffff" }]}>{`ส่งซัก`}</Text>
            <Text style={[text, { color: "#ffffff" }]}>{`฿${
              calculateEstimateCost() + 40
            } บาท`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateOrderScreen;
