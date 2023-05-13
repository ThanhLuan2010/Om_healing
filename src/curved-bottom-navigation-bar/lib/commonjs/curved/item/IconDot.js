"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconDot = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactFastCompare = _interopRequireDefault(require("react-fast-compare"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _AnimatedHelper = require("../../AnimatedHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const IconDotComponent = props => {
  // props
  const {
    index,
    selectedIndex,
    children
  } = props; // reanimated

  const progress = (0, _reactNativeReanimated.useSharedValue)(0);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => selectedIndex.value === index, (result, prevValue) => {
    if (result !== prevValue) {
      progress.value = (0, _AnimatedHelper.sharedTiming)(result ? 1 : 0);
    }
  });
  const opacity = (0, _AnimatedHelper.useInterpolate)(progress, [0, 0.6, 1], [0, 0, 1]);
  const scale = (0, _AnimatedHelper.useInterpolate)(progress, [0, 1], [0.2, 1]); // reanimated style

  const style = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    position: 'absolute',
    opacity: opacity.value,
    transform: [{
      scale: scale.value
    }]
  })); // render

  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [style]
  }, children);
};

const IconDot = /*#__PURE__*/(0, _react.memo)(IconDotComponent, _reactFastCompare.default);
exports.IconDot = IconDot;
//# sourceMappingURL=IconDot.js.map