import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
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
import SelectServiceScreen from "./src/screen/serviceScreen/SelectServiceScreen";
import CreditScreen from "./src/screen/creditScreen/CreditScreen";
import DepositScreen from "./src/screen/creditScreen/DepositScreen";
import TransactionScreen from "./src/screen/creditScreen/TransactionScreen";
import SetPasswordScreen from "./src/screen/settingScreen/SetPasswordScreen";
import AboutUsScreen from "./src/screen/settingScreen/AboutUsScreen";
import PolicyScreen from "./src/screen/settingScreen/PolicyScreen";
import RiderMainScreen from "./src/screen/riderScreen/RiderMainScreen";
import ProfitScreen from "./src/screen/riderScreen/ProfitScreen";
import WithdrawRiderScreen from "./src/screen/riderScreen/WithdrawRiderScreen";
import JobHistoryScreen from "./src/screen/riderScreen/JobHistoryScreen";
import CreateOrderScreen from "./src/screen/serviceScreen/CreateOrderScreen";
import WaitingForRiderScreen from "./src/screen/serviceScreen/WaitingForRiderScreen";
import FoundRiderScreen from "./src/screen/orderScreen/FoundRiderScreen";
import AssignRatingRiderScreen from "./src/screen/orderScreen/AssignRatingRiderScreen";
import OrderDetailScreen from "./src/screen/orderScreen/OrderDetailScreen";
import LaundryMainScreen from "./src/screen/laundryScreen/LaundryMainScreen";
import AddRiderAccScreen from "./src/screen/laundryScreen/AddRiderAccScreen";
import WithdrawLaundryScreen from "./src/screen/laundryScreen/WithdrawLaundryScreen";
import CreditLaundryScreen from "./src/screen/laundryScreen/CreditLaundryScreen";
import OrderLaundryScreen from "./src/screen/laundryScreen/OrderLaundryScreen";
import SupportScreen from "./src/screen/laundryScreen/SupportScreen";
import SelectPositionScreen from "./src/screen/coreScreen/SelectPositionScreen";
import RiderTransactionScreen from "./src/screen/riderScreen/RiderTransactionScreen";
import LaundryTransactionScreen from "./src/screen/laundryScreen/LaundryTransactionScreen";
import GoogleMapTest from "./src/GoogleMapTest";
import SearchScreen from "./src/screen/coreScreen/SearchScreen";
import OrderLaundryDetailScreen from "./src/screen/laundryScreen/OrderLaundryDetailScreen";
import JobListScreen from "./src/screen/riderScreen/JobListScreen";
import ShowMapDestinationScreen from "./src/screen/riderScreen/ShowMapDestinationScreen";
import FinishJobScreen from "./src/screen/riderScreen/FinishJobScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let pageName;
          if (route.name === "SelectShop") {
            iconName = focused ? "home" : "home-outline";
            pageName = "หน้าแรก";
          } else if (route.name === "Order") {
            iconName = focused ? "md-reader" : "md-reader-outline";
            pageName = "รายการ";
          } else if (route.name === "Credit") {
            iconName = focused ? "wallet" : "wallet-outline";
            pageName = "เครดิต";
          } else if (route.name === "Notification") {
            iconName = focused ? "notifications" : "notifications-outline";
            pageName = "แจ้งเตือน";
          } else if (route.name === "Setting") {
            iconName = focused ? "settings" : "settings-outline";
            pageName = "ตั้งค่า";
          }
          return (
            <View style={{ alignItems: "center" }}>
              <Ionicons name={iconName} size={size} color={color} />
              <Text
                style={{
                  fontSize: 10,
                  color: color,
                  fontFamily: "Kanit",
                }}
              >
                {pageName}
              </Text>
            </View>
          );
        },
        headerShown: false,
        tabBarActiveTintColor: "#4691FB",
        tabBarInactiveTintColor: "#CACFD2",
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="SelectShop" component={SelectShopScreen} />
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="Credit" component={CreditScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

const LaundryScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let pageName;
          if (route.name === "LaundryMain") {
            iconName = focused ? "home" : "home-outline";
            pageName = "หน้าแรก";
          } else if (route.name === "OrderLaundry") {
            iconName = focused ? "md-reader" : "md-reader-outline";
            pageName = "รายการ";
          } else if (route.name === "CreditLaundry") {
            iconName = focused ? "wallet" : "wallet-outline";
            pageName = "เครดิต";
          } 
          // else if (route.name === "SupportLaundry") {
          //   iconName = focused ? "help-circle-outline" : "help-circle-outline";
          //   pageName = "ช่วยเหลือ";
          // }
          return (
            <View style={{ alignItems: "center" }}>
              <Ionicons name={iconName} size={size} color={color} />
              <Text
                style={{
                  fontSize: 10,
                  color: color,
                  fontFamily: "Kanit",
                }}
              >
                {pageName}
              </Text>
            </View>
          );
        },
        headerShown: false,
        tabBarActiveTintColor: "#4691FB",
        tabBarInactiveTintColor: "#CACFD2",
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="LaundryMain" component={LaundryMainScreen} />
      <Tab.Screen name="OrderLaundry" component={OrderLaundryScreen} />
      <Tab.Screen name="CreditLaundry" component={CreditLaundryScreen} />
      {/* <Tab.Screen name="SupportLaundry" component={SupportScreen} /> */}
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
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="MapTest" component={MapTest} />
        <Stack.Screen name="Deposit" component={DepositScreen} />
        <Stack.Screen name="Transaction" component={TransactionScreen} />
        <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
        <Stack.Screen name="AboutUs" component={AboutUsScreen} />
        <Stack.Screen name="Policy" component={PolicyScreen} />
        <Stack.Screen name="SelectService" component={SelectServiceScreen} />
        <Stack.Screen name="SelectPosition" component={SelectPositionScreen} />

        <Stack.Screen name="RiderMain" component={RiderMainScreen} />
        <Stack.Screen name="ProfitRider" component={ProfitScreen} />
        <Stack.Screen name="WithdrawRider" component={WithdrawRiderScreen} />
        <Stack.Screen name="JobHistory" component={JobHistoryScreen} />
        <Stack.Screen name="CreateOrder" component={CreateOrderScreen} />
        <Stack.Screen name="RiderTransaction" component={RiderTransactionScreen} />

        <Stack.Screen
          name="WaitingForRider"
          component={WaitingForRiderScreen}
        />
        <Stack.Screen name="FoundRider" component={FoundRiderScreen} />
        <Stack.Screen
          name="AssignRatingRider"
          component={AssignRatingRiderScreen}
        />
        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
        <Stack.Screen name="Laundry" component={LaundryScreen} options={{ gestureEnabled: false }} />
        <Stack.Screen name="WithdrawLaundry" component={WithdrawLaundryScreen} />
        <Stack.Screen name="AddRiderAcc" component={AddRiderAccScreen} />
        <Stack.Screen name="LaundryTransaction" component={LaundryTransactionScreen} />
        <Stack.Screen name="GoogleMapTest" component={GoogleMapTest} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="OrderLaundryDetail" component={OrderLaundryDetailScreen} />
        <Stack.Screen name="JobList" component={JobListScreen} />
        <Stack.Screen name="ShowMapDestination" component={ShowMapDestinationScreen} />
        <Stack.Screen name="FinishJob" component={FinishJobScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
