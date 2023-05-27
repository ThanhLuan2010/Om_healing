/* eslint-disable react-native/no-inline-styles */
import { images } from "@assets";
import { Block, Text } from "@components";
import { routes } from "@navigation/routes";
import { useNavigation } from "@react-navigation/native";
import { theme } from "@theme";
import { width } from "@utils/responsive";
import React from "react";
import { Image, Pressable, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";
import { navigate } from "@navigation/RootNavigation";

const Header = (props) => {
  if (props.type === "Home") {
    return <HeaderCommon {...props} />;
  } else if (props.type === "LinearBackground") {
    return <HeaderLinearBackground {...props} />;
  } else {
    return <HeaderCommon {...props} />;
  }
};
const HeaderCommon = ({
  title,
  canGoBack,
  onGoBack,
  rightComponent,
  titleStyle,
  blackTheme = false,
  style,
  search,
}) => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  const _onBack = () => {
    onGoBack
      ? onGoBack()
      : navigation.canGoBack()
      ? navigation.goBack()
      : navigation.navigate(routes.BOTTOM_TAB);
  };

  return (
    <LinearGradient
      colors={theme.colors.gradient_red}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        paddingHorizontal: 20,
        paddingTop: top + 10,
        paddingVertical: 15,
        flexDirection: "row",
      }}
    >
      <Block>
        <Block width={width / 6}>
          {canGoBack && (
            <Pressable onPress={_onBack} style={[styles.btnBack]}>
              <Image
                source={images.ic_left}
                resizeMode="contain"
                style={{
                  ...styles.iconBack,
                  tintColor: "#10A31E",
                }}
              />
              <Text
                marginLeft={5}
                color={blackTheme ? theme.colors.black : theme.colors.white}
                style={titleStyle}
              >
                {title}
              </Text>
            </Pressable>
          )}
        </Block>

        <Block alignEnd width={width / 6}>
          {search}
          {rightComponent ? rightComponent : null}
        </Block>
      </Block>
    </LinearGradient>
  );
};

const HeaderLinearBackground = () => {
  const { top } = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={theme.colors.gradient_red}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Block
        row
        alignCenter
        paddingHorizontal={20}
        paddingTop={top + 10}
        paddingVertical={12}
      >
        <Block flex>
          <Block
            width={43}
            height={43}
            radius={21}
            backgroundColor={theme.colors.blur_Red}
            borderWidth={1}
            borderColor={theme.colors.white}
            alignCenter
            justifyCenter
          >
            <TouchableOpacity>
              <Image source={images.ic_bell} style={styles.ic_icon} />
            </TouchableOpacity>
          </Block>
        </Block>

        <Block row alignCenter>
          <Block
            width={43}
            height={43}
            radius={21}
            borderWidth={1}
            borderColor={theme.colors.white}
            alignCenter
            justifyCenter
            backgroundColor={theme.colors.blur_Red}
            marginRight={18}
          >
            <TouchableOpacity>
              <Image source={images.ic_user} style={styles.ic_icon} />
            </TouchableOpacity>
          </Block>
          <TouchableOpacity>
            <Image source={images.ic_setting} style={styles.ic_icon} />
          </TouchableOpacity>
        </Block>
      </Block>
    </LinearGradient>
  );
};

export default Header;
