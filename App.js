import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import LandingScreen from "./screen/introScreen/LandingScreen";
import OnboardingScreen from "./screen/introScreen/OnboardingScreen";
import SignInScreen from "./screen/authenticationScreen/SignInScreen";
import SignUpScreen from "./screen/authenticationScreen/SignUpScreen";
import PreChangePasswordScreen from "./screen/authenticationScreen/PreChangePasswordScreen";
import ChangePasswordScreen from "./screen/authenticationScreen/ChangePasswordScreen";

const Stack = createStackNavigator();

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
        <Stack.Screen name="PreChangePassword" component={PreChangePasswordScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
