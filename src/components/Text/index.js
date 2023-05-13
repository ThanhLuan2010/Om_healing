import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {isNumber} from 'lodash';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {handleMargin, handlePadding} from '../shared';

const Typography = ({
  flex,
  flexShrink,
  flexGrow,
  size = 16,
  color = 'black',
  center,
  right,
  left,
  justify,
  padding,
  margin,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  paddingVertical,
  paddingHorizontal,
  marginVertical,
  marginHorizontal,
  style,
  fontType,
  lineHeight,
  animated,
  customFont = 'regular',
  textDecorationLine,
  children,
  numberOfLines,
  fontFamily = theme.fonts.fontFamily.SourceSans3Regular,
  ...textProps
}) => {
  const textStyle = [
    flex && {flex: 1},
    flexShrink && {flexShrink: 1},
    flexGrow && {flexGrow: 1},
    {fontWeight: theme.fonts.fontWeight[fontType]},
    {color: theme.colors[color] || color},
    center && {textAlign: 'center'},
    right && {textAlign: 'right'},
    left && {textAlign: 'left'},
    justify && {textAlign: 'justify'},
    padding && {...handlePadding(getSize.m(padding))},
    margin && {...handleMargin(getSize.m(margin))},
    paddingTop && {paddingTop: getSize.m(paddingTop)},
    paddingRight && {paddingRight: getSize.m(paddingRight)},
    paddingBottom && {paddingBottom: getSize.m(paddingBottom)},
    paddingLeft && {paddingLeft: getSize.m(paddingLeft)},
    marginBottom && {marginBottom: getSize.m(marginBottom)},
    marginTop && {marginTop: getSize.m(marginTop)},
    marginRight && {marginRight: getSize.m(marginRight)},
    marginLeft && {marginLeft: getSize.m(marginLeft)},
    paddingHorizontal && {paddingHorizontal: getSize.m(paddingHorizontal)},
    paddingVertical && {paddingVertical: getSize.m(paddingVertical)},
    marginHorizontal && {marginHorizontal: getSize.m(marginHorizontal)},
    marginVertical && {marginVertical: getSize.m(marginVertical)},
    isNumber(lineHeight) && {lineHeight: getSize.m(lineHeight)},
    {fontSize: getSize.m(size)},
    {fontFamily:fontFamily},
    textDecorationLine && {textDecorationLine},
    {...StyleSheet.flatten(style)},
  ];

  return (
    <Text style={textStyle} {...textProps} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export default Typography;
