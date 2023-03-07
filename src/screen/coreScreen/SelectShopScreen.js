import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons } from "@expo/vector-icons";
import shop from "../../../assets/shop.jpg";

const SelectShopScreen = () => {
  // const renderItem = ({ item }) => <Requestitem item={item} filter={filter} />;

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: 500,
            height: 170,
            // borderBottomStartRadius: 500 / 2,
            // borderBottomEndRadius: 500 / 2,
            position: "absolute",
            backgroundColor: "#4691FB",
          }}
        />
      </View>
      <View style={{ marginTop: getStatusBarHeight(), marginHorizontal: 10 }}>
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

        <View style={{}}>
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
          // onScroll={onScroll}
          // contentContainerStyle={{ backgroundColor: "#ffffff" }}
          data={[
            {
              key: "1",
              name: "ร้านป้าศรีซักยังไง",
              open: "เปิด 09.00 - 20.00 น.",
              between: "1.2 กม. (25 นาที)",
              image: shop,
            },
            {
              key: "2",
              name: "ร้านป้าศรีซักยังไง",
              open: "เปิด 09.00 - 20.00 น.",
              between: "1.2 กม. (25 นาที)",
              image: shop,
            },
            {
              key: "3",
              name: "ร้านป้าศรีซักยังไง",
              open: "เปิด 09.00 - 20.00 น.",
              between: "1.2 กม. (25 นาที)",
              image: shop,
            },
            {
              key: "4",
              name: "ร้านป้าศรีซักยังไง",
              open: "เปิด 09.00 - 20.00 น.",
              between: "1.2 กม. (25 นาที)",
              image: shop,
            },
            {
              key: "5",
              name: "ร้านป้าศรีซักยังไง",
              open: "เปิด 09.00 - 20.00 น.",
              between: "1.2 กม. (25 นาที)",
              image: shop,
            },
            {
              key: "6",
              name: "ร้านป้าศรีซักยังไง",
              open: "เปิด 09.00 - 20.00 น.",
              between: "1.2 กม. (25 นาที)",
              image: shop,
            },
          ]}
          renderItem={({ item }) => (
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
                // borderBottomWidth: 0.2,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={item.image}
                  style={{ width: 150, height: 120 }}
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
              </View>
            </View>
          )}
          // data={requestList.request}
          // renderItem={renderItem}
          // keyExtractor={(item) => item.id_request}
          // onRefresh={refresh ? onRefresh : null}
          // refreshing={isFetching}
          // ref={flatListRef}
        />
      </View>
    </View>
  );
};

export default SelectShopScreen;
