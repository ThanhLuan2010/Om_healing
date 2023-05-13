import { images } from "@assets";
import { Block, Header, Text } from "@components";
import { goBack } from "@navigation/RootNavigation";
import database from "@react-native-firebase/database";
import { setIsLoading } from "@store/slices/common";
import { userSelect } from "@store/slices/user";
import { theme } from "@theme";
import { showAlert } from "@utils/navigator";
import { getSize } from "@utils/responsive";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";

const NewsDetail = ({ route }) => {
  const dispatch = useDispatch();
  const { item } = route.params;
  const [valueComment, setvalueComment] = useState("");
  const [dataComent, setdataComent] = useState([]);
  const { userInfo } = useSelector(userSelect);

  useEffect(() => {
    database()
      .ref("comment/" + item?.article_id)
      .orderByChild("create_at")
      .on("value", (response) => {
        const _data = [];
        response.forEach((childSnapshot) => {
          _data.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        setdataComent(_data);
      });
  }, []);

  const renderComment = (item, index) => {
    return (
      <Block
        borderTopWidth={index === 0 ? 0 : 0.5}
        borderColor={"#DADADA"}
        row
        key={index}
        paddingTop={22}
        // marginTop={22}
        marginHorizontal={20}
      >
        <Image
          source={
            item?.user?.user_image
              ? { uri: item?.user?.user_image }
              : images.ic_account
          }
          style={styles.avatarCmt}
        />
        <Block marginLeft={5}>
          <Block
            paddingHorizontal={9}
            paddingVertical={6}
            backgroundColor={"#E5E5E5"}
            radius={9}
          >
            <Text
              size={14}
              fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
            >
              {item.user?.user_name || "Khách hàng mới"}
            </Text>
            <Text>{item?.comment}</Text>
          </Block>

          <Text marginTop={8} color="#747474" size={14}>
            {item.time}
          </Text>
        </Block>
      </Block>
    );
  };

  const onSend = async () => {
    if (valueComment !== "") {
      setvalueComment("");
      const data = {
        user: userInfo,
        comment: valueComment,
        article_id: item?.article_id,
        id: uuid.v4(),
        create_at: `${moment(new Date())}`,
      };
      dispatch(setIsLoading(true));
      database()
        .ref("/comment/" + item?.article_id + "/" + data.id)
        .set(data)
        .then((res) => {
          dispatch(setIsLoading(false));
        })
        .catch((e) => {
          dispatch(setIsLoading(false));
          showAlert(
            "Thông báo",
            "Đã có lỗi xảy ra, vui lòng thử lại sau",
            "Chấp nhận",
            "",
            () => goBack()
          );
        });
    }
  };

  const renderEmpty = () => {
    return (
      <Block flex justifyCenter>
        <Text center size={20} color={theme.colors.backgroundInput}>
          Chưa có bình luận nào
        </Text>
      </Block>
    );
  };

  return (
    <Block flex backgroundColor={theme.colors.white}>
      <Header canGoBack title={"Tin tức"} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Block marginTop={33} marginHorizontal={20} row space={"between"}>
          <Text flex fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}>
            {item?.article_title}
          </Text>
          <Text
            size={14}
            fontFamily={theme.fonts.fontFamily.SourceSans3LightItalic}
          >
            {moment(item?.created_at).fromNow()}
          </Text>
        </Block>

        <Image
          source={{
            uri: item?.article_image,
          }}
          style={styles.newsImg}
        />

        <Text lineHeight={23} marginTop={23} marginHorizontal={20}>
          {item?.article_description}
        </Text>

        <Text
          color="#10A31E"
          fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
          size={24}
          marginHorizontal={20}
          marginTop={30}
        >
          Viết bình luận
        </Text>

        <Block
          backgroundColor={"rgba(136, 223, 144, 0.21)"}
          marginHorizontal={20}
          height={42}
          row
          alignCenter
          paddingHorizontal={20}
          radius={4}
          marginTop={30}
        >
          <TextInput
            style={styles.input}
            value={valueComment}
            onChangeText={(txt) => setvalueComment(txt)}
            placeholder="Viết bình luận của bạn"
          />

          <TouchableOpacity onPress={() => onSend()}>
            <Image source={images.ic_send} style={styles.icSend} />
          </TouchableOpacity>
        </Block>

        <Block flex marginBottom={30}>
          {dataComent?.length > 0
            ? dataComent.map(renderComment)
            : renderEmpty()}
        </Block>
      </ScrollView>
    </Block>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  newsImg: {
    marginHorizontal: 20,
    height: getSize.v(240),
    borderRadius: 10,
    resizeMode: "cover",
    marginTop: 23,
  },
  input: {
    fontSize: getSize.s(14),
    fontFamily: theme.fonts.fontFamily.SourceSans3LightItalic,
    flex: 1,
  },
  icSend: {
    width: 17,
    height: 15,
  },
  avatarCmt: {
    width: getSize.s(45),
    height: getSize.s(45),
    borderRadius: getSize.s(45 / 2),
  },
});
