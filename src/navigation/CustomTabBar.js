import { images } from "@assets";
import { Block, Text } from "@components";
import { theme } from "@theme";
import { getSize, height, width } from "@utils/responsive";
import { line } from "d3-shape";
import React, { memo, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import RNLinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Defs, Path, Stop, LinearGradient } from "react-native-svg";

const ITEM_SIZE = getSize.s(27);
const lineGenerator = line();
const Icon = ({ icon, color }) => {
  return (
    <Image
      source={icon}
      style={{
        ...styles.icoBottom,
        tintColor: color,
      }}
      resizeMode="contain"
    />
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const { bottom } = useSafeAreaInsets();
  const [indexTab, setindexTab] = useState(0);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  const TAB_HEIGHT = 87;
  const rect = lineGenerator([
    [0, 0],
    [width / 2, 0],
    [width, 0],
    [width, TAB_HEIGHT],
    [0, TAB_HEIGHT],
    [0, 0],
  ]);
  const ICON_SIZE = getSize.s(75);

  const d = `M${getSize.s(64 - 15 + (indexTab * width) / 4 - 10 * indexTab)} 
  ${ICON_SIZE - getSize.s(7)}C${getSize.s(
    86.0914 - 15 + (indexTab * width) / 4 - 10 * indexTab
  )} 
  ${ICON_SIZE - getSize.s(7)} ${getSize.s(
    104 - 18 + (indexTab * width) / 4 - 10 * indexTab
  )} 57.0914 
  ${getSize.s(104 - 16 + (indexTab * width) / 4 - 10 * indexTab)} ${getSize.s(
    35
  )}C${getSize.s(104 - 15 + (indexTab * width) / 4 - 10 * indexTab)} 
  28.2546 ${getSize.s(102.33 - 15 + (indexTab * width) / 4 - 10 * indexTab)} 
  21.8992 ${getSize.s(99.3818 - 15 + (indexTab * width) / 4 - 10 * indexTab)} 
  16.3245C${getSize.s(96.4863 - 15 + (indexTab * width) / 4 - 10 * indexTab)} 
  10.8503 ${getSize.s(100.366 - 15 + (indexTab * width) / 4 - 10 * indexTab)} 0 
  ${getSize.s(
    106.559 - 15 + (indexTab * width) / 4 - 10 * indexTab
  )} 0H424C427.314 0 
  ${width} 2.68629 ${width} 6V81C${width} 
  84.3137 427.314 87 424 87H6.00001C2.6863 87 0 84.3137 0 81V6C0 2.68629 2.68629 0 6 
  0H${getSize.s(
    21.4413 - 15 + (indexTab * width) / 4 - 10 * indexTab
  )}C${getSize.s(27.6341 - 15 + (indexTab * width) / 4 - 10 * indexTab)} 
  0 ${getSize.s(
    31.5137 - 14 + (indexTab * width) / 4 - 10 * indexTab
  )} 10.8503 ${getSize.s(28 - 15 + (indexTab * width) / 4 - 10 * indexTab)} 
  16.3245C${getSize.s(
    25.6697 - 13.5 + (indexTab * width) / 4 - 10 * indexTab
  )} 21.8992 ${getSize.s(24 - 16 + (indexTab * width) / 4 - 10 * indexTab)} 
  28.2546 ${getSize.s(
    24 - 14.5 + (indexTab * width) / 4 - 10 * indexTab
  )} 35C${getSize.s(
    24 - 14.5 + (indexTab * width) / 4 - 10 * indexTab
  )} 57.0914 ${getSize.s(
    41.9086 - 14 + (indexTab * width) / 4 - 10 * indexTab
  )} 75 ${getSize.s(64 - 17 + (indexTab * width) / 4 - 10 * indexTab)} 75Z`;

  return (
    <View style={styles.myTabBarContainer}>
      <Svg width={width} height={TAB_HEIGHT}>
        <Path fill="url(#paint0_linear_335_1153)" {...{ d }} />
        <Defs>
          <LinearGradient
            id="paint0_linear_335_1153"
            x1="6.07967"
            y1="5.19202e-05"
            x2="427.318"
            y2="98.4738"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor="#521717" />
            <Stop offset="1" stopColor="#8F1515" />
          </LinearGradient>
        </Defs>
      </Svg>
      <View style={StyleSheet.absoluteFill}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const IconTab =
              index === 0
                ? images.ic_tabHome
                : index === 1
                ? images.ic_tab_cart
                : index === 2
                ? images.ic_tab_khoahoc
                : images.ic_tab_news;
            const isFocused = state.index === index;

            const onPress = () => {
              setindexTab(index);

              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            if (isFocused) {
              return (
                <TouchableOpacity style={{ bottom: getSize.s(7) }}>
                  <RNLinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={["#521717", "#8F1515"]}
                    style={{
                      width: ICON_SIZE,
                      height: ICON_SIZE,
                      borderRadius: 70,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Block
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      radius={75}
                      alignCenter
                      justifyCenter
                    >
                      <Image
                        source={IconTab}
                        style={[
                          styles.iconTab,
                          { tintColor: theme.colors.white },
                        ]}
                      />
                      <Text
                        fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
                        center
                        color={theme.colors.white}
                        size={13}
                        marginTop={5}
                      >
                        {label}
                      </Text>
                    </Block>
                  </RNLinearGradient>
                </TouchableOpacity>
              );
            } else
              return (
                <TouchableOpacity
                  key={index}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  style={styles.button}
                >
                  <Image
                    source={IconTab}
                    style={[styles.iconTab, { tintColor: theme.colors.disable }]}
                  />
                  <Text
                    fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
                    center
                    color={theme.colors.disable}
                    size={13}
                    marginTop={5}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icoBottom: {
    height: ITEM_SIZE,
    width: ITEM_SIZE,
  },
  hidden: {
    overflow: "hidden",
  },
  badge: {
    position: "absolute",
    zIndex: 10,
    top: getSize.m(-7),
    right: getSize.m(15),
  },
  gradient: {
    height: (height * 95) / 926,
    width: width,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  myTabBarContainer: {
    position: "absolute",
    height: 80,
    width,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    elevation: 5,
    backgroundColor: "rgba(0,0,0,0)",
    bottom: 5,
  },
  button: {
    width: width / 4,
    alignItems: "center",
    justifyContent: "center",
  },
  iconTab: {
    width: getSize.s(20),
    height: getSize.s(20),
    resizeMode: "contain",
  },
});

export default memo(CustomTabBar);
