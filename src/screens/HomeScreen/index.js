import { images } from "@assets";
import CourseComponent from "@components/CourseComponent";
import NewsComponent from "@components/NewsComponent";
import { theme } from "@theme";
import { getSize, width } from "@utils/responsive";
import React, { useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { Block, Header, Text, TopNav } from "@components";
import Carousel from "react-native-reanimated-carousel";
import LinearGradient from "react-native-linear-gradient";

const dataCarousel = [
  {
    image: images.carousel,
  },
];

const dataListProduct = [
  {
    image: images.imgAll,
    title: "Tất cả sản phẩm",
    id: 1,
  },
  {
    image: images.img_bell,
    title: "Tất cả sản phẩm",
    id: 2,
  },
  {
    image: images.tingsha,
    title: "Tất cả sản phẩm",
    id: 3,
  },
  {
    image: images.set_bell,
    title: "Tất cả sản phẩm",
    id: 4,
  },
  {
    image: images.baseball,
    title: "Tất cả sản phẩm",
    id: 5,
  },
  {
    image: images.item_bell,
    title: "Tất cả sản phẩm",
    id: 6,
  },
];
const dataCourse = [{
  image: images.course,
  title:
    "[Event] Buổi lễ ký kết hợp tác độc quyền giữa Master Santa Ratna Shakya và OM Himalayas",
  content:
    "Sáng chủ nhật ngày 14-5-2023 vừa qua tại Trụ sở Om Himalayas: 256 Pasteur, Phường Võ Thị Sáu, Quận 3, TP.HCM đã diễn ra buổi ký kết đặc biệt giữa ",
  time: "16 tháng 5, 2023",
  more: "Xem thêm",
},
{
  image: images.course,
  title:
    "[Event] Buổi lễ ký kết hợp tác độc quyền giữa Master Santa Ratna Shakya và OM Himalayas",
  content:
    "Sáng chủ nhật ngày 14-5-2023 vừa qua tại Trụ sở Om Himalayas: 256 Pasteur, Phường Võ Thị Sáu, Quận 3, TP.HCM đã diễn ra buổi ký kết đặc biệt giữa ",
  time: "16 tháng 5, 2023",
  more: "Xem thêm",
},];
const HomeScreen = () => {
  const carouselRef = useRef();
  const [snapIndex, SetSnapIndex] = useState(0);
  const renderCarousel = ({ item, index }) => {
    return (
      <Block key={index}>
        <Image source={item.image} style={styles.imgCarousel} />
      </Block>
    );
  };
  const renderListProduct = () => {
    return (
      <Block wrap marginHorizontal={20} space={'between'} row>
        {dataListProduct.map((item, index) => (
          <TouchableOpacity
            onPress={() => { }}
            key={index}
            style={styles.item}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.titleList}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </Block>
    );
  };

  const renderCourse = (item, index) => {
    return <CourseComponent item={item} index={index} />;
  };

  const renderNews = (item, index) => {
    return <NewsComponent item={item} index={index} />;
  };
  return (
    <Block flex backgroundColor={theme.colors.background}>
      <ScrollView contentContainerStyle={{paddingBottom:getSize.v(80)}} showsVerticalScrollIndicator={false}>
        <Header type="LinearBackground" />
        <Block
          style={styles.carouselShadow}
          marginVertical={30}
          marginHorizontal={20}
        >
          <Carousel
            ref={carouselRef}
            data={dataCarousel}
            height={getSize.v(178)}
            renderItem={renderCarousel}
            width={width}
            onSnapToItem={(i) => SetSnapIndex(i)}
            loop
            style={{ width: width - 40 }}
          />
          <Block absolute right={22} bottom={19} alignCenter row>
            <TouchableOpacity
              onPress={() => carouselRef.current.prev()}
              style={styles.napLeft}
            >
              <Image source={images.ic_left} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.snapRight}
              onPress={() => carouselRef.current.next()}
            >
              <Image source={images.ic_right} style={styles.ic_napRight} />
            </TouchableOpacity>
          </Block>
        </Block>
        <Text
          color={theme.colors.color_register}
          fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
          size={18}
          marginHorizontal={20}
          marginBottom={20}
        >
          Danh sách sản phẩm
        </Text>
        <Block>{renderListProduct()}</Block>
        <Block
          marginBottom={20}
          row
          alignCenter
          space={"between"}
          marginHorizontal={20}
        >
          <Text
            color={theme.colors.color_register}
            size={18}
            fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
          >
            Khóa học chuông xoay
          </Text>
          <Block row alignCenter>
            <Text
              marginRight={7}
              color={theme.colors.gray}
              size={12}
              fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
            >
              Xem tất cả
            </Text>
            <Image source={images.ic_right} style={styles.ic_right} />
          </Block>
        </Block>
        {dataCourse.map(renderCourse)}
        <Block alignCenter>
          <Image source={images.heal} style={styles.heal} />
          <Block absolute alignSelf={'center'} width={width - 40}>
            <Block marginTop={16} marginRight={10} width={'50%'} alignSelf={'flex-end'}>
              <Text
                marginBottom={4}
                color={theme.colors.color_register}
                size={16}
                fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
              >
                Trị liệu tại om healing
              </Text>
              <Text
                numberOfLines={3}
                style={styles.txtHeal}
                size={10}
                color={theme.colors.white}
              >
                Hãy để Om Healing giúp bạn thư giãn, giải tỏa những căng thẳng và
                cân bằng lại năng lượng cho một cuộc sống chất lượng hơn.
              </Text>
              <TouchableOpacity>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={theme.colors.gradient_red}
                  style={styles.btnBooking}
                >
                  <Text
                    size={12}
                    color={theme.colors.white}
                    fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
                  >
                    Booking
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
        <Block
          marginTop={30}
          marginHorizontal={20}
          row
          alignCenter
          space={"between"}
        >
          <Text
            color={theme.colors.color_register}
            size={18}
            fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
          >
            Tin tức
          </Text>
          <Block row alignCenter>
            <Text
              marginRight={7}
              color={theme.colors.gray}
              size={12}
              fontFamily={theme.fonts.fontFamily.SourceSans3Regular}
            >
              Xem tất cả
            </Text>
            <Image source={images.ic_right} style={styles.ic_right} />
          </Block>
        </Block>
        {dataCourse.map(renderNews)}
        <Block alignCenter marginVertical={30}>
          <Image source={images.heal} style={styles.heal} />
          <Block width={width - 40} paddingTop={10} flex absolute >
            <Block width={'50%'} alignSelf={'flex-end'} marginRight={10}>
              <Text
                marginBottom={4}
                color={theme.colors.color_register}
                size={16}
                fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
              >
                RETREAT CHỮA LÀNH
              </Text>
              <Text
                numberOfLines={3}
                style={styles.txtHeal}
                size={10}
                color={theme.colors.white}
              >
                Retreat là cơ hội để chúng ta tạm rời xa cuộc sống thường ngày,
                đến những nơi yên tĩnh và tập trung vào sức khỏe cả về thể chất
                lẫn tinh thần.
              </Text>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    paddingBottom: 15,
  },
  shadow: {
    elevation: 5,
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  ic_setting: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: theme.colors.white,
    marginLeft: 18,
  },
  napLeft: {
    width: 21,
    height: 21,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: theme.colors.orange,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 3,
  },
  snapRight: {
    width: 21,
    height: 21,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: theme.colors.orange,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 3,
  },
  ic_napRight: {
    width: 12,
    height: 12,
    resizeMode: "contain",
  },
  imgCarousel: {
    height: "100%",
    resizeMode: "cover",
    borderRadius: 6,
    width: width - 40,
  },
  carouselShadow: {
    elevation: 2,
    shadowRadius: 3,
    shadowOpacity: 0.3,
    borderRadius: 6,
    backgroundColor: theme.colors.white,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  item: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    width: width / 2 - 30,
  },
  image: {
    resizeMode: "cover",
    height: getSize.v(84),
    borderRadius: 10,
    width: '100%'
  },
  titleList: {
    position: "absolute",
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: theme.fonts.fontFamily.SourceSans3SemiBold,
  },
  ic_right: {
    tintColor: theme.colors.gray,
    width: 10,
    height: 10,
    resizeMode: "contain",
  },
  btnBooking: {
    alignSelf: "flex-end",
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginTop: 5,
    right: 15,
  },
  heal: {
    marginHorizontal: 20,
    height: getSize.v(178),
    resizeMode: 'cover',
    width: width - 40,
    borderRadius: 6
  },
});
