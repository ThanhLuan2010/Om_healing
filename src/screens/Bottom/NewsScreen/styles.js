import { createTextStyle, theme } from "@theme";
import { getSize } from "@utils/responsive";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  iconDown: {
    width: 6,
    height: 6,
    resizeMode: "contain",
    position: "absolute",
    right: 3,
  },
  learningImg: {
    // height: getSize.v(60),
    width: getSize.v(100),
    resizeMode: "cover",
    marginRight: 10,
    borderRadius: 5,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 4,
  },
});

export default styles;
