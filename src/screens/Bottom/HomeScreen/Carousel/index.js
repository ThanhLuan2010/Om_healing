import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Block, Text } from "@components";
import { images } from "@assets";
import { theme } from "@theme";
import { getSize, width } from "@utils/responsive";
import Carousel from "react-native-reanimated-carousel";
import { DOMAIN } from "../../../../constants";
const CarouselComponent = ({ data }) => {
  return (
    <Block marginTop={10} marginHorizontal={20}>
      <Image source={images.blur_bg} style={styles.blur_bg} />
      <Block height={width - 40 + 9} space={"between"} absolute>
        <Block
          width={width - 80}
          row
          space={"between"}
          marginTop={24}
          marginHorizontal={20}
          alignCenter
        >
          <Text
            fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
            size={24}
            color="#10A31E"
          >
            Sản phẩm mới
          </Text>

          <TouchableOpacity>
            <Image source={images.ic_right} style={styles.ic_right} />
          </TouchableOpacity>
        </Block>
        <Carousel
          loop
          width={width - 40}
          height={getSize.v(238)}
          autoPlay={true}
          enabled={false}
          data={data}
          autoPlayInterval={0}
          scrollAnimationDuration={10000}
          renderItem={({ item, index }) => (
            <Block width={getSize.s(202)} key={index}>
              <Image
                style={styles.itemImg}
                source={{
                  uri: item.product_image?.includes("https://")
                    ? item.product_image
                    : DOMAIN + item.product_image,
                }}
              />
            </Block>
          )}
        />
      </Block>
    </Block>
  );
};

export default CarouselComponent;

const styles = StyleSheet.create({
  blur_bg: {
    width: width - 40,
    height: width - 40 + 9,
    borderRadiusL: 20,
  },
  ic_right: {
    width: getSize.s(10),
    height: getSize.s(18),
    resizeMode: "contain",
  },
  itemImg: {
    width: getSize.s(167),
    height: getSize.v(208),
    resizeMode: "cover",
  },
});
