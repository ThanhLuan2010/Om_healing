import Block from '@components/Block';
import {theme} from '@theme';
import {FORMAT_TIME} from '@utils/mockData';
import React from 'react';
import {TextInput} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import styles from './styles';

const InputNormal = ({
  placeholder,
  placeholderTextColor,
  onChangeText,
  keyboardType,
  value,
  multiline,
  secureTextEntry,
  inputStyle,
  inputMask,
  style,
  creditCard,
  cpf,
  cnpj,
  zipCode,
  onlyNumbers,
  money,
  cellPhone,
  dateTime,
  custom,
}) => {
  const maskMoney = 'money';
  const maskCreditCard = 'credit-card';
  const maskCpf = 'cpf';
  const maskCnpj = 'cnpj';
  const maskZipCode = 'zip-code';
  const maskOnlyNumbers = 'only-numbers';
  const maskCelPhone = 'cel-phone';
  const maskDateTime = 'datetime';
  const maskCustom = 'custom';

  const optionsMoney = {
    precision: 0,
    separator: ',',
    delimiter: '.',
    unit: '',
    suffixUnit: '',
  };

  const optionsCellPhone = {
    maskType: 'BRL',
    withDDD: true,
    dddMask: '(84) ',
  };

  const optionsCreditCard = {
    obfuscated: false,
    issuer: 'amex',
  };

  const optionsDateTime = {
    format: FORMAT_TIME.DATE,
  };

  return (
    <Block marginBottom={16} style={style}>
      {inputMask && (
        <TextInputMask
          type={
            (money && maskMoney) ||
            (creditCard && maskCreditCard) ||
            (cpf && maskCpf) ||
            (cnpj && maskCnpj) ||
            (zipCode && maskZipCode) ||
            (onlyNumbers && maskOnlyNumbers) ||
            (cellPhone && maskCelPhone) ||
            (dateTime && maskDateTime) ||
            (custom && maskCustom) ||
            maskMoney
          }
          options={
            (money && optionsMoney) ||
            (cellPhone && optionsCellPhone) ||
            (creditCard && optionsCreditCard) ||
            (dateTime && optionsDateTime) ||
            optionsMoney
          }
          placeholder={placeholder}
          placeholderTextColor={
            placeholderTextColor || theme.colors.placeholder
          }
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          style={[styles.textInput, inputStyle]}
          multiline={multiline}
          value={value}
          secureTextEntry={secureTextEntry}
          includeRawValueInChangeText={true}
        />
      )}

      {!inputMask && (
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={
            placeholderTextColor || theme.colors.placeholder
          }
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          style={[styles.textInput, inputStyle]}
          multiline={multiline}
          value={value}
          secureTextEntry={secureTextEntry}
          includeRawValueInChangeText={true}
        />
      )}
    </Block>
  );
};

export default InputNormal;
