import { theme } from "@theme";
import { width } from "@utils/responsive";
import { StyleSheet } from "react-native";
export default StyleSheet.create({
  ccc: {
    backgroundColor: "#fff",
    paddingHorizontal: 26,
    paddingVertical: 23,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  icon: {
    width: 10,
    height: 18,
    resizeMode: "contain",
  },
  iconRight: {
    width: 26,
    height: 31,
    resizeMode: "contain",
  },
  button: {
    alignItems: "center",
    paddingVertical: 11,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  styleTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.fontFamily.SourceSans3Bold,
  },
  header:{
    elevation:0,
    shadowColor:'transparent'
  }
});
