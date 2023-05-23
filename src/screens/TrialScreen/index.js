import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Block, Button, GradientButton, Text } from "@components";
import { images } from "@assets";
import { theme } from "@theme";
import LinearGradient from "react-native-linear-gradient";
import { navigate } from "@navigation/RootNavigation";

const TrialScreen = () => {
  const ButtonTrial = () => {
    return (
      <Block marginHorizontal={20}>
        <LinearGradient
          style={styles.borderColor}
          colors={theme.colors.gradient_red}
        >
          <LinearGradient
            style={styles.borderColor}
            colors={theme.colors.gradient_opYellow}
          >
            <TouchableOpacity style={styles.btnTrial} onPress={()=>navigate("HomeScreen")}>
              <Text
                color={theme.colors.color_register}
                size={18}
                fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
              >
                Trải nghiệm thử
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </LinearGradient>
      </Block>
    );
  };
  const ButtonGoogle = () => {
    return (
      <TouchableOpacity
        style={styles.btnGoogle}
        onPress={() => navigate("SellComponent")}
      >
        <Block row alignCenter justifyCenter>
          <Image source={images.ic_google} style={styles.ic_google} />

          <Text
            size={18}
            fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
            color={theme.colors.black}
          >
            Đăng nhập bằng Google {"     "}
          </Text>
        </Block>
      </TouchableOpacity>
    );
  };
  const ButtonFacebook = () => {
    return (
      <TouchableOpacity>
        <LinearGradient
          style={styles.btnFacebook}
          colors={["#5E81C6", "#19459A"]}
        >
          <Block row justifyCenter alignCenter>
            <Image source={images.ic_facebook} style={styles.ic_facebook} />

            <Text
              fontType={"SemiBold"}
              size={18}
              fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
              color={theme.colors.white}
            >
              Đăng nhập bằng Facebook
            </Text>
          </Block>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground source={images.bg_container} style={styles.bg_container}>
      <Block height={100} top={20}>
        <Image source={images.logo_text} style={styles.logo_text} />
      </Block>

      {ButtonTrial()}
      <GradientButton
        onPress={() => navigate("LoginScreen")}
        style={styles.btnNumPhone}
        colors={theme.colors.gradient_red}
        title="Đăng nhập bằng  số điện thoại"
      />
      {ButtonGoogle()}
      {ButtonFacebook()}
    </ImageBackground>
  );
};

export default TrialScreen;

const styles = StyleSheet.create({
  bg_container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  btnTrial: {
    alignItems: "center",
    paddingVertical: 25,

    borderRadius: 7,
  },
  txtTrial: {
    color: theme.colors.color_register,
    fontSize: 18,
    fontFamily: theme.fonts.fontFamily.SourceSans3SemiBold,
  },
  titleTrial: {
    color: theme.colors.red,
  },
  btnNumPhone: {
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 7,
    alignItems: "center",
    marginTop: 30,
  },
  btnFacebook: {
    paddingVertical: 19,
    backgroundColor: theme.colors.white,
    marginHorizontal: 20,
    borderRadius: 7,
    marginTop: 30,
  },
  btnGoogle: {
    paddingVertical: 19,
    backgroundColor: theme.colors.white,
    marginHorizontal: 20,
    borderRadius: 7,
    marginTop: 30,
  },
  logo_text: {
    alignSelf: "center",
    // marginBottom: 63,
    // top: 20,
  },
  ic_facebook: {
    width: 33,
    height: 33,
    marginRight: 24,
  },
  ic_google: {
    width: 31,
    height: 31,
    marginRight: 24,
  },
  borderColor: {
    padding: 1,
    borderRadius: 7,
  },
});
