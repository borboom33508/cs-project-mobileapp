import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Divider, TextInput } from "react-native-paper";

const CreateOrderScreen = ({ navigation, route }) => {
  const laundryService = route.params.laundryService;
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    console.log(laundryService);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ alignItems: "center", flexDirection: "row" }}
          >
            <Ionicons name="arrow-back" size={30} color="#4691FB" />
            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontFamily: "Kanit",
                marginLeft: 10,
              }}
            >
              {laundryService.laundry_name}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ margin: 10, marginTop: 20 }}>
          <View
            style={{
              marginHorizontal: 10,
              borderRadius: 10,
              shadowOpacity: 0.2,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 5,
              elevation: 2,
              backgroundColor: "#ffffff",
              paddingVertical: 15,
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#000000",
                fontFamily: "Kanit",
                marginLeft: 10,
              }}
            >
              {`ที่อยู่จัดส่ง: 88 ถนน งามวงศ์วาน แขวง ลาดยาว เขต...`}
            </Text>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              marginTop: "5%",
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: "8%",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 28,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                {`ซัก`}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                {`~กิโลกรัมละ 100 บาท`}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="minus-box"
                  size={40}
                  color="#4691FB"
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 28,
                  color: "#000000",
                  fontFamily: "Kanit",
                  marginHorizontal: 10,
                }}
              >
                {`1`}
              </Text>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="plus-box"
                  size={40}
                  color="#4691FB"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              marginTop: "5%",
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: "8%",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 28,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                {`รีด`}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                {`~ตัวละ 20 บาท`}
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#4691FB" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setIsEnabled(!isEnabled)}
              value={isEnabled}
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            />
          </View>

          <View
            style={{
              marginTop: "5%",
              marginHorizontal: "8%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`คำแนะนำเพิ่มเติม`}
            </Text>
            <TextInput
              // label={<Text style={{ fontFamily: "Kanit" }}>{"ชื่อ"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 120 }}
              onChangeText={(text) => {
                //   setUsername(text);
              }}
              // value={}
              activeOutlineColor="#767577"
              multiline
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
            />
          </View>

          <View
            style={{
              marginTop: "5%",
              marginHorizontal: "8%",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`สรุปรายการ`}
            </Text>
            <View
              style={{
                marginHorizontal: "4%",
                marginTop: "2%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="circle" size={8} />
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000000",
                    fontFamily: "Kanit",
                    marginLeft: 10,
                  }}
                >
                  {`ซักทั้งหมด`}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                {`1 กิโลกรัม`}
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: "4%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="circle" size={8} />
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000000",
                    fontFamily: "Kanit",
                    marginLeft: 10,
                  }}
                >
                  {`รีด`}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: "2%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000000",
                    fontFamily: "Kanit",
                    marginLeft: 10,
                  }}
                >
                  {`ราคาโดยประมาณ`}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                {`<= 260 บาท`}
              </Text>
            </View>

            <View
              style={{
                marginTop: "2%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000000",
                    fontFamily: "Kanit",
                    marginLeft: 10,
                  }}
                >
                  {`จัดส่ง`}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                {`40 บาท`}
              </Text>
            </View>

            <View
              style={{
                justifyContent: "space-between",
                marginTop: "5%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000000",
                    fontFamily: "Kanit",
                  }}
                >
                  {`ชำระเงินผ่าน QR Code (บังคับ)`}
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#4691FB" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setIsEnabled(!isEnabled)}
                value={isEnabled}
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
              />
            </View>

            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                {`โปรโมชั่น`}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#4691FB",
                  padding: 8,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#ffffff",
                    fontFamily: "Kanit",
                  }}
                >
                  {`ตรวจสอบ`}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          marginVertical: "2%",
          marginBottom: "7%",
          width: "90%",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("WaitingForRider")}
          style={{ backgroundColor: "#4691FB", padding: 10, borderRadius: 5 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#ffffff",
                fontFamily: "Kanit",
              }}
            >
              {`ส่งซัก`}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#ffffff",
                fontFamily: "Kanit",
              }}
            >
              {`฿300 บาท`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateOrderScreen;
