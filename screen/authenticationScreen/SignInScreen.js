import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from "react-native";
import { container, button, text, input } from "./SignInScreenStyle";
import { AntDesign } from '@expo/vector-icons';

const SignInScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
  return (
    <View style={container}>
        <TouchableOpacity onPress={() => {
            navigation.navigate("Onboarding")
        }}>
            <AntDesign name='arrowleft' size={32} color="#4691FB"/>
        </TouchableOpacity>
        <Text style={{fontSize: 24}}>กรอกบัญชีเพื่อเข้าสู่ระบบ</Text>
        <TextInput
          style={input}
          onChangeText={setUsername}
          value={username}
          placeholder="อีเมล หรือเบอร์โทรศัพท์"
          keyboardType="default"
      />
        <TextInput
          style={input}
          onChangeText={setPassword}
          value={password}
          placeholder="รหัสผ่าน"
          keyboardType="visible-password"
      />


        {/* <TextInput
            label="รหัสผ่าน"
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
            value={password}
            onChangeText={text => setPassword(text)}
        /> */}
          <TouchableOpacity>
            <Text style={{ color: "#4691FB", fontSize: 14, marginStart: "75%"}}>
              {"ลืมรหัสผ่าน ?"}
            </Text>
          </TouchableOpacity>
        <TouchableOpacity style={button}>
          <Text style={{ fontSize: 18, color: "#ffffff" }}>เข้าสู่ระบบ</Text>
        </TouchableOpacity>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({})