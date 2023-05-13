function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useCallback, useMemo } from 'react';
import isEqual from 'react-fast-compare';
import { View } from 'react-native';
import Animated, { useAnimatedProps, useDerivedValue } from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { sharedEq, sharedTiming, useInterpolate, withSharedTransition } from '../AnimatedHelper';
import { RNShadow } from '../RNShadow';
import { HEIGHT_HOLE, TAB_BAR_HEIGHT } from './constant';
import { ButtonTab } from './item/ButtonTabItem';
import { Dot } from './item/Dot';
import { styles } from './style';
const AnimatedPath = Animated.createAnimatedComponent(Path);

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
    barHeight = TAB_BAR_HEIGHT
  } = props; // state

  const {
    bottom
  } = useSafeAreaInsets();
  const {
    width
  } = useSafeAreaFrame();
  const actualBarWidth = useMemo(() => barWidth || width, [barWidth, width]);
  const widthTab = useMemo(() => actualBarWidth / routes.length, [routes, actualBarWidth]);
  const inputRange = useMemo(() => isRtl ? routes.map((_, index) => index).reverse() : routes.map((_, index) => index), [isRtl, routes]);
  const outputRange = useMemo(() => routes.map((_, index) => index / routes.length * actualBarWidth), [routes, actualBarWidth]);
  const actualBarHeight = useMemo(() => barHeight + bottom, [barHeight, bottom]);
  const indexAnimated = useDerivedValue(() => sharedTiming(selectedIndex.value, {
    duration
  })); // func

  const renderButtonTab = useCallback(({
    key,
    title,
    ...configs
  }, index) => {
    return /*#__PURE__*/React.createElement(ButtonTab, _extends({
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

  const progress = withSharedTransition(sharedEq(selectedIndex, indexAnimated));
  const xPath = useInterpolate(indexAnimated, inputRange, outputRange); // path

  const pathProps = useAnimatedProps(() => {
    const centerHoleX = xPath.value + widthTab / 2;
    return {
      d: `M0,0 L${centerHoleX - SIZE_DOT},0
      C${centerHoleX - SIZE_DOT * 0.5},0 ${centerHoleX - SIZE_DOT * 0.75},${HEIGHT_HOLE} ${centerHoleX},${HEIGHT_HOLE} 
      C${centerHoleX + SIZE_DOT * 0.75},${HEIGHT_HOLE} ${centerHoleX + SIZE_DOT * 0.5},0 ${centerHoleX + SIZE_DOT} 0 
      L${actualBarWidth * 2},0 L ${actualBarWidth * 2},${actualBarHeight} L 0,${actualBarHeight} Z
      `
    };
  }, [actualBarWidth, widthTab, SIZE_DOT, actualBarHeight]); // style

  const containerStyle = useMemo(() => [{
    height: actualBarHeight,
    width: actualBarWidth
  }], [actualBarHeight, actualBarWidth]);
  const rowTab = useMemo(() => [{
    width: actualBarWidth,
    height: actualBarHeight
  }], [actualBarHeight, actualBarWidth]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RNShadow, {
    style: [styles.container, containerStyle]
  }, /*#__PURE__*/React.createElement(Svg, {
    width: actualBarWidth,
    height: actualBarHeight,
    style: [styles.svg]
  }, /*#__PURE__*/React.createElement(AnimatedPath, {
    animatedProps: pathProps,
    translateY: 3,
    fill: tabBarColor,
    stroke: 'transparent',
    strokeWidth: 0
  }))), /*#__PURE__*/React.createElement(View, {
    style: [styles.rowTab, rowTab]
  }, /*#__PURE__*/React.createElement(Dot, {
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

export const CurvedTabBar = /*#__PURE__*/memo(CurvedTabBarComponent, isEqual);
//# sourceMappingURL=CurvedTabBar.js.map