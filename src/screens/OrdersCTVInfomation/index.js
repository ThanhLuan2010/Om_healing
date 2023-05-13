import { baseQuery } from "@api/baseQuery";
import { icons, images } from "@assets";
import { Block, Button, GradientButton, Header, Text } from "@components";
import { goBack, navigate } from "@navigation/RootNavigation";
import { theme } from "@theme";
import { formatPrice } from "@utils/helper";
import { showOrderCTV } from "@utils/navigator";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet } from "react-native";

const OrdersCTVInfomation = ({ route }) => {
  const { item } = route.params;
  const [detail, setdetail] = useState({});
  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = async () => {
    const response = await baseQuery({
      url: "ship/order",
      query: {
        id: item?.order_id,
      },
    });
    const { data, status } = response;
    if (status && data) {
      setdetail(data);
    }
  };

  const Location = () => {
    const name = detail?.order_name ?? "Tên: Khách hàng mới";
    const phone = "(84+) " + detail?.order_phone;
    const location = detail?.order_address || "Địa chỉ: -";

    return (
      <>
        <Block
          backgroundColor={"#C3FFD133"}
          paddingHorizontal={20}
          paddingVertical={18}
        >
          <Block row alignCenter>
            <Image source={icons.ic_location} style={styles.ic_location} />
            <Text
              color={theme.colors.black}
              size={16}
              fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
            >
              Địa chỉ nhận hàng
            </Text>
          </Block>
          <Block marginTop={6}>
            <Text
              size={14}
              fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
            >
              {name}
            </Text>
            <Text
              size={14}
              fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
            >
              {phone}
            </Text>
            <Text
              size={14}
              fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
            >
              {location}
            </Text>
          </Block>
        </Block>
        {/* \\\\ */}
        <Block
          backgroundColor={"#C3FFD133"}
          paddingHorizontal={20}
          paddingVertical={18}
          borderTopWidth={1}
          borderColor={"#DADADA"}
        >
          <Block row alignCenter>
            <Image source={icons.ic_location} style={styles.ic_location} />
            <Text
              color={theme.colors.black}
              size={16}
              fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
            >
              Địa chỉ giao hàng
            </Text>
          </Block>
          <Block marginTop={6}>
            <Text
              size={14}
              fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
            >
              {name}
            </Text>
            <Text
              size={14}
              fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
            >
              {phone}
            </Text>
            <Text
              size={14}
              fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
            >
              {location}
            </Text>
          </Block>
        </Block>
      </>
    );
  };
  const orderInfo = () => {
    const title = detail?.product_name || "-";
    const content = "Mô tả: " + detail?.product_description || "-";
    const quantity = " x" + detail?.order_quantity || 1;
    const money =
      formatPrice(parseInt(item?.order_total?.toString().split(".")[0])) +
      " đồng";
    return (
      <Block
        marginHorizontal={20}
        row
        borderColor={theme.colors.gray_3}
        marginVertical={30}
      >
        <Block>
          <Image
            style={styles.imgProduct}
            source={{ uri: detail?.product_image }}
          />
        </Block>
        <Block space={"between"} flex>
          <Text
            size={16}
            fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text
            size={16}
            fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
            numberOfLines={1}
          >
            {content}
          </Text>
          <Text size={16}>
            Số lượng mua:{" "}
            <Text
              size={16}
              fontFamily={theme.fonts.fontFamily.SourceSans3Black}
            >
              {quantity}
            </Text>
          </Text>
          <Block marginTop={7} row alignCenter space={"between"}>
            <Text>Thành Tiền</Text>
            <Text
              color="#10A31E"
              size={16}
              fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
            >
              {money}
            </Text>
          </Block>
        </Block>
      </Block>
    );
  };

  const nhandon = async () => {
    // showOrderCTV(
    //   "Xác nhận đơn hàng thành công! Vui lòng đến nơi nhận hàng để bạn có thể bắt đầu giao!",
    //   "delivering"
    // )
    const response = await baseQuery({
      url: "ship/choose-order",
      method: "POST",
      body: {
        id: detail?.order_id,
      },
    });
    const { message, status } = response;
    showOrderCTV(
      message
        ? message
        : status
        ? "Xác nhận đơn hàng thành công! Vui lòng đến nơi nhận hàng để bạn có thể bắt đầu giao!"
        : "Đã có lỗi sảy ra, vui lòng thử lại sau!",
      "delivering",
      () => {
        goBack();
        goBack();
      }
    );
  };
  return (
    <Block backgroundColor={theme.colors.white} flex>
      <Header canGoBack={true} title="Thông tin đơn hàng" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Block marginTop={4} backgroundColor={"white"} style={styles.shadow}>
          {Location()}
        </Block>
        {orderInfo()}

        <Block style={styles.shadow2} backgroundColor={theme.colors.white}>
          <Block
            backgroundColor={"#C3FFD133"}
            paddingHorizontal={20}
            paddingVertical={8}
          >
            <Block row alignCenter marginBottom={10}>
              <Image source={icons.ic_wallet} />
              <Text
                marginLeft={15}
                size={16}
                fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
              >
                Phương thức thanh toán
              </Text>
            </Block>
            <Text
              size={16}
              fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
              color="#747474"
            >
              Thanh toán bằng tiền mặt khi nhận hàng
            </Text>
          </Block>
        </Block>

        <Block marginHorizontal={20} marginTop={30}>
          <Block row alignCenter space={"between"}>
            <Text
              size={16}
              fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
            >
              Mã đơn hàng
            </Text>
            <Text
              size={14}
              color="#10A31E"
              fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
            >
              {detail?.order_id || "-"}
            </Text>
          </Block>
          <Block row alignCenter={"center"} space={"between"}>
            <Text
              color="black"
              size={16}
              fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
            >
              Thời gian đặt hàng
            </Text>
            <Text
              color="#747474"
              size={16}
              fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
            >
              {moment(detail?.created_at).format("DD-MM-YYYY HH:mm")}
            </Text>
          </Block>
        </Block>
        <GradientButton
          title="Giao hàng"
          style={styles.button}
          onPress={nhandon}
        />
      </ScrollView>
    </Block>
  );
};

export default OrdersCTVInfomation;

const styles = StyleSheet.create({
  ic_order: {
    marginRight: 32,
    width: 61,
    height: 61,
    resizeMode: "contain",
  },
  ic_location: {
    width: 16,
    height: 20,
    resizeMode: "contain",
    marginRight: 9,
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 1,
  },
  shadow2: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 1,
  },

  imgProduct: {
    width: 121,
    height: 142,
    resizeMode: "contain",
    marginRight: 18,
  },
  button: {
    alignItems: "center",
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 7,
    marginVertical: 16,
  },
  ic_button: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 7,
  },
  buttonCancel: {
    borderWidth: 1,
    borderColor: "red",
    marginHorizontal: 20,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 0,
    borderRadius: 7,
    marginBottom: 30,
  },
  titleStyle: {
    color: theme.colors.red,
    fontFamily: theme.fonts.fontFamily.SourceSans3Bold,
    fontSize: 18,
  },
});
