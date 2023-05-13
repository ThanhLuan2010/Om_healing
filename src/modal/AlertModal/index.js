import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Block, Text } from "@components";
import { theme } from "@theme";
import { width } from "@utils/responsive";

const AlertModal = (props) => {
  const { title, message, submitTxt, cancleText, onSnubmit, onCancel } =
    props.route.params;
  return (
    <Block justifyCenter alignCenter flex backgroundColor={"rgba(0,0,0,0.5)"}>
      <Block
        paddingHorizontal={15}
        paddingVertical={17}
        radius={19}
        width={width * 0.8}
        borderWidth={1}
        borderColor={"#E99200"}
        backgroundColor={theme.colors.white}
      >
        <Text size={17} marginBottom={17} center fontType="bold">
          {title}
        </Text>
        <Text marginBottom={17} center fontType="bold">
          {message}
        </Text>

        <Block row justifyCenter marginTop={20}>
          {cancleText !== "" && (
            <TouchableOpacity onPress={onCancel} style={styles.Cancelbutton}>
              <Text color={theme.colors.white} size={12} fontType="bold">
                {cancleText}
              </Text>
            </TouchableOpacity>
          )}
          {submitTxt !== "" && (
            <TouchableOpacity onPress={onSnubmit} style={styles.button}>
              <Text color={theme.colors.white} size={12} fontType="bold">
                {submitTxt}
              </Text>
            </TouchableOpacity>
          )}
        </Block>
      </Block>
    </Block>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#19AE67",
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 5,
    width: width / 4,
    alignItems: "center",
  },
  Cancelbutton: {
    backgroundColor: "#F04444",
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 5,
    width: width / 4,
    alignItems: "center",
    marginRight: 10,
  },
});
