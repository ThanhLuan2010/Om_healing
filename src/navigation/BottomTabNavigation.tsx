import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AnimatedTabBar, { TabsConfigsType } from "curved-bottom-navigation-bar";
import React from "react";
import { Image, useWindowDimensions, View } from "react-native";
import HomeScreen from "../screens/Bottom/HomeScreen";
import ProductScreen from "@screens/Bottom/ProductScreen";
import DonHangScreen from "@screens/Bottom/DonHang";
import NewsScreen from "@screens/Bottom/NewsScreen";
import { Block, Text } from "@components";
import CustomTabBar from "./CustomTabBar";

const Tab = createBottomTabNavigator();

// const tabs: TabsConfigsType = {
//   HomeScreen: {
//     icon: ({ progress, focused }) => (
//       <Block alignCenter>
//         <Image
//           style={{
//             tintColor: focused ? "#10A31E" : "#8A9F8B",
//             width: focused ? 27 : 27,
//             height: focused ? 27 : 27,
//             resizeMode: "contain",
//           }}
//           source={require("../assets/images/ic_tabHome.png")}
//         />
//         {focused && (
//           <Text
//             color="#10A31E"
//             numberOfLines={1}
//             marginHorizontal={8}
//             marginTop={5}
//             size={14}
//             center
//           >
//             Trang chủ
//           </Text>
//         )}
//       </Block>
//     ),
//     renderTitle: ({ progress, focused }) => (
//       <Text style={{ marginTop: 10, color: focused ? "#10A31E" : "#8A9F8B" }}>
//         {"Trang chủ"}
//       </Text>
//     ),
//   },
//   ProductScreen: {
//     icon: ({ progress, focused }) => (
//       <Block alignCenter>
//         <Image
//           style={{
//             tintColor: focused ? "#10A31E" : "#8A9F8B",
//             width: focused ? 27 : 27,
//             height: focused ? 27 : 27,
//             resizeMode: "contain",
//           }}
//           source={require("../assets/images/ic_tabProduct.png")}
//         />
//         {focused && (
//           <Text
//             color="#10A31E"
//             numberOfLines={1}
//             marginHorizontal={8}
//             marginTop={5}
//             size={14}
//             center
//           >
//             Sản phẩm
//           </Text>
//         )}
//       </Block>
//     ),
//     renderTitle: ({ progress, focused }) => (
//       <Text style={{ marginTop: 10, color: focused ? "#10A31E" : "#8A9F8B" }}>
//         {"Sản phẩm"}
//       </Text>
//     ),
//   },
//   DonHangScreen: {
//     icon: ({ progress, focused }) => (
//       <Block alignCenter>
//         <Image
//           style={{
//             tintColor: focused ? "#10A31E" : "#8A9F8B",
//             width: focused ? 27 : 27,
//             height: focused ? 27 : 27,
//             resizeMode: "contain",
//           }}
//           source={require("../assets/images/ic_tabDonHang.png")}
//         />
//         {focused && (
//           <Text
//             color="#10A31E"
//             numberOfLines={1}
//             marginHorizontal={8}
//             marginTop={5}
//             size={14}
//             center
//           >
//             Đơn hàng
//           </Text>
//         )}
//       </Block>
//     ),
//     renderTitle: ({ progress, focused }) => (
//       <Text style={{ marginTop: 10, color: focused ? "#10A31E" : "#8A9F8B" }}>
//         {"Đơn hàng"}
//       </Text>
//     ),
//   },
//   NewsScreen: {
//     icon: ({ progress, focused }) => (
//       <Block alignCenter>
//         <Image
//           style={{
//             tintColor: focused ? "#10A31E" : "#8A9F8B",
//             width: focused ? 27 : 27,
//             height: focused ? 27 : 27,
//             resizeMode: "contain",
//           }}
//           source={require("../assets/images/ic_tabNews.png")}
//         />
//         {focused && (
//           <Text
//             color="#10A31E"
//             numberOfLines={1}
//             marginHorizontal={8}
//             marginTop={5}
//             size={14}
//             center
//           >
//             Tin tức
//           </Text>
//         )}
//       </Block>
//     ),
//     renderTitle: ({ progress, focused }) => (
//       <Text style={{ marginTop: 10, color: focused ? "#10A31E" : "#8A9F8B" }}>
//         {"Tin tức"}
//       </Text>
//     ),
//   },
// };
export default function MyTabs() {
  const { width } = useWindowDimensions();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
     
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="ProductScreen" component={ProductScreen} />
      <Tab.Screen name="DonHangScreen" component={DonHangScreen} />
      <Tab.Screen name="NewsScreen" component={NewsScreen} />
    </Tab.Navigator>
  );
}
