import {theme} from '@theme';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WaveIndicator} from 'react-native-indicators';
const Loader = () => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.wrapper]}>
        <WaveIndicator size={30} color={theme.colors.primaryColor} />
      </View>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  wrapper: {
    backgroundColor: 'white',
    height: 50,
    width: 50,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
});
