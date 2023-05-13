import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Block, Text } from "@components";
import { theme } from "@theme";

const TopTab = ({ indexTab, onChangeTab, data }) => {
  return (
    <Block justifyCenter marginTop={15} marginHorizontal={20} row>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => (
          <TouchableOpacity
            onPress={() => onChangeTab(item?.article_category_id)}
            style={[
              styles.press,
              {
                borderBottomWidth:
                  indexTab === item?.article_category_id ? 2.5 : 0,
              },
            ]}
            key={index}
          >
            <Text
              size={18}
              color={
                indexTab === item?.article_category_id ? "#10A31E" : "#747474"
              }
              numberOfLines={1}
              fontFamily={
                indexTab === item?.article_category_id
                  ? theme.fonts.fontFamily.SourceSans3SemiBold
                  : theme.fonts.fontFamily.SourceSans3Regular
              }
              style={styles.txt}
            >
              {item?.article_category_title}
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
    marginHorizontal: 8,
    alignItems: "center",
    borderColor: "#10A31E",
  },
  txt: {},
});
