"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;

var _reactNative = require("react-native");

const styles = _reactNative.StyleSheet.create({
  buttonTab: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  dot: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2
  },
  title: {
    fontSize: 13.5,
    color: '#000'
  }
});

exports.styles = styles;
//# sourceMappingURL=style.js.map