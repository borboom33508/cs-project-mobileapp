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

import wash_machine from "../../assets/washing-machine.png";
import {
  text,
  image,
  container,
  circle,
  button,
} from "./OnboardingScreenStyle";

const screenHeight = Dimensions.get("screen").height;
const windowHeight = Dimensions.get("window").height;
const navbarHeight = screenHeight - (windowHeight + StatusBar.currentHeight);
const { width, height } = Dimensions.get("screen");

const OnboardingScreen = ({ navigation, props }) => {
  return (
    <View style={container}>
      <View style={{ alignItems: "center" }}>
        <View style={circle} />
      </View>

      <View style={{ marginTop: getStatusBarHeight(), alignItems: "center" }}>
        <Image source={wash_machine} style={image} resizeMode="contain" />
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
