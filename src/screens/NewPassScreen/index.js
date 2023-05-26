import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Block, GradientButton, Text } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { theme } from "@theme";
import { icons, images } from "@assets";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { height, width } from "@utils/responsive";
import { baseQuery } from "@api/baseQuery";
import { setLoading } from "@utils/navigator";
import { showMessage } from "react-native-flash-message";
import { goBack, reset } from "@navigation/RootNavigation";

const NewPassScreen = (props) => {
  const [security, setSecurity] = useState(false);
  const [security_2, setSecurity_2] = useState(false);
  const { top } = useSafeAreaInsets();
  const [pass, setpass] = useState("");
  const [Repass, setRepass] = useState("");
  const [keyboardHeight, setkeyboardHeight] = useState(0);
  const onCreateNewPass = async () => {
    setLoading(true);
    const response = await baseQuery({
      url: "auth/forgot-password",
      method: "POST",
      body: {
        phone: props.route.params.phone,
        password: pass,
        re_password: Repass,
      },
    });
    setLoading(false);
    const { message, status } = response;
    if (status) {
      showMessage({
        message: "Thành công",
        type: "success",
        description: message || "Đã đặt lại mật khẩu",
      });
      reset(0, "LoginScreen");
    } else {
      showMessage({
        message: "Thất bại",
        type: "warning",
        description: message || "Đã có lỗi sảy ra, vui lòng thử lại sau",
      });
    }
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", (e) => {
      setkeyboardHeight(e.endCoordinates.height + 50);
    });

    Keyboard.addListener("keyboardDidHide", () => {
      setkeyboardHeight(0);
    });
  }, []);

  return (
    <ImageBackground source={images.bg_container} style={styles.bg_container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Block
          height={height + keyboardHeight}
          paddingBottom={keyboardHeight}
          flex
        >
          <Block flex={1} />
          <Block bottom={40} alignCenter>
            <Image source={images.logo_text} style={styles.logo} />
            <Text
              marginTop={40}
              size={24}
              fontType={"bold"}
              color={theme.colors.color_register}
            >
              Nhập mật khẩu mới
            </Text>
          </Block>
          <Block marginTop={30} flex={1} marginHorizontal={20}>
            <Block row alignCenter marginBottom={20}>
              <Image source={icons.ic_key} style={styles.ic_key} />
              <Text
                fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
                marginLeft={11}
                color={theme.colors.black}
                size={18}
              >
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
                value={pass}
                onChangeText={(txt) => setpass(txt)}
                secureTextEntry={security}
                style={styles.inputNumber}
              />
              <TouchableOpacity onPress={() => setSecurity(!security)}>
                <Image
                  style={styles.ic_eye}
                  source={security ? icons.ic_closeEye : icons.ic_openEye}
                />
              </TouchableOpacity>
            </Block>
            <Block marginBottom={20} row alignCenter marginTop={30}>
              <Image source={icons.ic_key} style={styles.ic_key} />
              <Text
                fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
                marginLeft={11}
                color={theme.colors.black}
                size={18}
              >
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
                value={Repass}
                onChangeText={(txt) => setRepass(txt)}
                secureTextEntry={security_2}
                style={styles.inputNumber}
              />
              <TouchableOpacity onPress={() => setSecurity_2(!security_2)}>
                <Image
                  style={styles.ic_eye}
                  source={security_2 ? icons.ic_closeEye : icons.ic_openEye}
                />
              </TouchableOpacity>
            </Block>
          </Block>
          <Block flex justifyEnd>
            <GradientButton
              title="Lưu mật khẩu"
              onPress={onCreateNewPass}
              disable={pass && Repass ? false : true}
              style={[styles.titleButton]}
              styleTitle={styles.titleButtonSave}
              colors={theme.colors.gradient_red}
            />
          </Block>
        </Block>
      </ScrollView>
    </ImageBackground>
  );
};

export default NewPassScreen;

const styles = StyleSheet.create({
  inputNumber: {
    flex: 1,
    fontSize: 18,
    color: theme.colors.black,
    fontWeight: "bold",
    height: 41,
  },
  titleButton: {
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 7,
    marginBottom: 40,
    marginHorizontal: 20,
  },
  logo: {
    width: width - 46 * 2,
    resizeMode: "contain",
    marginBottom: 40,
  },
  container: { flex: 1 },
  titleButtonSave: {
    fontSize: 18,
  },
  ic_key: {
    tintColor: theme.colors.black,
    width: 24,
    height: 24,
  },
  ic_eye: {
    tintColor: theme.colors.black,
  },
  bg_container: {
    flex: 1,
  },
});
