import { StyleSheet, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import Block from "@components/Block";

const KeyboardWrap = ({ children }) => {
  const [keyboardHeight, setkeyboardHeight] = useState(0);
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", (e) => {
      setkeyboardHeight(e.endCoordinates.height + 50);
    });

    Keyboard.addListener("keyboardDidHide", () => {
      setkeyboardHeight(0);
    });
  }, []);

  return (
    <Block flex backgroundColor={"transparent"} paddingBottom={keyboardHeight}>
      {children}
    </Block>
  );
};

export default KeyboardWrap;

const styles = StyleSheet.create({});
