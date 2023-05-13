"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dot = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactFastCompare = _interopRequireDefault(require("react-fast-compare"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

var _AnimatedHelper = require("../../AnimatedHelper");

var _constant = require("../constant");

var _IconDot = require("./IconDot");

var _style = require("./style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable @typescript-eslint/no-explicit-any */
const DotComponent = props => {
  // props
  const {
    selectedIndex,
    routes,
    progress,
    width,
    dotColor,
    dotSize,
    barHeight,
    isRtl,
    navigationIndex
  } = props; // const

  const {
    bottom
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const inputRange = (0, _react.useMemo)(() => routes.map((_, index) => index), [routes]);
  const outputRange = (0, _react.useMemo)(() => isRtl ? routes.map((_, index) => -(index * width / routes.length + width / routes.length / 2 - dotSize / 2)) : routes.map((_, index) => index * width / routes.length + width / routes.length / 2 - dotSize / 2), [isRtl, routes, width, dotSize]); // reanimated

  const translateX = (0, _AnimatedHelper.useInterpolate)(selectedIndex, inputRange, outputRange);
  const translateY = (0, _AnimatedHelper.useInterpolate)(progress, [0, 1], [15 - bottom, -(barHeight - _constant.HEIGHT_HOLE + 5)]);
  const opacity = (0, _AnimatedHelper.useInterpolate)(progress, [0, 1], [0.2, 1]); // reanimated style

  const iconContainerStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    justifyContent: 'center',
    alignItems: 'center'
  }));
  const dotStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    width: dotSize,
    backgroundColor: dotColor,
    height: dotSize,
    bottom: 0,
    borderRadius: dotSize / 2,
    transform: [{
      translateX: translateX.value
    }, {
      translateY: translateY.value
    }]
  })); // render

  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [_style.styles.dot, dotStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: iconContainerStyle
  }, routes.map(({
    icon
  }, index) => /*#__PURE__*/_react.default.createElement(_IconDot.IconDot, {
    key: index,
    index: index,
    selectedIndex: selectedIndex
  }, icon({
    progress,
    focused: navigationIndex === index
  })))));
};

const Dot = /*#__PURE__*/(0, _react.memo)(DotComponent, _reactFastCompare.default);
exports.Dot = Dot;
//# sourceMappingURL=Dot.js.map