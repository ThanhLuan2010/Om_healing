import { theme } from "@theme";
import { getSize, width } from "@utils/responsive";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  icQuize: {
    width: 26,
    height: 31,
    resizeMode: "contain",
  },
  icUser: {
    width: getSize.m(38),
    height: getSize.m(38),
  },
  arrawIcon: {
    width: getSize.s(7),
    height: getSize.s(12),
  },
  pressArrow: {
    width: getSize.s(30),
    height: getSize.s(30),
    backgroundColor: theme.colors.white,
    elevation: 2,
    shadowRadius: 2,
    shadowOpacity: 0.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  itemImage: {
    // height: getSize.v(300),
    height: "83%",
    resizeMode: "cover",
    // flex:1,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    width: width - 40,
  },
  gradientBg: {
    paddingHorizontal: 30,
    borderRadius: 4,
    marginLeft: 20,
  },
  carouselWrap: {
    elevation: 2,
    shadowRadius: 3,
    shadowOpacity: 0.3,
    borderRadius: 18,
    backgroundColor: theme.colors.white,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  icMore: {
    width: getSize.s(7),
    height: getSize.s(12),
    tintColor: "#747474",
  },
  productImg: {
    height: getSize.v(170),
    width: getSize.s(124),
    resizeMode: "cover",
  },
  buyBtn: {
    alignItems: "center",
    borderRadius: 5,
  },
  backgroundVideo: {
    height: getSize.v(240),
    resizeMode: "cover",
  },
  shahow: {
    elevation: 2,
    backgroundColor: theme.colors.white,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  icWallet: {
    width: getSize.s(38),
    resizeMode: "contain",
    height: getSize.s(38),
  },
  icVoucher: {
    width: getSize.s(31),
    height: getSize.s(38),
    resizeMode: "contain",
  },
  banner: {
    marginHorizontal: 20,
    height: getSize.v(207),
    resizeMode:'cover',
    borderRadius:10
  },
});

export default styles;
