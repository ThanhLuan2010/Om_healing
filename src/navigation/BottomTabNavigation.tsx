import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DonHangScreen from "@screens/Bottom/DonHang";
import NewsScreen from "@screens/Bottom/NewsScreen";
import ProductScreen from "@screens/Bottom/ProductScreen";
import React from "react";
import { Image, useWindowDimensions } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import CustomTabBar from "./CustomTabBar";
import SellScreen from "@screens/Bottom/SellScreen";
// import AnimatedTabBar, { TabsConfigsType } from "curved-bottom-navigation-bar";
import { Block, Text } from "@components";
import { getSize } from "@utils/responsive";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  const { width } = useWindowDimensions();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        options={{ title: "Trang chủ" }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{ title: "Bán hàng" }}
        name="SellScreen"
        component={SellScreen}
      />
      <Tab.Screen
        options={{ title: "Khoá học" }}
        name="DonHangScreen"
        component={DonHangScreen}
      />
      <Tab.Screen
        options={{ title: "Tin tức" }}
        name="NewsScreen"
        component={NewsScreen}
      />
    </Tab.Navigator>
  );
}
