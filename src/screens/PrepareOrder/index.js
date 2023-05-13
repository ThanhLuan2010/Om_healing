import { icons, images } from "@assets";
import { Block, Header, Text } from "@components";
import { theme } from "@theme";
import { getSize } from "@utils/responsive";
import React from "react";
import { Image, StyleSheet } from "react-native";

const PrepareOrder = () => {
  return (
    <Block flex backgroundColor={theme.colors.white}>
      <Header title="Đang chuẩn bị" canGoBack />
      <Block
        radius={4}
        marginHorizontal={20}
        marginTop={30}
        marginBottom={10}
        row
        alignCenter
        style={styles.bg_order}
        paddingHorizontal={12}
      >
        <Image source={images.phan_bon} style={styles.ImagePhanBon} />
        <Block marginLeft={19} flex>
          <Text size={16} fontFamily={theme.fonts.fontFamily.SourceSans3Bold}>
            Đã đặt vào
            <Text
              size={16}
              fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
              color="#10A31E"
            >
              {" "}
              CN, 16-04-2023
            </Text>
          </Text>
          <Text
            color="#747474"
            fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
            size={12}
          >
            Vận chuyển bởi Giao hàng tiết kiệm (GHTK)
          </Text>
        </Block>
      </Block>
      <Block style={styles.bg_order} marginHorizontal={20} radius={4}>
        <Block
          marginHorizontal={12}
          row
          alignCenter
          space={"between"}
          marginVertical={14}
        >
          <Text
            fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
            size={16}
            color={theme.colors.black}
          >
            Mã đơn hàng
          </Text>
          <Text
            size={14}
            color="#10A31E"
            fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
          >
            DHA8927489035687
          </Text>
        </Block>
        <Block
          row
          borderTopWidth={1}
          borderColor={"#DADADA"}
          paddingVertical={14}
        >
          <Block maxWidth={getSize.s(64)} top={5} marginHorizontal={10}>
            <Text right color="#747474" size={12}>
              16-04-2023 15h20
            </Text>
          </Block>

          <Block flex>
            <Block alignEnd row>
              <Block
                backgroundColor={"#10A31E"}
                radius={14}
                alignCenter
                justifyCenter
                width={28}
                height={28}
              >
                <Image source={icons.ic_order} style={styles.ic_order} />
              </Block>
              <Block top={4} marginHorizontal={10}>
                <Text
                  color="#10A31E"
                  size={12}
                  fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
                >
                  Đơn đã đặt{" "}
                </Text>
                <Text color="#10A31E" size={12}>
                  Đơn hàng đang chờ xác nhận
                </Text>
              </Block>
            </Block>

            <Block
              marginLeft={14}
              width={1}
              height={41}
              backgroundColor={"#DADADA"}
            />
            <Block row>
              <Block
                radius={14}
                alignCenter
                justifyCenter
                borderWidth={1}
                borderColor={"#AAAAAA"}
                width={28}
                height={28}
              >
                <Image
                  source={icons.ic_prepare}
                  style={styles.ic_orderPrepare}
                />
              </Block>
              <Block bottom={4} flex marginHorizontal={10}>
                <Text
                  color="#747474"
                  size={12}
                  fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
                >
                  Đang chuẩn bị{" "}
                </Text>
                <Text color="#747474" size={12}>
                  Đơn hàng đang chuẩn bị
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default PrepareOrder;

const styles = StyleSheet.create({
  ImagePhanBon: {
    width: 67,
    height: 79,
  },
  bg_order: {
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    elevation: 10,
    shadowRadius: 4,
  },
  ic_order: {
    tintColor: "#FFF",
    width: 14,
    height: 14,
    resizeMode: "contain",
  },
  ic_orderPrepare: {
    tintColor: "#AAAAAA",
    width: 14,
    height: 14,
    resizeMode: "contain",
  },
});
