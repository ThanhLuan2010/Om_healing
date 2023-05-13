import { baseQuery } from "@api/baseQuery";
import { icons, images } from "@assets";
import { Block, GradientButton, HeaderHome, Text, TopNav } from "@components";
import { navigate } from "@navigation/RootNavigation";
import { orderSelect, setListOrder } from "@store/slices/order";
import { theme } from "@theme";
import { formatPrice } from "@utils/helper";
import { getSize } from "@utils/responsive";
import React, { useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import StatusOrder from "./StatusOrder";
import styles from "./styles";
import { setLoading } from "@utils/navigator";
const data = [{}, {}, {}, {}, {}, {}];
const DonHangScreen = () => {
  const dispatch = useDispatch();
  const { listOrder } = useSelector(orderSelect);
  const [refreshing, setrefreshing] = useState(false);
  const [page, setpage] = useState(1);
  const [canLoadmore, setcanLoadmore] = useState(true);

  const renderProduct = (item, index) => {
    return (
      <Block
        marginHorizontal={20}
        marginTop={index === 0 ? 0 : 30}
        paddingTop={30}
        borderTopWidth={index === 0 ? 0 : 0.6}
        row
        borderColor={"#848484"}
        alignCenter
      >
        <TouchableOpacity
          onPress={() => navigate("ProductDetail", { item, index })}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Block>
            <Image
              source={{
                uri: item?.product_image,
              }}
              // source={images.phan_bon}
              style={styles.imgProduct}
            />
          </Block>
          <Block height={getSize.s(162)} flex space={"between"} marginLeft={18}>
            <Text
              numberOfLines={2}
              fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
            >
              {item?.product_name}
            </Text>
            <Text
              numberOfLines={1}
              fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
            >
              Mô tả: {item?.product_description}
            </Text>

            <Text>
              Giá:{" "}
              <Text fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}>
                {formatPrice(
                  parseInt(item?.order_product_price?.toString().split(".")[0])
                )}
                đồng
              </Text>
            </Text>
            <GradientButton style={styles.buyBtn} title={"Mua"} />
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };

  useEffect(() => {
    getListOrder();
  }, []);
  const getListOrder = async (_page = page) => {
    setLoading(true);
    setrefreshing(true);
    const response = await baseQuery({
      url: "order/list",
      query: {
        page: _page,
      },
    });
    setrefreshing(false);
    setLoading(false);
    const { status, data } = response;

    if (status && data) {
      if (data.current_page === 1) {
        dispatch(setListOrder(data.data));
      } else {
        dispatch(setListOrder(listOrder?.concat(data.data)));
      }
      if (data.data?.length < 10) {
        setcanLoadmore(false);
      }
    }
  };
  const renderEmpty = () => {
    return (
      <Block flex justifyCenter>
        <Text center size={20} color={theme.colors.backgroundInput}>
          Danh sách trống
        </Text>
      </Block>
    );
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <Block flex backgroundColor={theme.colors.white}>
      <HeaderHome />
      <TopNav />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              getListOrder(1);
              setpage(1);
            }}
          />
        }
        scrollEventThrottle={400}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            if (canLoadmore) {
              setpage(page + 1);
              getListOrder(page + 1);
            }
          }
        }}
      >
        <StatusOrder listOrder={listOrder} />
        {listOrder?.length > 0 && (
          <>
            <Block style={styles.backgroundColor}>
              <Block
                paddingVertical={16}
                paddingHorizontal={23}
                backgroundColor={theme.colors.greenBlur}
                row
              >
                <Block flex row alignCenter>
                  <Image source={icons.ic_bag} />
                  <Text
                    marginHorizontal={16}
                    size={16}
                    fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
                  >
                    Mua lại
                  </Text>
                </Block>
                <TouchableOpacity onPress={()=>navigate('ProductScreen')}>
                  <Block row alignCenter>
                    <Text
                      fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
                      color={theme.colors.gray_3}
                      size={16}
                      marginHorizontal={10}
                    >
                      Xem thêm sản phẩm
                    </Text>
                    <Image source={icons.ic_right} />
                  </Block>
                </TouchableOpacity>
              </Block>
            </Block>

            <Block flex marginBottom={100}>
              {listOrder?.length > 0
                ? listOrder?.map(renderProduct)
                : renderEmpty()}
            </Block>
          </>
        )}
      </ScrollView>
    </Block>
  );
};

export default DonHangScreen;
