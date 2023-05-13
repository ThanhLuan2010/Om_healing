import { theme } from "@theme";
import { getSize } from "@utils/responsive";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  CheckBox: {
    width: 26,
    height: 26,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: theme.colors.blurGreen,
    alignItems: "center",
    justifyContent: "center",
  },
  iconCheck: {
    width: 22,
    height: 22,
    borderRadius: 3,
    resizeMode: "contain",
    backgroundColor: theme.colors.green,
    margin: 2,
  },
});
