import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Block, Text } from "@components";
import { getSize } from "@utils/responsive";
import { theme } from "@theme";
import { images } from "@assets";
import { navigate } from "@navigation/RootNavigation";
import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

const ListNews = ({ data }) => {
  const renderEmpty = () => {
    return (
      <Block flex justifyCenter>
        <Text size={20} center color={theme.colors.backgroundInput}>
          Danh sách trống
        </Text>
      </Block>
    );
  };
  const renderNews = (item, index) => {
    return (
      <Block marginTop={30} marginHorizontal={20} key={index}>
        <TouchableOpacity onPress={() => navigate("NewsDetail",{item})}>
          <Image
            style={styles.newsImage}
            source={{ uri: item?.article_image }}
          />
          <Block marginTop={15} row space={"between"}>
            <Text
              flex
              marginRight={10}
              fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
              numberOfLines={2}
            >
              {item?.article_title}
            </Text>
            <Text fontFamily={theme.fonts.fontFamily.SourceSans3LightItalic}>
              {moment(item?.created_at).fromNow()}
            </Text>
          </Block>

          <Text numberOfLines={2} marginTop={6} color="#747474" lineHeight={23}>
            {item?.article_description}
          </Text>

          <Block marginTop={15} alignCenter row space={"between"}>
            <Block row alignCenter>
              <Image source={images.ic_comment} style={styles.iconComment} />
              <Text
                marginLeft={10}
                fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
                color="#10A31E"
              >
                Bình luận
              </Text>
            </Block>
            <Text
              color="#747474"
              size={14}
              fontFamily={theme.fonts.fontFamily.BeVietnamPro_Light}
            >
              {0} lượt bình luận
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    );
  };
  return (
    <Block flex>
      {data?.length > 0 ? data?.map(renderNews) : renderEmpty()}
    </Block>
  );
};

export default ListNews;

const styles = StyleSheet.create({
  newsImage: {
    height: getSize.v(260),
    borderRadius: 9,
  },
  iconComment: {
    width: getSize.s(16),
    height: getSize.s(16),
    resizeMode: "contain",
  },
});
