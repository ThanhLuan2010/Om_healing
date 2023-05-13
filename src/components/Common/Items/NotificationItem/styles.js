import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';
import {createTextStyle, theme} from '@theme';

const styles = StyleSheet.create({
  imageNotification: {
    width: getSize.s(24 * 4),
    height: getSize.v(24 * 3),
    borderRadius: getSize.m(2),
  },
  wrapButton: {
    paddingVertical: getSize.m(4),
    paddingHorizontal: getSize.m(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.red,
    borderRadius: getSize.m(3),
    alignSelf: 'flex-start',
    marginBottom: getSize.m(8),
  },
  textButton: {
    color: theme.colors.white,
    ...createTextStyle(12, 'normal'),
    fontStyle: 'italic',
  },
  textTitle: {
    ...createTextStyle(16, 'semibold'),
    color: theme.colors.black,
    marginBottom: getSize.m(5),
    flex: 1,
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
  wrapNotification: {
    flexDirection: 'row',
  },
});

export default styles;
