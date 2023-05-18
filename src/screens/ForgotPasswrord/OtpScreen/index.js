import { baseQuery } from "@api/baseQuery";
import { images } from "@assets";
import { Block, Text } from "@components";
import { navigate } from "@navigation/RootNavigation";
import { theme } from "@theme";
import { setLoading } from "@utils/navigator";
import { width } from "@utils/responsive";
import React, { useRef, useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const OtpScreen = (props) => {
  const otpRef = useRef();
  const { top } = useSafeAreaInsets();
  const [isFocused, setIsFocused] = useState({
    number_1: false,
    number_2: false,
    number_3: false,
    number_4: false,
    number_5: false,
    number_6: false,
  });

  const handleInputFocus = (textinput) => {
    setIsFocused({
      [textinput]: true,
    });
  };
  const handleInputBlur = (textinput) => {
    setIsFocused({
      [textinput]: false,
    });
  };

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixthInput = useRef();

  const [input_1, setInput_1] = React.useState();
  const [input_2, setInput_2] = React.useState();
  const [input_3, setInput_3] = React.useState();
  const [input_4, setInput_4] = React.useState();
  const [input_5, setInput_5] = React.useState();
  const [input_6, setInput_6] = React.useState();
  const [time, setTime] = React.useState(60);
  const timerRef = React.useRef(time);
  setLoading(false);

  const resend = () => {
    setTime(60);
  };

  React.useEffect(() => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef.current < 0) {
        clearInterval(timerId);
      } else {
        setTime(timerRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  const onRegister = async () => {
    const type = props.route.params?.type;
    if (type === "FOGOT") {
      navigate("NewPassScreen", { phone: props.route.params.phone });
    } else {
      const response = await baseQuery({
        url: "auth/register",
        body: {
          phone: props.route.params.phone,
          password: props.route.params.password,
          re_password: props.route.params.rePassword,
        },
        method: "POST",
      });
      const { status, message, data } = response;
      setLoading(false);
      if (status) {
        showMessage({
          message: "Thành công",
          type: "success",
          description: message || "Đăng ký thành công",
        });
        () => navigate("LoginScreen");
      } else {
        showMessage({
          message: "Thất bại",
          type: "warning",
          description: message || "Đăng ký thất bại",
        });
      }
    }
  };
  const confirmOTP = async (code) => {
    try {
      setLoading(true);
      const phoneConfirmation = props.route.params?.confirmation;
      await phoneConfirmation.confirm(code);
      onRegister();
    } catch (error) {
      console.log("========err=======", error);
      if (error && error.error === "DUPLICATED_USER") {
        onRegister();
      } else {
        setLoading(false);
        showMessage({
          message: "Thất bại",
          type: "warning",
          description: "OTP không đúng",
        });
      }
    }
  };
  return (
    <ImageBackground source={images.bg_fake} style={{ flex: 1 }}>
      <Block paddingBottom={50} />
      <Block marginHorizontal={20}>
        <Text
          size={18}
          color={theme.colors.black}
          fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
        >
          Vui lòng nhập mã OTP xác nhận vừa được gửi vào số điện thoại bạn đã
          đăng ký.
        </Text>

        <Block row alignCenter space={"between"} marginVertical={24}>
          <Block style={styles.inputOtp}>
            <TextInput
              style={[styles.inputs, isFocused.number_1]}
              onFocus={() => handleInputFocus("number_1")}
              onBlur={() => handleInputBlur("number_1")}
              keyboardType="number-pad"
              maxLength={1}
              ref={firstInput}
              onChangeText={(text) => {
                setInput_1(text);
                text ? secondInput.current.focus() : firstInput.current.focus();
                // secondInput.current.focus();
              }}
            />
          </Block>
          <Block style={styles.inputOtp}>
            <TextInput
              style={[styles.inputs, isFocused.number_2]}
              onFocus={() => handleInputFocus("number_2")}
              onBlur={() => handleInputBlur("number_2")}
              keyboardType="number-pad"
              maxLength={1}
              ref={secondInput}
              onChangeText={(text) => {
                setInput_2(text);
                text ? thirdInput.current.focus() : firstInput.current.focus();
              }}
            />
          </Block>

          <Block style={styles.inputOtp}>
            <TextInput
              style={[styles.inputs, isFocused.number_3]}
              onFocus={() => handleInputFocus("number_3")}
              onBlur={() => handleInputBlur("number_3")}
              keyboardType="number-pad"
              maxLength={1}
              ref={thirdInput}
              onChangeText={(text) => {
                setInput_3(text);
                text
                  ? fourthInput.current.focus()
                  : secondInput.current.focus();
              }}
            />
          </Block>
          <Block style={styles.inputOtp}>
            <TextInput
              style={[styles.inputs, isFocused.number_4]}
              onFocus={() => handleInputFocus("number_4")}
              onBlur={() => handleInputBlur("number_4")}
              keyboardType="number-pad"
              maxLength={1}
              ref={fourthInput}
              onChangeText={(text) => {
                setInput_4(text);
                text ? fifthInput.current.focus() : thirdInput.current.focus();
              }}
            />
          </Block>
          <Block style={styles.inputOtp}>
            <TextInput
              style={[styles.inputs, isFocused.number_5]}
              onFocus={() => handleInputFocus("number_4")}
              onBlur={() => handleInputBlur("number_4")}
              keyboardType="number-pad"
              maxLength={1}
              ref={fifthInput}
              onChangeText={(text) => {
                setInput_5(text);
                text ? sixthInput.current.focus() : fourthInput.current.focus();
              }}
            />
          </Block>
          <Block style={styles.inputOtp}>
            <TextInput
              style={[styles.inputs, isFocused.number_6]}
              onFocus={() => handleInputFocus("number_4")}
              onBlur={() => handleInputBlur("number_4")}
              keyboardType="number-pad"
              maxLength={1}
              ref={sixthInput}
              onChangeText={(text) => {
                setInput_6(text);
                text
                  ? // ? props.navigation.navigate("NewPassScreen")
                    confirmOTP(
                      `${input_1}${input_2}${input_3}${input_4}${input_5}${text}`
                    )
                  : fifthInput.current.focus();
              }}
            />
          </Block>
        </Block>
        {time > 0 ? (
          <Text
            fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
            color={theme.colors.color_time}
            center
            marginBottom={33}
            size={16}
          >
            Thời gian còn lại:
            {time} giây
          </Text>
        ) : (
          <Pressable onPress={resend}>
            <Text
              style={styles.underLine}
              size={18}
              color={theme.colors.white}
              center
            >
              Gửi lại OTP
            </Text>
          </Pressable>
        )}
        <Pressable onPress={() => props.navigation.goBack()}>
          <Text
            color={theme.colors.color_register}
            size={18}
            fontType={"bold"}
            center
            marginTop={30}
          >
            Quay Lại
          </Text>
        </Pressable>
      </Block>

      <Block flex={4} />
    </ImageBackground>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  backgroundColor: {
    flex: 1,
    justifyContent: "center",
  },
  inputs: {
    borderRadius: 2,
    borderColor: theme.colors.gray2,
    textAlign: "center",
    color: theme.colors.black,
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: theme.colors.white,
  },
  center: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  roundedTextInput: {
    borderRadius: 2,
    backgroundColor: theme.colors.white,
  },
  underLine: {
    textDecorationLine: "underline",
  },
  inputOtp: {
    width: (width - 40) / 8,
    height: (width - 40) / 8,
    backgroundColor: "#2E9298",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 10,
  },
});
