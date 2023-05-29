import { theme } from "@theme";
import { width } from "@utils/responsive";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
  imgCourse: {
    borderRadius: 4,
    width: width / 3,
    height: width / 3,
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
