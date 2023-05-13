import { StyleSheet } from "react-native";
import React from "react";
import { Block, Header, Product, Text } from "@components";
import { theme } from "@theme";
import OrderProduct from "@components/OrderProduct";
import { navigate } from "@navigation/RootNavigation";

const VoteOrders = () => {
  return (
    <Block backgroundColor={theme.colors.white} flex>
      <Header title="Đánh gía sản phẩm" canGoBack />
      <Block>
        <OrderProduct
          onPress={() => navigate("VoteOrderDetail")}
          titStyle={styles.titStyle}
          itemTitle="Đơn hàng đã được giao thành công"
        />
      </Block>
    </Block>
  );
};

export default VoteOrders;

const styles = StyleSheet.create({
  titStyle: {
    fontSize: 14,
  },
});
