import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Block, Text } from "@components";
import LinearGradient from "react-native-linear-gradient";
import { theme } from "@theme";
import { xor } from "lodash";

const dataTopTab = [
  {
    title: "Tất cả",
    id: 0,
  },
  {
    title: "Chuông xoay",
    id: 1,
  },
  {
    title: "TINGSHA",
    id: 2,
  },
  {
    title: "Set Chuông xoay",
    id: 3,
  },
  {
    title: "Chày gõ chuông",
    id: 4,
  },
  {
    title: "Phụ Kiện",
    id: 5,
  },
];

const TopTab = ({ onChangTab, indexTab }) => {
  return (
    <Block row>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {dataTopTab.map((item, index) => (
          <TouchableOpacity onPress={() => onChangTab(index)}>
            <LinearGradient
              style={styles.borderGradient}
              colors={theme.colors.gradient_red}
              key={index}
            >
              <Block
                radius={indexTab === index ? 10 : 20}
                paddingVertical={6}
                paddingHorizontal={41}
                backgroundColor={indexTab === index ? "white" : null}
              >
                <Text
                  size={18}
                  fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
                  color={
                    indexTab === index
                      ? theme.colors.color_register
                      : theme.colors.white
                  }
                >
                  {item.title}
                </Text>
              </Block>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Block>
  );
};

export default TopTab;

const styles = StyleSheet.create({
  borderGradient: {
    padding: 1,
    borderRadius: 10,
    margin: 10,
  },
});
