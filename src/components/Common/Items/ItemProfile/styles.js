import {theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: index => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getSize.m(20),
    paddingVertical: getSize.m(16),
  }),
  iconLeft: {
    height: getSize.v(22),
    width: getSize.v(22),
    marginRight: getSize.m(16),
  },
  iconRight: {
    height: getSize.v(12),
    width: getSize.v(12),
    tintColor: theme.colors.placeholder,
  },
  badge: {
    left: getSize.m(5),
  },
});
