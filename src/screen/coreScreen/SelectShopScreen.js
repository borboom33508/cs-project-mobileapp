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
  const [laundryList, setLaundryList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [cusPlaceName, setCusPlaceName] = useState("");

  useEffect(() => {
    if (isFocused) {
      fetchCustomerData();
    }
  }, [isFocused]);

  const getLaundryData = async (cusData) => {
    try {
      await GetApi.useFetch("GET", "", `/customer/GetLaundryData.php`).then(
        (res) => {
          let data = JSON.parse(res);
          if (data.success) {
            const destination = calculatorDistance(data.request, cusData);
            setLaundryList(
              data.request.map((data, index) => ({
                laundry_id: data.laundry_id,
                laundry_name: data.laundry_name,
                laundry_picture: data.laundry_picture,
                laundry_location: data.laundry_location,
                laundry_hours: data.laundry_hours,
                laundry_rating: data.laundry_rating,
                destination: destination[index],
              }))
            );
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCustomerData = async () => {
    let accountId;
    await AsyncStorage.getItem("@account").then((res) => {
      accountId = JSON.parse(res).split(",")[0];
    });
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/customer/GetCustomerPosition.php?cus_id= ${accountId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          getLaundryData(data.request);
          setCusPlaceName(data.request.cus_placeName);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const calculatorDistance = (laundryData, cusData) => {
    let destination = [];
    laundryData.map((data, index) => {
      //currentPosition
      let lat1 = parseFloat(cusData.cus_lat);
      let lon1 = parseFloat(cusData.cus_lng);
      //destination
      let lat2 = parseFloat(data.laundry_location.split(",")[0]);
      let lon2 = parseFloat(data.laundry_location.split(",")[1]);

      const R = 6371e3; // earth radius in meters
      const φ1 = lat1 * (Math.PI / 180);
      const φ2 = lat2 * (Math.PI / 180);
      const Δφ = (lat2 - lat1) * (Math.PI / 180);
      const Δλ = (lon2 - lon1) * (Math.PI / 180);

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const finalDistance = (R * c) / 1000;
      destination[index] = finalDistance.toFixed(1);
    });
    return destination;
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
          navigation.navigate("SelectService", {
            laundry_id: item.laundry_id,
            destination: item.destination,
          })
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
                {`~${item.destination} กม.`}
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
