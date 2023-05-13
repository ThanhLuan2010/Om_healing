import { Text } from "@components";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function GradientSwitch(props) {
  const margin = useRef(new Animated.Value(0)).current;
  const { isOn } = props;
  const { onPress = () => {} } = props;
  useEffect(() => {
    if (isOn) {
      onToggle(false);
    } else {
      offToggle(false);
    }
  }, [isOn]);

  const onToggle = (isPress = true) => {
    const { width = 78, height = 20 } = props;
    // Will change fadeAnim value to 1 in 5 secondsß
    Animated.timing(margin, {
      toValue: width / 2,
      duration: 300,
    }).start();
  };

  const offToggle = (isPress = true) => {
    // onPress();
    Animated.timing(margin, {
      toValue: 0,
      duration: 300,
    }).start();
  };

  const onTogglePress = () => {
    onPress();
  };

  const corlorOn = ["#48DA5F", "#18A42E"];
  const colorOff = ["#081F36", "gray"];
  const { width = 68, height = 30, style } = props;
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={corlorOn}
      style={[styles.onToggle, style, { width: width, height: height }]}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={!isOn ? colorOff : ["transparent", "transparent"]}
        // eslint-disable-next-line react-native/no-inline-styles
        style={[styles.offToggle, { width: isOn ? width : "97%" }]}
      >
        <Pressable onPress={onTogglePress}>
          {isOn && <Text style={styles.onTitle}>Bật</Text>}
          <Animated.View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              height: height / 1.5,
              width: height / 1.5,
              borderRadius: 10,
              marginLeft: margin,
              backgroundColor: "white",
            }}
          />
           {!isOn && <Text style={styles.offTitle}>Tắt</Text>}
        </Pressable>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  onToggle: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  offToggle: {
    borderRadius: 20,
    height: "95%",
    justifyContent: "center",
    paddingLeft: 2,
  },
  onTitle: {
    position: "absolute",
    left: 5,
    bottom: -2,
    color: "white",
  },
  offTitle: {
    position: "absolute",
    right: 7,
    bottom: -2,
    color: "white",
  },
});
