"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonTab = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactFastCompare = _interopRequireDefault(require("react-fast-compare"));

var _AnimatedHelper = require("../../AnimatedHelper");

var _style = require("./style");

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ButtonTabItemComponent = props => {
  // props
  const {
    index,
    selectedIndex,
    countTab,
    indexAnimated,
    width,
    icon,
    renderTitle,
    title,
    titleShown,
    focused
  } = props; // reanimated

  const {
    bottom
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const isActive = (0, _reactNativeReanimated.useDerivedValue)(() => (0, _AnimatedHelper.sharedRound)(indexAnimated.value));
  const progress = (0, _reactNativeReanimated.useSharedValue)(0);
  const opacity = (0, _AnimatedHelper.useInterpolate)(progress, [0, 0.8], [1, 0]);
  const translateY = (0, _AnimatedHelper.useInterpolate)(progress, [0, 0.4], [0, 10]);
  const scale = (0, _AnimatedHelper.useInterpolate)(progress, [0, 1], [1, 0.5]); // func

  const _onPress = (0, _react.useCallback)(() => {
    selectedIndex.value = index;
  }, [index, selectedIndex]); // effect


  (0, _reactNativeReanimated.useAnimatedReaction)(() => isActive.value === index, (result, prevValue) => {
    if (result !== prevValue) {
      progress.value = (0, _AnimatedHelper.sharedTiming)(result ? 1 : 0);
    }
  }); // reanimated style

  const containerIconStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    opacity: opacity.value,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{
      translateY: translateY.value
    }]
  }));
  const titleStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => ({
    transform: [{
      scale: scale.value
    }]
  }));
  const buttonTab = (0, _react.useMemo)(() => ({
    width: width / countTab,
    paddingBottom: bottom
  }), [width, countTab, bottom]); // render

  const renderIcon = (0, _react.useCallback)(() => {
    return icon({
      progress,
      focused
    });
  }, [focused, icon, progress]);

  const _renderTitle = (0, _react.useCallback)(() => {
    return renderTitle === null || renderTitle === void 0 ? void 0 : renderTitle({
      progress,
      focused,
      title: title !== null && title !== void 0 ? title : ''
    });
  }, [focused, progress, renderTitle, title]);

  const showTitle = (0, _react.useCallback)(() => {
    if (typeof renderTitle === 'function') {
      return _renderTitle();
    }

    return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.Text, {
      style: [_style.styles.title, titleStyle],
      allowFontScaling: false,
      numberOfLines: 1
    }, title !== null && title !== void 0 ? title : '');
  }, [_renderTitle, renderTitle, title, titleStyle]); // render

  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: _onPress,
    activeOpacity: 0.7
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_style.styles.buttonTab, buttonTab]
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [containerIconStyle]
  }, renderIcon(), titleShown ? showTitle() : null)));
};

const ButtonTab = /*#__PURE__*/(0, _react.memo)(ButtonTabItemComponent, _reactFastCompare.default);
exports.ButtonTab = ButtonTab;
//# sourceMappingURL=ButtonTabItem.js.map