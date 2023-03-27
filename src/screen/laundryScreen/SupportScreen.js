import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { container, button } from "./SupportScreenStyle";
import { TextInput } from "react-native-paper";
import SuccessPopUp from "../../components/SuccessPopUp";
import { useIsFocused } from "@react-navigation/native";

const SupportScreen = ({ navigation, props }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setShowError(false);
    } else {
      setIsSuccess(false);
      setTitle("");
      setMessage("");
    }
  }, [isFocused]);

  const handleSubmit = () => {
    if (title !== "" && message !== "") {
      setIsSuccess(true);
      Keyboard.dismiss();
    } else {
      console.log("invalid");
      setShowError(true);
    }
  };

  return (
    <View style={container}>
      <KeyboardAvoidingView>
        <View style={{ padding: 10, paddingTop: 40, marginTop: 40 }}>
          <Text
            style={{ fontSize: 26, fontFamily: "Kanit", textAlign: "center" }}
          >
            {"ช่วยเหลือ"}
          </Text>
          <View style={{ paddingVertical: 10 }}>
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"หัวข้อ"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 60, marginTop: 16 }}
              onChangeText={setTitle}
              value={title}
              activeOutlineColor="#4691FB"
              error={showError}
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
            />
            <TextInput
              label={<Text style={{ fontFamily: "Kanit" }}>{"คำอธิบาย"}</Text>}
              mode="outlined"
              style={{ backgroundColor: "#ffffff", height: 120, marginTop: 16 }}
              onChangeText={setMessage}
              value={message}
              activeOutlineColor="#4691FB"
              error={showError}
              theme={{
                fonts: {
                  regular: {
                    fontFamily: "Kanit",
                  },
                },
              }}
            />
            {showError ? (
              <Text
                style={{ color: "#F91616", fontSize: 14, fontFamily: "Kanit" }}
              >{`  กรุณากรอกข้อความให้ครบทุกช่อง`}</Text>
            ) : null}
          </View>
          <TouchableOpacity style={button} onPress={() => handleSubmit()}>
            <Text
              style={{ fontSize: 18, color: "#ffffff", fontFamily: "Kanit" }}
            >
              {"ส่ง"}
            </Text>
          </TouchableOpacity>
        </View>
        {isSuccess ? (
          <SuccessPopUp
            props={{
              description: "ส่งข้อมูลเรียบร้อย",
              fromPage: "SupportLaundry",
            }}
            navigation={navigation}
          />
        ) : null}
      </KeyboardAvoidingView>
    </View>
  );
};

export default SupportScreen;
