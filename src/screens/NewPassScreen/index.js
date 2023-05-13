import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Block, GradientButton, Text } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { theme } from "@theme";
import { icons, images } from "@assets";
const NewPassScreen = (props) => {
  const [security, setSecurity] = useState(false);
  const [security_2, setSecurity_2] = useState(false);
  return (
    <LinearGradient
      colors={theme.colors.backgroundColor}
      style={styles.container}
    >
      <Block flex={1} alignCenter marginBottom={30}>
        <Image source={images.logo} style={styles.logo} />
        <Text size={24} fontType={"bold"} color={theme.colors.white}>
          Nhập mật khẩu mới
        </Text>
      </Block>
      <Block flex={1} marginHorizontal={20}>
        <Block row alignCenter marginBottom={20}>
          <Image source={icons.ic_key} />
          <Text marginLeft={11} color={theme.colors.white} size={18}>
            Mật khẩu mới
          </Text>
        </Block>
        <Block
          alignCenter
          row
          borderBottomWidth={1}
          borderColor={theme.colors.gray2}
        >
          <TextInput secureTextEntry={security} style={styles.inputNumber} />
          <TouchableOpacity onPress={() => setSecurity(!security)}>
            <Image source={security ? icons.ic_closeEye : icons.ic_openEye} />
          </TouchableOpacity>
        </Block>
        <Block row alignCenter marginTop={30}>
          <Image source={icons.ic_key} />
          <Text marginLeft={11} color={theme.colors.white} size={18}>
            Nhập lại mật khẩu
          </Text>
        </Block>
        <Block
          alignCenter
          row
          borderBottomWidth={1}
          borderColor={theme.colors.gray2}
        >
          <TextInput secureTextEntry={security_2} style={styles.inputNumber} />
          <TouchableOpacity onPress={() => setSecurity_2(!security_2)}>
            <Image source={security_2 ? icons.ic_closeEye : icons.ic_openEye} />
          </TouchableOpacity>
        </Block>
      </Block>
      <Block justifyEnd flex marginHorizontal={20} marginBottom={47}>
        <GradientButton
          title="Lưu mật khẩu"
          onPress={() => props.navigation.navigate("LoginScreen")}
          style={styles.titleButton}
          styleTitle={styles.titleButtonSave}
        />
      </Block>
    </LinearGradient>
  );
};

export default NewPassScreen;

const styles = StyleSheet.create({
  inputNumber: {
    flex: 1,
    fontSize: 18,
    color: theme.colors.white,
    fontWeight: "bold",
  },
  titleButton: {
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 7,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "center",
  },
  container: { flex: 1 },
  titleButtonSave: {
    fontSize: 18,
  },
});
