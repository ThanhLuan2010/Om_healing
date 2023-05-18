import { icons, images } from "@assets";
import { Block, Button, GradientButton, Text } from "@components";
import { goBack, navigate } from "@navigation/RootNavigation";
import auth from "@react-native-firebase/auth";
import { theme } from "@theme";
import { setLoading } from "@utils/navigator";
import { width } from "@utils/responsive";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen({ navigation }) {
  useEffect(() => {}, []);
  const [security, setSecurity] = useState(true);
  const [securityRePass, setSecurityRepass] = useState(true);
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [rePassword, setrePassword] = useState("");
  const { top } = useSafeAreaInsets();

  const onRegister = async () => {
    if (rePassword !== password) {
      showMessage({
        message: "Thành công",
        type: "warning",
        description: "Xác nhận mật khẩu không khớp",
      });
    }
    if (password && rePassword && phone && password === rePassword) {
      setLoading(true);
      const fullPhone = `+84${phone?.replace("0", "")}`;
      const confirmation = await auth().signInWithPhoneNumber(fullPhone);
      setLoading(false);
      navigate("OtpScreen", {
        confirmation: confirmation,
        phone: phone,
        password: password,
        rePassword: rePassword,
      });
    }
  };

  return (
    <ImageBackground
      source={images.bg_container}
      style={styles.bg_container}
      resizeMode="cover"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="padding">
          <Block
            marginBottom={30}
            style={{ flex: 2 }}
            justifyCenter
            alignCenter
          >
            <Image source={images.logo_text} style={styles.logo} />
            <Text
              size={24}
              fontType={"bold"}
              color={theme.colors.color_register}
            >
              Đăng ký
            </Text>
          </Block>
          <Block marginHorizontal={20} style={{ flex: 3 }}>
            <Block flex space={"between"}>
              <Block marginBottom={30}>
                <Block row alignCenter marginBottom={20}>
                  <Image source={icons.ic_phone} style={styles.ic_phone} />
                  <Text size={18} color={theme.colors.black} marginLeft={14}>
                    Số điện thoại
                  </Text>
                </Block>
                <Block
                  alignCenter
                  row
                  borderBottomWidth={1}
                  borderColor={theme.colors.black}
                  paddingBottom={10}
                >
                  <Text color={theme.colors.black}>(84+)</Text>
                  <Block
                    marginHorizontal={8}
                    height={24}
                    width={1}
                    backgroundColor={theme.colors.black}
                  />
                  <TextInput
                    value={phone}
                    onChangeText={(txt) => setphone(txt)}
                    keyboardType="numeric"
                    style={styles.inputNumber}
                  />
                </Block>
              </Block>

              <Block marginBottom={30}>
                <Block row alignCenter marginBottom={20}>
                  <Image source={icons.ic_key} style={styles.ic_phone} />
                  <Text marginLeft={14} size={18} color={theme.colors.black}>
                    Mật khẩu
                  </Text>
                </Block>
                <Block
                  alignCenter
                  row
                  borderBottomWidth={1}
                  borderColor={theme.colors.black}
                >
                  <TextInput
                    secureTextEntry={security}
                    style={styles.inputNumber}
                    value={password}
                    onChangeText={(txt) => setpassword(txt)}
                  />
                  <TouchableOpacity onPress={() => setSecurity(!security)}>
                    <Image
                      style={styles.ic_eye}
                      source={security ? icons.ic_closeEye : icons.ic_openEye}
                    />
                  </TouchableOpacity>
                </Block>
              </Block>

              <Block marginBottom={30}>
                <Block row alignCenter marginBottom={20}>
                  <Image source={icons.ic_key} style={styles.ic_phone} />
                  <Text marginLeft={14} size={18} color={theme.colors.black}>
                    Nhập lại mật khẩu
                  </Text>
                </Block>
                <Block
                  alignCenter
                  row
                  borderBottomWidth={1}
                  borderColor={theme.colors.black}
                >
                  <TextInput
                    secureTextEntry={securityRePass}
                    style={styles.inputNumber}
                    value={rePassword}
                    onChangeText={(txt) => setrePassword(txt)}
                  />
                  <TouchableOpacity
                    onPress={() => setSecurityRepass(!securityRePass)}
                  >
                    <Image
                      style={styles.ic_eye}
                      source={
                        securityRePass ? icons.ic_closeEye : icons.ic_openEye
                      }
                    />
                  </TouchableOpacity>
                </Block>
              </Block>
            </Block>

            <Block marginTop={20} marginBottom={40} justifyCenter>
              <GradientButton
                colors={theme.colors.gradient_red}
                title="Đăng Ký"
                style={styles.button}
                styleTitle={styles.titleButton}
                onPress={onRegister}
                disable={phone && password && rePassword ? false : true}
              />
              <Pressable style={styles.btnRegister} onPress={() => goBack()}>
                <Text
                  fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
                  size={18}
                  color={theme.colors.color_register}
                  center
                >
                  Quay lại
                </Text>
              </Pressable>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg_container: {
    flex: 1,
  },
  logo: {
    width: width - 46 * 2,
    resizeMode: "contain",
    marginTop: 170,
    marginBottom: 55,
  },
  ic_phone: {
    width: 23,
    height: 23,
    resizeMode: "contain",
    tintColor: theme.colors.black,
  },
  inputNumber: {
    flex: 1,
    fontSize: 18,
    color: theme.colors.black,
    fontFamily: theme.fonts.fontFamily.SourceSans3Bold,
    paddingVertical: 0,
  },
  checkBox: {
    width: 27,
    height: 27,
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
  button: {
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 7,
  },
  btnRegister: {
    marginTop: 15,
    alignSelf: "center",
  },
  titleButton: {
    fontSize: 18,
  },
  ic_eye: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: theme.colors.black,
  },
});
