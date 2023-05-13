import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';
import {createTextStyle, theme} from '@theme';

const styles = StyleSheet.create({
  imageEventItem: {
    width: getSize.s(24 * 4),
    height: getSize.v(24 * 3),
    borderRadius: getSize.m(2),
  },
  textTitle: {
    ...createTextStyle(16, 'semibold'),
    color: theme.colors.black,
    marginBottom: getSize.m(5),
  },
  textContent: {
    ...createTextStyle(14, 'normal'),
    color: '#00509E',
  },
  textDate: {
    ...createTextStyle(12, 'normal'),
    opacity: 0.7,
    marginRight: getSize.m(8),
  },
  textHours: {
    ...createTextStyle(12, 'normal'),
    opacity: 0.7,
  },
  wrapNews: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default styles;
