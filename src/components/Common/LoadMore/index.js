import {Block} from '@components';
import {getSize} from '@utils/responsive';
import React from 'react';
import {UIActivityIndicator} from 'react-native-indicators';

const LoadMore = () => {
  return (
    <Block marginVertical={20}>
      <UIActivityIndicator size={getSize.s(20)} color={'red' || '#FF6E4B'} />
    </Block>
  );
};

export default LoadMore;
