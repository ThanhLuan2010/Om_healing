/* eslint-disable react-native/no-inline-styles */
import {Block, Text} from '@components';
import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import styles from './styles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Button = ({
  title,
  onPress,
  style,
  titleStyle,
  backgroundColor,
  disabled,
  rightIcon,
}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Block
        style={{
          ...styles.container,
          opacity: disabled ? 0.7 : 1,
          backgroundColor: backgroundColor
            ? backgroundColor
            : theme.colors.primaryColor,
          ...style,
        }}>
        {disabled ? (
          <UIActivityIndicator size={getSize.s(20)} color="white" />
        ) : (
          <Text
            fontType="semibold"
            color={theme.colors.white || theme.colors.white}
            style={titleStyle}>
            {title}
          </Text>
        )}
        {rightIcon && rightIcon()}
      </Block>
    </TouchableOpacity>
  );
};

export default Button;
