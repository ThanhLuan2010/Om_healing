import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef, useEffect } from "react";
import { Block, Text } from "@components";
import { theme } from "@theme";
import { width } from "@utils/responsive";

const data = [
  { id: 0, title: "Chờ xác nhận" },
  { id: 1, title: "Chờ lấy hàng" },
  { id: 2, title: "Đang giao" },
  { id: 3, title: "Đã giao" },
  { id: -1, title: "Đã Hủy" },
  { id: -2, title: "Không Thành Công" },
];
const TopTab = ({ indexTab, onChangeTab, status }) => {
  const refFlatListHorizontal = useRef(null);
  useEffect(() => {
    if (status === "success") {
      setTimeout(() => {
        refFlatListHorizontal.current?.scrollTo({
          x: width / 1.5,
          animated: true,
        });
      }, 300);
    }
    if (status === "delivering") {
      setTimeout(() => {
        refFlatListHorizontal.current?.scrollTo({
          x: width / 2.5,
          animated: true,
        });
      }, 300);
    }
    if (status === "Rate") {
      setTimeout(() => {
        refFlatListHorizontal.current?.scrollTo({
          x: width / 2,
          animated: true,
        });
      }, 300);
    }
  }, []);
  return (
    <Block justifyCenter space={"between"} marginTop={15} row>
      <ScrollView
        ref={refFlatListHorizontal}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onChangeTab(item.id)}
              style={[
                styles.press,
                {
                  borderBottomWidth: indexTab === item.id ? 2.5 : 0,
                },
              ]}
              key={index}
            >
              <Text
                size={18}
                color={indexTab === item.id ? "#10A31E" : "#747474"}
                numberOfLines={1}
                fontFamily={
                  indexTab === item.id
                    ? theme.fonts.fontFamily.SourceSans3SemiBold
                    : theme.fonts.fontFamily.SourceSans3Regular
                }
                style={styles.txt}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Block>
  );
};

export default TopTab;

const styles = StyleSheet.create({
  press: {
    marginHorizontal: 20,
    alignItems: "center",
    borderColor: "#10A31E",
  },
  txt: {},
});
