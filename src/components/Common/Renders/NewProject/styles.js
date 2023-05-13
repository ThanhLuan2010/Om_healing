import {createTextStyle} from '@theme';
import {StyleSheet} from 'react-native';

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
});

export default styles;
