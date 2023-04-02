import { View, Text, Image, TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import GetApi, { API } from "../../api/GetApi";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { container, button, text } from "./LaundryMainScreenStyle";

const LaundryMainScreen = ({ navigation, props }) => {
  const [laundryId, setLaundryId] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [rating, setRating] = useState("");
  const [hours, setHours] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getLaundryData();
    }
  }, [isFocused]);

  const fetchLaundryData = async (laundryId) => {
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/laundry/GetLaundryData.php?laundry_id=${laundryId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          setName(data.request.laundry_name);
          setPicture(data.request.laundry_picture);
          setRating(data.request.laundry_rating);
          setHours(data.request.laundry_hours);
          setFname(data.request.laundry_ownerFname);
          setLname(data.request.laundry_ownerLname);
          setPhone(data.request.laundry_phone);
        } else {
          console.log(data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getLaundryData = async () => {
    await AsyncStorage.getItem("@account").then((res) => {
      let accountId = JSON.parse(res);
      if (accountId == null) {
        console.log("not found");
      } else {
        fetchLaundryData(accountId);
        setLaundryId(accountId);
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: 500,
            height: Platform.OS === "android" ? 170 : 220,
            position: "absolute",
            backgroundColor: "#4691FB",
          }}
        />
      </View>
      <View style={{ alignItems: "center", marginTop: 88 }}>
        <Text style={{ fontSize: 24, fontFamily: "Kanit", color: "#ffff" }}>
          {name}
        </Text>
        <Image
          source={{ uri: API.urlLaundryImage + picture }}
          style={{ width: 300, height: 200, marginTop: 32 }}
          resizeMode="contain"
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop: 24,
            backgroundColor: "#4691FB",
            justifyContent: "center",
            width: "100%",
            height: "10%",
            alignItems: "center",
          }}
        >
          <AntDesign name="star" size={28} color="#ffbf00" />
          <Text
            style={{
              fontFamily: "Kanit",
              fontSize: 20,
              marginLeft: 16,
              color: "#ffff",
            }}
          >
            {`Rating ปัจจุบัน: ${rating}`}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: "Kanit",
            fontSize: 24,
            marginBottom: 12,
            marginTop: 16,
          }}
        >
          {"ข้อมูลร้านของคุณ"}
        </Text>
        <View
          style={{
            borderWidth: 1,
            width: "80%",
            borderRadius: 12,
            padding: 18,
            borderColor: "#4691FB",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontFamily: "Kanit", fontSize: 16 }}>
            {`ชื่อ: คุณ${fname} ${lname}`}
          </Text>
          <Text style={{ fontFamily: "Kanit", fontSize: 16 }}>
            {"\n"}
            {`เบอร์โทรศัพท์: ${phone}`}
          </Text>
          <Text style={{ fontFamily: "Kanit", fontSize: 16 }}>
            {"\n"}
            {`เวลาเปิด-ปิดร้าน: ${hours} `}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LaundryMainScreen;
