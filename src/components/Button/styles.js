import {getSize} from '@utils/responsive';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: getSize.m(20),
    borderRadius: getSize.m(45),
  },
});
