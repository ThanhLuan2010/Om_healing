import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';
import {createTextStyle, theme} from '@theme';

const styles = StyleSheet.create({
  textTitle: {
    ...createTextStyle(18, 'semibold'),
    color: '#00509E',
    textTransform: 'uppercase',
  },
  textSeeAll: {
    ...createTextStyle(10, 'normal'),
    fontStyle: 'italic',
    color: '#114F9C',
  },
  wrapButtonSelectNew: {
    paddingHorizontal: getSize.m(20),
    paddingVertical: getSize.m(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getSize.m(6),
    marginTop: getSize.m(16),
    marginRight: getSize.m(6),
  },
  buttonSelectedTab: {
    backgroundColor: '#01388B',
  },
  buttonNotSelectedTab: {
    backgroundColor: '#E4E4E4',
  },
  textButtonSelectedTab: {
    ...createTextStyle(14, 'medium'),
    color: theme.colors.white,
  },
  textButtonNotSelectedTab: {
    ...createTextStyle(14, 'medium'),
    color: theme.colors.black,
  },
  wrapFlatList: {
    marginTop: getSize.m(16),
  },
});

export default styles;
