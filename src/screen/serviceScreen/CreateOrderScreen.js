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
  const [isEnabled, setIsEnabled] = useState({
    reed: false,
    QR: false,
    max: false,
  });

  const [tshirtReed, setTshirtReed] = useState(0);
  const [shirtReed, setShirtReed] = useState(0);
  const [slegReed, setSlegReed] = useState(0);
  const [llegReed, setLlegReed] = useState(0);
  const [jeanReed, setJeanReed] = useState(0);
  const [underwearReed, setUnderwearReed] = useState(0);
  const [sockReed, setSockReed] = useState(0);
  const [otherReed, setOtherReed] = useState(0);

  const [currentG, setCurrentG] = useState(0);
  const [currentCloth, setCurrentCloth] = useState(0);

  // setIsEnabled({ ...isEnabled, max: true})
  const [orderData, setOrderData] = useState({
    washingKgValue: 1,
    tshirt: 0,
    shirt: 0,
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

    formdata.append("order_tshirt", orderData.tshirt);
    formdata.append("order_shirt", orderData.shirt);
    formdata.append("order_sLeg", orderData.sLeg);
    formdata.append("order_lLeg", orderData.lLeg);
    formdata.append("order_jean", orderData.jean);
    formdata.append("order_underwear", orderData.underwear);
    formdata.append("order_sock", orderData.sock);
    formdata.append("order_other", orderData.other);

    formdata.append("order_reed_tshirt", tshirtReed);
    formdata.append("order_reed_shirt", shirtReed);
    formdata.append("order_reed_sLeg", slegReed);
    formdata.append("order_reed_lLeg", llegReed);
    formdata.append("order_reed_jean", jeanReed);
    formdata.append("order_reed_underwear", underwearReed);
    formdata.append("order_reed_sock", sockReed);
    formdata.append("order_reed_other", otherReed);

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
        (tshirtReed +
          shirtReed +
          slegReed +
          llegReed +
          jeanReed +
          underwearReed +
          sockReed +
          otherReed) *
          15
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
                  if (orderData.washingKgValue > 1) {
                    setOrderData({
                      ...orderData,
                      washingKgValue: orderData.washingKgValue - 1,
                      tshirt: 0,
                      shirt: 0,
                      sLeg: 0,
                      lLeg: 0,
                      jean: 0,
                      underwear: 0,
                      sock: 0,
                      other: 0,
                    });
                    setCurrentCloth(0);
                    setCurrentG(0);
                  }
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
                onPress={() => {
                  setOrderData({
                    ...orderData,
                    washingKgValue: orderData.washingKgValue + 1,
                  });
                }}
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
              <Text style={[text, { fontSize: 12 }]}>{`~80 กรัม/ชิ้น`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  let x = 0;
                  x = orderData.tshirt ? orderData.tshirt - 1 : 0;
                  orderData.tshirt ? null : (x = x - 1);
                  if (x >= 1) {
                    setOrderData({
                      ...orderData,
                      tshirt: orderData.tshirt - 1,
                    });
                    setCurrentCloth(currentCloth - 1);
                    setCurrentG(currentG - 80);
                  } else if (x == 0) {
                    currentG ? setCurrentG(currentG - 80) : setCurrentG(0);
                    setOrderData({
                      ...orderData,
                      tshirt: 0,
                    });
                  }
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
                onPress={() => {
                  let x = 0;
                  x = currentG ? currentG + 80 : 0;
                  x / 1000 > orderData.washingKgValue
                    ? null
                    : setOrderData({
                        ...orderData,
                        tshirt: orderData.tshirt + 1,
                      });
                  setCurrentCloth(currentCloth + 1);
                  setCurrentG(currentG + 80);
                  currentG ? null : (x = x + 80);
                  if (x / 1000 > orderData.washingKgValue) {
                    setOrderData({
                      ...orderData,
                      washingKgValue: orderData.washingKgValue + 1,
                      tshirt: orderData.tshirt + 1,
                    });
                  }
                }}
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
              <Text style={[text, { fontSize: 18 }]}>{`เสื้อเชิ้ต`}</Text>
              <Text style={[text, { fontSize: 12 }]}>{`~100 กรัม/ชิ้น`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  let x = 0;
                  x = orderData.shirt ? orderData.shirt - 1 : 0;
                  orderData.shirt ? null : (x = x - 1);
                  if (x >= 1) {
                    setOrderData({
                      ...orderData,
                      shirt: orderData.shirt - 1,
                    });
                    setCurrentCloth(currentCloth - 1);
                    setCurrentG(currentG - 100);
                  } else if (x == 0) {
                    currentG ? setCurrentG(currentG - 100) : setCurrentG(0);
                    setOrderData({
                      ...orderData,
                      shirt: 0,
                    });
                  }
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
                onPress={() => {
                  let x = 0;
                  x = currentG ? currentG + 100 : 0;
                  x / 1000 > orderData.washingKgValue
                    ? null
                    : setOrderData({
                        ...orderData,
                        shirt: orderData.shirt + 1,
                      });
                  setCurrentCloth(currentCloth + 1);
                  setCurrentG(currentG + 100);
                  currentG ? null : (x = x + 100);
                  if (x / 1000 > orderData.washingKgValue) {
                    setOrderData({
                      ...orderData,
                      washingKgValue: orderData.washingKgValue + 1,
                      shirt: orderData.shirt + 1,
                    });
                  }
                }}
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
              <Text style={[text, { fontSize: 12 }]}>{`~250 กรัม/ชิ้น`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  let x = 0;
                  x = orderData.sLeg ? orderData.sLeg - 1 : 0;
                  orderData.sLeg ? null : (x = x - 1);
                  if (x >= 1) {
                    setOrderData({
                      ...orderData,
                      sLeg: orderData.sLeg - 1,
                    });
                    setCurrentCloth(currentCloth - 1);
                    setCurrentG(currentG - 250);
                  } else if (x == 0) {
                    currentG ? setCurrentG(currentG - 250) : setCurrentG(0);
                    setOrderData({
                      ...orderData,
                      sLeg: 0,
                    });
                  }
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
                onPress={() => {
                  let x = 0;
                  x = currentG ? currentG + 250 : 0;
                  x / 1000 > orderData.washingKgValue
                    ? null
                    : setOrderData({
                        ...orderData,
                        sLeg: orderData.sLeg + 1,
                      });
                  setCurrentCloth(currentCloth + 1);
                  setCurrentG(currentG + 250);
                  currentG ? null : (x = x + 250);
                  if (x / 1000 > orderData.washingKgValue) {
                    setOrderData({
                      ...orderData,
                      washingKgValue: orderData.washingKgValue + 1,
                      sLeg: orderData.sLeg + 1,
                    });
                  }
                }}
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
              <Text style={[text, { fontSize: 12 }]}>{`~400 กรัม/ชิ้น`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  let x = 0;
                  x = orderData.lLeg ? orderData.lLeg - 1 : 0;
                  orderData.lLeg ? null : (x = x - 1);
                  if (x >= 1) {
                    setOrderData({
                      ...orderData,
                      lLeg: orderData.lLeg - 1,
                    });
                    setCurrentCloth(currentCloth - 1);
                    setCurrentG(currentG - 400);
                  } else if (x == 0) {
                    currentG ? setCurrentG(currentG - 400) : setCurrentG(0);
                    setOrderData({
                      ...orderData,
                      lLeg: 0,
                    });
                  }
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
                onPress={() => {
                  let x = 0;
                  x = currentG ? currentG + 400 : 0;
                  x / 1000 > orderData.washingKgValue
                    ? null
                    : setOrderData({
                        ...orderData,
                        lLeg: orderData.lLeg + 1,
                      });
                  setCurrentCloth(currentCloth + 1);
                  setCurrentG(currentG + 400);
                  currentG ? null : (x = x + 400);
                  if (x / 1000 > orderData.washingKgValue) {
                    setOrderData({
                      ...orderData,
                      washingKgValue: orderData.washingKgValue + 1,
                      lLeg: orderData.lLeg + 1,
                    });
                  }
                }}
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
              <Text style={[text, { fontSize: 18 }]}>{`กางเกงยีนส์`}</Text>
              <Text style={[text, { fontSize: 12 }]}>{`~800 กรัม/ชิ้น`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  let x = 0;
                  x = orderData.jean ? orderData.jean - 1 : 0;
                  orderData.jean ? null : (x = x - 1);
                  if (x >= 1) {
                    setOrderData({
                      ...orderData,
                      jean: orderData.jean - 1,
                    });
                    setCurrentCloth(currentCloth - 1);
                    setCurrentG(currentG - 800);
                  } else if (x == 0) {
                    currentG ? setCurrentG(currentG - 800) : setCurrentG(0);
                    setOrderData({
                      ...orderData,
                      jean: 0,
                    });
                  }
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
                onPress={() => {
                  let x = 0;
                  x = currentG ? currentG + 800 : 0;
                  x / 1000 > orderData.washingKgValue
                    ? null
                    : setOrderData({
                        ...orderData,
                        jean: orderData.jean + 1,
                      });
                  setCurrentCloth(currentCloth + 1);
                  setCurrentG(currentG + 800);
                  currentG ? null : (x = x + 800);
                  if (x / 1000 > orderData.washingKgValue) {
                    setOrderData({
                      ...orderData,
                      washingKgValue: orderData.washingKgValue + 1,
                      jean: orderData.jean + 1,
                    });
                  }
                }}
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
              <Text style={[text, { fontSize: 12 }]}>{`~30 กรัม/ชิ้น`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  let x = 0;
                  x = orderData.underwear ? orderData.underwear - 1 : 0;
                  orderData.underwear ? null : (x = x - 1);
                  if (x >= 1) {
                    setOrderData({
                      ...orderData,
                      underwear: orderData.underwear - 1,
                    });
                    setCurrentCloth(currentCloth - 1);
                    setCurrentG(currentG - 30);
                  } else if (x == 0) {
                    currentG ? setCurrentG(currentG - 30) : setCurrentG(0);
                    setOrderData({
                      ...orderData,
                      underwear: 0,
                    });
                  }
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
                onPress={() => {
                  let x = 0;
                  x = currentG ? currentG + 30 : 0;
                  x / 1000 > orderData.washingKgValue
                    ? null
                    : setOrderData({
                        ...orderData,
                        underwear: orderData.underwear + 1,
                      });
                  setCurrentCloth(currentCloth + 1);
                  setCurrentG(currentG + 30);
                  currentG ? null : (x = x + 30);
                  if (x / 1000 > orderData.washingKgValue) {
                    setOrderData({
                      ...orderData,
                      washingKgValue: orderData.washingKgValue + 1,
                      underwear: orderData.underwear + 1,
                    });
                  }
                }}
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
              <Text style={[text, { fontSize: 12 }]}>{`~20 กรัม/ชิ้น`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  let x = 0;
                  x = orderData.sock ? orderData.sock - 1 : 0;
                  orderData.sock ? null : (x = x - 1);
                  if (x >= 1) {
                    setOrderData({
                      ...orderData,
                      sock: orderData.sock - 1,
                    });
                    setCurrentCloth(currentCloth - 1);
                    setCurrentG(currentG - 20);
                  } else if (x == 0) {
                    currentG ? setCurrentG(currentG - 20) : setCurrentG(0);
                    setOrderData({
                      ...orderData,
                      sock: 0,
                    });
                  }
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
                onPress={() => {
                  let x = 0;
                  x = currentG ? currentG + 20 : 0;
                  x / 1000 > orderData.washingKgValue
                    ? null
                    : setOrderData({
                        ...orderData,
                        sock: orderData.sock + 1,
                      });
                  setCurrentCloth(currentCloth + 1);
                  setCurrentG(currentG + 20);
                  currentG ? null : (x = x + 20);
                  if (x / 1000 > orderData.washingKgValue) {
                    setOrderData({
                      ...orderData,
                      washingKgValue: orderData.washingKgValue + 1,
                      sock: orderData.sock + 1,
                    });
                  }
                }}
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
              <Text style={[text, { fontSize: 12 }]}>{`~240 กรัม/ชิ้น`}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  let x = 0;
                  x = orderData.other ? orderData.other - 1 : 0;
                  orderData.other ? null : (x = x - 1);
                  if (x >= 1) {
                    setOrderData({
                      ...orderData,
                      other: orderData.other - 1,
                    });
                    setCurrentCloth(currentCloth - 1);
                    setCurrentG(currentG - 240);
                  } else if (x == 0) {
                    currentG ? setCurrentG(currentG - 240) : setCurrentG(0);
                    setOrderData({
                      ...orderData,
                      other: 0,
                    });
                  }
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
                onPress={() => {
                  let x = 0;
                  x = currentG ? currentG + 240 : 0;
                  x / 1000 > orderData.washingKgValue
                    ? null
                    : setOrderData({
                        ...orderData,
                        other: orderData.other + 1,
                      });
                  setCurrentCloth(currentCloth + 1);
                  setCurrentG(currentG + 240);
                  currentG ? null : (x = x + 240);
                  if (x / 1000 > orderData.washingKgValue) {
                    setOrderData({
                      ...orderData,
                      washingKgValue: orderData.washingKgValue + 1,
                      other: orderData.other + 1,
                    });
                  }
                }}
              >
                <MaterialCommunityIcons
                  name="plus-box"
                  size={36}
                  color="#4691FB"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              marginTop: "3%",
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: "8%",
            }}
          >
            <Text>{`น้ำหนักโดยเฉลี่ยปัจจุบัน`}</Text>
            <Text>{`${currentG / 1000} กิโลกรัม`}</Text>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              marginTop: "2%",
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: "8%",
            }}
          >
            <Text>{`น้ำหนักสูงสุดปัจจุบัน`}</Text>
            <Text>{`${orderData.washingKgValue} กิโลกรัม`}</Text>
          </View>

          <View style={[content2, { marginBottom: 12 }]}>
            <View>
              <Text style={[text, { fontSize: 28 }]}>{`รีด`}</Text>
              <Text style={[text, { fontSize: 14 }]}>{`~ตัวละ 15 บาท`}</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled.reed ? "#4691FB" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => {
                setIsEnabled({ ...isEnabled, reed: !isEnabled.reed });
                setShirtReed(0);
                setTshirtReed(0);
                setSlegReed(0);
                setLlegReed(0);
                setJeanReed(0);
                setUnderwearReed(0);
                setSockReed(0);
                setOtherReed(0);
              }}
              value={isEnabled.reed}
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            />
          </View>

          {orderData.tshirt && isEnabled.reed ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: "4%",
              }}
            >
              <Text style={[text, { marginLeft: 20 }]}>{"เสื้อยืด"}</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    tshirtReed == 0
                      ? setTshirtReed(0)
                      : setTshirtReed(tshirtReed - 1);
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus-box"
                    size={36}
                    color="#4691FB"
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    text,
                    { fontSize: 18, marginHorizontal: 10, marginTop: 4 },
                  ]}
                >
                  {tshirtReed}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    tshirtReed < orderData.tshirt
                      ? setTshirtReed(tshirtReed + 1)
                      : setTshirtReed(tshirtReed);
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus-box"
                    size={36}
                    color="#4691FB"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {orderData.shirt && isEnabled.reed ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: "4%",
              }}
            >
              <Text style={[text, { marginLeft: 20 }]}>{"เสื้อเชิ้ต"}</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    shirtReed == 0
                      ? setShirtReed(0)
                      : setShirtReed(shirtReed - 1);
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus-box"
                    size={36}
                    color="#4691FB"
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    text,
                    { fontSize: 18, marginHorizontal: 10, marginTop: 4 },
                  ]}
                >
                  {shirtReed}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    shirtReed < orderData.shirt
                      ? setShirtReed(shirtReed + 1)
                      : setShirtReed(shirtReed);
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus-box"
                    size={36}
                    color="#4691FB"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {orderData.sLeg && isEnabled.reed ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: "4%",
              }}
            >
              <Text style={[text, { marginLeft: 20 }]}>
                {"กางเกง/กระโปรง (ขาสั้น)"}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    slegReed == 0 ? setSlegReed(0) : setSlegReed(slegReed - 1);
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus-box"
                    size={36}
                    color="#4691FB"
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    text,
                    { fontSize: 18, marginHorizontal: 10, marginTop: 4 },
                  ]}
                >
                  {slegReed}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    slegReed < orderData.sLeg
                      ? setSlegReed(slegReed + 1)
                      : setSlegReed(slegReed);
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus-box"
                    size={36}
                    color="#4691FB"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {orderData.lLeg && isEnabled.reed ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: "4%",
              }}
            >
              <Text style={[text, { marginLeft: 20 }]}>
                {"กางเกง/กระโปรง (ขายาว)"}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    llegReed == 0 ? setLlegReed(0) : setLlegReed(llegReed - 1);
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus-box"
                    size={36}
                    color="#4691FB"
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    text,
                    { fontSize: 18, marginHorizontal: 10, marginTop: 4 },
                  ]}
                >
                  {llegReed}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    llegReed < orderData.lLeg
                      ? setLlegReed(llegReed + 1)
                      : setLlegReed(llegReed);
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus-box"
                    size={36}
                    color="#4691FB"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {orderData.jean && isEnabled.reed ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: "4%",
              }}
            >
              <Text style={[text, { marginLeft: 20 }]}>{"กางเกงยีนส์"}</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    jeanReed == 0 ? setJeanReed(0) : setJeanReed(jeanReed - 1);
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus-box"
                    size={36}
                    color="#4691FB"
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    text,
                    { fontSize: 18, marginHorizontal: 10, marginTop: 4 },
                  ]}
                >
                  {jeanReed}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    jeanReed < orderData.jean
                      ? setJeanReed(jeanReed + 1)
                      : setJeanReed(jeanReed);
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus-box"
                    size={36}
                    color="#4691FB"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {orderData.underwear && isEnabled.reed ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: "4%",
              }}
            >
              <Text style={[text, { marginLeft: 20 }]}>{"ชุดชั้นใน"}</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    underwearReed == 0
                      ? setUnderwearReed(0)
                      : setUnderwearReed(underwearReed - 1);
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus-box"
                    size={36}
                    color="#4691FB"
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    text,
                    { fontSize: 18, marginHorizontal: 10, marginTop: 4 },
                  ]}
                >
                  {underwearReed}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    underwearReed < orderData.underwear
                      ? setUnderwearReed(underwearReed + 1)
                      : setUnderwearReed(underwearReed);
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus-box"
                    size={36}
                    color="#4691FB"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {orderData.sock && isEnabled.reed ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: "4%",
              }}
            >
              <Text style={[text, { marginLeft: 20 }]}>{"ถุงเท้า"}</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    sockReed == 0 ? setSockReed(0) : setSockReed(sockReed - 1);
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus-box"
                    size={36}
                    color="#4691FB"
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    text,
                    { fontSize: 18, marginHorizontal: 10, marginTop: 4 },
                  ]}
                >
                  {sockReed}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    sockReed < orderData.sock
                      ? setSockReed(sockReed + 1)
                      : setSockReed(sockReed);
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus-box"
                    size={36}
                    color="#4691FB"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {orderData.other && isEnabled.reed ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginHorizontal: "4%",
              }}
            >
              <Text style={[text, { marginLeft: 20 }]}>{"อื่นๆ"}</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => {
                    otherReed == 0
                      ? setOtherReed(0)
                      : setOtherReed(otherReed - 1);
                  }}
                >
                  <MaterialCommunityIcons
                    name="minus-box"
                    size={36}
                    color="#4691FB"
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    text,
                    { fontSize: 18, marginHorizontal: 10, marginTop: 4 },
                  ]}
                >
                  {otherReed}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    otherReed < orderData.other
                      ? setOtherReed(otherReed + 1)
                      : setOtherReed(otherReed);
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus-box"
                    size={36}
                    color="#4691FB"
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

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
              <Text
                style={text}
              >{`~${orderData.washingKgValue} กิโลกรัม`}</Text>
            </View>

            {orderData.tshirt ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text style={[text, { marginLeft: 10 }]}>{`เสื้อยืด`}</Text>
                </View>
                <Text style={text}>{`${orderData.tshirt} ตัว`}</Text>
              </View>
            ) : null}

            {orderData.shirt ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text style={[text, { marginLeft: 10 }]}>{`เสื้อเชิ้ต`}</Text>
                </View>
                <Text style={text}>{`${orderData.shirt} ตัว`}</Text>
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
                  <Text
                    style={[text, { marginLeft: 10 }]}
                  >{`กางเกงยีนส์`}</Text>
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
              <View style={[content3, { marginTop: 12, marginLeft: 18 }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={[text, { fontSize: 16 }]}>{`รีด`}</Text>
                </View>
              </View>
            ) : null}

            {orderData.tshirt && isEnabled.reed && tshirtReed != 0 ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text style={[text, { marginLeft: 10 }]}>{`เสื้อยืด`}</Text>
                </View>
                <Text style={text}>{`${tshirtReed} ตัว`}</Text>
              </View>
            ) : null}

            {orderData.shirt && isEnabled.reed && shirtReed != 0 ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text style={[text, { marginLeft: 10 }]}>{`เสื้อเชิ้ต`}</Text>
                </View>
                <Text style={text}>{`${shirtReed} ตัว`}</Text>
              </View>
            ) : null}

            {orderData.sLeg && isEnabled.reed && slegReed != 0 ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text
                    style={[text, { marginLeft: 10 }]}
                  >{`กางเกง/กระโปรง (ขาสั้น)`}</Text>
                </View>
                <Text style={text}>{`${slegReed} ตัว`}</Text>
              </View>
            ) : null}

            {orderData.lLeg && isEnabled.reed && llegReed != 0 ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text
                    style={[text, { marginLeft: 10 }]}
                  >{`กางเกง/กระโปรง (ขายาว)`}</Text>
                </View>
                <Text style={text}>{`${llegReed} ตัว`}</Text>
              </View>
            ) : null}

            {orderData.jean && isEnabled.reed && jeanReed != 0 ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text style={[text, { marginLeft: 10 }]}>{`กางเกงยีนส์`}</Text>
                </View>
                <Text style={text}>{`${jeanReed} ตัว`}</Text>
              </View>
            ) : null}

            {orderData.underwear && isEnabled.reed && underwearReed != 0 ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text style={[text, { marginLeft: 10 }]}>{`ชุดชั้นใน`}</Text>
                </View>
                <Text style={text}>{`${underwearReed} ตัว`}</Text>
              </View>
            ) : null}

            {orderData.sock && isEnabled.reed && sockReed != 0 ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text style={[text, { marginLeft: 10 }]}>{`ถุงเท้า`}</Text>
                </View>
                <Text style={text}>{`${sockReed} ตัว`}</Text>
              </View>
            ) : null}

            {orderData.other && isEnabled.reed && otherReed != 0 ? (
              <View style={[content3, { marginTop: "2%" }]}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome name="circle" size={8} />
                  <Text style={[text, { marginLeft: 10 }]}>{`อื่นๆ`}</Text>
                </View>
                <Text style={text}>{`${otherReed} ตัว`}</Text>
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
            backgroundColor:
              isEnabled.QR && currentCloth != 0 ? "#4691FB" : "#767577",
            padding: 10,
            borderRadius: 5,
          }}
          disabled={!isEnabled.QR || currentCloth == 0}
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
