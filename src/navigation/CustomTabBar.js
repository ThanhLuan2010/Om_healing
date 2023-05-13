import { icons, images } from "@assets";
import { Block, Text } from "@components";
import { theme } from "@theme";
import { getSize, height, width } from "@utils/responsive";
import React, { memo } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ITEM_SIZE = getSize.s(27);

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

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <Block
      // colors={["rgba(196, 255, 209, 0.74)", "rgba(196, 255, 209, 0.74)"]}
      style={styles.gradient}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];
        const label =
          route.name === "HomeScreen"
            ? "Trang chủ"
            : route.name === "ProductScreen"
            ? "Sản phẩm"
            : route.name === "DonHangScreen"
            ? "Đơn hàng"
            : route.name === "NewsScreen"
            ? "Tin tức"
            : "";
        const icon =
          index === 0
            ? images.ic_tabHome
            : index === 1
            ? images.ic_tabProduct
            : index === 2
            ? images.ic_tabDonHang
            : images.ic_tabNews;

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

        return (
          <Pressable
            key={`CustomTabBar-${index}`}
            onPress={onPress}
            style={styles.container}
          >
            {isFocused ? (
              <Block
                paddingHorizontal={10}
                alignCenter
                justifyCenter
                height={getSize.v(82)}
                width={getSize.v(82)}
                radius={getSize.v(82)}
                backgroundColor={theme.colors.white}
                bottom={getSize.v(20)}
                zIndex={1000}
              >
                <Block style={styles.icoBottom}>
                  <Block style={StyleSheet.absoluteFill}>
                    <Icon color={"#10A31E"} icon={icon} />
                  </Block>
                </Block>
                <Block>
                  <Text
                    center
                    size={14}
                    marginTop={5}
                    color={isFocused ? "#10A31E" : "#8A9F8B"}
                    numberOfLines={1}
                    fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
                  >
                    {label}
                  </Text>
                </Block>
              </Block>
            ) : (
              <Block
                paddingHorizontal={10}
                alignCenter
                justifyCenter
                height={"100%"}
              >
                <Block style={styles.icoBottom}>
                  <Block style={StyleSheet.absoluteFill}>
                    <Icon color={"#8A9F8B"} icon={icon} />
                  </Block>
                </Block>
                <Block>
                  <Text
                    center
                    size={12}
                    marginTop={5}
                    color={"#8A9F8B"}
                    numberOfLines={1}
                  >
                    {label}
                  </Text>
                </Block>
              </Block>
            )}
          </Pressable>
        );
      })}
    </Block>
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
    backgroundColor: "rgba(196, 255, 209, 0.74)",
  },
});

export default memo(CustomTabBar);
