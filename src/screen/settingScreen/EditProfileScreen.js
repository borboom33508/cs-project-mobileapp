import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { container } from "./EditProfileScreenStyle";
import { TextInput } from "react-native-paper";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetApi, { API } from "../../api/GetApi";
import * as ImagePicker from "expo-image-picker";

const EditProfileScreen = ({ navigation, props }) => {
  const [accountId, setAccountId] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  const [newPicture, setNewPicture] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAccountData();
    }
  }, [isFocused]);

  const fetchAccountData = async (accountId) => {
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/customer/GetAccountForSetting.php?cus_id= ${accountId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          setUsername(data.request.cus_name);
          setPhone(data.request.cus_phone);
          setEmail(data.request.cus_email);
          setPicture(data.request.cus_picture);
        } else {
          console.log(data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getAccountData = async () => {
    await AsyncStorage.getItem("@account").then((res) => {
      let accountId = JSON.parse(res);
      if (accountId == null) {
        console.log("not found");
      } else {
        fetchAccountData(accountId);
        setAccountId(accountId);
      }
    });
  };

  const handleSaveButton = async () => {
    var formdata = new FormData();
    formdata.append("cus_id", accountId.split(",")[0]);
    formdata.append("cus_name", username);
    formdata.append("cus_email", email);
    formdata.append("cus_picture", picture);
    if (newPicture) {
      let localUri = newPicture;
      let filename = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      formdata.append("photo", { uri: localUri, name: filename, type });
    }
    console.log(formdata);
    try {
      await GetApi.useFetch(
        "POST",
        formdata,
        `/customer/PostEditAccount.php`
      ).then((res) => {
        let data = JSON.parse(res);
        console.log(res);
        if (data.success) {
          navigation.navigate("Setting");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewPicture(result.assets[0].uri);
    }
  };

  const alertConfirm = () => {
    Alert.alert("ยืนยันความถูกตัอง", "", [
      {
        text: "ยกเลิก",
        style: "cancel",
      },
      {
        text: "ยืนยัน",
        style: "default",
        onPress: () => handleSaveButton(),
      },
    ]);
  };

  return (
    <View style={container}>
      <View style={{ marginTop: getStatusBarHeight() }}>
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Setting");
            }}
          >
            <Ionicons name="arrow-back" size={30} color="#4691FB" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alertConfirm()}>
            <Text
              style={{ color: "#4691FB", fontSize: 14, fontFamily: "Kanit" }}
            >
              {"บันทึก"}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: "5%",
            alignItems: "center",
          }}
        >
          <Image
            source={
              newPicture
                ? { uri: newPicture }
                : { uri: API.urlCustomerImage + picture }
            }
            style={{
              width: 190,
              height: 190,
              borderWidth: 1,
              borderColor: "#000000",
            }}
            resizeMode="contain"
          />

          <TouchableOpacity
            onPress={() => PickImage()}
            style={{ marginTop: "5%" }}
          >
            <Text
              style={{ color: "#4691FB", fontSize: 14, fontFamily: "Kanit" }}
            >
              {"อัปโหลดรูปภาพ"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"ชื่อ"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              onChangeText={(text) => {
                setUsername(text);
              }}
              value={username}
              activeOutlineColor="#4691FB"
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
            />
          </View>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"เบอร์โทร"}</Text>}
              mode="outlined"
              disabled="true"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              value={phone}
              activeOutlineColor="#4691FB"
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
            ></TextInput>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"อีเมล"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60 }}
              onChangeText={(text) => {
                setEmail(text);
              }}
              value={email}
              activeOutlineColor="#4691FB"
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditProfileScreen;
