import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Block, Text, Header } from "@components";
import { theme } from "@theme";
import TopTab from "./TopTab";
import { images } from "@assets";
import SellProductComponent from "@components/SellProductComponent";

const data = [
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
const SellScreen = () => {
  const [tabTop, setTabTop] = useState(0);
  const renderProduct = (item, index) => {
    return <SellProductComponent key={index} dataProduct={item} />;
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
  return (
    <Block backgroundColor={theme.colors.background}>
      <Header type="LinearBackground" />
      <ScrollView>
        <TopTab onChangTab={(id) => setTabTop(id)} indexTab={tabTop} />
        <Block marginBottom={31} marginHorizontal={10} row wrap>{data.map(renderProduct)}</Block>
      </ScrollView>
    </Block>
  );
};

export default SellScreen;

const styles = StyleSheet.create({});
