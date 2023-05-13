/* eslint-disable react-native/no-inline-styles */
import {images} from '@assets';
import {Block, Text, Icon} from '@components';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, Pressable} from 'react-native';
import styles from './styles';

const ItemMember = ({item, index, checkData, setCheckData}) => {
  const navigation = useNavigation();
  const _onPress = () => {
    checkData === index ? setCheckData('') : setCheckData(index);
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
              ? {backgroundColor: '#0163BF'}
              : {backgroundColor: '#003E78'}
            : index === checkData
            ? {backgroundColor: '#87CEFF'}
            : {backgroundColor: '#1E90FF'}
        }>
        <Block row alignCenter marginLeft={25}>
          <Text
            fontType="heavy"
            size={14}
            style={index === checkData ? {color: 'black'} : {color: 'white'}}>
            {item.User_Email}
          </Text>
        </Block>
        {/* <Image
          source={images.directional}
          style={styles.iconLeft}
          resizeMode="contain"
        /> */}

        <Block style={[styles.iconLoad, {marginLeft: 12}]}>
          {index === checkData ? (
            <Icon size={15} type="AntDesign" name="right" />
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
            <Text size={14}>Mã định danh</Text>
            <Text size={14}>#{item.User_ID}</Text>
          </Block>
          <Block row alignCenter paddingVertical={8} space={'between'}>
            <Text size={14}>Người giới thiệu</Text>
            <Text size={14}>{item.User_Parent}</Text>
          </Block>
          <Block row alignCenter paddingVertical={8} space={'between'}>
            <Text size={14}>Tầng</Text>
            <Text size={14}>F{item.f}</Text>
          </Block>
          <Block row alignCenter paddingVertical={8} space={'between'}>
            <Text size={14}>Tổng đầu tư </Text>
            <Text size={14}>{item.sum_total_inves_vnd} VNĐ</Text>
          </Block>
          <Block row alignCenter paddingVertical={8} space={'between'}>
            <Text size={14}>Ngày đăng ký</Text>
            <Text size={14}>{item.User_RegisteredDatetime}</Text>
          </Block>
        </Block>
      )}
    </Pressable>
  );
};

export default ItemMember;
