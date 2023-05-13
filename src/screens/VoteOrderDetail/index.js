import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Block, GradientButton, Header, Text } from "@components";
import { theme } from "@theme";
import { icons, images } from "@assets";
import { getSize } from "@utils/responsive";
import moment from "moment";
import ImagePicker from "react-native-image-crop-picker";
import Video from "react-native-video";
import { baseQuery } from "@api/baseQuery";
import { setLoading, showAlert } from "@utils/navigator";
import { goBack } from "@navigation/RootNavigation";

const data = [
  {
    title: "Tệ",
    color: "black",
  },
  {
    title: "Không Hài Lòng",
    color: "black",
  },
  {
    title: "Bình thường",
    color: "black",
  },
  {
    title: "Hài Lòng",
    color: "#FFC700",
  },
  {
    title: "Tuyệt Vời",
    color: "#FFC700",
  },
];
const VoteOrderDetail = ({ route }) => {
  const product = route.params?.item;
  const [defaultRating, setDefaultRating] = useState(5);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [imageRate, setimageRate] = useState(null);
  const [videoRate, setvideoRate] = useState(null);
  const starImageFilled = icons.ic_star;
  const starImageCorner = icons.ic_starOutLine;
  const [comment, setmomment] = useState("");

  const render = () => {
    return (
      <Text color={data[defaultRating - 1].color} style={styles.status}>
        {data[defaultRating - 1].title}
      </Text>
    );
  };

  const CustomRatingBar = () => {
    return (
      <Block style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}
            >
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating ? starImageFilled : starImageCorner
                }
              />
            </TouchableOpacity>
          );
        })}
      </Block>
    );
  };

  const onPickerImage = () => {
    try {
      ImagePicker.openPicker({
        maxWidth: 500,
        maxHeight: 500,
        cropping: true,
        mediaType: "photo",
      }).then((image) => {
        setimageRate(image.path);
      });
    } catch (error) {}
  };

  const onPickerVideo = () => {
    try {
      ImagePicker.openPicker({
        mediaType: "video",
      }).then((image) => {
        setvideoRate(image.path);
      });
    } catch (error) {}
  };

  const onReate = async () => {
    setLoading(true);
    const body = {
      star: defaultRating,
      comment: comment,
      order_id: product?.order_id,
      product_id: product?.product_id,
    };
    if (imageRate) {
      body.image = {
        uri: imageRate,
        type: `image/jpg`,
        name: imageRate,
      };
    }
    if (videoRate) {
      body.video = {
        uri: videoRate,
        type: "video/mp4",
        name: videoRate,
      };
    }
    const response = await baseQuery({
      url: "comment/add",
      method: "POST",
      body: body,
    });
    const { message, status } = response;
    setLoading(false);
    if (status) {
      showAlert(
        "Thành công",
        message || "Đánh giá đơn hàng thành công",
        "Xác nhận",
        "",
        () => {
          goBack();
          goBack();
        }
      );
    }
    else{
      showAlert(
        "Thất bại",
        message || "Đánh giá đơn hàng thất bại",
        "Xác nhận",
        "",
        () => {
          goBack();
        }
      );
    }
  };

  return (
    <Block flex={1} backgroundColor={theme.colors.white}>
      <Header title="Đánh giá sản phẩm" canGoBack />
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
          <Block
            radius={4}
            marginHorizontal={20}
            marginTop={30}
            marginBottom={10}
            row
            alignCenter
            style={styles.bg_order}
            paddingHorizontal={12}
          >
            <Image source={images.phan_bon} style={styles.ImagePhanBon} />
            <Block marginLeft={19} flex>
              <Text
                fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
                size={18}
                numberOfLines={2}
              >
                {product?.product_name}
              </Text>
              <Text
                size={16}
                fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
              >
                Đã đặt vào
                <Text
                  size={16}
                  fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
                  color="#10A31E"
                >
                  {" "}
                  {moment(product?.created_at).format("dd, DD-MM-YYYY")}
                </Text>
              </Text>
            </Block>
          </Block>
          <Block marginVertical={30} row alignCenter marginHorizontal={20}>
            <Text
              style={styles.chatluong}
              size={16}
              fontFamily={theme.fonts.fontFamily.SourceSans3Bold}
            >
              Chất lượng sản phẩm
            </Text>
            <CustomRatingBar />
            <Block flex>{render()}</Block>
          </Block>
          <Block row space={"between"} marginHorizontal={10}>
            <TouchableOpacity
              style={{
                borderRadius: 2,
                borderWidth: 1,
                alignItems: "center",
                marginHorizontal: 10,
                paddingVertical: 8,
                borderColor: "#10A31E",
                width: getSize.s(150),
                height: getSize.s(150),
                justifyContent: "center",
              }}
              onPress={onPickerImage}
            >
              {imageRate ? (
                <>
                  <Image
                    source={{ uri: imageRate }}
                    style={{
                      width: getSize.s(140),
                      height: getSize.s(140),
                      resizeMode: "contain",
                    }}
                  />
                  <TouchableOpacity
                    style={{ position: "absolute", top: 10, right: 10 }}
                    onPress={() => setimageRate(null)}
                  >
                    <Image
                      source={images.ic_close}
                      style={{
                        width: getSize.s(20),
                        height: getSize.s(20),
                      }}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Image source={icons.ic_camera} style={styles.ic_camera} />
                  <Text
                    marginTop={7}
                    size={14}
                    color="#10A31E"
                    fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
                  >
                    Thêm hình ảnh
                  </Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onPickerVideo}
              style={{
                borderRadius: 2,
                borderWidth: 1,
                alignItems: "center",
                marginHorizontal: 10,
                paddingVertical: 8,
                borderColor: "#10A31E",
                width: getSize.s(150),
                height: getSize.s(150),
                justifyContent: "center",
              }}
            >
              {videoRate ? (
                <Block>
                  <Video
                    source={{ uri: videoRate }} // Can be a URL or a local file.
                    style={{ width: getSize.s(140), height: getSize.s(140) }}
                  />
                  <TouchableOpacity
                    style={{ position: "absolute", top: 10, right: 10 }}
                    onPress={() => setimageRate(null)}
                  >
                    <Image
                      source={images.ic_close}
                      style={{
                        width: getSize.s(20),
                        height: getSize.s(20),
                      }}
                    />
                  </TouchableOpacity>
                </Block>
              ) : (
                <>
                  <Image source={icons.ic_video} style={styles.ic_camera} />
                  <Text
                    color="#10A31E"
                    size={14}
                    marginTop={7}
                    fontFamily={theme.fonts.fontFamily.SourceSans3SemiBold}
                  >
                    Thêm video
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </Block>
          <Block marginTop={19}>
            <TextInput
              placeholder="Chia sẽ nhận xét cho sản phẩm của bạn!"
              numberOfLines={10}
              multiline={true}
              value={comment}
              onChangeText={(txt) => setmomment(txt)}
              style={styles.textInput}
            />
          </Block>
          <GradientButton onPress={onReate} title="Gửi" style={styles.button} />
        </KeyboardAvoidingView>
      </ScrollView>
    </Block>
  );
};

export default VoteOrderDetail;

const styles = StyleSheet.create({
  customRatingBarStyle: {
    flexDirection: "row",
    marginRight: 11,
  },
  starImageStyle: {
    width: 23,
    height: 23,
    resizeMode: "cover",
  },
  ImagePhanBon: {
    width: 67,
    height: 79,
    resizeMode: "contain",
  },
  bg_order: {
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  chatluong: {
    maxWidth: getSize.s(120),
    flexGrow: 1,
  },
  status: {
    fontSize: 16,
    fontFamily: theme.fonts.fontFamily.SourceSans3Bold,
  },
  ic_camera: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  textInput: {
    // just some styling to make the input visible
    backgroundColor: "#88DF9036",
    textAlignVertical: "top",
    justifyContent: "flex-start",
    height: 231,
    marginHorizontal: 20,
    borderRadius: 4,
    paddingHorizontal: 17,
    fontSize: 14,
    color: theme.colors.black,
    fontStyle: "italic",
  },
  button: {
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 7,
    marginHorizontal: 20,
    marginTop: 30,
  },
});
