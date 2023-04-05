import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
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
  content6,
  text,
} from "./CreateOrderStyle";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Divider, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetApi from "../../api/GetApi";
import { useIsFocused } from "@react-navigation/native";

const CreateOrderScreen = ({ navigation, route }) => {
  const laundryId = route.params.laundry_id;
  const laundryName = route.params.laundry_name;
  const laundryService = route.params.laundry_service;
  const isFocused = useIsFocused();
  const [isEnabled, setIsEnabled] = useState({ reed: false, QR: false, max: false });
  // setIsEnabled({ ...isEnabled, max: true})
  const [orderData, setOrderData] = useState({
    washingKgValue: 1,
    shirt: 0,
    tshirt: 0,
    sLeg: 0,
    lLeg: 0,
    jean: 0,
    underwear: 0,
    sock: 0,
    other: 0,
    description: "",
  });
  // setOrderData({ ...orderData, washingKgValue: 2})
  const [requestData, setRequestData] = useState({
    placeName: "",
    customerLocation: "",
    laundryLocation: "",
    riderCost: "",
  });

  useEffect(() => {
    if (isFocused) {
      fetchCustomerLaundryPositionData();
    }
  }, [isFocused]);

  const fetchCustomerLaundryPositionData = async () => {
    let accountId;
    await AsyncStorage.getItem("@account").then((res) => {
      accountId = JSON.parse(res).split(",")[0];
    });
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/customer/GetCustomerLaundryPosition.php?cus_id=${accountId}&laundry_id=${laundryId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          const riderCost = calculatorDistance(data.request);
          setRequestData({
            placeName: data.request.cus_placeName,
            customerLocation: data.request.cus_lat + "," + data.request.cus_lng,
            laundryLocation: data.request.laundry_location,
            riderCost: riderCost,
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const calculatorDistance = (data) => {
    let lat1 = parseFloat(data.cus_lat);
    let lon1 = parseFloat(data.cus_lng);
    //destination
    let lat2 = parseFloat(data.laundry_location.split(",")[0]);
    let lon2 = parseFloat(data.laundry_location.split(",")[1]);

    const R = 6371e3; // earth radius in meters
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const finalDistance = (R * c) / 1000;
    let riderCost;
    if (finalDistance >= 5) {
      riderCost = Math.floor(finalDistance / 5) * 10;
    } else {
      riderCost = 20;
    }
    return riderCost;
  };

  const postCreateOrder = async () => {
    let accountId;
    await AsyncStorage.getItem("@account").then((res) => {
      accountId = JSON.parse(res).split(",")[0];
    });
    var formdata = new FormData();
    formdata.append("laundry_id", laundryId);
    formdata.append("cus_id", accountId);
    formdata.append("order_service_type", laundryService);
    formdata.append("order_washingKg", orderData.washingKgValue);

    formdata.append("order_shirt", orderData.shirt);
    formdata.append("order_tshirt", orderData.tshirt);
    formdata.append("order_sLeg", orderData.sLeg);
    formdata.append("order_lLeg", orderData.lLeg);
    formdata.append("order_jean", orderData.jean);
    formdata.append("order_underwear", orderData.underwear);
    formdata.append("order_sock", orderData.sock);
    formdata.append("order_other", orderData.other);
    formdata.append("order_isReed", isEnabled.reed);
    formdata.append(
      "order_description",
      orderData.description ? orderData.description : ""
    );
    formdata.append("order_fixedCost_by_laundry", calculateEstimateCost());
    formdata.append("order_firstRideCost", requestData.riderCost);
    formdata.append("order_secondRideCost", requestData.riderCost);
    formdata.append("order_status", "รอร้านยืนยันรายการ");
    formdata.append("order_source_location", requestData.customerLocation);
    formdata.append("order_dest_location", requestData.laundryLocation);
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
      navigation.navigate("Notification");
    }
  };

  const calculateEstimateCost = () => {
    if (isEnabled.reed) {
      return (
        orderData.washingKgValue * laundryService.split("_")[1] +
        orderData.washingKgValue * 60
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
              {`ที่อยู่จัดส่ง: ${requestData.placeName.slice(0, 30)}...`}
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
                        ...orderData,
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
                  setOrderData({
                    ...orderData,
                    washingKgValue: orderData.washingKgValue + 1,
                  })
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

          <View style={content6}>
            <View>
              <Text style={[text, { fontSize: 18 }]}>{`เสื้อยืด`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  orderData.shirt >= 1
                    ? setOrderData({
                        ...orderData,
                        shirt: orderData.shirt - 1,
                      })
                    : null;
                }}
              >
                <MaterialCommunityIcons
                  name="minus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
              <Text style={[text, { fontSize: 18, marginHorizontal: 10 }]}>
                {orderData.shirt}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setOrderData({ ...orderData, shirt: orderData.shirt + 1 })
                }
              >
                <MaterialCommunityIcons
                  name="plus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={content6}>
            <View>
              <Text style={[text, { fontSize: 18 }]}>{`เสื้อเชิ๊ต`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  orderData.tshirt >= 1
                    ? setOrderData({
                        ...orderData,
                        tshirt: orderData.tshirt - 1,
                      })
                    : null;
                }}
              >
                <MaterialCommunityIcons
                  name="minus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
              <Text style={[text, { fontSize: 18, marginHorizontal: 10 }]}>
                {orderData.tshirt}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setOrderData({ ...orderData, tshirt: orderData.tshirt + 1 })
                }
              >
                <MaterialCommunityIcons
                  name="plus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={content6}>
            <View>
              <Text
                style={[text, { fontSize: 18 }]}
              >{`กางเกง/กระโปรง (ขาสั้น)`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  orderData.sLeg >= 1
                    ? setOrderData({ ...orderData, sLeg: orderData.sLeg - 1 })
                    : null;
                }}
              >
                <MaterialCommunityIcons
                  name="minus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
              <Text style={[text, { fontSize: 18, marginHorizontal: 10 }]}>
                {orderData.sLeg}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setOrderData({ ...orderData, sLeg: orderData.sLeg + 1 })
                }
              >
                <MaterialCommunityIcons
                  name="plus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={content6}>
            <View>
              <Text
                style={[text, { fontSize: 18 }]}
              >{`กางเกง/กระโปรง (ขายาว)`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  orderData.lLeg >= 1
                    ? setOrderData({ ...orderData, lLeg: orderData.lLeg - 1 })
                    : null;
                }}
              >
                <MaterialCommunityIcons
                  name="minus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
              <Text style={[text, { fontSize: 18, marginHorizontal: 10 }]}>
                {orderData.lLeg}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setOrderData({ ...orderData, lLeg: orderData.lLeg + 1 })
                }
              >
                <MaterialCommunityIcons
                  name="plus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={content6}>
            <View>
              <Text style={[text, { fontSize: 18 }]}>{`กางเกงยีน`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  orderData.jean >= 1
                    ? setOrderData({ ...orderData, jean: orderData.jean - 1 })
                    : null;
                }}
              >
                <MaterialCommunityIcons
                  name="minus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
              <Text style={[text, { fontSize: 18, marginHorizontal: 10 }]}>
                {orderData.jean}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setOrderData({ ...orderData, jean: orderData.jean + 1 })
                }
              >
                <MaterialCommunityIcons
                  name="plus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={content6}>
            <View>
              <Text style={[text, { fontSize: 18 }]}>{`ชุดชั้นใน`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  orderData.underwear >= 1
                    ? setOrderData({
                        ...orderData,
                        underwear: orderData.underwear - 1,
                      })
                    : null;
                }}
              >
                <MaterialCommunityIcons
                  name="minus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
              <Text style={[text, { fontSize: 18, marginHorizontal: 10 }]}>
                {orderData.underwear}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setOrderData({
                    ...orderData,
                    underwear: orderData.underwear + 1,
                  })
                }
              >
                <MaterialCommunityIcons
                  name="plus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={content6}>
            <View>
              <Text style={[text, { fontSize: 18 }]}>{`ถุงเท้า`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  orderData.sock >= 1
                    ? setOrderData({ ...orderData, sock: orderData.sock - 1 })
                    : null;
                }}
              >
                <MaterialCommunityIcons
                  name="minus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
              <Text style={[text, { fontSize: 18, marginHorizontal: 10 }]}>
                {orderData.sock}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setOrderData({ ...orderData, sock: orderData.sock + 1 })
                }
              >
                <MaterialCommunityIcons
                  name="plus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={content6}>
            <View>
              <Text style={[text, { fontSize: 18 }]}>{`อื่นๆ`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  orderData.other >= 1
                    ? setOrderData({ ...orderData, other: orderData.other - 1 })
                    : null;
                }}
              >
                <MaterialCommunityIcons
                  name="minus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
              <Text style={[text, { fontSize: 18, marginHorizontal: 10 }]}>
                {orderData.other}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setOrderData({ ...orderData, other: orderData.other + 1 })
                }
              >
                <MaterialCommunityIcons
                  name="plus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={content2}>
            <View>
              <Text style={[text, { fontSize: 28 }]}>{`รีด`}</Text>
              <Text style={[text, { fontSize: 14 }]}>{`~ตัวละ 10 บาท`}</Text>
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
              <Text style={text}>{`ซักทั้งหมด`}</Text>
              <Text style={text}>{`${orderData.washingKgValue} กิโลกรัม`}</Text>
            </View>

            {orderData.shirt ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text style={[text, { marginLeft: 10 }]}>{`เสื้อยืด`}</Text>
                </View>
                <Text style={text}>{`${orderData.shirt} ตัว`}</Text>
              </View>
            ) : null}

            {orderData.tshirt ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text style={[text, { marginLeft: 10 }]}>{`เสื้อเชิ๊ต`}</Text>
                </View>
                <Text style={text}>{`${orderData.tshirt} ตัว`}</Text>
              </View>
            ) : null}

            {orderData.sLeg ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text
                    style={[text, { marginLeft: 10 }]}
                  >{`กางเกง/กระโปรง (ขาสั้น)`}</Text>
                </View>
                <Text style={text}>{`${orderData.sLeg} ตัว`}</Text>
              </View>
            ) : null}

            {orderData.lLeg ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text
                    style={[text, { marginLeft: 10 }]}
                  >{`กางเกง/กระโปรง (ขายาว)`}</Text>
                </View>
                <Text style={text}>{`${orderData.lLeg} ตัว`}</Text>
              </View>
            ) : null}

            {orderData.jean ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text style={[text, { marginLeft: 10 }]}>{`กางเกงยีน`}</Text>
                </View>
                <Text style={text}>{`${orderData.jean} ตัว`}</Text>
              </View>
            ) : null}

            {orderData.underwear ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text style={[text, { marginLeft: 10 }]}>{`ชุดชั้นใน`}</Text>
                </View>
                <Text style={text}>{`${orderData.underwear} ตัว`}</Text>
              </View>
            ) : null}

            {orderData.sock ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text style={[text, { marginLeft: 10 }]}>{`ถุงเท้า`}</Text>
                </View>
                <Text style={text}>{`${orderData.sock} ตัว`}</Text>
              </View>
            ) : null}

            {orderData.other ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text style={[text, { marginLeft: 10 }]}>{`อื่นๆ`}</Text>
                </View>
                <Text style={text}>{`${orderData.other} ตัว`}</Text>
              </View>
            ) : null}

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
              <Text style={text}>{`${requestData.riderCost * 2} บาท`}</Text>
            </View>

            <View style={content4}>
              <Text style={text}>{`ชำระเงินผ่านเครดิต (บังคับ)`}</Text>
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
              calculateEstimateCost() + requestData.riderCost * 2
            } บาท`}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateOrderScreen;
