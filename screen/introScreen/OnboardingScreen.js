import { useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import wash_machine from "../../assets/washing-machine.png";
import { text, image, container } from "./OnboardingScreenStyle";

const OnboardingScreen = ({ navigation, props }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 500,
          height: 400,
          borderBottomStartRadius: 500 / 2,
          borderBottomEndRadius: 500 / 2,
          position: "absolute",
          backgroundColor: "#4691FB",
        }}
      />
      <Image
        source={wash_machine}
        style={{ width: "60%", height: "30%", marginTop: "25%" }}
        resizeMode="contain"
      />
      <View
        style={{
          marginTop: "25%",
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 42,
            // color: "#0000",
            fontFamily: "Montserrat",
          }}
        >
          Suck&Reed
        </Text>
        <TouchableOpacity
          style={{
            marginTop: "15%",
            borderRadius: 10,
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#4691FB",
            paddingVertical: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#ffff",
            }}
          >
            สร้างบัญชีใหม่
          </Text>
        </TouchableOpacity>

        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            marginVertical: 100,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              //   color: "#ffff",
            }}
          >
            มีบัญชีอยู่แล้ว? เข้าสู่ระบบ
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;
