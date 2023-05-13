import { theme } from "@theme";
import { getSize } from "@utils/responsive";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Block from "../Block";
import Text from "../Text";
import styles from "./styles";
import { Shadow } from "react-native-neomorph-shadows";


const InputText = ({ ...props }) => {
  const {
    ref,
    label,
    labelStyle,
    containerInputStyle,
    fontType = theme.fonts.fontFamily.BeVietnamPro,
    color,
    size,
    isSecure,
    rightIcon,
    leftIcon,
    maxHeight,
    maxLength,
    inputStyle,
    errorText,
    isError,
    disabled,
    errorContainerStyle,
    isRequired,
    value,
    onChangeText,
    onSubmitEditing,
    numberOfLines,
    multiline,
    ...inputProps
  } = props;
  const [secureEye, setSecureEye] = useState(true);

  const textStyle = [
    styles.resetStyles,
    fontType && {
      fontFamily: theme.fonts.fontFamily[fontType],
    },
    !fontType && { fontFamily: theme.fonts.fontFamily.regular },
    color && { color: theme.colors[color] },
    color && !theme.colors[color] && { color: color },
    !color && { color: theme.colors.text },
    styles.defaultStyles,
    (rightIcon || isSecure) && { paddingRight: getSize.m(50) },
    props.multiline && maxHeight
      ? { maxHeight }
      : { height: getSize.m(21) * 2 },
    leftIcon && { paddingLeft: getSize.m(38) },
    { fontSize: getSize.m(size ? size : 14) },
    { ...StyleSheet.flatten(inputProps.style) },
  ];

  // const _renderSecureIcon = () => {
  //   return (
  //     <TouchableOpacity
  //       style={styles.rightIcon}
  //       hitSlop={{ left: 5, right: 5, bottom: 5, top: 5 }}
  //       onPress={() => setSecureEye(!secureEye)}
  //     >
  //       <FontAwesomeIcon
  //         name={secureEye ? "eye" : "eye-slash"}
  //         color={theme.colors.text}
  //         size={getSize.m(12)}
  //       />
  //     </TouchableOpacity>
  //   );
  // };

  const _renderLabel = () => (
    <Text marginBottom={5} style={labelStyle}>
      {label}
      {isRequired && <Text color={theme.colors.red}> {"\u002A"}</Text>}
    </Text>
  );

  const _renderInput = () => {
    return (
      <TextInput
        ref={ref}
        autoCorrect={false}
        textAlignVertical={props.multiline ? "top" : "center"}
        placeholder={!isEmpty(label) && leftIcon ? props.placeholder : ""}
        placeholderTextColor={theme.colors.placeholder}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        secureTextEntry={secureEye && isSecure}
        maxLength={maxLength}
        onChangeText={(text) => onChangeText(text)}
        onSubmitEditing={onSubmitEditing}
        style={textStyle}
        value={value}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={!disabled}
        {...inputProps}
      />
    );
  };

  return (
    // <Block flexShrink style={containerInputStyle}>
    //   {!isEmpty(label) && _renderLabel()}
    //   <Block
    //     style={[
    //       styles.inputContainer,
    //       {
    //         borderColor: isError ? theme.colors.red : theme.colors.lightGray,
    //       },
    //       StyleSheet.flatten(inputStyle),
    //     ]}
    //   >
    //     {leftIcon && (
    //       <Image
    //         source={leftIcon}
    //         resizeMode="contain"
    //         style={{
    //           ...styles.leftIcon,
    //           tintColor: isError ? theme.colors.red : theme.colors.placeholder,
    //         }}
    //       />
    //     )}
    //     {_renderInput()}
    //     {isSecure ? _renderSecureIcon() : rightIcon && rightIcon()}
    //   </Block>
    //   {isError && Boolean(errorText) && _renderError()}
    // </Block>
    <Shadow
      inner // <- enable inner shadow
      useArt // <- set this prop to use non-native shadow on ios
      style={[styles.shadow, containerInputStyle]}
    >
      {_renderInput()}
      
    </Shadow>
  );
};

export default InputText;
