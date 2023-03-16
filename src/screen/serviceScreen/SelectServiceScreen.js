import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import GetApi, { API } from "../../api/GetApi";
import { useIsFocused } from "@react-navigation/native";

const SelectServiceScreen = ({ navigation, props, route }) => {
  const laundry_id = route.params.laundry_id;
  const isFocused = useIsFocused();
  const [laundryService, setLaundryService] = useState({});

  useEffect(() => {
    if (isFocused) {
      getLaundryService();
    }
  }, [isFocused]);

  const getLaundryService = async () => {
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/laundry/GetLaundryService.php?laundry_id=${laundry_id}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          setLaundryService(data.request);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: 500,
            height: 250,
            borderBottomStartRadius: 500 / 2,
            borderBottomEndRadius: 500 / 2,
            position: "absolute",
            backgroundColor: "#4691FB",
          }}
        />
      </View>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ alignItems: "center", flexDirection: "row" }}
          >
            <Ionicons name="arrow-back" size={30} color="#ffffff" />
            {/* <Text
              style={{
                fontSize: 14,
                color: "#ffffff",
                fontFamily: "Kanit",
                marginLeft: 10,
              }}
            >
              {laundryService.laundry_name}
            </Text> */}
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ padding: 10, paddingTop: 40 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: API.urlLaundryImage + laundryService.laundry_picture }}
            style={{ height: 200, width: 300 }}
          />
        </View>
        <View
          style={{
            marginVertical: "5%",
            marginHorizontal: "15%",
            borderRadius: 10,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
            elevation: 2,
            backgroundColor: "#ffffff",
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#000000",
                fontFamily: "Montserrat",
              }}
            >
              {`Rating: `}
            </Text>
            <FontAwesome
              name="star"
              size={16}
              color="orange"
              style={{
                marginLeft: 5,
              }}
            />
            <Text
              style={{
                fontSize: 14,
                color: "#000000",
                fontFamily: "Kanit",
                marginLeft: 5,
              }}
            >
              {parseFloat(laundryService.laundry_rating).toFixed(1)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`ห่างจากที่อยู่: ~ 2 กิโลเมตร`}
            </Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Text
            style={{
              fontSize: 20,
              color: "#000000",
              fontFamily: "Kanit",
            }}
          >
            {`เลือกรูปแบบบริการ`}
          </Text>
          {laundryService.service_1 ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CreateOrder", {
                  laundryService: laundryService,
                })
              }
              style={{
                marginVertical: "5%",
                borderRadius: 10,
                alignItems: "center",
                padding: 10,
                borderWidth: 1,
                borderColor: "#000000",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                {`ส่งคืนภายใน ${
                  laundryService.service_1.split("_")[0]
                } ชั่วโมง`}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                {`~กิโลกรัมละ ${laundryService.service_1.split("_")[1]}`}
              </Text>
            </TouchableOpacity>
          ) : null}
          {laundryService.service_2 ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CreateOrder", {
                  laundryService: laundryService,
                })
              }
              style={{
                marginVertical: "5%",
                borderRadius: 10,
                alignItems: "center",
                padding: 10,
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                {`ส่งคืนภายใน ${
                  laundryService.service_2.split("_")[0]
                } ชั่วโมง`}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                {`~กิโลกรัมละ ${laundryService.service_2.split("_")[1]}`}
              </Text>
            </TouchableOpacity>
          ) : null}
          {laundryService.service_3 ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CreateOrder", {
                  laundryService: laundryService,
                })
              }
              style={{
                marginVertical: "5%",
                borderRadius: 10,
                alignItems: "center",
                padding: 10,
                borderWidth: 1,
                borderColor: "",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                {`ส่งคืนภายใน ${
                  laundryService.service_3.split("_")[0]
                } ชั่วโมง`}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                {`~กิโลกรัมละ ${laundryService.service_3.split("_")[1]}`}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default SelectServiceScreen;
