/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
