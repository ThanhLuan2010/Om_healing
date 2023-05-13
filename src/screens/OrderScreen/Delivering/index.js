import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Block, Text } from "@components";
import OrderProduct from "@components/OrderProduct";

const data = [];
const Delivering = () => {
  const renderProduct = (item, index) => {
    return <OrderProduct index={index} itemTitle={"Giao hang"} />;
  };
  const Empty = () => {
    return (
      <Block flex justifyCenter>
        <Text center color="black">
          Danh sách trống
        </Text>
      </Block>
    );
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block paddingBottom={200}>{data.map(renderProduct)}</Block>
      {data.length > 0 ? <></> : Empty()}
    </ScrollView>
  );
};

export default Delivering;

const styles = StyleSheet.create({});
