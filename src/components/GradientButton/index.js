import { StyleSheet, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import Block from "@components/Block";
import LinearGradient from "react-native-linear-gradient";
import { Text } from "@components";
import { theme } from "@theme";

export default function GrafientButton({
  colors = ["#48DA5FFA", "#18A42E"],
  title = "Button",
  style,
  onPress = () => {},
  disable,
  containerStyle,
  styleTitle,
  icon,
}) {
  return (
    <TouchableOpacity
      containerStyle={containerStyle}
      disabled={disable}
      onPress={onPress}
    >
      <LinearGradient
        style={style}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={disable ? ["gray", "gray"] : colors}
      >
        <Block
          row
          colors
          alignCenter
          paddingHorizontal={12}
          paddingTop={10}
          paddingVertical={12}
        >
          {icon && icon}
          <Text
            style={styleTitle}
            color={theme.colors.white}
            fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
            numberOfLines={1}
          >
            {title}
          </Text>
        </Block>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
