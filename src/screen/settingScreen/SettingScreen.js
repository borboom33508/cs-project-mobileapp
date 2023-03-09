import React from "react";
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

const SettingScreen = ({ navigation, props }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("@account");
    NativeModules.DevSettings.reload();
    // navigation.navigate("Landing");
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
          source={require("../../../assets/unknown-user.png")}
          style={{
            width: 190,
            height: 190,
            borderWidth: 1,
            borderColor: "#000000",
          }}
          resizeMode="contain"
        />
        <View style={{ marginLeft: 16 }}>
          <Text style={{ fontSize: 14, fontFamily: "Kanit" }}>
            {"คุณด๊อบบี้"}
          </Text>
          <Text style={{ fontSize: 14, fontFamily: "Kanit" }}>
            {"+66 0625491524"}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          >
            <Text style={{ fontSize: 14, fontFamily: "Kanit", color: "#4691FB" }}>
              {"แก้ไขข้อมูล"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TouchableOpacity style={button}>
          <Text style={textButton}>{"สะสมแต้ม"}</Text>
        </TouchableOpacity>
      </View>
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
