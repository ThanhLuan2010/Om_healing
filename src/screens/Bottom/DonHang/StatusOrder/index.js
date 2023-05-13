import { Image, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Block, Text } from "@components";
import { icons } from "@assets";
import { theme } from "@theme";
import { navigate } from "@navigation/RootNavigation";
import { baseQuery } from "@api/baseQuery";

const StatusOrder = (props) => {
  const [dataPending, setdataPending] = useState(0);
  const [dataCholay, setdataCholay] = useState([]);
  const [dataDelivery, setdataDelivery] = useState([]);
  useEffect(() => {
    getDataPendding();
    getDataCholay();
    getDataDelivery();
  }, []);
  const getDataPendding = async () => {
    const response = await baseQuery({
      url: "order/list",
      query: {
        status: 0,
      },
    });
    const { data } = response;
    setdataPending(data?.total || 0);
  };
  const getDataCholay = async () => {
    const response = await baseQuery({
      url: "order/list",
      query: {
        status: 1,
      },
    });
    const { data } = response;
    setdataCholay(data?.total || 0);
  };
  const getDataDelivery = async () => {
    const response = await baseQuery({
      url: "order/list",
      query: {
        status: 2,
      },
    });
    const { data } = response;
    setdataDelivery(data?.total || 0);
  };


  const data = [
    {
      icon: icons.ic_confirm,
      title: "Chờ xác nhận",
      data: dataPending,
      status: "",
    },
    {
      icon: icons.ic_gift,
      title: "Chờ lấy hàng",
      data: dataCholay,
      status: "cholayhang",
    },
    {
      icon: icons.ic_ship,
      title: "Đang giao",
      data: dataDelivery,
      status: "delivering",
    },
    {
      icon: icons.ic_vote,
      title: "Đánh giá",
      data: 0,
      status: "Rate",
    },
  ];
  const renderIcon = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          navigate("OrderScreen", { item: item, status: item?.status })
        }
      >
        <Block alignCenter alignSelf={"center"}>
          <Image source={item.icon} style={styles.icon} />
          {item?.data > 0 && (
            <Block
              width={19}
              height={19}
              radius={10}
              backgroundColor={theme.colors.greenBold}
              alignCenter
              justifyCenter
              absolute
              top={0}
              right={-7}
            >
              <Text
                fontFamily={theme.fonts.fontFamily.BeVietnamPro}
                fontType={"bold"}
                size={14}
                color={theme.colors.white}
              >
                {item?.data}
              </Text>
            </Block>
          )}
        </Block>
        <Text
          marginTop={19}
          color={theme.colors.black}
          size={14}
          fontFamily={theme.fonts.fontFamily.BeVietnamPro_Regular}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <Block style={styles.container} marginTop={16} marginBottom={30}>
        <Block
          paddingHorizontal={25}
          paddingVertical={20}
          backgroundColor={theme.colors.greenBlur}
        >
          <Block
            borderBottomWidth={1}
            paddingVertical={17}
            borderColor={theme.colors.gray2}
          >
            <TouchableOpacity
              onPress={() => navigate("CTVScreen")}
              style={{ flexDirection: "row" }}
            >
              <Block row flex alignCenter>
                <Image source={icons.ic_car} style={styles.ic_car} />
                <Text
                  marginHorizontal={14}
                  color={theme.colors.black}
                  size={16}
                  fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
                >
                  Giao nhận hàng
                </Text>
              </Block>

              <Block>
                <Image source={icons.ic_right} style={styles.ic_right} />
              </Block>
            </TouchableOpacity>
          </Block>

          <Block
            row
            borderBottomWidth={1}
            paddingVertical={17}
            justifyCenter
            borderColor={theme.colors.gray2}
          >
            <Block row alignCenter flex>
              <Image source={icons.ic_order} style={styles.ic_car} />
              <Text
                marginHorizontal={14}
                color={theme.colors.black}
                size={16}
                fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
              >
                Đơn mua
              </Text>
            </Block>
            <Pressable onPress={() => navigate("OrderScreen")}>
              <Block row alignCenter>
                <Text
                  size={16}
                  fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
                  marginRight={11}
                  color={theme.colors.gray2}
                >
                  Xem lịch sử mua hàng
                </Text>
                <Image source={icons.ic_right} style={styles.ic_right} />
              </Block>
            </Pressable>
          </Block>
          <Block row space={"between"} alignCenter marginTop={20}>
            {data.map(renderIcon)}
          </Block>
        </Block>
      </Block>
    </>
  );
};

export default StatusOrder;

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  container: {
    // shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    // shadowRadius: 1,
    // shadowOpacity: 0.6,
    elevation: 2,
    backgroundColor: theme.colors.white,
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  ic_right: {
    width: 9,
    height: 16,
    resizeMode: "contain",
  },
  ic_car: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});
