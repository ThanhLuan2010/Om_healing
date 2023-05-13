import { icons } from "@assets";
import { Block, Text } from "@components";
import { theme } from "@theme";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View);

const CheckBox = ({ style, onChange, isCheck }) => {
  const [isChecked, setIsChecked] = useState(isCheck || false);
  return (
    <Pressable
      onPress={() => {
        setIsChecked(!isChecked);
        onChange(!isChecked);
      }}
      style={[styles.CheckBox, style]}
    >
      {isChecked && <Block style={[styles.iconCheck, style]} />}
    </Pressable>
  );
};

export default CheckBox;
