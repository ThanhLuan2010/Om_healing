import { baseQuery } from "@api/baseQuery";
import { images } from "@assets";
import { Block, GradientButton, Header, Product, Text } from "@components";
import { goBack, navigate } from "@navigation/RootNavigation";
import { userSelect } from "@store/slices/user";
import { theme } from "@theme";
import { formatPrice } from "@utils/helper";
import { setLoading, showAlert } from "@utils/navigator";
import { getSize } from "@utils/responsive";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { showMessage } from "react-native-flash-message";

const ProductDetail = ({ navigation, route }) => {
  const { item, index } = route.params;
  const [detail, setdetail] = useState(null);
  const [loading, setloading] = useState(false);
  const [count, setcount] = useState(1);
  const { userInfo } = useSelector(userSelect);
  const scrollRef = useRef();
  useEffect(async () => {
    setloading(true);
    const response = await baseQuery({
      url: "product/list",
      query: {
        id: item?.product_id,
      },
    });
    setLoading(false);
    const { data, status } = response;
    if (status && data) {
      setdetail(data);
    }
  }, []);
  const onPressRality = async (product) => {
    scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
    const response = await baseQuery({
      url: "product/list",
      query: {
        id: product?.product_id,
      },
    });
    setLoading(false);
    const { data, status } = response;
    if (status && data) {
      setdetail(data);
    }
  };
  const onBuy = async (product) => {
    if (!userInfo?.user_address || userInfo?.user_address === "") {
      showMessage({
        message: "Thông báo",
        type: "warning",
        description: "Bạn cần cập nhật thông tin địa chỉ trước khi đặt hàng",
      });
    }
    if (!userInfo?.user_name || userInfo?.user_name === "") {
      showMessage({
        message: "Thông báo",
        type: "warning",
        description: "Bạn cần cập nhật tên trước khi đặt hàng",
      });
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
        navigate("OrderScreen");

        showMessage({
          message: "Thành Công",
          type: "success",
          description: message || "Mua hàng thành công",
        });
      } else {
        showMessage({
          message: "Thất bại",
          type: "warning",
          description: message || "Mua hàng thất bại",
        });
      }
    }
  };

  return (
    <Block flex backgroundColor={theme.colors.white}>
      <Header style={styles.header} canGoBack title={"Sản phẩm"} />
      {detail ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          ref={scrollRef}
        >
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
                  uri: detail.detail?.product_image,
                }}
                style={styles.imgProduct}
              />
              {detail.detail?.product_status === 0 && (
                <Image source={images.ic_hetHang} style={styles.icHetHang} />
              )}
            </Block>
            <Block
              height={getSize.s(162)}
              flex
              space={"between"}
              marginLeft={18}
            >
              <Text
                numberOfLines={2}
                fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
              >
                {detail.detail?.product_name}
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
                    parseInt(
                      detail.detail?.product_price?.toString().split(".")[0]
                    )
                  )}
                  đồng
                </Text>
              </Text>
              <GradientButton
                onPress={() => onBuy(detail.detail)}
                style={styles.buyBtn}
                title={"Mua"}
              />
            </Block>
          </Block>
          <Text center marginTop={30} color="#747474">
            Số lượng còn lại
          </Text>
          <Text
            center
            marginTop={5}
            fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
          >
            {detail?.detail?.product_total}
          </Text>
          <Text lineHeight={23} marginHorizontal={20} marginTop={30}>
            {detail?.detail?.product_description}
          </Text>

          {detail?.related?.length > 0 && (
            <Block marginBottom={50} marginTop={17}>
              <Text
                size={24}
                fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
                marginHorizontal={20}
                color="#10A31E"
              >
                Sản phẩm liên quan
              </Text>
              <Block>
                {detail?.related?.map((item, index) => (
                  <Product
                    onPress={() => onPressRality(item)}
                    item={item}
                    index={index}
                    key={index}
                  />
                ))}
              </Block>
            </Block>
          )}
        </ScrollView>
      ) : (
        <Block flex justifyCenter alignCenter>
          {loading ? (
            <ActivityIndicator color={"#18A42E"} />
          ) : (
            <Text>Đang tải...</Text>
          )}
        </Block>
      )}
    </Block>
  );
};

export default ProductDetail;

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
});
