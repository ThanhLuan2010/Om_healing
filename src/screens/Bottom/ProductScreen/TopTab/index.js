import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Block, Text } from "@components";
import { theme } from "@theme";
import { useSelector } from "react-redux";
import { productSelect } from "../../../../store/slices/products";

const TopTab = ({ indexTab, onChangeTab }) => {
  const { Listcategory } = useSelector(productSelect);
  return (
    <Block
      justifyCenter
      space={"between"}
      marginTop={15}
      marginHorizontal={20}
      row
    >
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {Listcategory.map((item, index) => (
          <TouchableOpacity
            onPress={() => onChangeTab(item?.product_category_id)}
            style={[
              styles.press,
              {
                borderBottomWidth:
                  indexTab === item?.product_category_id ? 2.5 : 0,
              },
            ]}
            key={item?.product_category_id}
          >
            <Text
              size={18}
              color={
                indexTab === item?.product_category_id ? "#10A31E" : "#747474"
              }
              numberOfLines={1}
              fontFamily={
                indexTab === item?.product_category_id
                  ? theme.fonts.fontFamily.SourceSans3SemiBold
                  : theme.fonts.fontFamily.SourceSans3Regular
              }
              style={styles.txt}
            >
              {item?.product_category_name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Block>
  );
};

export default TopTab;

const styles = StyleSheet.create({
  press: {
    marginHorizontal: 2,
    alignItems: "center",
    borderColor: "#10A31E",
    marginRight: 23,
  },
  txt: {},
});
