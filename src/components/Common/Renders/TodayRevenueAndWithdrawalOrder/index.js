import {Block} from '@components';
import {createTextStyle, theme} from '@theme';
import {Currency} from '@utils/constants';
import {formatCurrency} from '@utils/helper';
import {HOME_KEYWORD} from '@utils/mockData';
import {width} from '@utils/responsive';
import React from 'react';
import {Text} from 'react-native';
import {AppStyles} from '../../../../theme/AppStyles';
import styles from './styles';

const TodayRevenueAndWithdrawalOrder = ({dashboardInfoData, style}) => {
  const REVENUE_WITHDRAWAL = [
    {
      title: HOME_KEYWORD.TodayRevenue,
      price: dashboardInfoData?.getTodayRevenue?.totalVND,
    },
    {
      title: HOME_KEYWORD.WithdrawalPending,
      price: dashboardInfoData?.total_widthraw_pending_profit?.totalVND,
      // implementationDate: '20/2/2022',
    },
  ];

  const itemMapping = (item, index) => (
    <Block
      key={item.price + index.toString()}
      backgroundColor={theme.colors.white}
      paddingHorizontal={20}
      paddingVertical={16}
      width={width / 2 - 20}
      radius={10}
      style={[AppStyles.viewShadow]}>
      <Text style={styles.textTodayRevenue}>{item.title}</Text>

      <Block marginTop={8}>
        <Text
          style={[
            styles.textPrice,
            {
              ...createTextStyle(18, 'semibold'),
            },
          ]}>
          {formatCurrency({
            value: item.price,
          })}
          <Text style={[styles.textVnd]}> {Currency.VietnamDong}</Text>
        </Text>
      </Block>

      {item.implementationDate && (
        <Block marginTop={12} justifyEnd>
          <Text style={[styles.implementationDate]}>
            {HOME_KEYWORD.ImplementationDate} {item.implementationDate}
          </Text>
        </Block>
      )}
    </Block>
  );

  return (
    <Block row space={'between'} marginBottom={24} style={style}>
      {REVENUE_WITHDRAWAL.map(itemMapping)}
    </Block>
  );
};

export default TodayRevenueAndWithdrawalOrder;
