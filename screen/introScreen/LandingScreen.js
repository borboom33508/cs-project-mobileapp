import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import wash_machine from "../../assets/washing-machine.png";
import { text, image, container } from "./LandingScreenStyle";

const LandingScreen = ({ navigation, props }) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    // isLogin();
    // console.log(navigation, props);
    sleep(2000).then(() => {
      navigation.navigate("Onboarding");
    });
  }, []);

  const isLogin = async () => {
    await AsyncStorage.getItem("@username").then((result) => {
      console.log(result);
    });
  };

  return (
    <View style={container}>
      <Image source={wash_machine} style={image} resizeMode="contain" />
      <Text style={text}>{"Suck&Reed"}</Text>
    </View>
  );
};

export default LandingScreen;
