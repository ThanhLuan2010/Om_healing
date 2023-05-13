import { createTextStyle, theme } from "@theme";
import { getSize, width } from "@utils/responsive";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  dropdow: {
    // height: 41,
  },
  icDown: {
    width: 12,
    height: 6,
    resizeMode: "contain",
  },
  ic_drawer: {
    width: getSize.s(14),
    height: getSize.s(9.5),
    resizeMode: "contain",
  },
});

export default styles;
