import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Block, Text } from "@components";
import OrderProduct from "@components/OrderProduct";

const data = [{}, {}];
const OrderFailed = () => {
  const renderProduct = (item, index) => {
    return <OrderProduct index={index} itemTitle={"Thaast bai"} />;
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block paddingBottom={200}>{data.map(renderProduct)}</Block>
    </ScrollView>
  );
};

export default OrderFailed;

const styles = StyleSheet.create({});
