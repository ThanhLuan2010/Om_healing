import {createTextStyle, theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  viewShadow: {
    borderColor: 'white',
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    shadowOffset: {height: 1.5, width: 0},
    elevation: 5,
  },
  textTodayRevenue: {
    ...createTextStyle(12, 'medium'),
    color: theme.colors.investment,
  },
  textPrice: {
    ...createTextStyle(24, 'semibold'),
    color: theme.colors.secondary,
  },
  textVnd: {
    ...createTextStyle(14, 'semibold'),
    color: theme.colors.secondary,
  },
  implementationDate: {
    ...createTextStyle(10, 'normal'),
    color: theme.colors.black,
    opacity: 0.7,
  },
});

export default styles;
