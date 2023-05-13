import Block from '@components/Block';
import {theme} from '@theme';
import {BaseUrl} from '@utils/constants';
import {FORMAT_TIME, HOME_KEYWORD} from '@utils/mockData';
import moment from 'moment';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';

const NotificationItem = ({data, item, index, onPress, style}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.wrapNotification, style]}>
        <FastImage
          source={{
            uri: BaseUrl.Image + item?.image,
          }}
          resizeMode="cover"
          style={styles.imageNotification}
        />

        <Block marginLeft={16} flex>
          {item?.type === 1 && (
            <Block style={[styles.wrapButton]}>
              <Text numberOfLines={1} style={[styles.textButton]}>
                {HOME_KEYWORD.Discount}
              </Text>
            </Block>
          )}

          <Block row space="between">
            <Text numberOfLines={3} style={styles.textTitle}>
              {item?.title}
            </Text>
          </Block>

          <Block row marginTop={8}>
            <Text style={styles.textDate}>
              {moment(item?.date_create).format(FORMAT_TIME.DATE)}
            </Text>

            <Text style={styles.textHours}>
              {moment(item?.date_create).format(FORMAT_TIME.HOUR)}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>

      {data?.length - 1 !== index && (
        <Block
          borderTopWidth={1}
          borderColor={theme.colors.black}
          opacity={0.2}
          marginVertical={16}
        />
      )}
    </>
  );
};

export default NotificationItem;
