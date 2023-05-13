import {createTextStyle, theme} from '@theme';
import {getSize, width} from '@utils/responsive';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  textTitle: {
    ...createTextStyle(18, 'semibold'),
    color: '#00509E',
    textTransform: 'uppercase',
    marginBottom: getSize.m(16),
  },
  textDrop: {
    ...createTextStyle(12, 'normal'),
    color: theme.colors.black,
  },
  textStyleDrop: {
    maxWidth: width / 2 - getSize.s(16),
  },
  buttonSelect: {
    borderWidth: 0.5,
    borderColor: '#00509E',
    paddingHorizontal: getSize.m(4),
    paddingVertical: getSize.m(6),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: getSize.m(4),
  },
  iconDown: {
    width: getSize.s(6),
    height: getSize.v(6),
    marginLeft: getSize.m(8),
  },
  scrollDropDown: {
    marginTop: getSize.m(16),
  },
  wrapItemDropDown: {
    paddingBottom: getSize.m(24),
  },
  itemTextContentDropDown: {
    ...createTextStyle(14, 'normal'),
    color: theme.colors.text,
  },
  textNoRevenue: {
    ...createTextStyle(18, 'semibold'),
    color: theme.colors.text,
  },
});

export default styles;
