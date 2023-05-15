import { theme } from "@theme";
import { width } from "@utils/responsive";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
  backgroundColor: {
    flex: 1,
  },
  logo: {
    width: width - 46 * 2,
    height: 200,
    resizeMode: "contain",
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: theme.colors.white,
  },
  button: {
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 7,
  },
  styleTitle: {
    color: theme.colors.white,
    fontSize: 18,
  },
});
