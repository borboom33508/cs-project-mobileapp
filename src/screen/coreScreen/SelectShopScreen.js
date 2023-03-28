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
import { API } from "../../api/GetApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  backgroundContent,
  button1,
  container,
  content1,
  content2,
  content3,
  text1,
  text2,
} from "./SelectShopScreenStyle";

const SelectShopScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [laundryList, setLaundryList] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [cusPlaceName, setCusPlaceName] = useState("");

  useEffect(() => {
    if (isFocused) {
      getCustomerData();
      getLaundryData();
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

  const fetchCustomerData = async (cusId) => {
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/customer/GetCustomerPosition.php?cus_id= ${cusId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          setCusPlaceName(data.request.cus_placeName);
        } else {
          console.log(data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getCustomerData = async () => {
    await AsyncStorage.getItem("@account").then((res) => {
      let accountId = JSON.parse(res);
      if (accountId == null) {
        console.log("not found");
      } else {
        fetchCustomerData(accountId);
      }
    });
  };

  const onRefresh = async () => {
    setIsFetching(true);
    await getLaundryData();
    setIsFetching(false);
  };

  const renderItem = ({ item }) => (
    <View style={content3}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("SelectService", { laundry_id: item.laundry_id })
        }
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
            <Text style={text2}>{item.laundry_name}</Text>
            <View style={{ flexDirection: "row", marginVertical: 2 }}>
              <FontAwesome name="star" size={18} color="orange" />
              <Text style={[text2, { fontSize: 14, marginLeft: 5 }]}>
                {parseFloat(item.laundry_rating).toFixed(1)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 2 }}>
              <MaterialIcons name="delivery-dining" size={18} color="#4691FB" />
              <Text style={[text2, { fontSize: 14, marginLeft: 5 }]}>
                {`1.2 กม. (25นาที)`}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="time-outline" size={18} color="#4691FB" />
              <Text style={[text2, { fontSize: 14, marginLeft: 5 }]}>
                {`${item.laundry_hours} น.`}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={container}>
      <View style={{ alignItems: "center" }}>
        <View
          style={[
            backgroundContent,
            { height: Platform.OS === "android" ? 170 : 180 },
          ]}
        />
      </View>
      <View style={{ marginTop: getStatusBarHeight(), marginHorizontal: 10 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SelectPosition");
          }}
        >
          <View style={content1}>
            <Ionicons name="location-outline" size={24} color="#ffffff" />
            <View style={{ marginLeft: 5 }}>
              <Text style={[text1, { fontSize: 12 }]}>ที่อยู่จัดส่ง</Text>
              <Text style={text1}>{cusPlaceName}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={content2}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Search")}
            style={button1}
          >
            <Text style={[text2, { fontSize: 14, marginLeft: 10 }]}>
              ค้นหาร้านซักรีด
            </Text>
            <Ionicons name="search-outline" size={24} />
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={[text1, { fontSize: 18, marginLeft: 10, marginBottom: 10 }]}
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
          onRefresh={() => onRefresh()}
          refreshing={isFetching}
        />
      </View>
    </View>
  );
};

export default SelectShopScreen;
