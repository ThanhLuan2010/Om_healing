import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { Block, Text } from "@components";
import OrderProduct from "@components/OrderProduct";

const data = [{}, {}, {}, {}, {}, {}];
const WaitingConfirm = () => {
  const renderProduct = (item, index) => {
    return <OrderProduct  index={index} itemTitle={"Chờ xác nhận"} />;
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block paddingBottom={200}>{data.map(renderProduct)}</Block>
    </ScrollView>
  );
};

export default WaitingConfirm;

const styles = StyleSheet.create({});
