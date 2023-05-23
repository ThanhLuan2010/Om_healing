import { theme } from "@theme";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
  imgCourse: {
    borderRadius: 4,
    width: 139,
    height: 139,
    // resizeMode:"contain"
  },
  shadow: {
    backgroundColor: theme.colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 4,
    borderRadius: 10,
  },
});
