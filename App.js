import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import LandingScreen from "./src/screen/introScreen/LandingScreen"
import OnboardingScreen from "./src/screen/introScreen/OnboardingScreen";
import SignInScreen from "./src/screen/authenticationScreen/SignInScreen";
import SignUpScreen from "./src/screen/authenticationScreen/SignUpScreen";
import PreChangePasswordScreen from "./src/screen/authenticationScreen/PreChangePasswordScreen";
import ChangePasswordScreen from "./src/screen/authenticationScreen/ChangePasswordScreen";
import OTPScreen from "./src/screen/authenticationScreen/OTPScreen";
import SettingScreen from "./src/screen/settingScreen/SettingScreen";
import EditProfileScreen from "./src/screen/settingScreen/EditProfileScreen";
import MapTest from "./src/MapTest";

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
        initialRouteName="MapTest"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="PreChangePassword" component={PreChangePasswordScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="OTPForm" component={OTPScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="MapTest" component={MapTest} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
