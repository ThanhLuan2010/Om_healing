import {
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { Block, GradientButton, Text } from "@components";
import { theme } from "@theme";
import { getSize, width } from "@utils/responsive";
import { goBack, navigate } from "@navigation/RootNavigation";
import { images } from "@assets";
import { formatPrice } from "@utils/helper";
import { setLoading, showAlert } from "@utils/navigator";
import { baseQuery } from "@api/baseQuery";
import { useSelector } from "react-redux";
import { userSelect } from "@store/slices/user";
import { DOMAIN } from "../../constants";

const AddBookModal = ({ route }) => {
  const { item, index } = route.params;
  const [count, setcount] = useState(1);
  const onPress = null;
  const { userInfo } = useSelector(userSelect);

  const onBuy = async (product) => {
    if (!userInfo?.user_address || userInfo?.user_address === "") {
      showAlert(
        "Thông báo",
        "Bạn cần cập nhật thông tin địa chỉ trước khi đặt hàng",
        "Xác nhận",
        "",
        () => goBack()
      );
    }
    if (!userInfo?.user_name || userInfo?.user_name === "") {
      showAlert(
        "Thông báo",
        "Bạn cần cập nhật tên trước khi đặt hàng",
        "Xác nhận",
        "",
        () => goBack()
      );
    }
    if (userInfo?.user_address && userInfo?.user_name) {
      setLoading(true);
      const response = await baseQuery({
        url: "order/add-order",
        method: "POST",
        body: {
          product_id: product.product_id,
          quantity: count,
          name: userInfo.user_name,
          address: userInfo.user_address,
        },
      });
      setLoading(false);
      const { data, message, status } = response;
      if (status) {
        goBack();
        navigate("OrderScreen");
        showAlert(
          "Thành Công",
          message || "Mua hàng thành công",
          "Chấp nhận",
          "",
          () => goBack()
        );
      } else {
        showAlert(
          "Thất bại",
          message || "Mua hàng thất bại",
          "Chấp nhận",
          "",
          () => goBack()
        );
      }
    }
  };
  return (
    <Pressable onPress={() => goBack()} style={styles.container}>
      <Block
        paddingHorizontal={15}
        paddingVertical={17}
        radius={19}
        width={width}
        backgroundColor={theme.colors.white}
      >
        <Text
          color="#10A31E"
          size={24}
          marginBottom={17}
          center
          fontType="bold"
        >
          Sản phẩm
        </Text>

        <Block
          marginHorizontal={20}
          marginTop={30}
          paddingBottom={30}
          row
          borderColor={"#848484"}
          borderBottomWidth={0.5}
          alignCenter
        >
          <Block>
            <Image
              source={{
                uri: item.product_image?.includes("https://")
                  ? item.product_image
                  : DOMAIN + item.product_image,
              }}
              style={styles.imgProduct}
            />
            {item?.product_status === 0 && (
              <Image source={images.ic_hetHang} style={styles.icHetHang} />
            )}
          </Block>
          <Block height={getSize.s(162)} flex space={"between"} marginLeft={18}>
            <Text
              numberOfLines={2}
              fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
            >
              {item?.product_name}
            </Text>

            <Block space={"between"} alignCenter row>
              <Text>Số lượng: </Text>
              <Block row alignCenter>
                <TouchableOpacity
                  onPress={() => {
                    if (count > 1) {
                      setcount(parseInt(count) - 1);
                    }
                  }}
                  style={styles.setCountBtn}
                >
                  <Text size={20}>-</Text>
                </TouchableOpacity>

                <Block style={styles.Countinput}>
                  <TextInput
                    value={count.toString()}
                    onChangeText={(txt) => setcount(txt)}
                    keyboardType="numeric"
                    style={{ padding: 0 }}
                  />
                </Block>

                <TouchableOpacity
                  onPress={() => setcount(parseInt(count) + 1)}
                  style={styles.setCountBtn}
                >
                  <Text size={20}>+</Text>
                </TouchableOpacity>
              </Block>
            </Block>

            <Text>
              Giá:{" "}
              <Text fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}>
                {formatPrice(
                  parseInt(item?.product_price?.toString().split(".")[0])
                )}
                đồng
              </Text>
            </Text>
            <GradientButton
              onPress={() => onBuy(item)}
              style={styles.buyBtn}
              title={"Mua"}
            />
          </Block>
        </Block>
      </Block>
    </Pressable>
  );
};

export default AddBookModal;

const styles = StyleSheet.create({
  imgProduct: {
    width: getSize.s(101),
    height: getSize.s(122),
  },
  buyBtn: {
    alignItems: "center",
    borderRadius: 5,
  },
  icHetHang: {
    width: getSize.s(54),
    height: getSize.s(54),
    position: "absolute",
    right: -10,
    top: -30,
  },
  setCountBtn: {
    width: getSize.s(32),
    height: getSize.s(32),
    backgroundColor: theme.colors.white,
    borderRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Countinput: {
    width: getSize.s(69),
    height: getSize.s(32),
    backgroundColor: theme.colors.white,
    borderRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 9,
  },
  container: {
    justifyContent: "flex-end",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
