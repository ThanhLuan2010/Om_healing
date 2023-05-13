"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedTabBar = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactFastCompare = _interopRequireDefault(require("react-fast-compare"));

var _native = require("@react-navigation/native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _constant = require("./curved/constant");

var _CurvedTabBar = require("./curved/CurvedTabBar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_reactNativeReanimated.default.addWhitelistedNativeProps({
  width: true,
  stroke: true,
  backgroundColor: true
});

const AnimatedTabBarComponent = props => {
  // props
  const {
    navigation,
    tabs,
    descriptors,
    state,
    duration = _constant.DEFAULT_ITEM_ANIMATION_DURATION,
    barColor = _constant.TAB_BAR_COLOR,
    dotSize = _constant.SIZE_DOT,
    barHeight = _constant.TAB_BAR_HEIGHT,
    dotColor = _constant.TAB_BAR_COLOR,
    titleShown = false,
    barWidth
  } = props; // variables

  const {
    routes,
    index: navigationIndex,
    key: navigationKey
  } = (0, _react.useMemo)(() => {
    return state;
  }, [state]); // reanimated

  const selectedIndex = (0, _reactNativeReanimated.useSharedValue)(0); // callbacks

  const getRouteTitle = (0, _react.useCallback)(route => {
    const {
      options
    } = descriptors[route.key]; // eslint-disable-next-line no-nested-ternary

    return options.tabBarLabel !== undefined && typeof options.tabBarLabel === 'string' ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
  }, [descriptors]);
  const getRouteTabConfigs = (0, _react.useCallback)(route => {
    return tabs[route.name];
  }, [tabs]);
  const getRoutes = (0, _react.useCallback)(() => {
    return routes.map(route => ({
      key: route.key,
      title: getRouteTitle(route),
      ...getRouteTabConfigs(route)
    }));
  }, [routes, getRouteTitle, getRouteTabConfigs]);
  const handleSelectedIndexChange = (0, _react.useCallback)(index => {
    const {
      key,
      name
    } = routes[index];
    const event = navigation.emit({
      type: 'tabPress',
      target: key,
      canPreventDefault: true
    });

    if (!event.defaultPrevented) {
      navigation.dispatch({ ..._native.CommonActions.navigate(name),
        target: navigationKey
      });
    }
  }, [routes, navigation, navigationKey]); // effects

  (0, _react.useEffect)(() => {
    selectedIndex.value = navigationIndex; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigationIndex]);
  (0, _reactNativeReanimated.useAnimatedReaction)(() => selectedIndex.value, (nextSelected, prevSelected) => {
    if (nextSelected !== prevSelected) {
      (0, _reactNativeReanimated.runOnJS)(handleSelectedIndexChange)(nextSelected);
    }
  }, [selectedIndex, handleSelectedIndexChange]); // render

  return /*#__PURE__*/_react.default.createElement(_CurvedTabBar.CurvedTabBar, {
    isRtl: _reactNative.I18nManager.isRTL,
    barWidth: barWidth,
    titleShown: titleShown,
    dotColor: dotColor,
    barHeight: barHeight,
    dotSize: dotSize,
    tabBarColor: barColor,
    selectedIndex: selectedIndex,
    navigationIndex: navigationIndex,
    routes: getRoutes(),
    duration: duration
  });
};

const AnimatedTabBar = /*#__PURE__*/(0, _react.memo)(AnimatedTabBarComponent, _reactFastCompare.default);
exports.AnimatedTabBar = AnimatedTabBar;
//# sourceMappingURL=AnimatedTabBar.js.map