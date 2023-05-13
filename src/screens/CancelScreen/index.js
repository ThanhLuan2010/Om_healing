import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Block, GradientButton, Header, Text } from "@components";
import { theme } from "@theme";
import { icons, images } from "@assets";
import { getSize } from "@utils/responsive";
import moment from "moment";
import { baseQuery } from "@api/baseQuery";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@store/slices/common";
import { showAlert } from "@utils/navigator";
import { goBack } from "@navigation/RootNavigation";

const CancelScreen = ({ route }) => {
  const { item } = route.params;
  const [inputValue, setinputValue] = useState("");
  const dispatch = useDispatch();
  const onCancel = async () => {
    dispatch(setIsLoading(true));
    const response = await baseQuery({
      url: "order/cancel-order",
      method: "POST",
      body: {
        id: item?.order_id,
        reason: inputValue,
      },
    });
    dispatch(setIsLoading(false));
    console.log("======response=====", response);
    const { status, message } = response;
    if (status) {
      showAlert(
        "Thành công",
        message || "Huỷ đơn hàng thành công",
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
        message || "Huỷ đơn hàng thất bại",
        "Xác nhận",
        "",
        () => {
          goBack();
        }
      );
    }
  };
  return (
    <Block flex={1} backgroundColor={theme.colors.white}>
      <Header title="Huỷ đơn hàng" canGoBack />
      <Block
        radius={4}
        marginHorizontal={20}
        marginTop={30}
        marginBottom={10}
        row
        alignCenter
        style={styles.bg_order}
        paddingHorizontal={12}
        shadow
      >
        <Image
          source={{ uri: item?.product_image }}
          style={styles.ImagePhanBon}
        />
        <Block height={79} space={"between"} marginLeft={19} flex>
          <Text
            numberOfLines={2}
            fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
          >
            {item?.product_name}
          </Text>
          <Text
            size={16}
            fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
          >
            Đã đặt vào
            <Text
              size={16}
              fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
              color="#10A31E"
            >
              {" "}
              {moment(item?.created_at).format("dd, DD-MM-YYYY")}
            </Text>
          </Text>
        </Block>
      </Block>

      <Block marginTop={29}>
        <TextInput
          placeholder="Lý do bạn huỷ đơn hàng"
          numberOfLines={10}
          multiline={true}
          style={styles.textInput}
          value={inputValue}
          onChangeText={(txt) => {
            setinputValue(txt);
          }}
        />
      </Block>
      <GradientButton
        styleTitle={{ color: "#FF0000" }}
        colors={["transparent", "transparent"]}
        title="Huỷ đơn hàng"
        style={styles.button}
        onPress={onCancel}
      />
    </Block>
  );
};

export default CancelScreen;

const styles = StyleSheet.create({
  customRatingBarStyle: {
    flexDirection: "row",
    marginRight: 11,
  },
  starImageStyle: {
    width: 23,
    height: 23,
    resizeMode: "cover",
  },
  ImagePhanBon: {
    width: 67,
    height: 79,
    resizeMode: "contain",
  },
  bg_order: {
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  chatluong: {
    maxWidth: getSize.s(120),
    flexGrow: 1,
  },
  status: {
    fontSize: 16,
    fontFamily: theme.fonts.fontFamily.SourceSans3Bold,
  },
  ic_camera: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  textInput: {
    // just some styling to make the input visible
    backgroundColor: "#88DF9036",
    textAlignVertical: "top",
    justifyContent: "flex-start",
    height: 231,
    marginHorizontal: 20,
    borderRadius: 4,
    paddingHorizontal: 17,
    fontSize: 14,
    color: theme.colors.black,
    fontStyle: "italic",
    paddingVertical: 20,
  },
  button: {
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 7,
    marginHorizontal: 20,
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#FF0000",
  },
});
