/* eslint-disable react-hooks/exhaustive-deps */
import {useGetInvestedProjectsQuery} from '@api/dashboard';
import {Block} from '@components';
import {InvestmentItem} from '@components/Common/Items';
import {routes} from '@navigation/routes';
import {HOME_KEYWORD, PAGE_DEFAULT} from '@utils/mockData';
import React, {useMemo} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import styles from './styles';

const InvestmentList = ({navigation, wrapListStyle, itemStyle, style}) => {
  const {data: investedProjectsData = []} = useGetInvestedProjectsQuery({
    page: PAGE_DEFAULT,
  });

  const investedProjectsList = investedProjectsData?.list?.data;

  console.log({investedProjectsList});
  const onSeeAllInvestmentList = () => {
    navigation.navigate(routes.INVESTMENT_LIST_SEE_ALL_SCREEN);

    // Link to See All InvestmentList
  };

  const renderItem = useMemo(() => {
    return (
      <Block style={style}>
        <Block
          marginBottom={16}
          paddingHorizontal={16}
          row
          alignCenter
          space={'between'}>
          <Text style={styles.textInvestment}>
            {HOME_KEYWORD.InvestmentList}
          </Text>

          {investedProjectsData?.list?.last_page > PAGE_DEFAULT && (
            <TouchableOpacity onPress={onSeeAllInvestmentList}>
              <Text style={[styles.textSeeAll]}>{HOME_KEYWORD.ViewToAll}</Text>
            </TouchableOpacity>
          )}
        </Block>

        <SwiperFlatList
          showsHorizontalScrollIndicator={false}
          showPagination
          updateCellsBatchingPeriod={30}
          initialNumToRender={6}
          disableVirtualization={false}
          data={investedProjectsList}
          paginationStyleItem={styles.paginationStyleItem}
          paginationStyle={styles.paginationStyle}
          paginationStyleItemActive={styles.paginationStyleItemActive}
          paginationStyleItemInactive={styles.paginationStyleItemInActive}
          autoplay={true}
          autoplayLoop={true}
          autoplayLoopKeepAnimation={true}
          autoplayDelay={3}
          style={wrapListStyle}
          renderItem={({item, index}) => {
            return (
              <InvestmentItem
                data={investedProjectsData}
                item={item}
                index={index}
                style={itemStyle}
                navigation={navigation}
              />
            );
          }}
        />
      </Block>
    );
  }, [investedProjectsData]);

  return <>{investedProjectsList?.length > 0 && renderItem}</>;
};

export default InvestmentList;
