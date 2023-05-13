import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Block, Header, Text } from "@components";
import { theme } from "@theme";
import { images } from "@assets";
import { getSize } from "@utils/responsive";
import { navigate } from "@navigation/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn } from "@store/slices/user";
import messaging from "@react-native-firebase/messaging";
import { userSelect } from "../../store/slices/user";
const data = [
  { title: "Quản lý thông tin cá nhân", navigate: "ProfileScreen" },
  { title: "Đổi mật khẩu", navigate: "ChangePasswordScreen" },
  {
    title: "Lịch sử đơn hàng",
    navigate: "OrderScreen",
    params: { status: "success" },
  },
  {
    title: "Theo dỗi đơn hàng",
    navigate: "OrderScreen",
    params: { status: "delivering" },
  },
];

const AccountScreen = () => {
  const { userInfo } = useSelector(userSelect);
  const dispatch = useDispatch();
  const renderRow = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(item.navigate, item?.params)}
        style={styles.pressRow}
      >
        <Text>{item.title}</Text>
        <Image style={styles.icRight} source={images.ic_right} />
      </TouchableOpacity>
    );
  };

  const onLogout = () => {
    messaging().unsubscribeFromTopic(`${userInfo?.user_id}`);
    dispatch(setIsLoggedIn(false));
  };
  return (
    <Block flex backgroundColor={theme.colors.white}>
      <Header canGoBack title={"Tài khoản"} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Block flex>
          <Block marginTop={30}>{data.map(renderRow)}</Block>

          <Block style={styles.pressRow}>
            <Text>{"Ngôn ngữ"}</Text>
            <Block row alignCenter>
              <Image style={styles.icVN} source={images.vn} />
              <Text
                marginLeft={10}
                fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
              >
                Tiếng Việt
              </Text>
            </Block>
          </Block>

          <Text
            color="#747474"
            center
            marginTop={20}
            fontFamily={theme.fonts.fontFamily.BeVietnamPro_LightItalic}
          >
            Phiên bản 1.0
          </Text>
        </Block>
        <TouchableOpacity onPress={onLogout} style={styles.logout}>
          <Text size={18} color="white">
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Block>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  icRight: {
    width: getSize.s(8.14),
    height: getSize.s(15),
  },
  pressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderColor: "#DADADA",
    marginBottom: 30,
    paddingBottom: 30,
  },
  icVN: {
    width: getSize.s(37),
    height: getSize.s(22),
    resizeMode: "contain",
  },
  logout: {
    backgroundColor: "#FF0000",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 15,
    borderRadius: 6,
  },
});
