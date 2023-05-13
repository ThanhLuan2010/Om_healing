import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Block, Text } from "@components";
import OrderProduct from "@components/OrderProduct";

const data = [{}, {}, {}];
const WaitingPickUp = () => {
  const renderProduct = (item, index) => {
    return <OrderProduct index={index} itemTitle={"Chờ lấy hàng"} />;
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block paddingBottom={200}>{data.map(renderProduct)}</Block>
    </ScrollView>
  );
};

export default WaitingPickUp;

const styles = StyleSheet.create({});
