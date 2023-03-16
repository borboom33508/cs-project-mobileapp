import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import GetApi from "../../api/GetApi";
import { useIsFocused } from "@react-navigation/native";
import SelectServiceScreen from "../serviceScreen/SelectServiceScreen";
import { API } from "../../api/GetApi";

const SelectShopScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [laundryList, setLaundryList] = useState({});

  useEffect(() => {
    if (isFocused) {
      getLaundryData();
      // console.log(laundryList);
    }
  }, [isFocused]);

  const getLaundryData = async () => {
    try {
      await GetApi.useFetch("GET", "", `/customer/GetLaundryData.php`).then(
        (res) => {
          let data = JSON.parse(res);
          if (data.success) {
            setLaundryList(data.request);
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

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
      <TouchableOpacity
        onPress={() => {
          // console.log(item);
          navigation.navigate("SelectService", { laundry_id: item.laundry_id });
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            source={
              Platform.OS === "android"
                ? {
                    uri: API.urlLaundryImage + item.laundry_picture,
                  }
                : {
                    uri: API.urlLaundryImage + item.laundry_picture,
                  }
            }
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
              {item.laundry_name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 2,
              }}
            >
              <FontAwesome name="star" size={18} color="orange" />
              <Text
                style={{
                  fontSize: 14,
                  color: "#B9BCBE",
                  fontFamily: "Kanit",
                  marginLeft: 5,
                }}
              >
                {parseFloat(item.laundry_rating).toFixed(1)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 2 }}>
              <MaterialIcons name="delivery-dining" size={18} color="#4691FB" />
              <Text
                style={{
                  fontSize: 14,
                  color: "#000000",
                  fontFamily: "Kanit",
                  marginLeft: 5,
                }}
              >
                {`1.2 กม. (25นาที)`}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="time-outline" size={18} color="#4691FB" />
              <Text
                style={{
                  fontSize: 14,
                  color: "#000000",
                  fontFamily: "Kanit",
                  marginLeft: 5,
                }}
              >
                {`${item.laundry_hours} น.`}
              </Text>
            </View>
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
            height: Platform.OS === "android" ? 170 : 180,
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
          data={laundryList}
          renderItem={renderItem}
          keyExtractor={(item) => item.laundry_id}
        />
      </View>
    </View>
  );
};

export default SelectShopScreen;
