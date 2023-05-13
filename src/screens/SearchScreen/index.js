import { baseQuery } from "@api/baseQuery";
import { images } from "@assets";
import { Block, Header, SearchBar, Text } from "@components";
import { goBack, navigate } from "@navigation/RootNavigation";
import { theme } from "@theme";
import { getSize, width } from "@utils/responsive";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { DOMAIN } from "../../constants";
import { dispatch } from "@store/configStore";
import { productSelect } from "@store/slices/products";
import { useSelector } from "react-redux";
import { searchSelect, setListSearch } from "@store/slices/search";
import { routes } from "@navigation/routes";

const nearData = [
  { title: "Thuốc trừ sâu" },
  { title: "Phân bón hữu cơ" },
  { title: "Phân bón" },
  { title: "Pesle Super 374" },
];

const SearchScreen = ({ navigation, route }) => {
  const [dataSuggest, setdataSuggest] = useState([]);
  const { listSearch } = useSelector(searchSelect);
  useEffect(() => {
    getData();
  }, []);

  console.log("======listSearch=====", listSearch);

  const getData = async () => {
    const response = await baseQuery({
      url: "product/list",
      query: {
        selling: 1,
      },
    });
    if (response.data && response.status) {
      setdataSuggest(response.data.data);
    }
  };

  const renderNear = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          goBack();
          route.params?.setValue({ valueSearch: item });
          // dispatch(setListSearch(txt));
        }}
        style={{
          minWidth: (width - 40) / 4,
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
        key={index}
      >
        <Image source={images.ic_search} style={styles.icSearch} />
        <Text
          color="#AAAAAA"
          marginLeft={10}
          fontFamily={theme.fonts.fontFamily.SourceSans3LightItalic}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSuggess = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => navigate("ProductDetail", { item, index })}
        style={{
          flexDirection: "row",
          marginTop: 18,
          paddingTop: 18,
          borderColor: "#848484",
          borderTopWidth: index === 0 ? 0 : 0.5,
        }}
        key={index}
      >
        <Image
          style={styles.imgSuggess}
          source={{
            uri: item?.product_image?.includes("https://")
              ? item?.product_image
              : DOMAIN + item?.product_image,
          }}
        />
        <Block marginLeft={23} alignCenter flex row space={"between"}>
          <Text
            numberOfLines={2}
            fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
          >
            {item?.product_name}
          </Text>
          <Image style={styles.icRight} source={images.ic_right} />
        </Block>
      </TouchableOpacity>
    );
  };
  return (
    <Block flex backgroundColor={theme.colors.white}>
      <Header style={styles.header} canGoBack title={"Tìm kiếm"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Block marginTop={5}>
          <SearchBar
            onPressSearch={(txt) => {
              goBack();
              route.params?.setValue({ valueSearch: txt });
              dispatch(setListSearch(txt));
            }}
          />
        </Block>
        {listSearch?.length > 0 && (
          <Block marginHorizontal={20} marginTop={17}>
            <Text size={18} color="#747474">
              Gần đây
            </Text>
            <Block row wrap>
              {listSearch?.length > 0 && listSearch?.map(renderNear)}
            </Block>
          </Block>
        )}

        <Block marginBottom={50} marginHorizontal={20} marginTop={17}>
          <Text size={18} color="#747474">
            Đề xuất
          </Text>
          <Block wrap>{dataSuggest.map(renderSuggess)}</Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  header: {
    elevation: 0,
    shadowColor: "transparent",
  },
  icSearch: {
    width: 15,
    height: 15,
  },
  imgSuggess: {
    width: getSize.s(57),
    height: getSize.s(91),
  },
  icRight: {
    tintColor: "#747474",
    width: 10,
    height: 18,
    resizeMode: "contain",
  },
});
