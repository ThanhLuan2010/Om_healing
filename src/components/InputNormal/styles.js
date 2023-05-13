import {createTextStyle, theme} from '@theme';
import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: getSize.m(12),
    paddingLeft: getSize.m(8),
    paddingRight: getSize.m(16),
    color: '#2C333A',
    ...createTextStyle(14, 'normal'),
  },
});
export default styles;
