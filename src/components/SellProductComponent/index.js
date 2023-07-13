import {
  Image,
  StyleSheet,
  Linking,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { Block, Text } from "@components";
import { images } from "@assets";

import { getSize, width } from "@utils/responsive";
import { theme } from "@theme";



const Card = (props) => {
  
  return (
    <Block width={(width-60)/2}  marginHorizontal={10} backgroundColor={theme.colors.white}   >
      <Block alignCenter >
        <Image source={props.image} style={styles.imgProduct} />
        <Text
          marginTop={6}
          size={16}
          color={theme.colors.color_register}
          fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
          center
        >
          {props.name}
        </Text>
        <Text size={14} marginVertical={4} center>
          Size:
          {props.size}
        </Text>
        <Text size={14} color={theme.colors.black} center>
          Gía : Liên Hệ
        </Text>
        <Pressable onPress={() => Linking.openURL(props.price_Url)}>
          <Text
            textDecorationLine={"underline"}
            fontFamily={theme.fonts.fontFamily.SourceSans3Italic}
            color={theme.colors.color_register}
            center
          >
            {props.price_Url}
          </Text>
        </Pressable>
      </Block>
    </Block>
  );
};


const SellProductComponent = ({ dataProduct }) => {
  return (
      <Card
        id={dataProduct.id}
        name={dataProduct.name}
        image={dataProduct.image}
        size={dataProduct.size}
        price_Url={dataProduct.price_Url}
      />
  );
};

export default SellProductComponent;

const styles = StyleSheet.create({
  imgProduct: {
    width: '100%',
    height: getSize.v(160),
    resizeMode: "cover",
    borderRadius: 8,
  },

});
