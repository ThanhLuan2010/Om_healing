/* eslint-disable react-native/no-inline-styles */
import {Block, Text, Icon} from '@components';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import { Pressable } from 'react-native';
import styles from './styles';

const ItemSupport = ({item, index, checkData, setCheckData}) => {
  const navigation = useNavigation();
  const _onPress = () => {
    checkData === index ? setCheckData('') : setCheckData(index);
  };

  const _onAll = () => {
    navigation.navigate(routes.SUPPORT_DETAIL, {params: item});
  };

  return (
    <Pressable key={index} onPress={() => _onPress()}>
      <Block
        row
        space={'between'}
        alignCenter
        paddingVertical={16}
        style={
          Number(index) % 2 === 0
            ? index === checkData
              ? {backgroundColor: '#003E78'}
              : {backgroundColor: '#0163BF'}
            : index === checkData
            ? {backgroundColor: '#1E90FF'}
            : {backgroundColor: '#87CEFF'}
        }>
        <Block row alignCenter marginLeft={25}>
          <Text
            fontType="heavy"
            size={14}
            style={index === checkData ? {color: 'black'} : {color: 'white'}}>
            # {item.ticket_ID}
          </Text>
        </Block>

        <Block style={[styles.iconLoad, {marginRight: 12}]}>
          {index === checkData ? (
            <Icon size={15} type="AntDesign" name="down" />
          ) : (
            <Icon size={15} type="AntDesign" name="right" />
          )}
        </Block>
      </Block>
      {index === checkData && (
        <Block paddingHorizontal={20} backgroundColor="#87CEFF">
          <Block
            marginLeft={20}
            height={1}
            width={'90%'}
            backgroundColor="smoke"
            alignCenter
          />

          <Block row paddingVertical={8} alignCenter space={'between'}>
            <Text size={14}>Vấn đề</Text>
            <Text size={14}>#{item.ticket_User}</Text>
          </Block>
          <Block row alignCenter paddingVertical={8} space={'between'}>
            <Text size={14}>Trạng thái</Text>
            <Text size={14}>{item.ticket_subject_name}</Text>
          </Block>
          <Block row alignCenter paddingVertical={8} space={'between'}>
            <Text size={14}>Thời gian</Text>
            <Text size={14}>{item.ticket_Time}</Text>
          </Block>
          <Block row alignCenter paddingVertical={8} space={'between'}>
            <Text size={14}>Thao tác </Text>
            <Block row>
              <Pressable marginLeft={12} key={index} onPress={() => _onAll()}>
                <Text size={14}>Xem chi tiết </Text>
              </Pressable>
            </Block>
          </Block>
        </Block>
      )}
    </Pressable>
  );
};

export default ItemSupport;
