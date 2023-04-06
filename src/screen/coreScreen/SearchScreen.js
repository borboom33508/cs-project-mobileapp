import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import GetApi from "../../api/GetApi";
import { API } from "../../api/GetApi";
import { Divider } from "react-native-paper";
import filter from "lodash.filter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  container,
  content1,
  content2,
  content3,
  content4,
  text,
  textInput,
} from "./SearchScreenStyle";

const SearchScreen = ({ navigation }) => {
  const [laundryList, setLaundryList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [search, setSearch] = useState("");
  const [noMatch, setNoMatch] = useState(false);

  const getLaundryData = async (cusData) => {
    try {
      await GetApi.useFetch("GET", "", `/customer/GetLaundryData.php`).then(
        (res) => {
          let data = JSON.parse(res);
          let laundryData;
          if (data.success) {
            const destination = calculatorDistance(data.request, cusData);
            laundryData = data.request.map((data, index) => ({
              laundry_id: data.laundry_id,
              laundry_name: data.laundry_name,
              laundry_picture: data.laundry_picture,
              laundry_location: data.laundry_location,
              laundry_hours: data.laundry_hours,
              // laundry_rating: data.laundry_rating,
              destination: destination[index],
            }));
            filterByQuery(laundryData, search);
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

  const filterByQuery = async (data, query) => {
    const searchQuery = query;
    let filteredData = data;
    if (searchQuery == "") {
      setNoMatch(true);
      return;
    }
    if (searchQuery) {
      filteredData = filter(filteredData, (request) => {
        if (request.laundry_name.includes(searchQuery)) {
          return true;
        }
        return false;
      });
    }
    if (filteredData.length == 0) {
      setNoMatch(true);
      return;
    }
    setNoMatch(false);
    setLaundryList(filteredData);
  };

  const onRefresh = async () => {
    setIsFetching(true);
    await getLaundryData();
    setIsFetching(false);
  };

  const renderItem = ({ item }) => (
    <View style={content4}>
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
            <Text style={text}>{item.laundry_name}</Text>
            <View style={{ flexDirection: "row", marginVertical: 2 }}>
              {/* <FontAwesome name="star" size={18} color="orange" /> */}
              {/* <Text style={[text, { fontSize: 14, marginLeft: 5 }]}>
                {parseFloat(item.laundry_rating).toFixed(1)}
              </Text> */}
            </View>
            <View style={{ flexDirection: "row", marginBottom: 2 }}>
              <MaterialIcons name="delivery-dining" size={18} color="#4691FB" />
              <Text style={[text, { fontSize: 14, marginLeft: 5 }]}>
                {`~${item.destination} กม.`}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons name="time-outline" size={18} color="#4691FB" />
              <Text style={[text, { fontSize: 14, marginLeft: 5 }]}>
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
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View style={content1}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ alignItems: "center", flexDirection: "row" }}
          >
            <Ionicons name="arrow-back" size={30} color="#4691FB" />
          </TouchableOpacity>
          <View style={content2}>
            <TextInput
              style={textInput}
              onChangeText={(text) => {
                setSearch(text);
              }}
              placeholder="ค้นหาร้านซักรีด"
              value={search}
            />
            <TouchableOpacity
              onPress={() => fetchCustomerData()}
              style={{ end: 55, marginTop: 5, position: "absolute" }}
            >
              <Ionicons name="search-outline" size={28} color="#4691FB" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Divider />
      {noMatch ? (
        <View style={content3}>
          <Ionicons
            size={120}
            name="search-outline"
            color="#4691FB"
            style={{ backgroundColor: "transparent" }}
          />
          <Text style={text}>ไม่พบข้อมูล</Text>
        </View>
      ) : (
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
      )}
    </View>
  );
};

export default SearchScreen;
