import { images } from "@assets";
import { Block, Text } from "@components";
import { theme } from "@theme";
import { getSize, width } from "@utils/responsive";
import React from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import Lottie from "lottie-react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { codePushSelect } from "@store/slices/codePush";

const CodePushUpdate = ({ route }) => {
  const { top } = useSafeAreaInsets();
  const { progres } = useSelector(codePushSelect);
  console.log("=====progres====", progres);
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
      {/* totalBytes => width-40
    receivedBytes
*/}
      {progres?.receivedBytes && progres?.totalBytes && (
        <Text
          center
          color="white"
          size={20}
          marginTop={30}
          fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
        >
          {((progres?.receivedBytes * 100) / progres?.totalBytes).toFixed(0) ||
            0}
          %
        </Text>
      )}
      <Block
        width={width - 40}
        alignSelf={"center"}
        backgroundColor={"gray"}
        height={15}
        radius={10}
        marginTop={10}
      >
        <Block
          width={
            (progres?.receivedBytes * (width - 40)) / progres?.totalBytes || 0
          }
          alignCenter
          backgroundColor={
            progres?.receivedBytes && progres?.totalBytes ? "#10A31E" : "gray"
          }
          height={15}
          radius={10}
        ></Block>
      </Block>
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
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 50,
  },
  lottie: {
    width: getSize.s(100),
    height: getSize.s(100),
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 10,
  },
});
