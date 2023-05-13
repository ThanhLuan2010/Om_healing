import { theme } from "@theme";
import { getSize } from "@utils/responsive";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
  imgProduct: {
    width: getSize.v(121),
    height: getSize.v(142),
    resizeMode: "contain",
    marginRight: 18,
  },
  GradientButton: {
    borderRadius: 4,
    paddingHorizontal: 17,
  },
  styleTitle: {
    fontSize: 14,
  },
  container: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 2,
    shadowRadius: 2,
    shadowOpacity: 0.3,
    backgroundColor: theme.colors.white,
    marginTop: 30,
  },
  shadow: {},
});
