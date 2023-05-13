/* eslint-disable react-hooks/exhaustive-deps */
import {Block} from '@components';
import {RevenueBoxItem} from '@components/Common/Items';
import {routes} from '@navigation/routes';
import {HOME_KEYWORD} from '@utils/mockData';
import React, {useMemo} from 'react';

const Revenue = ({dashboardInfoData, navigation, style}) => {
  const onWithdrawMoney = () => {
    navigation.navigate(routes.WITHDRAW_MONEY, {params: dashboardInfoData});
  };

  const onReinvestment = () => {
    // Link to Project List
    navigation.navigate(routes.INVESTMENT_PROJECTS_SCREEN);
  };

  const onListRemainingRevenue = () => {
    // Link to Investment Management
    navigation.navigate(routes.INVESTMENT_MANAGEMENT_SCREEN,);
  };

  const REVENUE = [
    {
      title: HOME_KEYWORD.RevenueWallet,
      price: dashboardInfoData?.balance_pending_profit?.totalVND,
      nameButtonOne: HOME_KEYWORD.WithdrawMoney,
      nameButtonTwo: HOME_KEYWORD.Reinvestment,
      onclickOne: onWithdrawMoney,
      onclickTwo: onReinvestment,
    },
    {
      title: HOME_KEYWORD.RemainingRevenue,
      price:
        dashboardInfoData?.total_remaining_revenue?.total_remaining_revenue_vnd,
      nameButtonOne: HOME_KEYWORD.List,
      onclickOne: onListRemainingRevenue,
    },
  ];

  const itemMapping = (item, index) => (
    <Block key={item.title + index.toString()}>
      <RevenueBoxItem
        title={item.title}
        price={item.price}
        textButtonOne={item.nameButtonOne}
        textButtonTwo={item.nameButtonTwo}
        onclickOne={item.onclickOne}
        onclickTwo={item.onclickTwo}
      />
    </Block>
  );

  const renderItem = useMemo(() => {
    return <Block style={style}>{REVENUE.map(itemMapping)}</Block>;
  }, [REVENUE]);

  return <>{renderItem}</>;
};

export default Revenue;
