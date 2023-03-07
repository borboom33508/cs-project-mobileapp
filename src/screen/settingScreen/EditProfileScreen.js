import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import { container } from "./EditProfileScreenStyle";
import { TextInput } from "react-native-paper";
import { getStatusBarHeight } from "react-native-status-bar-height";

const EditProfileScreen = ({ navigation, props }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View style={container}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Setting");
            }}
          >
            <Ionicons name="arrow-back" size={30} color="#4691FB" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={{ color: "#4691FB", fontSize: 14, fontFamily: "Kanit" }}
            >
              {"บันทึก"}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: "5%",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/unknown-user.png")}
            style={{ width: 200, height: 200 }}
          />
          <TouchableOpacity>
            <Text
              style={{ color: "#4691FB", fontSize: 14, fontFamily: "Kanit" }}
            >
              {"อัปโหลดรูปภาพ"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"ชื่อ"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              //   onChangeText={(text) => {
              //     setAccount({
              //       ...account,
              //       name: { value: text, error: "" },
              //     });
              //   }}
              //   value={account.name.value}
              activeOutlineColor="#4691FB"
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"นามสกุล"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              //   onChangeText={(text) => {
              //     setAccount({
              //       ...account,
              //       name: { value: text, error: "" },
              //     });
              //   }}
              //   value={account.name.value}
              activeOutlineColor="#4691FB"
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"เบอร์โทร"}</Text>}
              mode="outlined"
              disabled="true"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              //   onChangeText={(text) => {
              //     setAccount({
              //       ...account,
              //       name: { value: text, error: "" },
              //     });
              //   }}
              //   value={account.name.value}
              activeOutlineColor="#4691FB"
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
            >
            </TextInput>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"อีเมล"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              //   onChangeText={(text) => {
              //     setAccount({
              //       ...account,
              //       name: { value: text, error: "" },
              //     });
              //   }}
              //   value={account.name.value}
              activeOutlineColor="#4691FB"
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditProfileScreen;
