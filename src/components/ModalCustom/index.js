import {createTextStyle, theme} from '@theme';
import {getSize, height} from '@utils/responsive';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

const ModalCustom = ({
  title,
  desc,
  child,
  button,
  isShowAlert,
  onAccept,
  onCancel,
}) => {
  return (
    <Modal
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      isVisible={isShowAlert}
      onBackButtonPress={onCancel}
      onBackdropPress={onCancel}
      backdropOpacity={0.7}>
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.wrapTitle}>
            <Text style={styles.textTitle}>{title}</Text>
          </View>

          {desc && (
            <View style={styles.wrapDesc}>
              <Text style={[styles.textDesc]}>{desc}</Text>
            </View>
          )}

          {child}

          {button && (
            <TouchableOpacity onPress={onAccept} style={styles.wrapButton}>
              <Text style={styles.button}>Xác nhận</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalCustom;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: theme.colors.transparent,
    maxHeight: height - getSize.m(32 * 8),
  },
  section: {
    backgroundColor: theme.colors.white,
    minHeight: getSize.v(100),
    borderRadius: getSize.m(8),
    padding: getSize.m(16),
  },
  wrapDesc: {},
  wrapTitle: {
    marginBottom: getSize.m(16),
  },
  textTitle: {
    alignSelf: 'center',
    ...createTextStyle(16, 'semibold'),
    color: theme.colors.black,
  },
  textDesc: {
    ...createTextStyle(14, 'normal'),
    color: theme.colors.black,
  },
  wrapButton: {
    borderRadius: getSize.m(8),
    paddingVertical: getSize.m(8),
    paddingHorizontal: getSize.m(12),
    backgroundColor: theme.colors.secondary,
    alignSelf: 'center',
  },
  button: {
    ...createTextStyle(16, 'medium'),
    color: theme.colors.white,
  },
});
