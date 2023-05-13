import {images} from '@assets';
import {Block, Text} from '@components';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, Pressable} from 'react-native';
import styles from './styles';

const ItemProfile = ({item, index, infoData}) => {
  const navigation = useNavigation();

  const _onPress = () => {
    navigation.navigate(item.navigation, {
      item: item,
    });
  };
  if (infoData?.info?.UserAgencyLevel?.user_agency_level_ID !== item?.params) {
    return (
      <Pressable key={index} onPress={() => _onPress()}>
        <Block style={styles.container(index)}>
          <Block row alignCenter marginLeft={10}>
            <Image
              source={item.image}
              style={styles.iconLeft}
              resizeMode="contain"
            />
            <Text size={14} fontType="heavy">
              {item.title}
            </Text>
          </Block>
          <Image
            source={images.directional}
            style={styles.iconLeft}
            resizeMode="contain"
          />
        </Block>
        <Block left={50} height={1} width={'100%'} backgroundColor="smoke" />
      </Pressable>
    );
  }
 
};

export default ItemProfile;
