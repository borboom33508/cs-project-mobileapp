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

  const getLaundryData = async () => {
    try {
      await GetApi.useFetch("GET", "", `/customer/GetLaundryData.php`).then(
        (res) => {
          let data = JSON.parse(res);
          if (data.success) {
            filterByQuery(data.request, search);
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const filterByQuery = async (data, query) => {
    const searchQuery = query;
    let filteredData = data;
    if (searchQuery == "") {
      setNoMatch(true);
      return;
    }
    if (searchQuery) {
      console.log("test");
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
            <Text style={text}>{item.laundry_name}</Text>
            <View style={{ flexDirection: "row", marginVertical: 2 }}>
              <FontAwesome name="star" size={18} color="orange" />
              <Text style={[text, { fontSize: 14, marginLeft: 5 }]}>
                {parseFloat(item.laundry_rating).toFixed(1)}
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginBottom: 2 }}>
              <MaterialIcons name="delivery-dining" size={18} color="#4691FB" />
              <Text style={[text, { fontSize: 14, marginLeft: 5 }]}>
                {`1.2 กม. (25นาที)`}
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
                // setNoMatch(false); // รอถาม
              }}
              placeholder="ค้นหาร้านซักรีด"
              value={search}
            />
            <TouchableOpacity
              onPress={() => getLaundryData()}
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
