import {createTextStyle, theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  textInvestment: {
    ...createTextStyle(18, 'semibold'),
    color: '#00509E',
    textTransform: 'uppercase',
    flex: 1,
  },
  paginationStyle: {},
  paginationStyleItem: {
    marginTop: getSize.m(36),
    height: getSize.v(6),
    width: getSize.v(6),
    borderRadius: getSize.s(100),
  },
  paginationStyleItemActive: {
    backgroundColor: theme.colors.secondary,
  },
  paginationStyleItemInActive: {
    backgroundColor: theme.colors.secondary,
    opacity: 0.3,
  },
  textSeeAll: {
    ...createTextStyle(10, 'normal'),
    fontStyle: 'italic',
    color: '#114F9C',
  },
});

export default styles;
