import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { screen } from "./OrderScreenStyle";

const OrderScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View
      style={screen}
    >
      <TouchableOpacity onPress={()=> navigation.navigate("OrderDetail")}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="document-text-outline"
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
            >{`สถานะผ้า: ${item.status}`}</Text>
            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >{`ชำระเงิน: ${item.payment}`}</Text>
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
            รายการทั้งหมด
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
              status: "กำลังไปส่งผ้า",
              payment: "รอการชำระเงิน...",
            },
            {
              key: "2",
              orderNumber: "0125",
              status: "กำลังไปรับผ้า",
              payment: "รอการชำระเงิน...",
            },
            {
              key: "3",
              orderNumber: "1529",
              status: "ถึงร้านแล้ว",
              payment: "รอการชำระเงิน...",
            },
          ]}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id_request}
        />
      </View>
    </View>
  );
};

export default OrderScreen;
