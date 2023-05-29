import { Image, StyleSheet } from "react-native";
import React from "react";
import { Block, Text } from "@components";
import { images } from "@assets";
import { theme } from "@theme";
import { width } from "@utils/responsive";

const NewsComponent = ({ item, index }) => {
  return (
    <Block marginHorizontal={20} alignCenter padding={8} row style={styles.shadow}>
        <Image style={styles.newImage} source={item.image} />
      <Block flex marginLeft={19}>
        <Text numberOfLines={3}
          size={16}
          fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
          color={theme.colors.black}
        >
          {item.title}
        </Text>
        <Text
          marginVertical={5}
          color={theme.colors.gray}
          size={10}
          fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
        >
          {item.content}
        </Text>
        <Block row alignCenter flex space={"between"}>
          <Block row alignCenter>
            <Image source={images.ic_clock} />
            <Text
              marginLeft={5}
              fontFamily={theme.fonts.fontFamily.SourceSans3Italic}
              size={10}
              color={theme.colors.gray}
            >
              {item.time}
            </Text>
          </Block>
          <Block row alignCenter marginHorizontal={13}>
            <Text
              marginRight={7}
              color={theme.colors.color_register}
              size={12}
            >
              {item.more}
            </Text>
            <Image source={images.ic_right} style={styles.ic_right} />
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default NewsComponent;

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 7,
    borderRadius: 10,
    marginTop: 20,
  },
  ic_right: {
    tintColor: theme.colors.color_register,
    width: 10,
    height: 10,
    resizeMode: "contain",
  },
  newImage:{
    width: width/3,
    height: width/3,
  }
});
