import { Platform, requireNativeComponent, View } from 'react-native';
export const RNShadow = Platform.OS === 'android' ? requireNativeComponent('RNShadow') : View;
//# sourceMappingURL=RNShadow.js.map