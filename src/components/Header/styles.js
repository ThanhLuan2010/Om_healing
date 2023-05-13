import { getSize } from "@utils/responsive";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  iconBack: {
    height: getSize.s(18),
    width: getSize.s(10),
    resizeMode: "contain",
  },
  icoSearch: {
    height: getSize.s(24),
    width: getSize.s(24),
    marginHorizontal: getSize.m(12),
  },
  icoCart: {
    height: getSize.s(24),
    width: getSize.s(24),
  },
  btnBack: {
    paddingVertical: getSize.m(5),
    flexDirection: "row",
    alignItems: "center",
  },
  btnOptions: {
    position: "absolute",
    bottom: getSize.m(12),
    right: getSize.m(12),
  },
  icQuize: {
    width: getSize.s(26),
    height: getSize.s(31),
    resizeMode: 'stretch',
  },
  shadow: {
    elevation: 5,
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
