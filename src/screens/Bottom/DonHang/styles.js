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
  backgroundColor: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 2,
    shadowOpacity: 0.3,
    elevation: 2,
    backgroundColor: theme.colors.white,
  },
  imgProduct: {
    width: getSize.s(121),
    height: getSize.s(142),
  },
  buyBtn: {
    alignItems: "center",
    borderRadius: 5,
  },
  icHetHang: {
    width: getSize.s(54),
    height: getSize.s(54),
    position: "absolute",
    right: -10,
    top: -30,
  },
});

export default styles;
