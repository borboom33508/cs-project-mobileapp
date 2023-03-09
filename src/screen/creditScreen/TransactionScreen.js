import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { container } from "./TransactionScreenStyle";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { AntDesign } from "@expo/vector-icons";

const TransactionScreen = ({ navigation, props }) => {
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
          <AntDesign
            name="creditcard"
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
            >{`รูปแบบ: ${item.header}`}</Text>
            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >{`เวลา: ${item.timestamp}`}</Text>
            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >{`จำนวนเงิน: ${item.amount}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={container}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Credit");
            }}
          >
            <Ionicons name="arrow-back" size={30} color="#4691FB" />
          </TouchableOpacity>
        </View>
      </View>
        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          <Text
            style={{
              fontSize: 28,
              color: "#000000",
              fontFamily: "Kanit",
            }}
          >
            {"ประวัติธุรกรรม"}
          </Text>
        </View>
      <View style={{ flex: 1, marginHorizontal: 5, marginBottom: 5 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[
            {
              key: "1",
              header: "เติมเครดิต",
              timestamp: "22:22-8-3-66",
              amount: 250
            },
            {
              key: "2",
              header: "ชำระเงิน",
              timestamp: "16:22-8-3-66",
              amount: 100
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
};

export default TransactionScreen;
