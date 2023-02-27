import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import wash_machine from "../../assets/washing-machine.png";
import { text, image, container } from "./OnboardingScreenStyle";

const OnboardingScreen = ({ navigation, props }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={wash_machine} style={image} resizeMode="contain" />
      <Text style={text}>Suck&Reed</Text>
    </View>
  );
};

export default OnboardingScreen;
