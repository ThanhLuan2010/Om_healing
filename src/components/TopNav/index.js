import { images } from "@assets";
import Block from "@components/Block";
import { navigate } from "@navigation/RootNavigation";
import { theme } from "@theme";
import { getSize } from "@utils/responsive";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const TopNav = () => {
  return (
    <LinearGradient
      colors={theme.colors.gradient_red}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Block
        paddingHorizontal={20}
        paddingVertical={20}
        alignCenter
        space={"between"}
        row
        marginTop={10}
      >
        <TouchableOpacity onPress={() => navigate("ChatScreen")}>
          <Block
            alignCenter
            justifyCenter
            borderWidth={1}
            borderColor={theme.colors.white}
            backgroundColor={theme.colors.blur_Red}
            paddingVertical={11}
            paddingHorizontal={13}
            radius={100}
          >
            <Image source={images.ic_bell} style={styles.ic_setting} />
          </Block>
        </TouchableOpacity>
        <Block alignCenter space={"between"} row>
          <TouchableOpacity>
            <Block
              alignCenter
              justifyCenter
              borderWidth={1}
              borderColor={theme.colors.white}
              backgroundColor={theme.colors.blur_Red}
              paddingVertical={11}
              paddingHorizontal={13}
              radius={40}
            >
              <Image source={images.ic_user} style={styles.ic_setting} />
            </Block>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate("AccountScreen")}>
            <Image source={images.ic_setting} style={styles.ic_setting} />
          </TouchableOpacity>
        </Block>
      </Block>
    </LinearGradient>
  );
};

export default TopNav;

const styles = StyleSheet.create({
  icQuize: {
    width: 26,
    height: 31,
    resizeMode: "contain",
  },
  ic_setting: {
    width: getSize.m(20),
    height: getSize.m(20),
    resizeMode: "contain",
    tintColor: theme.colors.white,
  },
});
