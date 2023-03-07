import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import LandingScreen from "./src/screen/introScreen/LandingScreen";
import OnboardingScreen from "./src/screen/introScreen/OnboardingScreen";
import SignInScreen from "./src/screen/authenticationScreen/SignInScreen";
import SignUpScreen from "./src/screen/authenticationScreen/SignUpScreen";
import PreChangePasswordScreen from "./src/screen/authenticationScreen/PreChangePasswordScreen";
import ChangePasswordScreen from "./src/screen/authenticationScreen/ChangePasswordScreen";
import OTPScreen from "./src/screen/authenticationScreen/OTPScreen";

import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SelectShopScreen from "./src/screen/coreScreen/SelectShopScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabScreen = ({ navigation }) => {
  const [focused, setFocused] = useState("SelectShop");

  return (
    <Tab.Navigator
      initialRouteName="SelectShop"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name="SelectShop"
        component={SelectShopScreen}
        options={({ route }) => ({
          tabBarButton: (props) => (
            <TouchableOpacity
              style={{
                alignSelf: "center",
                alignItems: "center",
                width: "25%",
              }}
              onPress={() => {
                setFocused(route.name);
                navigation.navigate("SelectShop", { namePage: focused });
              }}
            >
              <Ionicons
                name={focused === "SelectShop" ? "home" : "home-outline"}
                color="#4691FB"
                size={28}
              />
              <Text style={{ fontSize: 10, color: "#4691FB", fontFamily: "Kanit" }}>หน้าแรก</Text>
            </TouchableOpacity>
          ),
        })}
      />
      {/* <Tab.Screen
        name="Project"
        component={""}
        options={({ route }) => ({
          tabBarButton: (props) => (
            <TouchableOpacity
              style={{
                alignSelf: "center",
                alignItems: "center",
                width: "25%",
              }}
              onPress={() => {
                setFocused(route.name);
                navigation.navigate("Project", { namePage: focused });
              }}
            >
              <Ionicons
                name={
                  focused === "Project" ? "folder-open" : "folder-open-outline"
                }
                color={theme.colors.icon}
                size={28}
              />
              <Text style={styles.text}>{message.TEXT.listofproject}</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          tabBarButton: (props) => (
            <TouchableOpacity
              style={{
                alignSelf: "center",
                alignItems: "center",
                width: "25%",
              }}
              onPress={() => {
                setFocused(route.name);
                navigation.navigate("Profile", { namePage: focused });
              }}
            >
              <Ionicons
                name={
                  focused === "Profile"
                    ? "person-circle"
                    : "person-circle-outline"
                }
                color={theme.colors.icon}
                size={28}
              />
              <Text style={styles.text}>{message.TEXT.profile}</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={({ route }) => ({
          tabBarButton: (props) => (
            <TouchableOpacity
              style={{
                alignSelf: "center",
                alignItems: "center",
                width: "25%",
              }}
              onPress={() => {
                setFocused(route.name);
                navigation.navigate("Setting", { namePage: focused });
              }}
            >
              <Ionicons
                name={focused === "Setting" ? "settings" : "settings-outline"}
                size={28}
                color={theme.colors.icon}
              />
              <Text style={styles.text}>{message.TEXT.settings}</Text>
            </TouchableOpacity>
          ),
        })}
      /> */}
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoading] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    Kanit: require("./assets/fonts/Kanit-Light.ttf"),
  });

  if (!fontsLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen
          name="PreChangePassword"
          component={PreChangePasswordScreen}
        />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="OTPForm" component={OTPScreen} />
        <Stack.Screen name="Tab" component={TabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
