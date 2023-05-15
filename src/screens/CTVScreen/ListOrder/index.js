import { baseQuery } from "@api/baseQuery";
import { images } from "@assets";
import { Block, GradientButton, SearchBar, Text } from "@components";
import { navigate } from "@navigation/RootNavigation";
import { theme } from "@theme";
import { formatPrice } from "@utils/helper";
import { setLoading } from "@utils/navigator";
import { getSize } from "@utils/responsive";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ListOrder = () => {
  const [data, setdata] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");
  const [refreshing, setrefreshing] = useState(false);
  const [canLoadMore, setcanLoadMore] = useState(true);
  const [isLoadmore, setisLoadmore] = useState(false);
  const [page, setpage] = useState(1);
  const navigation = useNavigation();
  useEffect(() => {
    const ubsubcribe = navigation.addListener("focus", () => {
      getData();
    });
    return ubsubcribe;
  }, [navigation]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async (_page = page, search = searchQuery) => {
    setLoading(true);
    const response = await baseQuery({
      url: "ship/order",
      query: {
        search: search,
        page: _page,
      },
    });

    setLoading(false);
    setisLoadmore(false);
    setrefreshing(false);
    if (response.status && response.data) {
      if (response.data.current_page === 1) {
        setdata(response.data.data);
      } else {
        setdata(data.concat(response.data.data));
      }
      if (response.data.data.length < 10) {
        setcanLoadMore(false);
      }
    }
  };

  const renderItem = (item, index) => {
    return (
      <Block
        marginHorizontal={20}
        marginTop={index === 0 ? 0 : 30}
        paddingTop={30}
        borderTopWidth={index === 0 ? 0 : 0.6}
        row
        borderColor={"#848484"}
        alignCenter
        key={index}
        marginBottom={index === data.length - 1 ? 40 : 0}
      >
        <Block style={{ flexDirection: "row", alignItems: "center" }}>
          <Block>
            <Image
              source={{
                uri: item?.product_image,
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
                  parseInt(item?.order_fee_ship?.toString().split(".")[0])
                )}{" "}
                đồng
              </Text>
            </Text>
            <GradientButton
              onPress={() => navigate("OrdersCTVInfomation", { item, index })}
              style={styles.buyBtn}
              title={"Nhận giao"}
            />
          </Block>
        </Block>
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

  const emptyComponent = () => {
    return (
      <Block flex justifyCenter>
        <Text size={20} center color={theme.colors.backgroundInput}>
          Danh sách trống
        </Text>
      </Block>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setrefreshing(true);
            getData(1);
            setpage(1);
            setcanLoadMore(true);
          }}
        />
      }
      scrollEventThrottle={400}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          if (canLoadMore) {
            setisLoadmore(true);
            getData(page + 1);
            setpage(page + 1);
          }
        }
      }}
      showsVerticalScrollIndicator={false}
    >
      <Block flex marginTop={30}>
        <SearchBar
          onPressSearch={(value) => {
            getData(1, value);
            setpage(1);
            setcanLoadMore(true);
          }}
        />
        {data?.length > 0 ? data?.map(renderItem) : emptyComponent()}

        {isLoadmore && (
          <ActivityIndicator
            style={{ alignSelf: "center", marginBottom: 20 }}
            color={"#48DA5F"}
          />
        )}
      </Block>
    </ScrollView>
  );
};

export default ListOrder;

const styles = StyleSheet.create({
  imgProduct: {
    width: getSize.s(121),
    height: getSize.s(142),
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
});
