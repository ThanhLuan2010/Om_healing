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

const Header = (props) => {
  return <HeaderCommon {...props} />;
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
    <Block
      row
      alignCenter
      paddingHorizontal={20}
      paddingTop={top + 10}
      paddingVertical={12}
      backgroundColor={theme.colors.white}
      style={[style, styles.shadow]}
    >
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
            >
              Back
            </Text>
          </Pressable>
        )}
      </Block>
      <Text
        color={"#10A31E"}
        flex
        size={24}
        fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
        center
        style={titleStyle}
      >
        {title}
      </Text>
      <Block alignEnd width={width / 6}>
        {search}
        {rightComponent ? (
          rightComponent
        ) : (
          <TouchableOpacity>
            <Image source={images.ic_quize} style={styles.icQuize} />
          </TouchableOpacity>
        )}
      </Block>
    </Block>
  );
};

export default Header;
