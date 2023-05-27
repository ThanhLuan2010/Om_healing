import { getSize } from "@utils/responsive";
import { Platform } from "react-native";
const lineScale = 1.34;

export const createTextStyle = (textSize, typeFont = "regular") => ({
  fontFamily: theme.fonts.fontFamily[typeFont],
  fontSize: getSize.s(textSize) || getSize.s(11),
  // lineHeight: Math.round((textSize || getSize.s(11)) * lineScale),
  fontWeight: theme.fonts.fontWeight[typeFont],
});

export const theme = {
  colors: {
    redesign: "#800000",
    transparent: "transparent",
    text: "#242424",
    background: "#f5f5f5",
    orange: "#FE930F",
    lightGray: "#A5A5A5",
    gray: "#424242",
    smoke: "#E6E6E6",
    white: "#ffffff",
    black: "#000000",
    placeholder: "#707070",
    blue: "#0d5cb6",
    red: "#E83625",
    gradient: ["#F04831", "#E73222", "#D9100C"],
    green: "#088A08",
    lightGreen: "#29bb89",
    yellow: "#FFDF00",
    dark: "#00000060",
    bg_opacity: "#00000050",
    gray2: "#9A9A9A",
    darkRed: "#BF0404",
    darkBlue: "#304FDF",
    lightRed: "#FA634D",
    btnColor: ["#002366", "#002366", "#002366"],
    lightBlue: "#5BAAFF",
    primaryColor: "#FDF0E4",
    lightSky: "#DDEDFF",
    investment: "#00509E",
    secondary: "#00234C",
    grayInput: "#EAEAEA",
    backgroundInput: "#E1E1E1",
    backgroundTypeProject: "#003D70",
    stroke: "#0073e6",
    blue_txt: "#2CA0D9",
    borderColor: "#F2F2F2",
    // backgroundColor: ["#0E833C", "#042F15"], //replace imagebackground
    blurGreen: "#C2E0C9",
    green: "#00FF19",
    greenBlur: "#C3FFD133",
    greenBold: "#10A31E",
    gray_3: "#747474",
    color_register: "#800000",
    color_time: "#FF0000",
    gradient_red: ["#521717FA", "#8F1515"],
    gradient_opYellow: ["#FFF6DF", "#FFEAC2"],
    milk_orange: "#FFEAC2",
    disable: "#A4A4A4",
   
    orange: "#B85902",
    gray: "#727272",
    blur_Red:"#7D4646"
  },

  fonts: {
    fontWeight: {
      heavy: "700",
      bold: "bold",
      semibold: Platform.OS === "android" ? "bold" : "600",
      regular: "normal",
      light: "300",
      medium: "500",
    },
    fontFamily: {
      medium: "Inter-Medium",
      regular: "Inter-Regular",
      light: "Inter-Light",
      BeVietnamPro: "BeVietnamPro-Black",
      BeVietnamPro_BlackItalic: "BeVietnamPro-BlackItalic",
      BeVietnamPro_Bold: "BeVietnamPro-Bold",
      BeVietnamPro_BoldItalic: "BeVietnamPro-BoldItalic",
      BeVietnamPro_Italic: "BeVietnamPro-Italic",
      BeVietnamPro_Light: "BeVietnamPro-Light",
      BeVietnamPro_LightItalic: "BeVietnamPro-LightItalic",
      BeVietnamPro_Medium: "BeVietnamPro-Medium",
      BeVietnamPro_Regular: "BeVietnamPro-Regular",
      BeVietnamPro_Regular: "BeVietnamPro-Regular",
      BeVietnamPro_SemiBoldItalic: "BeVietnamPro-SemiBoldItalic",
      SourceSans3Black: "SourceSans3-Black",
      SourceSans3BlackItalic: "SourceSans3-BlackItalic",
      SourceSans3Bold: "SourceSans3-Bold",
      SourceSans3BoldItalic: "SourceSans3-BoldItalic",
      SourceSans3Italic: "SourceSans3-Italic",
      SourceSans3Light: "SourceSans3-Light",
      SourceSans3LightItalic: "SourceSans3-LightItalic",
      SourceSans3Regular: "SourceSans3-Regular",
      SourceSans3SemiBold: "SourceSans3-SemiBold",
      SourceSans3SemiBoldItalic: "SourceSans3-SemiBoldItalic",
    },
  },
};
