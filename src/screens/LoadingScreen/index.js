import { images } from "@assets";
import { theme } from "@theme";
import { height, width } from "@utils/responsive";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../store/slices/common";
import CodePush from "react-native-code-push";
import { userSelect } from "@store/slices/user";
import { goBack, navigate, reset } from "@navigation/RootNavigation";

function LoadingScreenChild({ navigation }) {
  const { isLoggedIn } = useSelector(userSelect);
  useEffect(() => {
    dispatch(setIsLoading(false));
    CodePush.checkForUpdate().then((update) => {
      if (!update) {
        // setTimeout(() => {
        //   if (isLoggedIn) {
        //     reset(0, "BOTTOM_TAB");
        //   } else {
        //     reset(0, "LoginScreen");
        //   }
        // }, 2000);
      }
    });
  }, []);

  const dispatch = useDispatch();
  const { top } = useSafeAreaInsets();

  return (
    <LinearGradient
      style={[styles.backgroundColor, { paddingTop: top }]}
      colors={theme.colors.backgroundColor}
    >
      <Image source={images.loadingBg} style={styles.bg} />
      <ActivityIndicator
        color={"white"}
        size={"large"}
        style={{ position: "absolute", top: height / 2, alignSelf: "center" }}
      />
      <Image source={images.logo} style={styles.logo} />
    </LinearGradient>
  );
}

export default CodePush(LoadingScreenChild);

const styles = StyleSheet.create({
  backgroundColor: {
    flex: 1,
  },
  logo: {
    width: width - 46 * 2,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 40,
  },
  bg: {
    position: "absolute",
    zIndex: -2,
    bottom: 0,
  },
});
