import { icons, images } from "@assets";
import { Block, GradientButton, Text } from "@components";
import { theme } from "@theme";
import React, { useState } from "react";
import { Image, Pressable, TextInput } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";

const ForgotPassword = (props) => {
  const { top } = useSafeAreaInsets();
  const [phone, setphone] = useState("");
  return (
    <LinearGradient
      colors={theme.colors.backgroundColor}
      style={[styles.backgroundColor, { paddingTop: top + 20 }]}
    >
      <Block alignCenter marginBottom={30}>
        <Image source={images.logo} style={styles.logo} />
        <Text
          size={24}
          marginTop={42}
          color={theme.colors.white}
          fontType={"bold"}
        >
          Cấp lại mật khẩu
        </Text>
      </Block>
      <Block row alignCenter marginHorizontal={20} marginBottom={20}>
        <Image source={icons.ic_phone} />
        <Text color={theme.colors.white} size={18} marginLeft={14}>
          Số điện thoại
        </Text>
      </Block>
      <Block
        row
        borderBottomWidth={1}
        alignCenter
        marginHorizontal={20}
        borderColor={theme.colors.gray2}
        marginBottom={42}
        paddingBottom={10}
      >
        <Text color={theme.colors.gray2}>(84+)</Text>
        <Block
          height={24}
          width={1}
          backgroundColor={theme.colors.gray2}
          marginHorizontal={8}
        />
        <TextInput
          value={phone}
          onChangeText={(txt) => setphone(txt)}
          keyboardType="numeric"
          style={styles.input}
          maxLength={10}
        />
      </Block>
      <GradientButton
        onPress={async () => {
          const fullPhone = `+84${phone?.replace("0", "")}`;
          const confirmation = await auth().signInWithPhoneNumber(fullPhone);
          props.navigation.navigate("OtpScreen", {
            confirmation: confirmation,
            type: "FOGOT",
            phone: phone,
          });
        }}
        style={styles.button}
        title="Xác nhận"
        styleTitle={styles.styleTitle}
      />
      <Pressable onPress={() => props.navigation.goBack()}>
        <Text
          size={18}
          fontType={"bold"}
          color={theme.colors.white}
          marginTop={15}
          center
        >
          Quay Lại
        </Text>
      </Pressable>
    </LinearGradient>
  );
};

export default ForgotPassword;
