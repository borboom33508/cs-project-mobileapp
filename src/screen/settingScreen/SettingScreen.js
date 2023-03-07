import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { container, button } from "./SettingScreenStyle";

const SettingScreen = ({ navigation, props }) => {
  return (
    <View style={container}>
      <View
        style={{
          flexDirection: "row",
          marginTop: 48,
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/unknown-user.png")}
          style={{ width: 190, height: 190 }}
          resizeMode="contain"
        />
        <View>
          <Text style={{ fontSize: 14, fontFamily: "Kanit" }}>
            {"คุณด๊อบบี้"}
          </Text>
          <Text style={{ fontSize: 14, fontFamily: "Kanit" }}>
            {"+66 0625491524"}
          </Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate("EditProfile")
          }}>
            <Text
              style={{ color: "#4691FB", fontSize: 14, fontFamily: "Kanit" }}
            >
              {"แก้ไขข้อมูล"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View >
        <TouchableOpacity
          style={button}
        >
          <Text style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}>
            {"สะสมแต้ม"}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={button}
        >
          <Text style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}>
            {"เปลี่ยนรหัสผ่าน"}
          </Text>
        </TouchableOpacity>
      </View>
      <View >
        <TouchableOpacity
          style={button}
        >
          <Text style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}>
            {"Policy / นโยบาย"}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={button}
        >
          <Text style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}>
            {"เกี่ยวกับเรา"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingScreen;
