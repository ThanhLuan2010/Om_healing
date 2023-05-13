import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Block, GradientButton, Text } from "@components";
import { theme } from "@theme";
import { getSize, width } from "@utils/responsive";
import { goBack } from "@navigation/RootNavigation";
import { images } from "@assets";

const OrderModal = (props) => {
  const { title, status, onPress } = props.route.params;
  return (
    <Block justifyCenter alignCenter flex backgroundColor={"rgba(0,0,0,0.5)"}>
      <Block
        paddingHorizontal={15}
        paddingVertical={17}
        radius={8}
        width={width * 0.9}
        backgroundColor={theme.colors.white}
      >
        <Text
          size={18}
          marginBottom={17}
          center
          fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
        >
          {title}
        </Text>
        <Image
          source={
            status === "delivering" ? images.ic_delivering : images.ic_check
          }
          style={styles.icon}
        />

        <Block row justifyCenter marginTop={20}>
          <GradientButton
            onPress={onPress ? onPress : goBack}
            title="Xác nhận"
            style={styles.button}
          />
        </Block>
      </Block>
    </Block>
  );
};

export default OrderModal;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#19AE67",
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 5,
    width: width * 0.9 - 40,
    alignItems: "center",
  },
  Cancelbutton: {
    backgroundColor: "#F04444",
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 5,
    width: width / 4,
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    width: getSize.s(85),
    height: getSize.s(85),
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 20,
  },
});
