import { icons, images } from "@assets";
import { Block, GradientButton, Text } from "@components";
import { goBack, navigate } from "@navigation/RootNavigation";
import auth from "@react-native-firebase/auth";
import { theme } from "@theme";
import { setLoading } from "@utils/navigator";
import { width } from "@utils/responsive";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
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
    <ImageBackground source={images.login} style={styles.login}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="padding">
          <Block
            marginBottom={30}
            style={{ flex: 2 }}
            justifyCenter
            alignCenter
          >
            <Image source={images.logo} style={styles.logo} />
            <Text
              marginTop={32}
              size={24}
              fontType={"bold"}
              color={theme.colors.redesign}
            >
              Đăng ký
            </Text>
          </Block>
          <Block marginHorizontal={20} style={{ flex: 3 }}>
            <Block flex space={"between"}>
              <Block marginBottom={30}>
                <Block row alignCenter marginBottom={20}>
                  <Image source={images.ic_phone} style={styles.ic_phone} />
                  <Text size={18} color={theme.colors.black} marginLeft={14}>
                    Số điện thoại
                  </Text>
                </Block>
                <Block
                  alignCenter
                  row
                  borderBottomWidth={1}
                  borderColor={theme.colors.gray2}
                  paddingBottom={10}
                >
                  <Text color={theme.colors.gray2}>(84+)</Text>
                  <Block
                    marginHorizontal={8}
                    height={24}
                    width={1}
                    backgroundColor={theme.colors.gray2}
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
                  <Image source={images.ic_key} style={styles.ic_phone} />
                  <Text marginLeft={14} size={18} color={theme.colors.black}>
                    Mật khẩu
                  </Text>
                </Block>
                <Block
                  alignCenter
                  row
                  borderBottomWidth={1}
                  borderColor={theme.colors.gray2}
                >
                  <TextInput
                    secureTextEntry={security}
                    style={styles.inputNumber}
                    value={password}
                    onChangeText={(txt) => setpassword(txt)}
                  />
                  <TouchableOpacity onPress={() => setSecurity(!security)}>
                    <Image
                      source={security ? icons.ic_closeEye : icons.ic_openEye}
                    />
                  </TouchableOpacity>
                </Block>
              </Block>

              <Block marginBottom={30}>
                <Block row alignCenter marginBottom={20}>
                  <Image source={images.ic_key} style={styles.ic_phone} />
                  <Text marginLeft={14} size={18} color={theme.colors.black}>
                    Nhập lại mật khẩu
                  </Text>
                </Block>
                <Block
                  alignCenter
                  row
                  borderBottomWidth={1}
                  borderColor={theme.colors.gray2}
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
                title="Đăng Ký"
                style={{
                  backgroundColor: theme.colors.redesign,
                  borderRadius: 10,
                  alignItems: "center",
                }}
                styleTitle={styles.titleButton}
                onPress={onRegister}
                disable={phone && password && rePassword ? false : true}
              />
              <Pressable style={styles.btnRegister} onPress={() => goBack()}>
                <Text size={18} color={theme.colors.redesign} center>
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
  backgroundColor: {
    flex: 1,
  },
  logo: {
    width: width - 46 * 2,
    height: 200,
    resizeMode: "contain",
  },
  ic_phone: {
    width: 19,
    height: 19,
    resizeMode: "contain",
  },
  inputNumber: {
    flex: 1,
    fontSize: 18,
    color: theme.colors.black,
    fontFamily: theme.fonts.fontFamily.SourceSans3Regular,
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
});
