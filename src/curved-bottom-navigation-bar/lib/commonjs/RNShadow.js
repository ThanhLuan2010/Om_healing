"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RNShadow = void 0;

var _reactNative = require("react-native");

const RNShadow = _reactNative.Platform.OS === 'android' ? (0, _reactNative.requireNativeComponent)('RNShadow') : _reactNative.View;
exports.RNShadow = RNShadow;
//# sourceMappingURL=RNShadow.js.map