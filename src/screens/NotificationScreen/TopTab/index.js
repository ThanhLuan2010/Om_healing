import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Block, Text } from "@components";
import { theme } from "@theme";

const data = [
  { id: 0, title: "Hệ thống" },
  { id: 1, title: "Tin nhắn" },
];
const TopTab = ({ indexTab, onChangeTab }) => {
  return (
    <Block
      justifyCenter
      marginHorizontal={20}
      row
      marginVertical={30}
    >
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
});
