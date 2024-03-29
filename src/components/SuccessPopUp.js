import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

const SuccessPopup = ({ navigation, props }) => {
  const [toggleClose, setToggleClose] = useState(true);
  const description = props.description;
  const fromPage = props.fromPage;

  return (
    <View>
      <Modal isVisible={toggleClose} animationOutTiming={10}>
        <View
          style={{
            backgroundColor: "#ffffff",
            height: "45%",
            borderRadius: 20,
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "flex-start",
              position: "absolute",
              padding: 12,
            }}
            onPress={() => {
              console.log(fromPage);
              if (fromPage == "SetPassword") {
                navigation.navigate("Setting")
              }
              else if (fromPage == "Deposit") {
                navigation.navigate("Credit")
              }
              else if (fromPage == "WithdrawRider") {
                navigation.navigate("ProfitRider")
              }
              else if (fromPage == "SupportLaundry") {
                navigation.navigate("LaundryMain")
              }
              else if (fromPage == "WithdrawLaundry") {
                navigation.navigate("CreditLaundry")
              }
              else {
                navigation.navigate("Onboarding")
              }
              // fromPage == "SetPassword" ? navigation.navigate("Setting") : navigation.navigate("Onboarding");
              setToggleClose(!toggleClose);
            }}
          >
            <Ionicons name="close" size={36} color="#4691FB" />
          </TouchableOpacity>
          <View style={{ marginVertical: "10%", alignItems: "center" }}>
            <Ionicons
              name="checkmark-circle-outline"
              size={150}
              color="#25BD2B"
            />
            <Text style={{ fontSize: 40, fontFamily: "Kanit" }}>
              {"สำเร็จ !"}
            </Text>
            <Text style={{ fontSize: 20, fontFamily: "Kanit", marginTop: 10 }}>
              {description}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SuccessPopup;
