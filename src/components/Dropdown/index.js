import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Block from "@components/Block";
import { getSize, width } from "@utils/responsive";
import { theme } from "@theme";
import { GradientButton, Text } from "@components";
import { images } from "@assets";
import { baseQuery } from "../../api/baseQuery";
import { useDispatch, useSelector } from "react-redux";
import { bookSelect, setCategory } from "@store/slices/book";

const Dropdown = ({ onChangeText, value, onPress, onCategoryPress }) => {
  const listHeight = new Animated.Value(0);
  const SearchHeight = new Animated.Value(0);
  const inputHeight = new Animated.Value(0);
  const categoryWidth = new Animated.Value(width - 80);
  const dispatch = useDispatch();
  const { Listcategory } = useSelector(bookSelect);

  useEffect(() => {
    getListCategory();
  }, []);

  const getListCategory = async () => {
    const response = await baseQuery({
      url: "categories",
      params: {
        sort: "-name",
      },
    });
    if (response.data.status && response.data.data) {
      dispatch(setCategory(response.data.data));
    }
  };

  const StartAnimated = () => {
    if (parseInt(JSON.stringify(listHeight)) === 0) {
      Animated.parallel([
        Animated.timing(SearchHeight, {
          toValue: 0,
          duration: 1,
          useNativeDriver: false,
        }),
        Animated.timing(inputHeight, {
          toValue: 0,
          duration: 1,
          useNativeDriver: false,
        }),
        Animated.timing(listHeight, {
          toValue: 300,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(categoryWidth, {
          toValue: width - 40,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(SearchHeight, {
          toValue: 0,
          duration: 1,
          useNativeDriver: false,
        }),
        Animated.timing(inputHeight, {
          toValue: 0,
          duration: 1,
          useNativeDriver: false,
        }),
        Animated.timing(listHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(categoryWidth, {
          toValue: width - 80,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const StartSearchAnimated = () => {
    if (parseInt(JSON.stringify(SearchHeight)) === 0) {
      Animated.parallel([
        Animated.timing(SearchHeight, {
          toValue: 300,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(inputHeight, {
          toValue: 40,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(SearchHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(inputHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const renderCategoryc = (item, index) => {
    return (
      <Block
        paddingVertical={18}
        borderBottomWidth={1}
        borderColor={theme.colors.borderColor}
        alignCenter
        key={index}
      >
        <TouchableOpacity
          onPress={() => {
            StartAnimated();
            setTimeout(() => {
              onCategoryPress(item);
            }, 300);
          }}
        >
          <Text>{item?.name || "-"}</Text>
        </TouchableOpacity>
      </Block>
    );
  };

  const renderEmpty = () => {};

  return (
    <Block width={width} absolute zIndex={20}>
      <Block marginHorizontal={20} row alignCenter>
        <Animated.View
          style={{
            width: categoryWidth,
            backgroundColor: theme.colors.white,
            borderRadius: 10,
            marginTop: 10,
            marginRight: 10,
            zIndex: 10,
          }}
        >
          <TouchableOpacity onPress={StartAnimated} style={styles.drop}>
            <Block
              flex
              backgroundColor={theme.colors.white}
              height={getSize.v(41)}
              radius={10}
              justifyCenter
              alignCenter
              row
              paddingHorizontal={20}
              width={width - 80}
              zIndex={10}
            >
              <Text
                flex
                size={16}
                fontFamily={theme.fonts.fontFamily.BeVietnamPro_Bold}
                center
              >
                Danh mục sách
              </Text>
            </Block>
            <Image source={images.ic_down} style={styles.icDown} />
          </TouchableOpacity>
        </Animated.View>
        <Pressable
          style={{ position: "absolute", right: 0 }}
          onPress={StartSearchAnimated}
        >
          <Image source={images.ic_search} style={styles.icSearch} />
        </Pressable>
      </Block>

      <Animated.View style={[{ height: listHeight }]}>
        <Block
          style={styles.shadow}
          radius={10}
          marginHorizontal={20}
          marginTop={10}
          backgroundColor={theme.colors.white}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {Listcategory?.length > 0
              ? Listcategory?.map(renderCategoryc)
              : renderEmpty()}
          </ScrollView>
        </Block>
      </Animated.View>

      <Animated.View style={[{ height: SearchHeight }]}>
        <Block
          style={styles.shadow}
          radius={35}
          marginHorizontal={20}
          marginTop={10}
          backgroundColor={theme.colors.primaryColor}
          alignCenter
        >
          <Block radius={30} marginTop={29} backgroundColor={"white"}>
            <Animated.View style={[styles.input, { height: inputHeight }]}>
              <TextInput onChangeText={onChangeText} value={value} style={{}} />
            </Animated.View>
          </Block>

          <GradientButton
            onPress={() => {
              onPress();
              StartSearchAnimated();
            }}
            style={styles.button}
            title={"Tìm kiếm"}
          />
        </Block>
      </Animated.View>
    </Block>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  icDown: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    // right: 20,
    // position:'absolute'
    marginRight: 20,
  },
  icSearch: {
    width: 27,
    height: 27,
    resizeMode: "contain",
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 0.2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  drop: {
    flex: 1,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  scroll: {
    paddingVertical: 10,
  },
  input: {
    width: width - 80,
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 5,
    shadowOffset: {
      width: -2,
      height: -2,
    },
  },
  button: {
    marginTop: 50,
    paddingHorizontal: 46,
    borderRadius: 24,
    marginBottom: 27,
  },
});
