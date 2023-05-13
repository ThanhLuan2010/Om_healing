/* eslint-disable react-hooks/rules-of-hooks */
import { Easing, interpolate, useDerivedValue, withTiming } from 'react-native-reanimated';
export const useSharedTransition = (state, config = {
  duration: 500,
  easing: Easing.bezier(0.33, 0.01, 0, 1)
}) => {
  'worklet';

  return useDerivedValue(() => state ? withTiming(1, config) : withTiming(0, config));
};
export const withSharedTransition = (value, config = {
  duration: 500,
  easing: Easing.bezier(0, 0.55, 0.45, 1)
}) => {
  'worklet';

  return useDerivedValue(() => value.value ? withTiming(1, config) : withTiming(0, config));
};
export const sharedTiming = (toValue, config, callBack) => {
  'worklet';

  return withTiming(toValue, Object.assign({
    duration: 500,
    easing: Easing.bezier(0.22, 1, 0.36, 1)
  }, config), callBack);
};
export const useInterpolate = (progress, input, output, type) => useDerivedValue(() => interpolate(progress.value, input, output, type));
export const sharedRound = value => {
  'worklet';

  return Math.round(value);
};
export const sharedEq = (v1, v2) => {
  'worklet';

  return useDerivedValue(() => v1.value === v2.value);
};
//# sourceMappingURL=AnimatedHelper.js.map