import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';
import {createTextStyle, theme} from '@theme';

const styles = StyleSheet.create({
  textTitleItemInvestment: {
    ...createTextStyle(12, 'bold'),
    color: '#E4F1FF',
    textTransform: 'uppercase',
  },
  textProject: {
    ...createTextStyle(12, 'bold'),
    color: '#F1FF00',
  },
  buttonDetailInvestment: {
    backgroundColor: theme.colors.white,
    paddingVertical: getSize.m(4),
    paddingHorizontal: getSize.m(10),
    borderRadius: getSize.m(3),
    alignSelf: 'flex-start',
    marginRight: getSize.m(8),
  },
  textDetailInvestment: {
    ...createTextStyle(8, 'semibold'),
    color: theme.colors.secondary,
  },
  buttonSeeContractInvestment: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: getSize.m(4),
    paddingHorizontal: getSize.m(10),
    borderRadius: getSize.m(3),
    alignSelf: 'flex-start',
  },
  textSeeContract: {
    ...createTextStyle(8, 'semibold'),
    color: '#F1FF00',
  },
  textExpected: {
    ...createTextStyle(8, 'normal'),
    color: '#E4F1FF',
    fontStyle: 'italic',
  },
});

export default styles;
