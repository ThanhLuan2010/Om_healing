import actions, {_onUnmount} from '@redux/actions';
import {CustomToast} from '@utils/helper';
// import Storage from '@utils/storage';
import {Alert} from 'react-native';
import RNRestart from 'react-native-restart';
import store from 'redux/store';

export const hanldeError = error => {
  if (error.data.code === 401) {
    Alert.alert(
      'Phiên bản đăng nhập hết hạn',
      'Khỏi động lại ứng dụng của bạn',
      [
        {
          text: 'Đồng ý',
          onPress: () => RNRestart.Restart(),
        },
      ],
      {cancelable: false},
    );
  } else if (error.data.code === 403) {
    Alert.alert(
      'Phiên bản đăng nhập hết hạn',
      'Vui lòng đăng nhập lại tài khoản của bạn',
      [
        {
          text: 'Đồng ý',
          onPress: () => {
            // Storage.removeItem('TOKEN_USER');
            store.dispatch({type: _onUnmount(actions.TOKEN_USER)});
            store.dispatch({type: _onUnmount(actions.GET_USER_INFORMATION)});
          },
        },
      ],
      {cancelable: false},
    );
  } else {
    console.error(error.data.message);
    CustomToast(error.data.message);
  }
};
