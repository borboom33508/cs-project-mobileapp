import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { container, button } from "./WithdrawRiderScreenStyle";
import { TextInput } from "react-native-paper";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useIsFocused } from "@react-navigation/native";

const WithdrawRiderScreen = ({ navigation, props }) => {
  const [credit, setCredit] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("1234559122");
  const [bank, setBank] = useState("ธนาคารกสิกรไทย");
  const [fname, setFname] = useState("จอห์น");
  const [lname, setLname] = useState("เบียร์ด");

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
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={30} color="#4691FB" />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <View style={{ padding: 10, paddingTop: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 26, fontFamily: "Kanit" }}>
              {"ยอดเครดิต " + credit + " บาท"}
            </Text>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"ยอดถอน"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              onChangeText={(text) => {
                setWithdrawAmount(text);
              }}
              value={withdrawAmount}
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
              label={
                <Text style={{ fontFamily: "Kanit" }}>{"เลขบัญชีธนาคาร"}</Text>
              }
              mode="outlined"
              disabled="true"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              value={accountNumber}
              activeOutlineColor="#4691FB"
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
            ></TextInput>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"ธนาคาร"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              disabled="true"
              value={bank}
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
              label={<Text style={{ fontFamily: "Kanit" }}>{"ชื่อบัญชี"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              disabled="true"
              value={fname + " " + lname}
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
          <View style={{justifyContent: "center", alignItems: "center", marginTop: 40}}>
            <Text style={{ fontSize: 12, fontFamily: "Kanit" }}>
              {"โปรดตรวจสอบข้อมูลให้ถูกต้องครบถ้วน\n   ใช้เวลาในการถอนประมาณ 24 ชั่วโมง"}
            </Text>
          </View>
          <TouchableOpacity style={button}>
            <Text
              style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
            >
              {"ถอนเงิน"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WithdrawRiderScreen;
