"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CurvedTabBar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactFastCompare = _interopRequireDefault(require("react-fast-compare"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

var _reactNativeSvg = _interopRequireWildcard(require("react-native-svg"));

var _AnimatedHelper = require("../AnimatedHelper");

var _RNShadow = require("../RNShadow");

var _constant = require("./constant");

var _ButtonTabItem = require("./item/ButtonTabItem");

var _Dot = require("./item/Dot");

var _style = require("./style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const AnimatedPath = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Path);

const CurvedTabBarComponent = props => {
  // props
  const {
    routes,
    selectedIndex,
    barWidth,
    duration,
    dotColor,
    tabBarColor,
    titleShown,
    isRtl,
    navigationIndex,
    dotSize: SIZE_DOT,
    barHeight = _constant.TAB_BAR_HEIGHT
  } = props; // state

  const {
    bottom
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    width
  } = (0, _reactNativeSafeAreaContext.useSafeAreaFrame)();
  const actualBarWidth = (0, _react.useMemo)(() => barWidth || width, [barWidth, width]);
  const widthTab = (0, _react.useMemo)(() => actualBarWidth / routes.length, [routes, actualBarWidth]);
  const inputRange = (0, _react.useMemo)(() => isRtl ? routes.map((_, index) => index).reverse() : routes.map((_, index) => index), [isRtl, routes]);
  const outputRange = (0, _react.useMemo)(() => routes.map((_, index) => index / routes.length * actualBarWidth), [routes, actualBarWidth]);
  const actualBarHeight = (0, _react.useMemo)(() => barHeight + bottom, [barHeight, bottom]);
  const indexAnimated = (0, _reactNativeReanimated.useDerivedValue)(() => (0, _AnimatedHelper.sharedTiming)(selectedIndex.value, {
    duration
  })); // func

  const renderButtonTab = (0, _react.useCallback)(({
    key,
    title,
    ...configs
  }, index) => {
    return /*#__PURE__*/_react.default.createElement(_ButtonTabItem.ButtonTab, _extends({
      focused: index === selectedIndex.value,
      width: actualBarWidth,
      key: key,
      title: title,
      titleShown: titleShown,
      indexAnimated: indexAnimated,
      countTab: routes.length,
      selectedIndex: selectedIndex,
      index: index
    }, configs));
  }, [indexAnimated, routes.length, selectedIndex, titleShown, actualBarWidth]); // reanimated

  const progress = (0, _AnimatedHelper.withSharedTransition)((0, _AnimatedHelper.sharedEq)(selectedIndex, indexAnimated));
  const xPath = (0, _AnimatedHelper.useInterpolate)(indexAnimated, inputRange, outputRange); // path

  const pathProps = (0, _reactNativeReanimated.useAnimatedProps)(() => {
    const centerHoleX = xPath.value + widthTab / 2;
    return {
      d: `M0,0 L${centerHoleX - SIZE_DOT},0
      C${centerHoleX - SIZE_DOT * 0.5},0 ${centerHoleX - SIZE_DOT * 0.75},${_constant.HEIGHT_HOLE} ${centerHoleX},${_constant.HEIGHT_HOLE} 
      C${centerHoleX + SIZE_DOT * 0.75},${_constant.HEIGHT_HOLE} ${centerHoleX + SIZE_DOT * 0.5},0 ${centerHoleX + SIZE_DOT} 0 
      L${actualBarWidth * 2},0 L ${actualBarWidth * 2},${actualBarHeight} L 0,${actualBarHeight} Z
      `
    };
  }, [actualBarWidth, widthTab, SIZE_DOT, actualBarHeight]); // style

  const containerStyle = (0, _react.useMemo)(() => [{
    height: actualBarHeight,
    width: actualBarWidth
  }], [actualBarHeight, actualBarWidth]);
  const rowTab = (0, _react.useMemo)(() => [{
    width: actualBarWidth,
    height: actualBarHeight
  }], [actualBarHeight, actualBarWidth]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_RNShadow.RNShadow, {
    style: [_style.styles.container, containerStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, {
    width: actualBarWidth,
    height: actualBarHeight,
    style: [_style.styles.svg]
  }, /*#__PURE__*/_react.default.createElement(AnimatedPath, {
    animatedProps: pathProps,
    translateY: 3,
    fill: tabBarColor,
    stroke: 'transparent',
    strokeWidth: 0
  }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_style.styles.rowTab, rowTab]
  }, /*#__PURE__*/_react.default.createElement(_Dot.Dot, {
    navigationIndex: navigationIndex,
    isRtl: isRtl,
    dotColor: dotColor,
    dotSize: SIZE_DOT,
    barHeight: actualBarHeight,
    width: actualBarWidth,
    selectedIndex: indexAnimated,
    routes: routes,
    progress: progress
  }), routes.map(renderButtonTab)));
};

const CurvedTabBar = /*#__PURE__*/(0, _react.memo)(CurvedTabBarComponent, _reactFastCompare.default);
exports.CurvedTabBar = CurvedTabBar;
//# sourceMappingURL=CurvedTabBar.js.map