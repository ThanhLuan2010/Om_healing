import { images } from "@assets";
import Block from "@components/Block";
import { setisFromHome } from "@store/slices/user";
import { theme } from "@theme";
import { getSize } from "@utils/responsive";
import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
const SearchBar = ({
  placeholder = "Tìm kiếm",
  onPressSearch = () => {},
  onFocus = () => {},
  valueSearch,
  searchBarRef,
}) => {
  const [value, setvalue] = useState(valueSearch);
  const dispatch = useDispatch();
  return (
    <Pressable style={{ marginHorizontal: 20 }}>
      <Block
        paddingVertical={Platform.OS === "ios" ? 12 : 0}
        paddingHorizontal={20}
        // marginHorizontal={20}
        row
        alignCenter
        radius={6}
        backgroundColor={"#EBEBEB"}
      >
        <TouchableOpacity
          onPress={() => {
            dispatch(setisFromHome(false));
            onPressSearch(value);
          }}
        >
          <Image source={images.ic_search} style={styles.icSearch} />
        </TouchableOpacity>
        <TextInput
          onFocus={onFocus}
          style={styles.input}
          placeholder={placeholder}
          value={valueSearch}
          onChangeText={(txt) => setvalue(txt)}
          ref={searchBarRef}
          onEndEditing={() => {
            dispatch(setisFromHome(false));
            onPressSearch(value);
          }}
        />
      </Block>
    </Pressable>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  icSearch: {
    width: getSize.m(20),
    height: getSize.m(20),
    resizeMode: "contain",
  },
  input: {
    marginLeft: getSize.m(10),
    fontFamily: theme.fonts.fontFamily.SourceSans3Italic,
    flex: 1,
  },
});
