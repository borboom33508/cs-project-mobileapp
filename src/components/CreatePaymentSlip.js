import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";

const CreatePaymentSlip = ({ props, onChange }) => {
  const [price, setPrice] = useState("");
  const [priceConfirm, setPriceConfirm] = useState("");
  const fixedCost =
    parseInt(props.order_fixedCost_by_laundry) +
    parseInt(props.order_firstRideCost) +
    parseInt(props.order_secondRideCost);
  const [showError, setShowError] = useState(false);

  return (
    <View>
      <Modal isVisible={true} animationOutTiming={10}>
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          <View style={{ marginVertical: 5 }}>
            <Text style={{ fontFamily: "Kanit", fontSize: 20 }}>
              {"สร้างใบชำระเงิน"}
            </Text>
            <Text style={{ fontFamily: "Kanit", color: "#F91616" }}>
              {`ราคาสูงสุด: ${fixedCost} บาท`}
            </Text>
            <TextInput
              label={
                <Text style={{ fontFamily: "Kanit" }}>
                  {"กรอกราคาที่ลูกค้าต้องชำระ"}
                </Text>
              }
              mode="outlined"
              style={{ backgroundColor: "#ffffff", marginTop: 5 }}
              onChangeText={(text) => {
                setPrice(text);
                setShowError(false);
              }}
              value={price}
              activeOutlineColor="#4691FB"
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
              keyboardType="number-pad"
              error={showError}
            />
            <TextInput
              label={
                <Text style={{ fontFamily: "Kanit" }}>
                  {"ยืนยันราคาอีกครั้ง"}
                </Text>
              }
              mode="outlined"
              style={{ backgroundColor: "#ffffff", marginTop: 5 }}
              onChangeText={(text) => {
                setPriceConfirm(text);
                setShowError(false);
              }}
              value={priceConfirm}
              activeOutlineColor="#4691FB"
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
              keyboardType="decimal-pad"
              error={showError}
            />
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#D9534F",
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 8,
                alignItems: "center",
                marginRight: 12,
              }}
              onPress={() => {
                onChange({ type: "cancel" });
              }}
            >
              <Text style={{ fontFamily: "Kanit", color: "#ffffff" }}>
                {"ยกเลิก"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#4691FB",
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 8,
                alignItems: "center",
              }}
              onPress={() => {
                if (
                  price <= fixedCost &&
                  price == priceConfirm &&
                  price > 0 &&
                  price != "" &&
                  !price.includes(",") &&
                  !price.includes(".") &&
                  !price.includes(" ") &&
                  !price.includes("-")
                ) {
                  console.log("success");
                  onChange({ type: "set", price });
                } else {
                  console.log("error");
                  setShowError(true);
                }
              }}
            >
              <Text style={{ fontFamily: "Kanit", color: "#ffffff" }}>
                {"ยืนยัน"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreatePaymentSlip;
