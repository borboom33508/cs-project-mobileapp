import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetApi from "../../api/GetApi";
import * as ImagePicker from "expo-image-picker";

const FinishJobScreen = ({ navigation, route }) => {
  const orderId = route.params.order_id;
  const [orderData, setOrderData] = useState({
    picture: "",
    status: route.params.order_status,
  });

  useEffect(() => {
    console.log(orderData);
  }, []);

  const TakePicture = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setOrderData({ ...orderData, picture: result.assets[0].uri });
    }
  };

  const PostUpdateFinishJob = async () => {
    var formdata = new FormData();

    let localUri = orderData.picture;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    formdata.append("order_id", orderId);
    formdata.append("order_status", "คนขับถึงร้านแล้ว");

    formdata.append("file", {
      uri: localUri,
      name: filename,
      type: type,
    });
    console.log(formdata);
    try {
      await GetApi.useFetch(
        "POST",
        formdata,
        `/rider/PostUpdateFinishJob.php`
      ).then((data) => {
        console.log(data);
      });
    } catch (e) {
      console.log(e);
    } finally {
      navigation.navigate("RiderMain");
    }
  };

  const AlertSubmit = () => {
    Alert.alert("โปรดยืนยัน", "", [
      {
        text: "ยกเลิก",
        style: "cancel",
      },
      {
        text: "ยืนยัน",
        style: "default",
        onPress: () => PostUpdateFinishJob(),
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View
          style={{
            marginHorizontal: "5%",
            marginTop: "5%",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: "#000000",
              fontFamily: "Kanit",
              marginLeft: 10,
            }}
          >
            {`Order Number: ${orderId}`}
          </Text>
          <View style={{ marginTop: "10%" }}>
            <Text
              style={{
                fontSize: 24,
                color: "#000000",
                fontFamily: "Kanit",
                marginLeft: 10,
              }}
            >
              {`ถ่ายรูปยืนยัน`}
            </Text>
            <TouchableOpacity onPress={() => TakePicture()}>
              <View
                style={{
                  marginHorizontal: "5%",
                  marginVertical: "5%",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="camera-outline"
                  size={60}
                  color="#4691FB"
                />
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#4691FB",
                      fontFamily: "Kanit",
                      marginLeft: 10,
                    }}
                  >
                    {`กรุณาถ่ายรูปเพื่อเป็นการยืนยัน`}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#4691FB",
                      fontFamily: "Kanit",
                      marginLeft: 10,
                    }}
                  >
                    {`ให้เห็นรูปของผ้า, ร้านค้า`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <Image
              style={{
                width: "100%",
                height: "65%",
                borderWidth: 0.5,
              }}
              source={orderData.picture ? { uri: orderData.picture } : null}
            />
            <View style={{ marginTop: "10%" }}>
              <TouchableOpacity
                onPress={() => AlertSubmit()}
                style={{
                  backgroundColor: orderData.picture ? "#4691FB" : "#767577",
                  padding: 10,
                  borderRadius: 5,
                }}
                disabled={orderData.picture ? false : true}
              >
                <View style={{ alignItems: "center", marginHorizontal: 5 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#ffffff",
                      fontFamily: "Kanit",
                    }}
                  >
                    เสร็จสิ้นรายการ
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FinishJobScreen;
