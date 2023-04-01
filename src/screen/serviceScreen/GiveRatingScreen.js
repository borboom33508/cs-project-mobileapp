import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { container, text, image, button } from "./GiveRatingScreenStyle";
import { AntDesign } from "@expo/vector-icons";
import GetApi from "../../api/GetApi";
import { useIsFocused } from "@react-navigation/native";

const GiveRatingScreen = () => {
  const isFocused = useIsFocused();
  const [laundryName, setLaundryName] = useState("ร้านป้าศรีซักยังไง");
  const [picture, setPicture] = useState("");
  
  const [one, setOne] = useState([false, 1]);
  const [two, setTwo] = useState([false, 2]);
  const [three, setThree] = useState([false, 3]);
  const [four, setFour] = useState([false, 4]);
  const [five, setFive] = useState([false, 5]);

  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (isFocused) {
    }
  }, [isFocused]);

  return (
    <View style={container}>
      <View style={{ alignItems: "center" }}>
        <Text style={text}>{"ให้คะแนนร้าน"}</Text>
        <Image
          source={require("../../../assets/washing-machine.png")}
          style={image}
          resizeMode="contain"
        />
        <View style={{ marginTop: 30, flexDirection: "row" }}>
          <TouchableOpacity //one
            onPress={() => {
              setOne((one[1] = 1));
              setOne((one[0] = true));
              setTwo([(two[0] = false)]);
              setThree([(three[0] = false)]);
              setFour([(four[0] = false)]);
              setFive([(five[0] = false)]);

              setRating(1);
              console.log(one[1]);
            }}
          >
            {one[0] == false ? (
              <AntDesign name="staro" size={24} color="#ffbf00" />
            ) : (
              <AntDesign name="star" size={24} color="#ffbf00" />
            )}
          </TouchableOpacity>

          <TouchableOpacity //two
            onPress={() => {
              setOne([(one[0] = true)]);
              setTwo((two[1] = 2));
              setTwo([(two[0] = true)]);
              setThree([(three[0] = false)]);
              setFour([(four[0] = false)]);
              setFive([(five[0] = false)]);

              setRating(2);
              console.log(two[1]);
            }}
          >
            {two[0] == false ? (
              <AntDesign name="staro" size={24} color="#ffbf00" />
            ) : (
              <AntDesign name="star" size={24} color="#ffbf00" />
            )}
          </TouchableOpacity>

          <TouchableOpacity //three
            onPress={() => {
              setOne([(one[0] = true)]);
              setTwo([(two[0] = true)]);
              setThree([(three[1] = 3)]);
              setThree([(three[0] = true)]);
              setFour([(four[0] = false)]);
              setFive([(five[0] = false)]);

              setRating(3);
              console.log(three[1]);
            }}
          >
            {three[0] == false ? (
              <AntDesign name="staro" size={24} color="#ffbf00" />
            ) : (
              <AntDesign name="star" size={24} color="#ffbf00" />
            )}
          </TouchableOpacity>

          <TouchableOpacity //four
            onPress={() => {
              setOne([(one[0] = true)]);
              setTwo([(two[0] = true)]);
              setThree([(three[0] = true)]);
              setFour([(four[1] = 4)]);
              setFour([(four[0] = true)]);
              setFive([(five[0] = false)]);

              setRating(4);
              console.log(four[1]);
            }}
          >
            {four[0] == false ? (
              <AntDesign name="staro" size={24} color="#ffbf00" />
            ) : (
              <AntDesign name="star" size={24} color="#ffbf00" />
            )}
          </TouchableOpacity>

          <TouchableOpacity //five
            onPress={() => {
              setOne([(one[0] = true)]);
              setTwo([(two[0] = true)]);
              setThree([(three[0] = true)]);
              setFour([(four[0] = true)]);
              setFive([five[1] = 5]);
              setFive([five[0] = true]);

              setRating(5);
              console.log(five[1]);
            }}
          >
            {five[0] == false ? (
              <AntDesign name="staro" size={24} color="#ffbf00" />
            ) : (
              <AntDesign name="star" size={24} color="#ffbf00" />
            )}
          </TouchableOpacity>

        </View>
        <Text style={{ fontFamily: "Kanit", fontSize: 24, marginTop: 30 }}>
          {laundryName}
        </Text>
        <TouchableOpacity style={button} onPress={() => {
            console.log(rating);
        }}>
            <Text style={{fontFamily: "Kanit", fontSize: 18, color:"#ffff"}}>
                {"ให้คะแนน"}
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GiveRatingScreen;
