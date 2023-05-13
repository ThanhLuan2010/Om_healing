import {icons} from '@assets';
import Block from '@components/Block';
import {theme} from '@theme';
import {Currency} from '@utils/constants';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {formatCurrency} from '@utils/helper';

const RevenueBoxItem = ({
  title,
  price,
  onclickOne,
  onclickTwo,
  notText,
  textButtonOne,
  textButtonTwo,
}) => {
  const renderItem = () => {
    return (
      <Block
        row
        space="between"
        backgroundColor={theme.colors.white}
        paddingHorizontal={16}
        paddingVertical={16}
        height={107}
        radius={10}
        marginBottom={20}>
        <Block>
          {notText !== true ? (
            <Block row alignCenter marginBottom={8}>
              <FastImage
                style={styles.iconRevenueWaller}
                source={icons.revenueWallet}
                resizeMode="contain"
              />
              <Text style={styles.textTitleRevenueWallet}>{title}</Text>
            </Block>
          ) : (
            <Block row alignCenter marginBottom={8}>
              <FastImage
                style={styles.iconRevenueWaller}
                source={icons.clock}
                resizeMode="contain"
              />
              <Text style={styles.textTitleRevenueWallet}>{title}</Text>
            </Block>
          )}

          <Block
            borderTopWidth={0.5}
            borderColor={theme.colors.investment}
            width={57}
            marginLeft={8}
          />

          <Block flex justifyEnd>
            <Text style={styles.textPrice}>
              {formatCurrency({value: price})}
              <Text style={styles.textVnd}> {Currency.VietnamDong}</Text>
            </Text>
          </Block>
        </Block>
        {notText !== true && (
          <Block
            style={[
              textButtonTwo
                ? styles.investmentItemBothButton
                : styles.investmentItemButtonOne,
            ]}>
            <TouchableOpacity
              onPress={onclickOne}
              style={[styles.buttonWithdrawMoney]}>
              <Text style={styles.textWithdrawMoney}>{textButtonOne} </Text>
            </TouchableOpacity>

            {textButtonTwo && (
              <TouchableOpacity
                onPress={onclickTwo}
                style={[
                  styles.buttonWithdrawMoney,
                  {backgroundColor: '#00851D'},
                ]}>
                <Text style={styles.textWithdrawMoney}>{textButtonTwo}</Text>
              </TouchableOpacity>
            )}
          </Block>
        )}
      </Block>
    );
  };

  return <>{renderItem()}</>;
};

export default RevenueBoxItem;
