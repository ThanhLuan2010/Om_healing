import { images } from "@assets";
import { Text } from "@components";
import { theme } from "@theme";
import { getSize, width } from "@utils/responsive";
import React from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import Lottie from "lottie-react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CodePushUpdate = ({ route }) => {
  const { top } = useSafeAreaInsets();
  return (
    <LinearGradient
      style={{ flex: 1, paddingTop: top }}
      colors={theme.colors.backgroundColor}
    >
      <Image source={images.loadingBg} style={styles.bg} />
      <Image source={images.logo} style={styles.logo} />
      <Lottie
        style={styles.lottie}
        source={require("../../assets/lottie/download.json")}
        autoPlay
        loop
      />
      <Text
        color="white"
        center
        size={20}
        marginTop={30}
        fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
      >
        Ứng dụng đang cập nhật phiên bản mới!
      </Text>
      <ActivityIndicator color={'#10A31E'} size={'large'} style={{marginTop:30, alignSelf:'center'}}/>
    </LinearGradient>
  );
};

export default CodePushUpdate;

const styles = StyleSheet.create({
  bg: {
    position: "absolute",
    bottom: 0,
  },
  logo: {
    width: width - 46 * 2,
    height: 200,
    resizeMode: "center",
    alignSelf: "center",
    marginTop: 50,
  },
  lottie: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 10,
  },
});
