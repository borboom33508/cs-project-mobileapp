import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LandingScreen from "./src/screen/introScreen/LandingScreen";
import OnboardingScreen from "./src/screen/introScreen/OnboardingScreen";
import SignInScreen from "./src/screen/authenticationScreen/SignInScreen";
import SignUpScreen from "./src/screen/authenticationScreen/SignUpScreen";
import PreChangePasswordScreen from "./src/screen/authenticationScreen/PreChangePasswordScreen";
import ChangePasswordScreen from "./src/screen/authenticationScreen/ChangePasswordScreen";
import OTPScreen from "./src/screen/authenticationScreen/OTPScreen";
import SelectShopScreen from "./src/screen/coreScreen/SelectShopScreen";
import SettingScreen from "./src/screen/settingScreen/SettingScreen";
import EditProfileScreen from "./src/screen/settingScreen/EditProfileScreen";
import MapTest from "./src/MapTest";
import OrderScreen from "./src/screen/coreScreen/OrderScreen";
import NotificationScreen from "./src/screen/coreScreen/NotificationScreen";
import CreditScreen from "./src/screen/creditScreen/CreditScreen"; //new
import DepositScreen from "./src/screen/creditScreen/DepositScreen"; //new
import TransactionScreen from "./src/screen/creditScreen/TransactionScreen"; //new
import SetPasswordScreen from "./src/screen/settingScreen/SetPasswordScreen"; //new
import AboutUsScreen from "./src/screen/settingScreen/AboutUsScreen"; //new
import PolicyScreen from "./src/screen/settingScreen/PolicyScreen"; //new

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
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
                width: "20%",
              }}
              onPress={() => {
                setFocused(route.name);
                navigation.navigate("SelectShop", { namePage: focused });
              }}
            >
              <Ionicons
                name={focused === "SelectShop" ? "home" : "home-outline"}
                color={focused === "SelectShop" ? "#4691FB" : "#CACFD2"}
                size={28}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused === "SelectShop" ? "#4691FB" : "#CACFD2",
                  fontFamily: "Kanit",
                }}
              >
                หน้าแรก
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={({ route }) => ({
          tabBarButton: (props) => (
            <TouchableOpacity
              style={{
                alignSelf: "center",
                alignItems: "center",
                width: "20%",
              }}
              onPress={() => {
                setFocused(route.name);
                navigation.navigate("Order", { namePage: focused });
              }}
            >
              <Ionicons
                name={
                  focused === "Order" ? "md-reader" : "md-reader-outline"
                }
                color={focused === "Order" ? "#4691FB" : "#CACFD2"}
                size={28}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused === "Order" ? "#4691FB" : "#CACFD2",
                  fontFamily: "Kanit",
                }}
              >
                รายการ
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Credit"
        component={CreditScreen}
        options={({ route }) => ({
          tabBarButton: (props) => (
            <TouchableOpacity
              style={{
                alignSelf: "center",
                alignItems: "center",
                width: "20%",
              }}
              onPress={() => {
                setFocused(route.name);
                navigation.navigate("Credit", { namePage: focused });
              }}
            >
              <Ionicons
                name={focused === "Credit" ? "wallet" : "wallet-outline"}
                color={focused === "Credit" ? "#4691FB" : "#CACFD2"}
                size={28}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused === "Credit" ? "#4691FB" : "#CACFD2",
                  fontFamily: "Kanit",
                }}
              >
                เครดิต
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={({ route }) => ({
          tabBarButton: (props) => (
            <TouchableOpacity
              style={{
                alignSelf: "center",
                alignItems: "center",
                width: "20%",
              }}
              onPress={() => {
                setFocused(route.name);
                navigation.navigate("Notification", { namePage: focused });
              }}
            >
              <Ionicons
                name={
                  focused === "Notification"
                    ? "notifications"
                    : "notifications-outline"
                }
                color={focused === "Notification" ? "#4691FB" : "#CACFD2"}
                size={28}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused === "Notification" ? "#4691FB" : "#CACFD2",
                  fontFamily: "Kanit",
                }}
              >
                แจ้งเตือน
              </Text>
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
                width: "20%",
              }}
              onPress={() => {
                setFocused(route.name);
                navigation.navigate("Setting", { namePage: focused });
              }}
            >
              <Ionicons
                name={focused === "Setting" ? "settings" : "settings-outline"}
                size={28}
                color={focused === "Setting" ? "#4691FB" : "#CACFD2"}
              />
              <Text
                style={{
                  fontSize: 10,
                  color: focused === "Setting" ? "#4691FB" : "#CACFD2",
                  fontFamily: "Kanit",
                }}
              >
                ตั้งค่า
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
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
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="MapTest" component={MapTest} />
        <Stack.Screen name="Deposit" component={DepositScreen} />
        <Stack.Screen name="Transaction" component={TransactionScreen} />
        <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        <Stack.Screen name="Policy" component={PolicyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
