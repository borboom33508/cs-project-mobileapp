import { View, Text, Image, TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import React, { useEffect, useState } from "react";
import GetApi, { API } from "../../api/GetApi";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { container, button, text } from "./LaundryMainScreenStyle";

const LaundryMainScreen = ({ navigation, props }) => {
  const [laundryId, setLaundryId] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
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
        setLaundryId(accountId)
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: 500,
            height: Platform.OS === "android" ? 170 : 180,
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
          source={
            Platform.OS === "android"
              ? {
                  uri: API.urlLaundryImage + picture,
                }
              : {
                  uri: API.urlLaundryImage + picture,
                }
          }
          style={{ width: 230, height: 200, marginTop: 32 }}
          resizeMode="contain"
        />
        <View>
            <TouchableOpacity style={button} onPress={() => {
                navigation.navigate("AddRiderAcc")
            }}>
                <Text style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}>{"เพิ่มไรเดอร์"}</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LaundryMainScreen;
