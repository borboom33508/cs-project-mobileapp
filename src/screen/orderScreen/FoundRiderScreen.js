import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Divider } from "react-native-paper";

const FoundARiderScreen = ({ navigation }) => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate("AssignRatingRider");
  //   }, 2000);
  // }, []);

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
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 16,
              color: "#000000",
              fontFamily: "Kanit",
            }}
          >
            {`คนขับกำลังไปรับผ้า.....`}
          </Text>
          <Image
            source={require("../../../assets/unknown-user.png")}
            style={{ width: 80, height: 80, marginVertical: 10 }}
          />
          <Text
            style={{
              fontSize: 16,
              color: "#000000",
              fontFamily: "Kanit",
            }}
          >
            {`นายโรชานย์ น้ำทิพย์`}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`Rating:`}
            </Text>
            <FontAwesome
              name="star"
              size={18}
              color="orange"
              style={{ marginHorizontal: 5 }}
            />
            <Text
              style={{
                fontSize: 14,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`(${parseFloat(4.7).toFixed(1)})`}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              color: "#000000",
              fontFamily: "Kanit",
            }}
          >
            {`โทร +66 91-123-4567`}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#000000",
              fontFamily: "Kanit",
            }}
          >
            {`ทะเบียน 69กข-122`}
          </Text>

          <View style={{ marginTop: "10%" }}>
            <Text
              style={{
                fontSize: 14,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {`*กรุณาเตรียมผ้าให้พร้อม`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoundARiderScreen;
