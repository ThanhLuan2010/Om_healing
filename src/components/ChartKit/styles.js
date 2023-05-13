import {createTextStyle, theme} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  chart: {
    borderRadius: 16,
    alignItems: 'center',
  },
  textDefault: {
    ...createTextStyle(14, 'normal'),
    color: theme.colors.text,
    lineHeight: 22,
  },
});
export default styles;
