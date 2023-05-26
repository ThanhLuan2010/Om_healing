import { images } from "@assets";
import { Block, Text } from "@components";
import { theme } from "@theme";
import { getSize, height, width } from "@utils/responsive";
import { line, curveBasis } from "d3-shape";
import React, { memo, useState, useEffect } from "react";
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
    [320 / 2, 0],
    [320, 0],
    [320, 87],
    [0, 87],
    [0, 0],
  ]);

  const ICON_SIZE = getSize.s(75);
  const CURVER_SIZE = ICON_SIZE + 4

  const DOT_X = width / 8 + (width * state.index) / 4 - CURVER_SIZE / 2;
  const center = lineGenerator.curve(curveBasis)([
    [DOT_X, 0],
    [DOT_X + CURVER_SIZE *0.09, CURVER_SIZE * 0.1],
    [DOT_X + CURVER_SIZE * 0.04 , CURVER_SIZE * 0.2],
    [DOT_X + CURVER_SIZE * 0.01, CURVER_SIZE * 0.3],
    [DOT_X , CURVER_SIZE * 0.4],
    [DOT_X + CURVER_SIZE * 0.01, CURVER_SIZE * 0.5],
    [DOT_X + CURVER_SIZE * 0.04, CURVER_SIZE * 0.6],
    [DOT_X + CURVER_SIZE * 0.09, CURVER_SIZE * 0.7],

    [DOT_X + CURVER_SIZE * 0.2, CURVER_SIZE * 0.81],
    [DOT_X + CURVER_SIZE * 0.3, CURVER_SIZE * 0.865],
    [DOT_X + CURVER_SIZE * 0.4, CURVER_SIZE * 0.899],

    [DOT_X + CURVER_SIZE * 0.5, CURVER_SIZE * 0.9],

    [DOT_X + CURVER_SIZE * 0.6, CURVER_SIZE * 0.898],
    [DOT_X + CURVER_SIZE * 0.7, CURVER_SIZE * 0.865],
    [DOT_X + CURVER_SIZE * 0.8, CURVER_SIZE * 0.81],

    [DOT_X + CURVER_SIZE * 0.91, CURVER_SIZE * 0.7],
    [DOT_X + CURVER_SIZE * 0.96, CURVER_SIZE * 0.6],
    [DOT_X + CURVER_SIZE * 0.99, CURVER_SIZE * 0.5],
    [DOT_X + CURVER_SIZE, CURVER_SIZE * 0.4],
    [DOT_X + CURVER_SIZE * 0.99, CURVER_SIZE * 0.3],
    [DOT_X + CURVER_SIZE * 0.96, CURVER_SIZE * 0.2],
    [DOT_X + CURVER_SIZE * 0.9, CURVER_SIZE * 0.1],
    [DOT_X + CURVER_SIZE, 0],
  ]);

  const d = `M0,0L160,0L320,0L320,87L0,87L0,0 ${center}`;
  return (
    <View style={styles.myTabBarContainer}>
      <Svg width={width} height={TAB_HEIGHT}>
        <Path fill="url(#paint0_linear_335_1153)" d={d} />
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
                <TouchableOpacity
                  style={{
                    bottom: ICON_SIZE*0.1 -1.5,
                    alignItems: "center",
                  }}
                >
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
                    style={[
                      styles.iconTab,
                      { tintColor: theme.colors.disable },
                    ]}
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
