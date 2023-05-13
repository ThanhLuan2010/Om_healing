import { theme } from "@theme";
import { getSize } from "@utils/responsive";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  resetStyles: {
    flex: 1,
    padding: 0,
    margin: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  defaultStyles: {
    fontFamily: theme.fonts.fontFamily.default,
    minHeight: getSize.m(38),
    paddingHorizontal: getSize.m(16),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftIcon: {
    position: "absolute",
    left: getSize.m(12),
    height: getSize.s(14),
    width: getSize.s(14),
  },
  rightIcon: {
    position: "absolute",
    right: getSize.m(12),
  },
  shadow: {
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowRadius: 2,
    borderRadius: 4,
    width: 100,
    height: 50,
  },
});
