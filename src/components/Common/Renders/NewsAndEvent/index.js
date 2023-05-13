/* eslint-disable react-hooks/exhaustive-deps */
import {
  eventApi,
  useGetEventListLoadMoreQuery,
  useGetNewsListLoadMoreQuery,
} from '@api/event';
import {Block} from '@components';
import {NewsEventItem} from '@components/Common/Items';
import {routes} from '@navigation/routes';
import {theme} from '@theme';
import {AppStyles} from '@theme/AppStyles';
import {
  FORMAT_TIME,
  HOME_KEYWORD,
  PAGE_DEFAULT,
  TAB_NEWS_EVENT,
} from '@utils/mockData';
import moment from 'moment';
import React, {useMemo, useState} from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import styles from './styles';

const NewsAndEvent = ({
  navigation,
  isTitle,
  isAllData,
  isDeviceBottom,
  wrapListStyle,
  typeSelected,
  style,
}) => {
  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();

  const [isSelectedTab, setIsSelectedTab] = useState(
    typeSelected || HOME_KEYWORD.News,
  );
  const [pageNews, setPageNews] = useState(PAGE_DEFAULT);
  const [pageEvent, setPageEvent] = useState(PAGE_DEFAULT);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const typeNews = isSelectedTab === HOME_KEYWORD.News;
  const typeEvent = isSelectedTab === HOME_KEYWORD.Event;

  const typePage = typeNews ? pageNews : pageEvent;
  const requestParams = {
    page: typePage,
  };

  const propsPrams = {
    forceRefetch: true,
    refetchOnFocus: true,
  };

  const {data: newsListData = [], isLoading: newsLoading} =
    useGetNewsListLoadMoreQuery(requestParams, propsPrams);

  const {data: eventListData = [], isLoading: eventLoading} =
    useGetEventListLoadMoreQuery(requestParams, propsPrams);

  const hasNewListData = newsListData?.data?.length > 0;
  const hasEventListData = eventListData?.data?.length > 0;

  const allData = typeNews ? newsListData?.data : eventListData?.data;
  let dataSlice = typeNews
    ? newsListData?.data?.slice(0)
    : eventListData?.data?.slice(0);

  const dataRender = isAllData ? allData : dataSlice;

  let typeLastPage = typeNews
    ? newsListData?.last_page
    : eventListData?.last_page;

  const typeLoading = typeNews ? newsLoading : eventLoading;

  let typeEndPoints = typeNews
    ? eventApi.endpoints.getEventListLoadMore
    : eventApi.endpoints.getNewsListLoadMore;

  let typeCheckSeeAll =
    (typeNews && newsListData?.last_page > PAGE_DEFAULT) ||
    (typeEvent && eventListData?.last_page > PAGE_DEFAULT);

  console.log({newsListData, eventListData});

  const onNavigateDetails = item => {
    navigation.navigate(routes.BLOG_DETAIL_SCREEN, {
      article_slug: typeNews ? item.article_slug : item.event_slug,
      typeDetail: typeEvent && HOME_KEYWORD.Event,
    });
  };

  const onSeeAll = () => {
    navigation.navigate(routes.NEWS_AND_EVENT_SEE_ALL_SCREEN, {
      typeSelected: isSelectedTab,
    });
  };

  const getNewList = async () => {
    await dispatch(typeEndPoints.initiate(requestParams, propsPrams)).unwrap();
  };

  const onEndReached = () => {
    if (typePage >= typeLastPage || typeLoading) {
      return;
    }

    const nextPage = typePage + PAGE_DEFAULT;
    typeNews ? setPageNews(nextPage) : setPageEvent(nextPage);

    getNewList();
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    typeNews ? setPageNews(PAGE_DEFAULT) : setPageEvent(PAGE_DEFAULT);

    getNewList();
    setIsRefreshing(false);
  };

  const FlatRenderItem = useMemo(() => {
    return (
      <>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={allData}
          keyExtractor={(item, index) => item?.article_id + index.toString()}
          style={[styles.wrapFlatList, wrapListStyle]}
          onEndReachedThreshold={0.02}
          onEndReached={onEndReached}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          renderItem={({item, index}) => {
            return (
              <NewsEventItem
                item={item}
                index={index}
                image={typeNews ? item?.article_thumbnail : item?.event_image}
                title={typeNews ? item?.article_title : item?.event_title}
                content={
                  typeNews ? item?.article_description : item?.event_description
                }
                date={moment(item?.created_at).format(FORMAT_TIME.DATE)}
                hours={moment(item?.created_at).format(FORMAT_TIME.HOUR)}
                onPress={() => onNavigateDetails(item)}
              />
            );
          }}
          ListHeaderComponent={() => (
            <Block
              borderTopWidth={1}
              borderColor={theme.colors.black}
              opacity={0.2}
              paddingBottom={16}
            />
          )}
        />
      </>
    );
  }, [allData, isRefreshing]);

  const MapRenderItem = () => {
    return (
      <Block flex>
        <Block
          borderTopWidth={1}
          borderColor={theme.colors.black}
          opacity={0.2}
          marginTop={16}
          marginBottom={16}
        />

        {dataRender?.map((item, index) => {
          return (
            <NewsEventItem
              key={
                index.toString() +
                (typeNews ? item?.article_description : item?.event_description)
              }
              item={item}
              index={index}
              image={typeNews ? item?.article_thumbnail : item?.event_image}
              title={typeNews ? item?.article_title : item?.event_title}
              content={
                typeNews ? item?.article_description : item?.event_description
              }
              date={moment(item?.created_at).format(FORMAT_TIME.DATE)}
              hours={moment(item?.created_at).format(FORMAT_TIME.HOUR)}
              onPress={() => onNavigateDetails(item)}
              style={[wrapListStyle]}
            />
          );
        })}
      </Block>
    );
  };

  const tabItems = (item, index) => {
    const selected = item.value === isSelectedTab;
    return (
      <Block key={item.value + index.toString()}>
        <TouchableOpacity
          style={[
            styles.wrapButtonSelectNew,
            selected ? styles.buttonSelectedTab : styles.buttonNotSelectedTab,
            AppStyles.viewShadow,
          ]}
          onPress={() => {
            setIsSelectedTab(item.value);
          }}>
          <Text
            style={[
              selected
                ? styles.textButtonSelectedTab
                : styles.textButtonNotSelectedTab,
            ]}>
            {item.value}
          </Text>
        </TouchableOpacity>
      </Block>
    );
  };

  const renderTab = () => {
    return <Block row>{TAB_NEWS_EVENT.map(tabItems)}</Block>;
  };

  return (
    <Block
      flex
      paddingHorizontal={16}
      marginBottom={isDeviceBottom && insets.bottom}
      style={style}>
      {isTitle && (
        <Block row alignCenter space={'between'}>
          <Text style={styles.textTitle}>
            {typeNews ? HOME_KEYWORD.News : HOME_KEYWORD.Event}
          </Text>

          {typeCheckSeeAll && (
            <TouchableOpacity onPress={onSeeAll}>
              <Text style={[styles.textSeeAll]}>{HOME_KEYWORD.ViewToAll}</Text>
            </TouchableOpacity>
          )}
        </Block>
      )}

      {hasNewListData && hasEventListData && renderTab()}
      {isAllData ? FlatRenderItem : <MapRenderItem />}
    </Block>
  );
};

export default NewsAndEvent;
