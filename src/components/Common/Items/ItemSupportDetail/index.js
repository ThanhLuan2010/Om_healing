/* eslint-disable react-native/no-inline-styles */
import {Block, Text, Icon} from '@components';

import React from 'react';

const ItemSupportDetail = ({item, index, checkData, setCheckData}) => {
  return (
    <Block marginHorizontal={12} key={index} backgroundColor="#0163BF">
      <Block row justifyEnd alignCenter>
        <Block
          paddingVertical={12}
          row
          alignCenter
          marginHorizontal={12}
          width={300}
          radius={20}
          marginVertical={12}
          backgroundColor="#63B8FF">
          <Text
            fontType="heavy"
            // numberOfLines={4}
            size={14}
            marginLeft={10}
            paddingVertical={20}
            style={{color: 'white'}}>
            {item.ticket_Content}
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

export default ItemSupportDetail;
