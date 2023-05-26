import { theme } from "@theme";
import { width } from "@utils/responsive";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
  bg_container: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: width - 46 * 2,
    resizeMode: "contain",
    bottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: theme.colors.black,
    fontFamily:theme.fonts.fontFamily.SourceSans3Bold
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
  ic_phone: {
    tintColor: theme.colors.black,
  },
});
