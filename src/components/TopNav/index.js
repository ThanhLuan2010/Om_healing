import { images } from "@assets";
import Block from "@components/Block";
import { navigate } from "@navigation/RootNavigation";
import { getSize } from "@utils/responsive";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const TopNav = () => {
  return (
    <Block
      paddingHorizontal={20}
      paddingVertical={20}
      alignCenter
      space={"between"}
      row
      marginTop={10}
    >
      <TouchableOpacity onPress={()=>navigate('ChatScreen')}>
        <Image source={images.ic_chat} style={styles.icQuize} />
      </TouchableOpacity>
      <Block alignCenter space={"between"} row>
        <TouchableOpacity
          onPress={() => navigate("NotificationScreen")}
          style={{ marginRight: 40 }}
        >
          <Image source={images.ic_bell} style={styles.icQuize} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate("AccountScreen")}>
          <Image source={images.ic_account} style={styles.icUser} />
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

export default TopNav;

const styles = StyleSheet.create({
  icQuize: {
    width: 26,
    height: 31,
    resizeMode: "center",
  },
  icUser: {
    width: getSize.m(38),
    height: getSize.m(38),
  },
});
