import { Image, StyleSheet } from "react-native";
import React from "react";
import { images } from "@assets";
import { Block, Text } from "@components";
import styles from "./styles";
import { theme } from "@theme";

const dataCourse = [
  {
    image: images.course,
    title: "Khóa chuông xoay tiêu chuẩn",
    content:
      "Khoá học chuyên sâu về trị liệu Chuông xoay theo phương pháp truyền thống “Tradiontional Shakya Kasa” trong việc vận hành bộ Chuông xoay và Hệ thống 7 bài gõ dùng trong trị liệu. Khoá học được cấp Chứng chỉ Quốc Tế do trung tâm của Master Santa Shakya chứng nhận",
  },
  {
    image: images.course,
    title: "Khóa chuông xoay ứng dụng: Đời Sống",
    content:
      "Khoá học chuyên sâu về trị liệu Chuông xoay theo phương pháp truyền thống “Tradiontional Shakya Kasa” trong việc vận hành bộ Chuông xoay và Hệ thống 7 bài gõ dùng trong trị liệu. Khoá học được cấp Chứng chỉ Quốc Tế do trung tâm của Master Santa Shakya chứng nhận",
  },
];

const CourseComponent = () => {
  return (
    <Block>
      {dataCourse.map((item, index) => (
        <Block
          key={index}
          padding={8}
          style={styles.shadow}
          row
          marginBottom={20}
          marginHorizontal={20}
        >
          <Image style={styles.imgCourse} source={item.image} />
          <Block marginLeft={18} flex={1}>
            <Text
              color={theme.colors.black}
              size={16}
              fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
            >
              {item.title}
            </Text>
            <Text
              color={theme.colors.gray}
              fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
              size={10}
            >
              {item.content}
            </Text>
          </Block>
        </Block>
      ))}
    </Block>
  );
};

export default CourseComponent;
