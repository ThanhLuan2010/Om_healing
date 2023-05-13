import { images } from "@assets";
import { Block, Header, Text } from "@components";
import database from "@react-native-firebase/database";
import { userSelect } from "@store/slices/user";
import { theme } from "@theme";
import { getSize, width } from "@utils/responsive";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";

let dataMess = [];
const ChatScreen = (props) => {
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [inputValue, setinputValue] = useState("");
  const { userInfo } = useSelector(userSelect);
  const messagesRef = database().ref("chat/" + userInfo?.user_id);

  useEffect(() => {
    const messagesQuery = messagesRef.orderByChild("timestamp");
    messagesQuery.on("value", (snapshot) => {
      const _data = [];
      snapshot.forEach((childSnapshot) => {
        _data.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      setMessages(_data?.reverse());
    });
    return () => {
      messagesQuery.off("value");
    };
  }, []);

  const callApi = async (value) => {
    const body = {
      timestamp: database.ServerValue.TIMESTAMP,
      _id: uuid.v4(),
      create_at: new Date().getTime(),
      text: value,
      user: {
        _id: userInfo?.user_id,
        name: userInfo?.user_name || "Khách hàng mới",
        avatar: userInfo?.user_image || "",
      },
    };
    setloading(true);
    messagesRef.push(body);
    setloading(false);
  };

  const onSend = useCallback((_messages = []) => {
    const value = _messages[0].text;
    callApi(value);
  }, []);

  const renderInputToolBar = () => {
    return (
      <Block bottom={25} backgroundColor={"red"} marginBottom={10}>
        <Block
          paddingHorizontal={26}
          backgroundColor={theme.colors.black}
          row
          alignCenter
          bottom={0}
          paddingTop={10}
          paddingVertical={25}
        >
          <Block
            backgroundColor={theme.colors.background}
            radius={22}
            paddingLeft={10}
            alignCenter
            flex
            row
            height={40}
          >
            <TextInput
              value={inputValue}
              onChangeText={(txt) => setinputValue(txt)}
              // style={styles.input}
              placeholder="Type a message..."
            />
          </Block>
          <TouchableOpacity
            onPress={() => {
              const _message = [
                {
                  _id: uuid.v4(),
                  createdAt: new Date(),
                  text: inputValue,
                  user: {
                    _id: userInfo?.user_id,
                    name: userInfo?.user_name || "Khách hàng mới",
                    avatar: userInfo?.user_image || "",
                  },
                },
              ];
              onSend(_message);
              setinputValue("");
            }}
            style={styles.sendBtn}
          >
            <Text
              size={18}
              color={theme.colors.white}
              fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
            >
              Gửi
            </Text>
          </TouchableOpacity>
        </Block>
      </Block>
    );
  };
  return (
    <Block flex backgroundColor={theme.colors.white}>
      <Header rightComponent={<Block />} canGoBack title={"Nhắn tin"} />
      <GiftedChat
        renderChatFooter={() => {
          if (loading) {
            return <Text>Đang nhập...</Text>;
          }
        }}
        showUserAvatar={false}
        textInputStyle={{ color: "black" }}
        messages={messages}
        renderInputToolbar={renderInputToolBar}
        user={{
          _id: userInfo?.user_id,
        }}
        renderFooter={() => (
          <Block backgroundColor={"transparent"} height={25} />
        )}
        renderMessage={(message) => {
          if (message.currentMessage.user?._id === userInfo?.user_id) {
            return (
              <Block marginRight={20} marginBottom={20} alignEnd>
                <Block
                  radius={18}
                  paddingVertical={12}
                  paddingHorizontal={17}
                  maxWidth={width * 0.5}
                  backgroundColor={"rgba(42, 105, 32, 0.5)"}
                >
                  <Text color={theme.colors.white}>
                    {message.currentMessage.text}
                  </Text>
                </Block>
                <Text marginRight={5} color="#747474" marginTop={5} size={12}>
                  {moment(message?.currentMessage?.create_at).format(
                    "dd, HH:mm"
                  )}
                </Text>
              </Block>
            );
          } else {
            return (
              <Block row marginLeft={20} marginBottom={20}>
                <Image source={images.logo_chat} style={styles.logoChat} />
                <Block>
                  <Block
                    radius={18}
                    paddingVertical={12}
                    paddingHorizontal={17}
                    maxWidth={width * 0.5}
                    backgroundColor={"rgba(0, 0, 0, 0.1)"}
                  >
                    <Text color={theme.colors.black}>
                      {message.currentMessage.text}
                    </Text>
                  </Block>
                  <Text marginLeft={5} color="#747474" marginTop={5} size={12}>
                    {moment(message.createdAt).format("dd, HH:mm")}
                  </Text>
                </Block>
              </Block>
            );
          }
        }}
      />
    </Block>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  input: {
    height: getSize.v(40),
    justifyContent: "center",
    borderRadius: 22,
  },
  sendBtn: {
    marginLeft: 26,
  },
  frame_green: {
    position: "absolute",
    height: 12,
    width: 13,
    resizeMode: "stretch",
    bottom: -0,
    right: -2.1,
    tintColor: "rgba(42, 105, 32, 0.8)",
  },
  logoChat: {
    width: getSize.s(45),
    height: getSize.s(45),
    marginRight: 10,
  },
});
