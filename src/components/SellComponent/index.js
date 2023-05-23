import { Image, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Block, Text } from "@components";
import { theme } from "@theme";
import TopTab from "./TopTab";
import { images } from "@assets";
import SellProductComponent from "@components/SellProductComponent";
import { data } from "@components/SellProductComponent";

const SellComponent = () => {
  const [dataProduct, setDataProduct] = useState(data);
  const [tabTop, setTabTop] = useState(0);
  const renderProduct = () => {
    return <SellProductComponent dataProduct={dataProduct} />;
  };
  return (
    <Block backgroundColor={theme.colors.milk_orange} flex>
      <Header />
      <ScrollView>
        <TopTab onChangTab={(id) => setTabTop(id)} indexTab={tabTop} />
        <Block marginBottom={31}>{dataProduct.map(renderProduct)}</Block>
      </ScrollView>
    </Block>
  );
};

export default SellComponent;
const Header = () => {
  return (
    <Block height={100} backgroundColor={"red"}>
      <Text>sssss</Text>
    </Block>
  );
};

const styles = StyleSheet.create({});
