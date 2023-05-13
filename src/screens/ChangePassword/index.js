import { baseQuery } from "@api/baseQuery";
import { icons } from "@assets";
import { Block, GradientButton, Header, Text } from "@components";
import { goBack } from "@navigation/RootNavigation";
import { theme } from "@theme";
import { setLoading, showAlert } from "@utils/navigator";
import { getSize } from "@utils/responsive";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

const ChangePasswordScreen = () => {
  const [isShowPass, setisShowPass] = useState(false);
  const [isShowNewPass, setisShowNewPass] = useState(false);
  const [isShowReNewPass, setisShowReNewPass] = useState(false);

  const [pass, setpass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [ReNewPass, setReNewPass] = useState("");

  const onChangePass = async () => {
    setLoading(true);
    const response = await baseQuery({
      url: "auth/change-password",
      method: "POST",
      body: {
        old_password: pass,
        password: newPass,
        re_password: ReNewPass,
      },
    });
    setLoading(false);
    const { status, message } = response;
    if (status) {
      showAlert(
        "Thành công",
        message || "Thay đổi thành công",
        "Xác nhận",
        "",
        () => {
          goBack();
          goBack();
        }
      );
    } else {
      showAlert(
        "Thất bại",
        message || "Cập nhật thất bại",
        "Xác nhận",
        "",
        () => {
          goBack();
        }
      );
    }
  };
  return (
    <Block flex backgroundColor={theme.colors.white}>
      <Header canGoBack title={"Đổi mật khẩu"} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Block paddingHorizontal={20} flex>
          <Block marginTop={30}>
            <Text size={18}>Mật khẩu hiện tại</Text>
            <Block
              borderBottomWidth={1}
              paddingBottom={10}
              borderColor={"#DADADA"}
              marginTop={40}
              row
              alignCenter
            >
              <TextInput
                value={pass}
                onChangeText={(txt) => {
                  setpass(txt);
                }}
                style={styles.input}
                placeholder="Mật khẩu hiện tại"
                secureTextEntry={!isShowPass}
              />
              <TouchableOpacity onPress={() => setisShowPass(!isShowPass)}>
                <Image
                  source={isShowPass ? icons.ic_openEye : icons.ic_closeEye}
                  style={styles.iconEye}
                />
              </TouchableOpacity>
            </Block>
          </Block>

          <Block marginTop={30}>
            <Text size={18}>Mật khẩu mới</Text>
            <Block
              borderBottomWidth={1}
              paddingBottom={10}
              borderColor={"#DADADA"}
              marginTop={40}
              row
              alignCenter
            >
              <TextInput
                value={newPass}
                onChangeText={(txt) => setnewPass(txt)}
                style={styles.input}
                placeholder="Mật khẩu mới"
                secureTextEntry={!isShowNewPass}
              />
              <TouchableOpacity
                onPress={() => setisShowNewPass(!isShowNewPass)}
              >
                <Image
                  source={isShowNewPass ? icons.ic_openEye : icons.ic_closeEye}
                  style={styles.iconEye}
                />
              </TouchableOpacity>
            </Block>
          </Block>

          <Block marginTop={30}>
            <Text size={18}>Nhập lại mật khẩu</Text>
            <Block
              borderBottomWidth={1}
              paddingBottom={10}
              borderColor={"#DADADA"}
              marginTop={40}
              row
              alignCenter
            >
              <TextInput
                value={ReNewPass}
                onChangeText={(txt) => setReNewPass(txt)}
                style={styles.input}
                placeholder="Nhập lại mật khẩu"
                secureTextEntry={!isShowReNewPass}
              />
              <TouchableOpacity
                onPress={() => setisShowReNewPass(!isShowReNewPass)}
              >
                <Image
                  source={
                    isShowReNewPass ? icons.ic_openEye : icons.ic_closeEye
                  }
                  style={styles.iconEye}
                />
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
        <GradientButton
          onPress={onChangePass}
          style={styles.save}
          title="Lưu"
        />
      </ScrollView>
    </Block>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  save: {
    alignItems: "center",
    marginBottom: 30,
    marginHorizontal: 20,
    borderRadius: 6,
    height: getSize.v(53),
    justifyContent: "center",
  },
  icUSer: {
    width: 86,
    height: 86,
    resizeMode: "contain",
  },
  icCam: {
    width: 20,
    height: 18,
    resizeMode: "contain",
    position: "absolute",
    bottom: 2,
    right: 0,
  },
  icPen: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  input: {
    fontSize: 16,
    fontFamily: theme.fonts.fontFamily.SourceSans3Light,
    flex: 1,
  },
  iconEye: {
    width: 30,
    height: 20,
    resizeMode: "contain",
  },
});
