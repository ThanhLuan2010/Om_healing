import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Block, Header, Text } from "@components";
import { theme } from "@theme";
import { images } from "@assets";
import { getSize } from "@utils/responsive";
import { navigate } from "@navigation/RootNavigation";
import TopTab from "./TopTab";
import { baseQuery } from "@api/baseQuery";
import { setLoading } from "@utils/navigator";

const data = [
  { title: "Bạn đã đặt hàng thành công!" },
  { title: "Bạn đã đặt hàng thành công!" },
  { title: "Bạn đã đặt hàng thành công!" },
  { title: "Bạn đã đặt hàng thành công!" },
  { title: "Bạn đã đặt hàng thành công!" },
  { title: "Bạn đã đặt hàng thành công!" },
  { title: "Bạn đã đặt hàng thành công!" },
  { title: "Bạn đã đặt hàng thành công!" },
  { title: "Bạn đã đặt hàng thành công!" },
  { title: "Bạn đã đặt hàng thành công!" },
  { title: "Bạn đã đặt hàng thành công!" },
  { title: "Bạn đã đặt hàng thành công!" },
  { title: "Bạn đã đặt hàng thành công!" },
];

const dataMess = [
  { title: "Bạn có tin nhắn mới!" },
  { title: "Bạn có tin nhắn mới!" },
];

const NotificationScreen = () => {
  const [indexTab, setindexTab] = useState(0);
  const [notiData, setnotiData] = useState([]);
  const [refreshing, setrefreshing] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const response = await baseQuery({
      url: "noti/list",
    });
    setLoading(false);
    setrefreshing(false);
    if (response.status && response.data) {
      if (response.data.current_page === 1) {
        setnotiData(response.data.data);
      } else {
        setnotiData(notiData?.concat(response.data.data));
      }
    }
  };

  const renderEmpty = () => {
    return (
      <Block flex justifyCenter>
        <Text size={20} center color={theme.colors.backgroundInput}>
          Danh sách trống
        </Text>
      </Block>
    );
  };
  const seen = async (item) => {
    const response = await baseQuery({
      url: "noti/seen",
      method: "POST",
      body: {
        id: item?.notification_id,
      },
    });
  };
  const ListNoti = () => {
    return (
      <Block flex>
        {notiData?.length > 0
          ? notiData?.map((item, index) => {
              return (
                <Pressable
                  onPress={() => {
                    navigate("OrderScreen");
                    seen(item);
                  }}
                >
                  <Block key={index} style={styles.shadow}>
                    <Block
                      space={"between"}
                      row
                      paddingVertical={23}
                      paddingHorizontal={20}
                      backgroundColor={
                        item?.status === 0
                          ? "rgba(136, 223, 144, 0.21)"
                          : "white"
                      }
                    >
                      <Text
                        flex
                        marginRight={20}
                        numberOfLines={2}
                        fontFamily={
                          item?.status === 0
                            ? theme.fonts.fontFamily.SourceSans3SemiBold
                            : theme.fonts.fontFamily.SourceSans3Regular
                        }
                      >
                        {item?.body}
                      </Text>
                      {item?.status === 0 && (
                        <Text color="#FF0000" size={14}>
                          Chưa đọc
                        </Text>
                      )}
                    </Block>
                  </Block>
                </Pressable>
              );
            })
          : renderEmpty()}
      </Block>
    );
  };

  const ListMess = () => {
    return (
      <Block flex>
        {/* {dataMess.map((item, index) => {
          return (
            <Block style={styles.shadow}>
              <Block
                space={"between"}
                row
                paddingVertical={23}
                paddingHorizontal={20}
                backgroundColor={
                  index % 2 === 0 ? "rgba(136, 223, 144, 0.21)" : "white"
                }
              >
                <Text
                  fontFamily={
                    index % 2 === 0
                      ? theme.fonts.fontFamily.SourceSans3SemiBold
                      : theme.fonts.fontFamily.SourceSans3Regular
                  }
                >
                  {item.title}
                </Text>
                {index % 2 === 0 && (
                  <Text color="#FF0000" size={14}>
                    Chưa đọc
                  </Text>
                )}
              </Block>
            </Block>
          );
        })} */}
        {renderEmpty()}
      </Block>
    );
  };
  const renderBody = () => {
    switch (indexTab) {
      case 0:
        return <ListNoti />;
      case 1:
        return <ListMess />;

      default:
        break;
    }
  };
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  return (
    <Block flex backgroundColor={theme.colors.white}>
      <Header rightComponent={<></>} canGoBack title={"Thông báo"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              getData();
            }}
          />
        }
        scrollEventThrottle={400}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            // getData()
          }
        }}
      >
        <TopTab onChangeTab={(id) => setindexTab(id)} indexTab={indexTab} />
        {renderBody()}
      </ScrollView>
    </Block>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: "white",
  },
});
