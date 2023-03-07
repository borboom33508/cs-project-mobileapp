import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
} from "react-native";
import React from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import shop1 from "../../../assets/shop1.jpg";
import shop2 from "../../../assets/shop2.jpg";
import shop3 from "../../../assets/shop3.jpg";

const SelectShopScreen = ({ navigation }) => {
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
        paddingVertical: 5,
        paddingHorizontal: 10,
      }}
    >
      <TouchableOpacity onPress={() => {}}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={item.image}
            style={{ width: 130, height: 100 }}
            resizeMode="contain"
          />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={{
                fontSize: 16,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {item.between}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#000000",
                fontFamily: "Kanit",
              }}
            >
              {item.open}
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              flexDirection: "row",
              marginLeft: 20,
            }}
          >
            <FontAwesome name="star" size={18} color="orange" />
            <FontAwesome name="star-half-full" size={18} color="orange" />
            <FontAwesome name="star-o" size={18} color="orange" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: 500,
            height: Platform.OS === "android" ? 170 : 190,
            position: "absolute",
            backgroundColor: "#4691FB",
          }}
        />
      </View>
      <View style={{ marginTop: getStatusBarHeight(), marginHorizontal: 10 }}>
        <TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Ionicons name="location-outline" size={24} color="#ffffff" />
            <View style={{ marginLeft: 5 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: "#ffffff",
                  fontFamily: "Kanit",
                }}
              >
                ที่อยู่จัดส่ง
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#ffffff",
                  fontFamily: "Kanit",
                }}
              >
                88 ถนน งามวงศ์วาน แขวง ลาดยาว เขต...
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            marginVertical: 10,
            borderRadius: 20,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            // shadowRadius: 5,
            elevation: 5,
            backgroundColor: "#ffffff",
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
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
              ค้นหาร้านซักรีด
            </Text>
            <Ionicons name="search-outline" size={24} />
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={{
              fontSize: 18,
              color: "#ffffff",
              fontFamily: "Kanit",
              marginLeft: 10,
              marginBottom: 10,
            }}
          >
            ร้านซักรีดใกล้ฉัน...
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, marginHorizontal: 5, marginBottom: 5 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[
            {
              key: "1",
              name: "ร้านป้าศรีซักยังไง",
              open: "เปิด 09.00 - 18.00 น.",
              between: "1.2 กม. (25 นาที)",
              image: shop1,
            },
            {
              key: "2",
              name: "ร้านชูใจไข่ดาว",
              open: "เปิด 09.00 - 16.00 น.",
              between: "2.2 กม. (22 นาที)",
              image: shop2,
            },
            {
              key: "3",
              name: "ร้านลุงเริง",
              open: "เปิด 09.00 - 17.00 น.",
              between: "7 กม. (30 นาที)",
              image: shop3,
            },
            {
              key: "4",
              name: "ร้านป้าศรีซักยังไง",
              open: "เปิด 09.00 - 18.00 น.",
              between: "1.2 กม. (25 นาที)",
              image: shop1,
            },
            {
              key: "5",
              name: "ร้านชูใจไข่ดาว",
              open: "เปิด 09.00 - 16.00 น.",
              between: "2.2 กม. (22 นาที)",
              image: shop2,
            },
            {
              key: "6",
              name: "ร้านลุงเริง",
              open: "เปิด 09.00 - 17.00 น.",
              between: "7 กม. (30 นาที)",
              image: shop3,
            },
          ]}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id_request}
        />
      </View>
    </View>
  );
};

export default SelectShopScreen;
