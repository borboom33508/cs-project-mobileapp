import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import wash_machine from "../../../assets/washing-machine.png";
import { text, image, container } from "./LandingScreenStyle";
import { useIsFocused } from "@react-navigation/native";

const LandingScreen = ({ navigation, props }) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // const isFoucsed = useIsFocused();

  useEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = async () => {
    await sleep(2000);
    await AsyncStorage.getItem("@account").then((res) => {
      let account = JSON.parse(res);
      if (account == null) {
        navigation.navigate("Onboarding");
      } else {
        navigation.navigate("Main");
      }
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
