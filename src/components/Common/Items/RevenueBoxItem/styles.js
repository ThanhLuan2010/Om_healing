import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';
import {createTextStyle, theme} from '@theme';

const styles = StyleSheet.create({
  iconRevenueWaller: {
    width: getSize.s(16),
    height: getSize.v(16),
  },
  textTitleRevenueWallet: {
    ...createTextStyle(14, 'bold'),
    color: theme.colors.investment,
    marginLeft: getSize.m(2),
    textTransform: 'uppercase',
  },
  textPrice: {
    ...createTextStyle(24, 'semibold'),
    color: theme.colors.secondary,
  },
  investmentItemButtonOne: {
    justifyContent: 'center',
  },
  investmentItemBothButton: {
    justifyContent: 'space-between',
  },
  buttonWithdrawMoney: {
    paddingHorizontal: getSize.m(10),
    paddingVertical: getSize.m(8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00387C',
    borderRadius: getSize.m(3),
  },
  textWithdrawMoney: {
    ...createTextStyle(10, 'bold'),
    color: theme.colors.white,
    textTransform: 'uppercase',
  },
  textVnd: {
    ...createTextStyle(14, 'semibold'),
    color: theme.colors.secondary,
  },
});

export default styles;
