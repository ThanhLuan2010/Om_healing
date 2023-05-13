import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  Block,
  GradientButton,
  GradientSwitch,
  Header,
  Text,
} from "@components";
import { theme } from "@theme";
import { images } from "@assets";
import { getSize } from "@utils/responsive";
import ImagePicker from "react-native-image-crop-picker";
import { setUserInfo, userSelect } from "@store/slices/user";
import { useSelector } from "react-redux";
import { baseQuery } from "@api/baseQuery";
import { DOMAIN } from "../../constants";
import { setLoading, showAlert } from "@utils/navigator";
import { goBack } from "@navigation/RootNavigation";
import { dispatch } from "@store/configStore";

const ProfileScreen = () => {
  const { userInfo } = useSelector(userSelect);
  const [isOn, setisOn] = useState(true);
  const [imgUser, setimgUser] = useState(
    userInfo?.user_image
      ? { uri: DOMAIN + userInfo?.user_image }
      : images.ic_account
  );
  const [name, setname] = useState(userInfo?.user_name || "");
  const [phone, setPhone] = useState(userInfo?.user_phone || "");
  const [address, setAddress] = useState(userInfo?.user_address || "");
  const onPicker = () => {
    try {
      ImagePicker.openPicker({
        maxWidth: 500,
        maxHeight: 500,
        cropping: true,
      }).then((image) => {
        setimgUser({ uri: image.path });
      });
    } catch (error) {}
  };
  const onSave = async () => {
    setLoading(true);
    const body = {
      name: name,
      address: address,
    };

    if (imgUser?.uri) {
      if (imgUser?.uri?.includes("http")) {
      } else {
        body.image = {
          uri: imgUser?.uri,
          type: `image/jpg`,
          name: imgUser?.uri,
        };
      }
    }
    const response = await baseQuery({
      url: "user/change-info",
      method: "POST",
      body: body,
      isFormData: true,
    });
    setLoading(false);
    const { status, message } = response;
    getInfo();
    if (status) {
      showAlert(
        "Thành công",
        message || "Cập nhật thành công",
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

  const getInfo = async () => {
    const response = await baseQuery({
      url: "user/info",
    });
    dispatch(setUserInfo(response.data));
  };
  return (
    <Block flex backgroundColor={theme.colors.white}>
      <Header canGoBack title={"Thông tin cá nhân"} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Block flex>
            <Block alignSelf={"center"} marginTop={38} alignCenter>
              <TouchableOpacity onPress={onPicker}>
                <Image source={imgUser} style={styles.icUSer} />
                <Image style={styles.icCam} source={images.ic_camera} />
              </TouchableOpacity>
            </Block>

            <Block marginHorizontal={20} marginTop={51}>
              <Block alignCenter row>
                <Text>Tên người dùng</Text>
                <Block justifyEnd flex marginLeft={20} alignCenter row>
                  <TextInput
                    value={name}
                    onChangeText={(txt) => setname(txt)}
                    style={styles.input}
                    placeholder="Tên người dùng"
                  />
                  <TouchableOpacity>
                    <Image source={images.ic_pencil} style={styles.icPen} />
                  </TouchableOpacity>
                </Block>
              </Block>

              <Block alignCenter marginTop={30} row>
                <Text>Số điện thoại</Text>
                <Block justifyEnd flex marginLeft={20} alignCenter row>
                  <TextInput
                    keyboardType="numeric"
                    style={styles.input}
                    placeholder="Số điện thoại"
                    value={phone}
                    onChangeText={(txt) => setPhone(txt)}
                  />
                  <TouchableOpacity>
                    <Image source={images.ic_pencil} style={styles.icPen} />
                  </TouchableOpacity>
                </Block>
              </Block>

              <Block marginTop={30} alignCenter row>
                <Text>Địa chỉ</Text>
                <Block alignCenter justifyEnd flex marginLeft={30} row>
                  <TextInput
                    style={styles.input}
                    placeholder="Địa chỉ"
                    multiline
                    onChangeText={(txt) => setAddress(txt)}
                    value={address}
                  />
                  <TouchableOpacity>
                    <Image source={images.ic_pencil} style={styles.icPen} />
                  </TouchableOpacity>
                </Block>
              </Block>

              <Block alignCenter marginTop={30} row>
                <Text>Thông báo</Text>
                <Block alignCenter justifyEnd flex marginLeft={30} row>
                  <GradientSwitch onPress={() => setisOn(!isOn)} isOn={isOn} />
                </Block>
              </Block>
            </Block>
          </Block>
        <GradientButton onPress={onSave} style={styles.save} title="Lưu" />

      </ScrollView>
    </Block>
  );
};

export default ProfileScreen;

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
    borderRadius: 85 / 2,
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
    marginRight: 18,
    paddingLeft: 20,
    textAlign: "right",
  },
});
