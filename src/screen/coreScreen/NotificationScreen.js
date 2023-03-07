import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const NotificationScreen = () => {
    const renderItem = ({ item }) => (
        <View
          style={{
            borderRadius: 10,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
            elevation: 2,
            backgroundColor: "#ffffff",
            marginVertical: 5,
            marginHorizontal: 5,
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons
                name="bicycle"
                size={60}
                color="#4691FB"
                style={{ marginLeft: 4 }}
              />
              <View style={{ marginLeft: 16 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000000",
                    fontFamily: "Kanit",
                  }}
                >{`Order Number: ${item.orderNumber}`}</Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000000",
                    fontFamily: "Kanit",
                  }}
                >{`หัวข้อ: ${item.status}`}</Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#000000",
                    fontFamily: "Kanit",
                  }}
                >{`กำลังไปที่: ${item.location}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    
      return (
        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
          <View style={{ marginTop: getStatusBarHeight(), marginHorizontal: 10 }}>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 28,
                  color: "#000000",
                  fontFamily: "Kanit",
                }}
              >
                การแจ้งเตือนทั้งหมด
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, marginHorizontal: 5, marginBottom: 5 }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={[
                {
                  key: "1",
                  orderNumber: "0110",
                  status: "คนขับกำลังไปรับผ้า",
                  location: "The selected kas. . .",
                },
                {
                  key: "2",
                  orderNumber: "0125",
                  status: "คนขับกำลังไปส่งผ้า",
                  location: "ร้านป้าศรีซักรีดยังไง",
                },
                // {
                //   key: "3",
                //   orderNumber: "1529",
                //   status: "ถึงร้านแล้ว",
                //   payment: "รอการชำระเงิน...",
                // },
              ]}
              renderItem={renderItem}
              // keyExtractor={(item) => item.id_request}
            />
          </View>
        </View>
      );
}

export default NotificationScreen