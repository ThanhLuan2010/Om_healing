import { baseQuery } from "@api/baseQuery";
import { Block, Header, Text } from "@components";
import { theme } from "@theme";
import { formatPrice } from "@utils/helper";
import { getSize, width } from "@utils/responsive";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";

const CancelDetail = ({ route }) => {
  const [detail, setdetail] = useState({});
  const { item } = route.params;
  useEffect(() => {
    getDetail();
  }, []);
  console.log("=====detail====", detail);
  const getDetail = async () => {
    const response = await baseQuery({
      url: "order/list",
      query: {
        id: item?.order_id,
      },
    });
    const { data, status } = response;
    if (status && data) {
      setdetail(data);
    }
  };

  return (
    <Block backgroundColor={theme.colors.white} flex>
      <Header canGoBack={true} title="Chi tiết đơn huỷ" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Block shadow backgroundColor={theme.colors.white}>
          <Block
            paddingVertical={26}
            backgroundColor={"rgba(196, 255, 209, 0.2)"}
          >
            <Block marginBottom={19}>
              <Block
                alignCenter
                width={width}
                space={"between"}
                alignSelf={"center"}
                row
              >
                <Block flex alignCenter>
                  <Block
                    backgroundColor={"#10A31E"}
                    radius={10}
                    width={20}
                    height={20}
                  />
                </Block>

                <Block flex alignCenter>
                  <Block
                    backgroundColor={"#10A31E"}
                    radius={10}
                    width={20}
                    height={20}
                  />
                </Block>

                <Block flex alignCenter>
                  <Block
                    backgroundColor={"#10A31E"}
                    radius={10}
                    width={20}
                    height={20}
                  />
                </Block>
              </Block>

              <Block
                backgroundColor={"#AAAAAA"}
                height={1}
                width={width - (width / 6) * 2}
                alignSelf={"center"}
                absolute
                top={10}
                zIndex={-1}
              />
            </Block>

            <Block>
              <Block
                alignCenter
                width={width}
                space={"between"}
                alignSelf={"center"}
                row
              >
                <Block flex alignCenter>
                  <Text
                    size={14}
                    fontFamily={theme.fonts.fontFamily.SourceSans3Light}
                    center
                  >
                    {"Yêu cầu được\ntiếp nhận"}
                  </Text>
                </Block>
                <Block flex alignCenter>
                  <Text
                    size={14}
                    fontFamily={theme.fonts.fontFamily.SourceSans3Light}
                    center
                  >
                    {"VNIFARM đang\nxem xét"}
                  </Text>
                </Block>
                <Block flex alignCenter>
                  <Text
                    size={14}
                    fontFamily={theme.fonts.fontFamily.SourceSans3Light}
                    center
                  >
                    {"Hủy đơn hàng\nthành công"}
                  </Text>
                </Block>
              </Block>
            </Block>

            {/* <Block marginTop={26} row marginHorizontal={20}>
              <Text
                color="#FF0000"
                fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
                flex
              >
                Đơn hàng của bạn đang trong quá trình xem xét. Vui lòng đợi giây
                lát!
              </Text>
              <Image
                style={styles.ic_cancelPending}
                source={images.ic_cancelPending}
              />
            </Block> */}
          </Block>
        </Block>

        <Block marginTop={30} shadow backgroundColor={theme.colors.white}>
          <Block backgroundColor={"rgba(196, 255, 209, 0.2)"}>
            <Block
              paddingVertical={26}
              paddingHorizontal={20}
              // backgroundColor={"rgba(196, 255, 209, 0.2)"}
              row
              alignCenter
            >
              <Image
                style={styles.productImg}
                source={{ uri: detail?.product_image }}
              />
              <Block
                marginLeft={18}
                height={getSize.v(142)}
                flex
                space={"between"}
              >
                <Text
                  numberOfLines={2}
                  fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
                >
                  {detail?.product_name}
                </Text>
                <Text
                  fontFamily={theme.fonts.fontFamily.SourceSans3Light}
                  numberOfLines={1}
                >
                  Mô tả: {detail?.product_short_description}
                </Text>
                <Text
                  fontFamily={theme.fonts.fontFamily.SourceSans3Light}
                  numberOfLines={1}
                >
                  Số lượng mua:{" "}
                  <Text fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}>
                    x{detail?.order_quantity}
                  </Text>
                </Text>
                <Text
                  numberOfLines={2}
                  right
                  fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
                  color="#10A31E"
                >
                  {formatPrice(
                    parseInt(detail?.order_total?.toString().split(".")[0])
                  )}{" "}
                  đồng
                </Text>
              </Block>
            </Block>
            <Block>
              <Block paddingHorizontal={20} row space={"between"}>
                <Text
                  fontFamily={theme.fonts.fontFamily.SourceSans3Light}
                  size={14}
                  color="#747474"
                >
                  Yêu cầu bởi
                </Text>

                <Text
                  fontFamily={theme.fonts.fontFamily.SourceSans3Light}
                  size={14}
                  color="#747474"
                >
                  Người mua
                </Text>
              </Block>

              <Block
                marginTop={13}
                paddingHorizontal={20}
                row
                space={"between"}
              >
                <Text
                  fontFamily={theme.fonts.fontFamily.SourceSans3Light}
                  size={14}
                  color="#747474"
                >
                  Yêu cầu vào
                </Text>

                <Text
                  fontFamily={theme.fonts.fontFamily.SourceSans3Light}
                  size={14}
                  color="#747474"
                >
                  {moment(detail?.created_at).format("DD-MM-YYYY HH:mm")}
                </Text>
              </Block>

              <Block
                marginTop={13}
                paddingHorizontal={20}
                row
                space={"between"}
              >
                <Text
                  fontFamily={theme.fonts.fontFamily.SourceSans3Light}
                  size={14}
                  color="#747474"
                >
                  ID đơn hàng
                </Text>

                <Text
                  fontFamily={theme.fonts.fontFamily.SourceSans3Light}
                  size={14}
                  color="#747474"
                >
                  {detail?.order_id || "-"}
                </Text>
              </Block>

              <Block
                marginTop={13}
                paddingHorizontal={20}
                row
                space={"between"}
                marginBottom={20}
              >
                <Text
                  fontFamily={theme.fonts.fontFamily.SourceSans3Light}
                  size={14}
                  color="#747474"
                >
                  Lý do
                </Text>

                <Text
                  fontFamily={theme.fonts.fontFamily.SourceSans3Light}
                  size={14}
                  color="#747474"
                >
                  {detail?.order_cancel_reason || "-"}
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default CancelDetail;

const styles = StyleSheet.create({
  ic_cancelPending: {
    marginHorizontal: 20,
    width: getSize.s(43),
    height: getSize.s(43),
  },
  productImg: {
    width: getSize.v(121),
    height: getSize.v(142),
  },
});
