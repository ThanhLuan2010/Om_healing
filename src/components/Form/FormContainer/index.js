import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import styles from './styles';

const FormContainer = ({style, children}) => {
  return (
    <KeyboardAvoidingView
      style={{...style, ...styles.keyboardAvoiding}}
      behavior="padding"
      enabled={Platform.OS === 'ios'}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormContainer;
