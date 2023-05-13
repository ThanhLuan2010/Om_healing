import {Dimensions, Platform, StatusBar} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const {width, height} = Dimensions.get('screen');

//iPhone 12
const DESIGN_WIDTH = 390;
const DESIGN_HEIGHT = 844;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const IP8PLUS_WIDTH = 414;
const IP8PLUS_HEIGHT = 736;

const IP8_WIDTH = 375;
const IP8_HEIGHT = 667;

const IP5_WIDTH = 320;
const IP5_HEIGHT = 568;

const WIDTH = width > height ? height : width;
const HEIGHT = width > height ? width : height;

const scale = size => {
  return (WIDTH / DESIGN_WIDTH) * size;
};

const verticalScale = size => {
  return (HEIGHT / DESIGN_HEIGHT) * size;
};

const moderateScale = (size, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};

/**
 * getSize.m(10) Responsive for padding - margin - fontSize.
 *
 * getSize.s(10) Responsive by width screen. (Image Size)
 *
 * getSize.v(10) Responsive by height screen.
 **/

export const getSize = {
  m: moderateScale,
  s: scale,
  v: verticalScale,
};

export const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (width === DESIGN_WIDTH && height === DESIGN_HEIGHT) ||
      (width === XSMAX_WIDTH && height === XSMAX_HEIGHT)
    : false;

export const StatusBarHeight = Platform.select({
  ios: isIPhoneX() ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0,
});

// Check Device IOS
export const hasNotch = DeviceInfo.hasNotch();

export const isIphone8Plus =
  width === IP8PLUS_WIDTH && height === IP8PLUS_HEIGHT;

export const isIphone8 = width === IP8_WIDTH && height === IP8_HEIGHT;

export const isIphone5 = width === IP5_WIDTH && height === IP5_HEIGHT;
