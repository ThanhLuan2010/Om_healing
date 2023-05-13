/* eslint-disable react-native/no-inline-styles */
import { Block } from "@components";
import { routes } from "@navigation/routes";
import { useNavigation } from "@react-navigation/native";
import { theme } from "@theme";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HeaderHome = (props) => {
  return <HeaderCommon {...props} />;
};
const HeaderCommon = ({
  title,
  canGoBack,
  onGoBack,
  corlor = ["#8F91FF", "#8F91FF"],
  rightComponent,
  titleStyle,
  blackTheme = false,
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
      paddingTop={20}
      backgroundColor={theme.colors.white}
      // elevation={10}
      // style={styles.shadow}
    ></Block>
  );
};

export default HeaderHome;
