import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import wash_machine from "../../../assets/washing-machine.png";
import { text, image, container } from "./LandingScreenStyle";
import { useIsFocused } from "@react-navigation/native";

const LandingScreen = ({ navigation, props }) => {
  // const isFoucsed = useIsFocused();

  useEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = async () => {
    setTimeout(async () => {
      await AsyncStorage.getItem("@account").then((res) => {
        let account = JSON.parse(res);
        let whoami;
        if (account !== null) {
          whoami = account.split(",")[1];
        }
        if (account == null) {
          navigation.navigate("Onboarding");
        } else if (whoami == "customer") {
          navigation.navigate("Main");
        } else if (whoami == "rider") {
          navigation.navigate("RiderMain");
        }
      });
    }, 2000);
  };

  return (
    <View style={container}>
      <Image source={wash_machine} style={image} resizeMode="contain" />
      <Text style={text}>{"Suck&Reed"}</Text>
    </View>
  );
};

export default LandingScreen;
