import { Block, HeaderHome, SearchBar, TopNav } from "@components";
import { theme } from "@theme";
import React, { useState, useEffect } from "react";
import { RefreshControl, ScrollView } from "react-native";
import ListNews from "./ListNew";
import TopTab from "./TopTab";
import { baseQuery } from "@api/baseQuery";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@store/slices/common";

const NewsScreen = () => {
  const [indexTab, setindexTab] = useState(0);
  const [category, setcategory] = useState([]);
  const [listNews, setlistNews] = useState([]);
  const [loading, setloading] = useState(false);
  const [searchValue, setsearchValue] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    getListCategroy();
    getNewsData();
  }, []);

  const getNewsData = async (id = indexTab, title = searchValue) => {
    setloading(true);
    dispatch(setIsLoading(true));
    const response = await baseQuery({
      url: "article/list",
      query: {
        category: id,
        title: title,
      },
    });
    const { data, status } = response;
    dispatch(setIsLoading(false));
    setloading(false);
    if (status && data) {
      setlistNews(data.data);
    }
  };

  const getListCategroy = async () => {
    const response = await baseQuery({
      url: "article/category",
    });
    const { data, status } = response;
    if (data && status) {
      setcategory(data);
      setindexTab(data[0]?.article_category_id);
      getNewsData(data[0]?.article_category_id);
    }
  };

  const renderBody = () => {
    return <ListNews data={listNews} />;
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
      <HeaderHome />
      <TopNav />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              getListCategroy();
              getNewsData();
            }}
          />
        }
        scrollEventThrottle={400}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
          }
        }}
        showsVerticalScrollIndicator={false}
      >
        <SearchBar
          onPressSearch={(txt) => {
            getNewsData(indexTab, txt);
            setsearchValue(txt);
          }}
          // valueSearch={searchValue}
        />
        <TopTab
          data={category}
          onChangeTab={(id) => {
            setindexTab(id);
            getNewsData(id);
          }}
          indexTab={indexTab}
        />
        <Block flex marginBottom={150}>{renderBody()}</Block>
      </ScrollView>
    </Block>
  );
};

export default NewsScreen;
