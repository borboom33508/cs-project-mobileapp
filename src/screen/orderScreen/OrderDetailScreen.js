import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Divider } from "react-native-paper";

const OrderDetailScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Order");
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
              {`รายการทั้งหมด`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Divider />
      <View style={{ margin: 10, marginTop: 20 }}>
        <View style={{ marginHorizontal: 5, marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 18,
              color: "#000000",
              fontFamily: "Kanit",
            }}
          >
            {`Order Number: 0912`}
          </Text>
        </View>
        <View
          style={{
            borderRadius: 10,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
            elevation: 5,
            backgroundColor: "#ffffff",
            marginVertical: 5,
            marginHorizontal: 5,
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#000000",
              fontFamily: "Kanit",
            }}
          >
            {`รายละเอียดการส่งซัก`}
          </Text>
          <View style={{ marginHorizontal: 10, marginTop: 5 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`*ส่งคืนภายใน 24 ชั่วโมง`}
            </Text>
            <View style={{ marginHorizontal: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000000",
                    fontFamily: "Kanit",
                  }}
                >
                  {`ซักผ้า`}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000000",
                    fontFamily: "Kanit",
                  }}
                >
                  {`2 กิโล`}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                {`รีด`}
              </Text>
            </View>

            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`คำแนะนำเพิ่มเติม: แยกสีผ้าให้ด้วยนะครับ`}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                {`ราคาโดยประมาณ`}
              </Text>
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
          </View>
        </View>

        <View
          style={{
            borderRadius: 10,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
            elevation: 5,
            backgroundColor: "#ffffff",
            marginVertical: 5,
            marginHorizontal: 5,
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
        >
          <View style={{ marginHorizontal: 10, marginTop: 5 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`สถานะผ้า: กำลังไปส่งผ้า`}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`ชำระเงิน: รอการชำระเงิน`}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`เวลาทำการ: 9.00 - 20.00 น.`}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          marginVertical: "2%",
          marginBottom: "7%",
          width: "90%",
          alignSelf: "center",
          justifyContent: "flex-end",
        }}
      >
        <View style={{ marginHorizontal: 5, marginBottom: 5 }}>
          <Text
            style={{
              fontSize: 16,
              color: "#000000",
              fontFamily: "Kanit",
            }}
          >
            {`เครดิตคงเหลือ: 300`}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`ราคาที่ต้องชำระ`}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`260 บาท`}
            </Text>
          </View>
        </View>
        <TouchableOpacity
        //   onPress={() => navigation.navigate("WaitingForRider")}
          style={{ backgroundColor: "#4691FB", padding: 10, borderRadius: 5 }}
        >
          <View
            style={{
              alignItems: "center",
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
              {`ชำระเงิน`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderDetailScreen;
