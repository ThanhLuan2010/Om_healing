import Block from '@components/Block';
import {theme} from '@theme';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';

const NewsEventItem = ({
  item,
  index,
  style,
  onPress,
  image,
  title,
  content,
  date,
  hours,
}) => {
  const renderEventItem = () => {
    return (
      <Block key={'Event' + item.created_at + index.toString()}>
        <TouchableOpacity onPress={onPress} style={[styles.wrapNews, style]}>
          <FastImage
            source={{
              uri: image,
            }}
            resizeMode="cover"
            style={styles.imageEventItem}
          />

          <Block marginLeft={16} flex>
            <Text numberOfLines={2} style={styles.textTitle}>
              {title}
            </Text>
            <Text numberOfLines={3} style={styles.textContent}>
              {content}
            </Text>

            <Block alignEnd flex row marginTop={8}>
              <Text style={styles.textDate}>{date}</Text>
              <Text style={styles.textHours}>{hours}</Text>
            </Block>
          </Block>
        </TouchableOpacity>

        <Block
          borderTopWidth={1}
          borderColor={theme.colors.black}
          opacity={0.2}
          marginVertical={16}
        />
      </Block>
    );
  };

  return <>{renderEventItem()}</>;
};

export default NewsEventItem;
