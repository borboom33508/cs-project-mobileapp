import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import GetApi, { API } from "../../api/GetApi";
import { useIsFocused } from "@react-navigation/native";
import {
  backgroundColor,
  button,
  container,
  content1,
  image,
  text,
} from "./SelectServiceScreenStyle";

const SelectServiceScreen = ({ navigation, props, route }) => {
  const laundryId = route.params.laundry_id;
  const isFocused = useIsFocused();
  const [laundryData, setLaundryData] = useState({});

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
        `/laundry/GetLaundryService.php?laundry_id=${laundryId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          setLaundryData(data.request);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={container}>
      <View style={{ alignItems: "center" }}>
        <View style={backgroundColor} />
      </View>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ alignItems: "center", flexDirection: "row" }}
          >
            <Ionicons name="arrow-back" size={30} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ padding: 10, paddingTop: 40 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: API.urlLaundryImage + laundryData.laundry_picture,
            }}
            style={image}
          />
        </View>
        <View style={content1}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={[text, { fontFamily: "Montserrat" }]}
            >{`Rating: `}</Text>
            <FontAwesome
              name="star"
              size={16}
              color="orange"
              style={{ marginLeft: 5 }}
            />
            <Text style={[text, { marginLeft: 5 }]}>
              {parseFloat(laundryData.laundry_rating).toFixed(1)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={text}>{`ห่างจากที่อยู่: ~ 2 กิโลเมตร`}</Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Text style={[text, { fontSize: 20 }]}>{`เลือกรูปแบบบริการ`}</Text>
          {laundryData.service_1 ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CreateOrder", {
                  laundry_id: laundryId,
                  laundry_name: laundryData.laundry_name,
                  laundry_service: laundryData.service_1,
                  serviceId: 1,
                })
              }
              style={button}
            >
              <Text style={[text, { fontSize: 16 }]}>
                {`ส่งคืนภายใน ${
                  laundryData.service_1.split("_")[0]
                } ชั่วโมง`}
              </Text>
              <Text style={text}>
                {`~กิโลกรัมละ ${laundryData.service_1.split("_")[1]}`}
              </Text>
            </TouchableOpacity>
          ) : null}
          {laundryData.service_2 ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CreateOrder", {
                  laundry_id: laundryId,
                  laundry_name: laundryData.laundry_name,
                  laundry_service: laundryData.service_2,
                  serviceId: 2,
                })
              }
              style={button}
            >
              <Text style={[text, { fontSize: 16 }]}>
                {`ส่งคืนภายใน ${
                  laundryData.service_2.split("_")[0]
                } ชั่วโมง`}
              </Text>
              <Text style={text}>
                {`~กิโลกรัมละ ${laundryData.service_2.split("_")[1]}`}
              </Text>
            </TouchableOpacity>
          ) : null}
          {laundryData.service_3 ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("CreateOrder", {
                  laundry_id: laundryId,
                  laundry_name: laundryData.laundry_name,
                  laundry_service: laundryData.service_3,
                  serviceId: 3,
                })
              }
              style={button}
            >
              <Text style={[text, { fontSize: 16 }]}>
                {`ส่งคืนภายใน ${
                  laundryData.service_3.split("_")[0]
                } ชั่วโมง`}
              </Text>
              <Text style={text}>
                {`~กิโลกรัมละ ${laundryData.service_3.split("_")[1]}`}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default SelectServiceScreen;
