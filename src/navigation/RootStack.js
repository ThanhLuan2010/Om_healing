import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "@screens/LoginScreen";
import RegisterScreen from "@screens/RegisterScreen";
import ForgotPassword from "@screens/ForgotPasswrord";
import OtpScreen from "@screens/ForgotPasswrord/OtpScreen";
import VoteOrderDetail from "@screens/VoteOrderDetail";
import NewPassScreen from "@screens/NewPassScreen";
import CTVScreen from "@screens/CTVScreen";
import OrderScreen from "@screens/OrderScreen";
import DetailOrders from "@screens/DetailOrders";
import PrepareOrder from "@screens/PrepareOrder";
import VoteOrders from "@screens/VoteOrders";
import React from "react";
import { StatusBar } from "react-native";
import BuyProducts from "../modal/BuyProducts";
import AlertModal from "../modal/AlertModal";
import BottomTab from "./BottomTabNavigation";
import { navigationRef } from "./RootNavigation";
import { APP_PREFIX, PATH_SCREENS, routes } from "./routes";
import AccountScreen from "@screens/AccountScreen";
import ProfileScreen from "@screens/ProfileScreen";
import ChangePasswordScreen from "@screens/ChangePassword";
import NotificationScreen from "@screens/NotificationScreen";
import NewsDetail from "@screens/NewsDetail";
import SearchScreen from "@screens/SearchScreen";
import ChatScreen from "@screens/ChatScreen";
import CancelDetail from "@screens/CancelDetail";
import ProductDetail from "@screens/ProductDetail";
import { userSelect } from "../store/slices/user";
import { useSelector } from "react-redux";
import CancelScreen from "@screens/CancelScreen";
import OrdersCTVInfomation from "@screens/OrdersCTVInfomation";
import OrderModal from "../modal/OrderModal";
import OrdersCTVDelivering from "@screens/OrdersCTVDelivering";
import DeliveryFail from "../modal/DeliveryFail";
import LoadingScreen from "@screens/LoadingScreen";
import CodePushUpdate from "../modal/CodePushUpdate";

const Stack = createStackNavigator();

export default function MainContainer() {
  const linking = {
    prefixes: APP_PREFIX,
    config: PATH_SCREENS,
  };
  // const { isLoggedIn } = useSelector(userSelect);
  const { isLoggedIn } = useSelector(userSelect);
  return (
    <NavigationContainer ref={navigationRef} linking={linking}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Group>
          {isLoggedIn ? (
            <>
              <Stack.Screen name={routes.BOTTOM_TAB} component={BottomTab} />
              <Stack.Screen name={"CTVScreen"} component={CTVScreen} />
              <Stack.Screen name={"OrderScreen"} component={OrderScreen} />
              <Stack.Screen name={"AccountScreen"} component={AccountScreen} />
              <Stack.Screen name={"ProfileScreen"} component={ProfileScreen} />
              <Stack.Screen name={"PrepareOrder"} component={PrepareOrder} />
              <Stack.Screen name={"DetailOrders"} component={DetailOrders} />
              <Stack.Screen name={"ChatScreen"} component={ChatScreen} />
              <Stack.Screen name={"VoteOrders"} component={VoteOrders} />
              <Stack.Screen name={"CancelScreen"} component={CancelScreen} />
              <Stack.Screen
                name={"OrdersCTVInfomation"}
                component={OrdersCTVInfomation}
              />
              <Stack.Screen
                name={"OrdersCTVDelivering"}
                component={OrdersCTVDelivering}
              />
              <Stack.Screen
                name={"VoteOrderDetail"}
                component={VoteOrderDetail}
              />
              <Stack.Screen name={"CancelDetail"} component={CancelDetail} />
              <Stack.Screen name={"ProductDetail"} component={ProductDetail} />
              <Stack.Screen
                name={"ChangePasswordScreen"}
                component={ChangePasswordScreen}
              />
              <Stack.Screen
                name={"NotificationScreen"}
                component={NotificationScreen}
              />
              <Stack.Screen name={"NewsDetail"} component={NewsDetail} />
            </>
          ) : (
            <>
              <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
              <Stack.Screen
                name={"RegisterScreen"}
                component={RegisterScreen}
              />
              <Stack.Screen
                name={"ForgotPassword"}
                component={ForgotPassword}
              />
              <Stack.Screen name={"OtpScreen"} component={OtpScreen} />
              <Stack.Screen name={"NewPassScreen"} component={NewPassScreen} />
            </>
          )}
        </Stack.Group>

        <Stack.Group
          screenOptions={{
            presentation: "transparentModal",
            headerShown: false,
          }}
        >
          <Stack.Screen name={"SearchScreen"} component={SearchScreen} />
          <Stack.Screen name={"AlertModal"} component={AlertModal} />
          <Stack.Screen name={"OrderModal"} component={OrderModal} />
          <Stack.Screen name={"BuyProducts"} component={BuyProducts} />
          <Stack.Screen name={"DeliveryFail"} component={DeliveryFail} />
          <Stack.Screen name={"CodePushUpdate"} component={CodePushUpdate} />
          <Stack.Screen name={"LoadingScreen"} component={LoadingScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
