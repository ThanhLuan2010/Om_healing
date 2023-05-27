import {
  Image,
  StyleSheet,
  Linking,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { Block, Text } from "@components";
import { images } from "@assets";

import { getSize } from "@utils/responsive";
import { theme } from "@theme";

export const data = [
  {
    image: images.bg_blur1,
    name: "Chuông khắc ",
    size: 16,
    price_Url: "https://omhealing.com.vn/san-pham/",
  },
  {
    image: images.bg_blur1,
    name: "Chuông khắc ",
    size: 16,
    price_Url: "https://omhealing.com.vn/san-pham/",
  },
  {
    image: images.bg_blur1,
    name: "Chuông khắc ",
    size: 16,
    price_Url: "https://omhealing.com.vn/san-pham/",
  },
  {
    image: images.bg_blur1,
    name: "Chuông khắc ",
    size: 16,
    price_Url: "https://omhealing.com.vn/san-pham/",
  },
];
const Card = (props) => {
  return (
    <Block style={styles.card}>
      <Block alignCenter padding={12}>
        <Image source={props.image} style={styles.imgProduct} />
        <Text
          marginTop={6}
          size={16}
          color={theme.colors.color_register}
          fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
          center
        >
          {props.name}
        </Text>
        <Text size={14} marginVertical={4} center>
          Size:
          {props.size}
        </Text>
        <Text size={14} color={theme.colors.black} center>
          Gía : Liên Hệ
        </Text>
        <Pressable onPress={() => Linking.openURL(props.price_Url)}>
          <Text
            textDecorationLine={"underline"}
            fontFamily={theme.fonts.fontFamily.SourceSans3Italic}
            color={theme.colors.color_register}
            center
          >
            {props.price_Url}
          </Text>
        </Pressable>
      </Block>
    </Block>
  );
};

const Empty = () => {
  return (
    <Block backgroundColor={"red"}>
      <Text
        color={theme.colors.gray}
        fontFamily={theme.fonts.fontFamily.SourceSans3Italic}
        size={18}
      >
        Hiện sản phẩm đang được cập nhật
      </Text>
    </Block>
  );
};
const SellProductComponent = ({ ...props }) => {
  return (
    <ScrollView contentContainerStyle={styles.row}>
      {props.dataProduct.map((item, index) => {
        return (
          <Block width={"50%"} row>
            <Card
              key={index}
              id={item.id}
              name={item.name}
              image={item.image}
              size={item.size}
              price_Url={item.price_Url}
            />
          </Block>
        );
      })}
      {props.dataProduct.length > 0 ? <></> : Empty()}
    </ScrollView>
  );
};

export default SellProductComponent;

const styles = StyleSheet.create({
  imgProduct: {
    width: getSize.m(160),
    height: getSize.m(160),
    resizeMode: "cover",
    borderRadius: 8,
  },
  card: {
    backgroundColor: theme.colors.white,
    flex: 1,
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },

    elevation: 3,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
