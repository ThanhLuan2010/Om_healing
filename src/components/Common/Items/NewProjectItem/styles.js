import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';
import {createTextStyle, theme} from '@theme';

const styles = StyleSheet.create({
  imageNewProject: {
    width: getSize.s(72),
    aspectRatio: 0.75,
  },
  titleItemNewProject: {
    ...createTextStyle(10, 'normal'),
    color: theme.colors.black,
  },
  contentItemNewProject: {
    ...createTextStyle(10, 'normal'),
    color: '#545454',
    marginLeft: getSize.m(12),
    flex: 1,
  },
  numberOfInvestors: {
    ...createTextStyle(10, 'normal'),
    fontStyle: 'italic',
    color: '#0045A2',
    textTransform: 'lowercase',
  },
  investmentAmount: {
    ...createTextStyle(10, 'normal'),
    fontStyle: 'italic',
    color: '#0045A2',
    flex: 1,
    textAlign: 'right',
    marginLeft: getSize.m(8),
  },
  wrapChevronRight: {
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: getSize.s(24),
    height: getSize.v(24),
    borderRadius: getSize.m(24),
    position: 'absolute',
    zIndex: 99,
    right: getSize.m(-6),
    top: '52.5%',
  },
  iconChevronRight: {
    width: getSize.s(4),
    height: getSize.v(8),
  },
});

export default styles;
