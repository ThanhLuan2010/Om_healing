import { baseQuery } from "@api/baseQuery";
import { Block, GradientButton, KeyboardWrap, Text } from "@components";
import { goBack } from "@navigation/RootNavigation";
import { theme } from "@theme";
import { setLoading, showAlert } from "@utils/navigator";
import { getSize, width } from "@utils/responsive";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

const DeliveryFail = ({ route }) => {
  const { item } = route.params;
  const [inputValue, setinputValue] = useState("");

  const onCallapi = async () => {
    setLoading(true);
    const response = await baseQuery({
      url: "ship/update-status-order",
      method: "POST",
      body: {
        id: item.order_id,
        status: -2,
        reason: inputValue,
      },
    });
    setLoading(false);
    const { data, message, status } = response;
    if (status) {
      goBack();
      goBack()
      // navigate("OrderScreen");
      showAlert(
        "Thành Công",
        message || "Huỷ đơn hàng thành công",
        "Chấp nhận",
        "",
        () => {
          goBack();
        }
      );
    } else {
      showAlert(
        "Thất bại",
        message || "Huỷ đơn hàng thất bại",
        "Chấp nhận",
        "",
        () => goBack()
      );
    }
  };
  return (
    <Pressable onPress={() => goBack()} style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Pressable
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <Block
            paddingHorizontal={15}
            paddingVertical={17}
            borderTopRightRadius={19}
            borderTopLeftRadius={10}
            width={width}
            backgroundColor={theme.colors.white}
          >
            <Text
              color="#FF0000"
              size={24}
              marginBottom={17}
              center
              fontType="bold"
            >
              Giao hàng không thành công
            </Text>

            <TextInput
              multiline
              maxLength={1000}
              placeholder="Nhập lý do huỷ đơn hàng"
              style={styles.input}
              value={inputValue}
              onChangeText={(txt) => setinputValue(txt)}
              textAlignVertical="top"
            />

            <GradientButton
              title="Huỷ đơn hàng"
              style={styles.buttonCancel}
              onPress={onCallapi}
              colors={["transparent", "transparent"]}
              styleTitle={{ color: "#FF0000" }}
            />
          </Block>
        </Pressable>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

export default DeliveryFail;

const styles = StyleSheet.create({
  imgProduct: {
    width: getSize.s(101),
    height: getSize.s(122),
  },
  buyBtn: {
    alignItems: "center",
    borderRadius: 5,
  },
  icHetHang: {
    width: getSize.s(54),
    height: getSize.s(54),
    position: "absolute",
    right: -10,
    top: -30,
  },
  setCountBtn: {
    width: getSize.s(32),
    height: getSize.s(32),
    backgroundColor: theme.colors.white,
    borderRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Countinput: {
    width: getSize.s(69),
    height: getSize.s(32),
    backgroundColor: theme.colors.white,
    borderRadius: 2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 9,
  },
  container: {
    justifyContent: "flex-end",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  input: {
    height: 200,
    backgroundColor: theme.colors.backgroundInput,
    borderRadius: 8,
    padding: 10,
    fontFamily: theme.fonts.fontFamily.SourceSans3Italic,
  },
  buttonCancel: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#FF0000",
    marginHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});
