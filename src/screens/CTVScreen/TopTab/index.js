import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Block, Text } from "@components";
import { theme } from "@theme";

const data = [
  { id: 0, title: "Đơn hàng cần giao" },
  { id: 1, title: "Đơn hàng đang giao" },
  { id: 2, title: "Giao thành công" },
  { id: 3, title: "Giao thất bại" },
];
const TopTab = ({ indexTab, onChangeTab }) => {
  return (
    <Block paddingBottom={10} style={styles.container} justifyCenter  marginTop={10} row >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <TouchableOpacity
            onPress={() => onChangeTab(index)}
            style={[
              styles.press,
              {
                borderBottomWidth: indexTab === index ? 2.5 : 0,
              },
            ]}
            key={index}
          >
            <Text
              size={18}
              color={indexTab === index ? "#10A31E" : "#747474"}
              numberOfLines={1}
              fontFamily={
                indexTab === index
                  ? theme.fonts.fontFamily.SourceSans3SemiBold
                  : theme.fonts.fontFamily.SourceSans3Regular
              }
              style={styles.txt}
            >
              {item.title}
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
    marginHorizontal: 10,
    alignItems: "center",
    borderColor: "#10A31E",
  },
  txt: {},
  container:{
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.2)'
  }
});
