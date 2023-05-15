import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Block from "@components/Block";
import { getSize } from "@utils/responsive";
import { GradientButton, Text } from "@components";
import { theme } from "@theme";
import { images } from "@assets";
import { formatPrice } from "@utils/helper";
import { navigate } from "@navigation/RootNavigation";
import { DOMAIN } from "../../constants";

const Product = ({ item, index, onPress = null }) => {
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
        onPress={
          onPress ? onPress : () => navigate("ProductDetail", { item, index })
        }
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Block>
          <Image
            source={{
              uri:item?.product_image?.includes('https://')? item?.product_image: DOMAIN+item?.product_image,
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
                parseInt(item?.product_price?.toString().split(".")[0])
              )}
              đồng
            </Text>
          </Text>
          <GradientButton
            onPress={() => navigate("BuyProducts", { item , index})}
            style={styles.buyBtn}
            title={"Mua"}
          />
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

export default Product;

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
