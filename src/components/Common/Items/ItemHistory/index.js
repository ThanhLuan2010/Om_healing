/* eslint-disable react-native/no-inline-styles */
import {Block, Text, Icon} from '@components';
import moment from 'moment';
import React from 'react';
import {Pressable} from 'react-native';
import styles from './styles';

const ItemHistory = ({tab, item, index, checkData, setCheckData}) => {
  const _onPress = () => {
    checkData === index ? setCheckData('') : setCheckData(index);
  };
  if (tab === 'in') {
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
              {item.Money_Comment}
            </Text>
          </Block>

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
              <Text size={14}>Thời Gian</Text>
              <Text size={14}>
                {moment(item.Money_Time * 1000).format('DD/MM/YYYY H:m:s')}
              </Text>
            </Block>
            <Block row alignCenter paddingVertical={8} space={'between'}>
              <Text size={14}>Số Tiền</Text>
              <Text size={14}>{item.Money_USDT}</Text>
            </Block>
            <Block row alignCenter paddingVertical={8} space={'between'}>
              <Text size={14}>Phí</Text>
              <Text size={14}>{item.Money_Rate}</Text>
            </Block>
            <Block row alignCenter paddingVertical={8} space={'between'}>
              <Text size={14}>Tỉ Giá </Text>
              <Text size={14}>{item.Money_USDTFee}</Text>
            </Block>

            <Block row alignCenter paddingVertical={8} space={'between'}>
              <Text size={14}>Thao Tác</Text>
              <Text size={14}>{item.MoneyAction_Name}</Text>
            </Block>

            <Block row alignCenter paddingVertical={8} space={'between'}>
              <Text size={14}>Trạng Thái</Text>
              <Text size={14}>
                {item.Money_Confirm === 0 ? 'Thành công' : 'chờ xác nhận'}
              </Text>
            </Block>
          </Block>
        )}
      </Pressable>
    );
  }
  if (tab === 'out') {
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
              {item.money_withdraw_comment}
            </Text>
          </Block>

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
              <Text size={14}>Thời Gian</Text>
              <Text size={14}>
                {moment(item.money_withdraw_time * 1000).format(
                  'DD/MM/YYYY H:m:s',
                )}
              </Text>
            </Block>
            <Block row alignCenter paddingVertical={8} space={'between'}>
              <Text size={14}>Số Tiền</Text>
              <Text size={14}>{item.money_withdraw_amount}</Text>
            </Block>
            <Block row alignCenter paddingVertical={8} space={'between'}>
              <Text size={14}>Loại Tiền</Text>
              <Text size={14}>{item.Currency_Name}</Text>
            </Block>
            <Block row alignCenter paddingVertical={8} space={'between'}>
              <Text size={14}>Thao Tác</Text>
              <Text size={14}>{item.MoneyAction_Name}</Text>
            </Block>

            {/* <Block row alignCenter paddingVertical={8} space={'between'}>
              <Text size={14}>Trạng Thái</Text>
              <Text size={14}>
                {item.money_withdraw_confirm === 0
                  ? 'Thành công'
                  : 'chờ xác nhận'}
              </Text>
            </Block> */}
          </Block>
        )}
      </Pressable>
    );
  }
};

export default ItemHistory;
