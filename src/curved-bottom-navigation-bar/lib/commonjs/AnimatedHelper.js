"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sharedEq = exports.sharedRound = exports.useInterpolate = exports.sharedTiming = exports.withSharedTransition = exports.useSharedTransition = void 0;

var _reactNativeReanimated = require("react-native-reanimated");

/* eslint-disable react-hooks/rules-of-hooks */
const useSharedTransition = (state, config = {
  duration: 500,
  easing: _reactNativeReanimated.Easing.bezier(0.33, 0.01, 0, 1)
}) => {
  'worklet';

  return (0, _reactNativeReanimated.useDerivedValue)(() => state ? (0, _reactNativeReanimated.withTiming)(1, config) : (0, _reactNativeReanimated.withTiming)(0, config));
};

exports.useSharedTransition = useSharedTransition;

const withSharedTransition = (value, config = {
  duration: 500,
  easing: _reactNativeReanimated.Easing.bezier(0, 0.55, 0.45, 1)
}) => {
  'worklet';

  return (0, _reactNativeReanimated.useDerivedValue)(() => value.value ? (0, _reactNativeReanimated.withTiming)(1, config) : (0, _reactNativeReanimated.withTiming)(0, config));
};

exports.withSharedTransition = withSharedTransition;

const sharedTiming = (toValue, config, callBack) => {
  'worklet';

  return (0, _reactNativeReanimated.withTiming)(toValue, Object.assign({
    duration: 500,
    easing: _reactNativeReanimated.Easing.bezier(0.22, 1, 0.36, 1)
  }, config), callBack);
};

exports.sharedTiming = sharedTiming;

const useInterpolate = (progress, input, output, type) => (0, _reactNativeReanimated.useDerivedValue)(() => (0, _reactNativeReanimated.interpolate)(progress.value, input, output, type));

exports.useInterpolate = useInterpolate;

const sharedRound = value => {
  'worklet';

  return Math.round(value);
};

exports.sharedRound = sharedRound;

const sharedEq = (v1, v2) => {
  'worklet';

  return (0, _reactNativeReanimated.useDerivedValue)(() => v1.value === v2.value);
};

exports.sharedEq = sharedEq;
//# sourceMappingURL=AnimatedHelper.js.map