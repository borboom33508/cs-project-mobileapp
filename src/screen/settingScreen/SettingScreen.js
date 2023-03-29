import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  NativeModules,
  Alert,
} from "react-native";
import { container, button, textButton } from "./SettingScreenStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetApi, { API } from "../../api/GetApi";
import { useIsFocused } from "@react-navigation/native";

const SettingScreen = ({ navigation, props }) => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState("");
  const isFocused = useIsFocused();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("@account");
    NativeModules.DevSettings.reload();
    // navigation.navigate("Landing");
  };

  useEffect(() => {
    if (isFocused) {
      setPicture("");
      getAccountData();
    } else {
    }
  }, [isFocused]);

  const fetchAccountData = async (accountId) => {
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/customer/GetAccountForSetting.php?cus_id= ${accountId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          setUsername(data.request.cus_name);
          setPhone(data.request.cus_phone);
          setPicture(data.request.cus_picture);
          if (
            data.request.cus_picture == "" ||
            data.request.cus_picture == null
          ) {
            setPicture("unknown-user.png");
          }
        } else {
          console.log(data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getAccountData = async () => {
    await AsyncStorage.getItem("@account").then((res) => {
      let accountId = JSON.parse(res);
      if (accountId == null) {
        console.log("not found");
      } else {
        fetchAccountData(accountId);
        // console.log(accountId);
      }
    });
  };

  const alertLogout = () => {
    Alert.alert("ออกจากระบบ", "", [
      {
        text: "ยกเลิก",
        style: "cancel",
      },
      {
        text: "ออกจากระบบ",
        style: "destructive",
        onPress: () => handleLogout(),
      },
    ]);
  };

  return (
    <View style={container}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 48,
          alignItems: "center",
          marginHorizontal: 10,
        }}
      >
        <Image
          source={{ uri: API.urlCustomerImage + picture }}
          style={{
            width: 190,
            height: 190,
            borderWidth: 1,
            borderColor: "#000000",
          }}
          resizeMode="contain"
        />

        <View style={{ marginLeft: 16 }}>
          <Text style={{ fontSize: 14, fontFamily: "Kanit" }}>{username}</Text>
          <Text style={{ fontSize: 14, fontFamily: "Kanit" }}>{phone}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          >
            <Text
              style={{ fontSize: 14, fontFamily: "Kanit", color: "#4691FB" }}
            >
              {"แก้ไขข้อมูล"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View>
        <TouchableOpacity style={button}>
          <Text style={textButton}>{"สะสมแต้ม"}</Text>
        </TouchableOpacity>
      </View> */}
      <View>
        <TouchableOpacity
          style={button}
          onPress={() => {
            navigation.navigate("SetPassword");
          }}
        >
          <Text style={textButton}>{"เปลี่ยนรหัสผ่าน"}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={button}
          onPress={() => {
            navigation.navigate("Policy");
          }}
        >
          <Text style={textButton}>{"Policy / นโยบาย"}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={button}
          onPress={() => {
            navigation.navigate("AboutUs");
          }}
        >
          <Text style={textButton}>{"เกี่ยวกับเรา"}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center", marginTop: 60 }}>
        <TouchableOpacity onPress={() => alertLogout()}>
          <Text style={{ fontSize: 18, color: "#F91616", fontFamily: "Kanit" }}>
            {"ออกจากระบบ"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingScreen;
