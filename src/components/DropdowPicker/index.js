import { baseQuery } from "../../api/baseQuery";
import { setCategory } from "@store/slices/book";
import { theme } from "@theme";
import { getSize } from "@utils/responsive";
import React, { useEffect } from "react";
import { Shadow } from "react-native-neomorph-shadows";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch } from "react-redux";
import styles from "./styles";
import { Block, Text } from "@components";
import { Image } from "react-native";
const countries = [
  {
    id: 27,
    name: "Hà Nội",
    order: 1,
  },
  {
    id: 30,
    name: "TP. Hồ Chí Minh",
    order: 2,
  },
  {
    id: 1,
    name: "An Giang",
    order: 4,
  },
  {
    id: 2,
    name: "Bắc Giang",
    order: 5,
  },
  {
    id: 3,
    name: "Bắc Kạn",
    order: 6,
  },
  {
    id: 4,
    name: "Bạc Liêu",
    order: 7,
  },
  {
    id: 5,
    name: "Bắc Ninh",
    order: 8,
  },
  {
    id: 6,
    name: "Bà Rịa-Vũng Tàu",
    order: 9,
  },
  {
    id: 7,
    name: "Bến Tre",
    order: 10,
  },
  {
    id: 8,
    name: "Bình Định",
    order: 11,
  },
  {
    id: 9,
    name: "Bình Dương",
    order: 12,
  },
  {
    id: 10,
    name: "Bình Phước",
    order: 13,
  },
  {
    id: 11,
    name: "Bình Thuận",
    order: 14,
  },
  {
    id: 12,
    name: "Cà Mau",
    order: 15,
  },
  {
    id: 13,
    name: "Cần Thơ",
    order: 16,
  },
  {
    id: 14,
    name: "Cao Bằng",
    order: 17,
  },
  {
    id: 15,
    name: "Đà Nẵng",
    order: 18,
  },
  {
    id: 16,
    name: "Đắk Lắk",
    order: 19,
  },
  {
    id: 17,
    name: "Đắk Nông",
    order: 20,
  },
  {
    id: 18,
    name: "Điện Biên",
    order: 21,
  },
  {
    id: 19,
    name: "Đồng Nai",
    order: 22,
  },
  {
    id: 20,
    name: "Đồng Tháp",
    order: 23,
  },
  {
    id: 21,
    name: "Gia Lai",
    order: 24,
  },
  {
    id: 22,
    name: "Hà Giang",
    order: 25,
  },
  {
    id: 23,
    name: "Hà Nam",
    order: 26,
  },
];

const AreaPicker = ({ ...props }) => {
  const {
    ref,
    label,
    labelStyle,
    containerInputStyle,
    fontType = theme.fonts.fontFamily.BeVietnamPro,
    color,
    size,
    isSecure,
    rightIcon,
    leftIcon,
    maxHeight,
    maxLength,
    inputStyle,
    errorText,
    isError,
    disabled,
    errorContainerStyle,
    isRequired,
    value,
    onChangeText,
    onSubmitEditing,
    numberOfLines,
    multiline,
    containerStyle,
    placeholder = "Chọn giá trị",
    data = [],
    onSelectItem = () => {},
    ...inputProps
  } = props;

  return (
    <Block row alignCenter style={[containerStyle, styles.shadow,]}>
      <SelectDropdown
        defaultButtonText={placeholder}
        data={data}
        dropdownStyle={{
          backgroundColor: "white",
          // bottom:20
        }}
        // dropdownOverlayColor={"transparnet"}
        renderCustomizedRowChild={(item, index) => {
          return (
            <Text marginHorizontal={10} size={12} key={index}>
              {item.name}
            </Text>
          );
        }}
        buttonTextStyle={{
          color: theme.colors.placeholder,
          fontSize: getSize.m(14),
          textAlign: "left",
        }}
        buttonStyle={{
          width: "100%",
          borderRadius: 4,
          backgroundColor: "transparent",
        }}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
          onSelectItem(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.name;
        }}
        rowTextForSelection={(item, index) => {
          // return item;
        }}
      />

      <Block absolute right={10}>
        {rightIcon}
      </Block>
    </Block>
  );
};

export default AreaPicker;
