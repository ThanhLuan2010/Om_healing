import {Alert} from 'react-native';
import {setIsLoading} from '@store/slices/common';

export const handleErrorNetWork = dispatch => {
  setTimeout(() => {
    dispatch(setIsLoading(false));
  }, 1000);
  setTimeout(() => {
    Alert.alert('Thông báo', 'Network Error');
  }, 1100);
};
