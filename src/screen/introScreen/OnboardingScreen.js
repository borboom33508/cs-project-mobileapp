import { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useIsFocused } from "@react-navigation/native";
import {
  text,
  image,
  container,
  circle,
  button,
} from "./OnboardingScreenStyle";

import GetApi from "../../api/GetApi";

const screenHeight = Dimensions.get("screen").height;
const windowHeight = Dimensions.get("window").height;
const navbarHeight = screenHeight - (windowHeight + StatusBar.currentHeight);
const { width, height } = Dimensions.get("screen");

const OnboardingScreen = ({ navigation, props }) => {
  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   getUser();
  // }, [isFocused]);

  // const getUser = async () => {
  //   // var formdata = new FormData();
  //   // formdata.append("cus_id", 1);

  //   try {
  //     // await AsyncStorage.getItem("@user").then((result) => {
  //     //   let user = JSON.parse(result);
  //     await getApi
  //       .useFetch("GET", "", `/Test.php?cus_id=${1}`)
  //       .then((data) => {
  //         console.log(data);
  //       });
  //       // await getApi
  //       // .useFetch("POST", formdata, `/Test.php`, "")
  //       // .then((data) => {
  //       //   console.log(data);
  //       // });
  //     // });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <View style={container}>
      <View style={{ alignItems: "center" }}>
        <View style={circle} />
      </View>

      <View style={{ marginTop: getStatusBarHeight(), alignItems: "center" }}>
        <Image source={require("../../../assets/washing-machine.png")} style={image} resizeMode="contain" />
        <Text style={text}>{"Suck&Reed"}</Text>
        <TouchableOpacity
          style={button}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}>
            {"สร้างบัญชีใหม่"}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: 50 }}>
          <Text style={{ color: "#000000", fontSize: 14, fontFamily: "Kanit" }}>
            {"มีบัญชีอยู่แล้ว? "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text
              style={{ color: "#4691FB", fontSize: 14, fontFamily: "Kanit" }}
            >
              {"เข้าสู่ระบบ"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;
