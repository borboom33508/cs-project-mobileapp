import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import wash_machine from "../../../assets/washing-machine.png";
import { text, image, container } from "./LandingScreenStyle";
import { useIsFocused } from "@react-navigation/native";
import GetApi from "../../api/GetApi";

const LandingScreen = ({ navigation, props }) => {
  const isFoucsed = useIsFocused();

  useEffect(() => {
    if (isFoucsed) checkUserLogin();
  }, [isFoucsed]);

  const fetchOrder = async (riderId) => {
    try {
      await GetApi.useFetch(
        "GET",
        "",
        `/rider/GetOrderData.php?rider_id=${riderId}`
      ).then((res) => {
        let data = JSON.parse(res);
        if (data.success) {
          navigation.navigate("ShowMapDestination");
        } else {
          navigation.navigate("RiderMain");
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

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
          fetchOrder(account.split(",")[0]);
        } else if (whoami == "laundry") {
          navigation.navigate("Laundry");
        }
      });
    }, 2000);
  };

  return (
    <View style={container}>
      <Image source={wash_machine} style={image} resizeMode="contain" />
      <Text style={text}>{"Zuck&Reed"}</Text>
    </View>
  );
};

export default LandingScreen;
