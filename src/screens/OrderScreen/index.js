import { baseQuery } from "@api/baseQuery";
import { Block, Header, Text } from "@components";
import OrderProduct from "@components/OrderProduct";
import { setIsLoading } from "@store/slices/common";
import { theme } from "@theme";
import React, { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import TopTab from "./TopTab";
import { useNavigation } from "@react-navigation/native";

const OrderScreen = (props) => {
  const [indexTab, setIndexTab] = useState(0);
  const [refreshing, setrefreshing] = useState(false);
  const [listOrder, setlistOrder] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.route.params?.status === "success") {
      setIndexTab(3);
      getData(3);
    }
    if (props.route.params?.status === "delivering") {
      setIndexTab(2);
      getData(2);
    }
    if (props.route.params?.status === "cholayhang") {
      setIndexTab(1);
      getData(1);
    }
    if (props.route.params?.status === "Rate") {
      setIndexTab(3);
      getData(3);
    }
    if (!props.route.params?.status) {
      getData();
    }
  }, []);

  useEffect(() => {
    const ubsubcribe = navigation.addListener("focus", () => {
      if (props.route.params?.status === "success") {
        setIndexTab(3);
        getData(3);
      }
      if (props.route.params?.status === "delivering") {
        setIndexTab(2);
        getData(2);
      }
      if (props.route.params?.status === "cholayhang") {
        setIndexTab(1);
        getData(1);
      }
      if (props.route.params?.status === "Rate") {
        setIndexTab(3);
        getData(3);
      }
      if (!props.route.params?.status) {
        getData();
      }
    });
    return ubsubcribe;
  }, []);

  const getData = async (id = indexTab) => {
    setrefreshing(true);
    dispatch(setIsLoading(true));
    const response = await baseQuery({
      url: "order/list",
      query: {
        status: id,
      },
    });
    setrefreshing(false);
    dispatch(setIsLoading(false));
    const { status, data } = response;
    if (status && data) {
      setlistOrder(data.data);
      // dispatch(setListOrder(data.data));
    }
  };
  const renderEmpty = () => {
    return (
      <Block flex justifyCenter>
        <Text
          fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
          size={24}
          center
          color={theme.colors.backgroundInput}
        >
          Danh sách trống
        </Text>
      </Block>
    );
  };
  const renderOrder = (item, index) => {
    return <OrderProduct item={item} index={index} key={index} />;
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
      <Block style={styles.bgHeader}>
        <Header style={styles.header} canGoBack title={"Đơn mua"} />
        <TopTab
          status={props.route.params?.status}
          onChangeTab={(index) => {
            setIndexTab(index);
            getData(index);
          }}
          indexTab={indexTab}
        />
      </Block>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              getData();
            }}
          />
        }
        scrollEventThrottle={400}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            // getData()
          }
        }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {listOrder?.length > 0 ? listOrder?.map(renderOrder) : renderEmpty()}
      </ScrollView>
    </Block>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  bgHeader: {
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    elevation: 5,
    paddingBottom: 20,
  },
  ic_right: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  ic_left: {
    width: 10,
    height: 18,
  },
  header: {
    shadowColor: "transparent",
  },
  btnSearch: {
    position: "absolute",
    right: 43,
    bottom: 0,
  },
  ic_search: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    tintColor: "#10A31E",
  },
});
