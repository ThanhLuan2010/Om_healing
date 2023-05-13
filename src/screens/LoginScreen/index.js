import { icons, images } from "@assets";
import { Block, CheckBox, GradientButton, Text } from "@components";
import { goBack, navigate } from "@navigation/RootNavigation";
import { theme } from "@theme";
import { showAlert } from "@utils/navigator";
import { width } from "@utils/responsive";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { baseQuery } from "../../api/baseQuery";
import { setAccessToken, setIsLoading } from "../../store/slices/common";
import {
  setIsLoggedIn,
  setIsRemember,
  setPassRemember,
  setPhoneRemember,
  setUserInfo,
  userSelect,
} from "../../store/slices/user";
import messaging from "@react-native-firebase/messaging";

export default function LoginScreen({ navigation }) {
  useEffect(() => {
    dispatch(setIsLoading(false));
  }, []);

  const [security, setSecurity] = useState(true);
  const { isRemember, phoneRemember, passRemember } = useSelector(userSelect);

  const [phone, setphone] = useState(phoneRemember || "");
  const [password, setpassword] = useState(passRemember || "");
  const dispatch = useDispatch();
  const [isCheck, setisCheck] = useState(isRemember || false);
  const { top } = useSafeAreaInsets();

  const getInfo = async () => {
    const response = await baseQuery({
      url: "user/info",
    });
    messaging().subscribeToTopic(`${response.data.user_id}`);
    dispatch(setUserInfo(response.data));
  };

  const onLogin = async () => {
    if (isCheck) {
      dispatch(setIsRemember(true));
      dispatch(setPhoneRemember(phone));
      dispatch(setPassRemember(password));
    } else {
      dispatch(setIsRemember(false));
      dispatch(setPhoneRemember(""));
      dispatch(setPassRemember(""));
    }
    dispatch(setIsLoading(true));
    try {
      const response = await baseQuery({
        url: "auth/login",
        method: "POST",
        body: {
          phone: phone,
          password: password,
        },
      });
      const { data, status, message } = response;
      dispatch(setIsLoading(false));
      if (data && status) {
        dispatch(setAccessToken(data.token));
        getInfo();
        dispatch(setIsLoggedIn(true));
        // dispatch(setUserInfo(data));
        showAlert(
          "Thông báo",
          message || "Đăng nhập thành công",
          "Chấp nhận",
          "",
          () => goBack()
        );
      } else {
        showAlert(
          "Thông báo",
          message || "Đăng nhập thất bại",
          "Chấp nhận",
          "",
          () => goBack()
        );
      }
    } catch (error) {
      showAlert(
        "Thông báo",
        error.toString() || "Đăng nhập thất bại",
        "Chấp nhận",
        "",
        () => goBack()
      );
      dispatch(setIsLoading(false));
    }
  };

  return (
    <LinearGradient
      style={[styles.backgroundColor, { paddingTop: top }]}
      colors={theme.colors.backgroundColor}
    >
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
              color={theme.colors.white}
            >
              Đăng nhập
            </Text>
          </Block>
          <Block marginHorizontal={20} style={{ flex: 3 }}>
            <Block>
              <Block row alignCenter marginBottom={20}>
                <Image source={icons.ic_phone} style={styles.ic_phone} />
                <Text size={18} color={theme.colors.white} marginLeft={14}>
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
              <Block row alignCenter marginTop={30} marginBottom={20}>
                <Image source={icons.ic_key} style={styles.ic_phone} />
                <Text marginLeft={14} size={18} color={theme.colors.white}>
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

              <Block row marginVertical={31} alignCenter>
                <Block row flex alignCenter>
                  <CheckBox
                    isCheck={isCheck}
                    onChange={(isCheck) => {
                      setisCheck(isCheck);
                    }}
                    styleCheck={styles.checkBox}
                  />
                  <Text marginLeft={8} color={theme.colors.white} size={13}>
                    Ghi nhớ đăng nhập
                  </Text>
                </Block>
                <Pressable
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text size={13} color={theme.colors.white}>
                    Quên mật khẩu?
                  </Text>
                </Pressable>
              </Block>
            </Block>
            <Block flex={1} justifyCenter>
              <GradientButton
                title="Đăng Nhập"
                style={styles.button}
                styleTitle={styles.titleButton}
                disable={phone && password ? false : true}
                onPress={onLogin}
              />
              <Pressable
                style={styles.btnRegister}
                onPress={() => navigate("RegisterScreen")}
              >
                <Text size={18} color={theme.colors.white} center>
                  Đăng Kí
                </Text>
              </Pressable>
            </Block>
          </Block>
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
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
    color: theme.colors.white,
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
