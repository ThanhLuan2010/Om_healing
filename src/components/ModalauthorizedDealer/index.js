/* eslint-disable react-hooks/exhaustive-deps */
import {useLazyGetAjaxQuery} from '../../api/info';
import {Block, Text, ModalBox} from '@components';
import {formatCurrency} from '@utils/helper';
import {width} from '@utils/responsive';
import React, {useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
const ModalAuth = ({
  title,
  item,
  data,
  isVisible,
  setIsVisible,
  onBackdropPress,
}) => {
  const [getAjax, {data: dataAjax = []}] = useLazyGetAjaxQuery();
  const onGetInfo = () => {
    getAjax(data).unwrap();
  };

  useEffect(() => {
    onGetInfo();
  }, [data]);
  return (
    <ModalBox
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      onBackdropPress={onBackdropPress}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={[
          '#4e7cf1',
          '#4f7ce9',
          '#517de1',
          '#547fd6',
          '#4778d8',
          '#3c71dc',
          '#3c71dc',
        ]}
        style={styles.linearGradient}>
        <Block backgroundColor={'white'} radius={6}>
          <Text
            color="black"
            fontType="heavy"
            marginVertical={12}
            marginLeft={12}>
            Thông Tin Người Dùng
          </Text>
        </Block>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block width={width} radius={20} marginVertical={6}>
            <Block flex marginHorizontal={18}>
              <Block marginTop={20}>
                <Text color="white" marginVertical={12}>
                  Tên đăng nhập
                </Text>
                <Block backgroundColor={'white'}>
                  <Text paddingVertical={12} paddingHorizontal={20}>
                    {dataAjax?.infor?.User_Email}
                  </Text>
                </Block>
              </Block>
              <Block marginTop={20}>
                <Text color="white" marginVertical={12}>
                  Mã Định Danh
                </Text>
                <Block backgroundColor={'white'}>
                  <Text paddingVertical={12} paddingHorizontal={20}>
                    {dataAjax?.infor?.User_ID}
                  </Text>
                </Block>
              </Block>
              <Block marginTop={20}>
                <Text color="white" marginVertical={12}>
                  Tổng Đầu Tư
                </Text>
                <Block backgroundColor={'white'}>
                  <Text paddingVertical={12} paddingHorizontal={20}>
                    {formatCurrency({
                      value: dataAjax?.infor?.TotalInvestment,
                    })}
                    {} VNĐ
                  </Text>
                </Block>
              </Block>
              <Block marginTop={20}>
                <Text color="white" marginVertical={12}>
                  Tổng Danh Thu
                </Text>
                <Block backgroundColor={'white'}>
                  <Text paddingVertical={12} paddingHorizontal={20}>
                    {formatCurrency({
                      value: dataAjax?.infor?.TotalRevenue,
                    })}
                    {} VNĐ
                  </Text>
                </Block>
              </Block>
              <Block marginTop={20}>
                <Text color="white" marginVertical={12}>
                  Tổng Thành Viên
                </Text>
                <Block backgroundColor={'white'}>
                  <Text paddingVertical={12} paddingHorizontal={20}>
                    {dataAjax?.infor?.TotalMembers}
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </LinearGradient>
    </ModalBox>
  );
};

export default ModalAuth;
