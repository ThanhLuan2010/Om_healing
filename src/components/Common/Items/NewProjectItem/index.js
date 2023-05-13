import {projectApi} from '@api/project';
import {icons} from '@assets';
import Block from '@components/Block';
import {routes} from '@navigation/routes';
import {useNavigation} from '@react-navigation/native';
import {theme} from '@theme';
import {AppStyles} from '@theme/AppStyles';
import {BaseUrl, Currency} from '@utils/constants';
import {handleScrollToNextIndex} from '@utils/handleScroll';
import {formatCurrency} from '@utils/helper';
import {FORMAT_TIME, HOME_KEYWORD} from '@utils/mockData';
import {width} from '@utils/responsive';
import moment from 'moment';
import React from 'react';
import {Alert, Text, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import styles from './styles';

const NewProjectItem = ({
  data,
  item,
  index,
  lastIndex,
  widthItem,
  style,
  newProjectRef,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onGetDetailPending = async (result, item) => {
    const detailPending = await dispatch(
      projectApi.endpoints.getInvestmentPending.initiate(
        {
          project_id: item.project_id,
        },
        {forceRefetch: true, refetchOnFocus: true},
      ),
    );
    // dispatch(
    //   projectApi.endpoints.getRevenueWalletBalanceTest.initiate(undefined, {
    //     forceRefetch: true,
    //     refetchOnFocus: true,
    //   }),
    // );
    if (Object.keys(result?.data).length > 0) {
      console.log({
        detailPending,
        lala: result,
        alo:
          detailPending?.data?.pending === 1 && detailPending?.data?.phase > 0,
      });

      return navigation.navigate(routes.INVESTMENT_PROJECT_DETAILS, {
        project_slug: item.project_slug,
        statusInvestments:
          detailPending?.data?.pending === 1 && detailPending?.data?.phase > 0
            ? detailPending?.data?.phase
            : 1,
      });
    }
  };
  const onGetDetailProject = async item => {
    try {
      const result = await dispatch(
        projectApi.endpoints.getProjectDetail.initiate(
          {
            slug: item.project_slug,
          },
          {refetchOnMountOrArgChange: true},
        ),
      );
      if (Object.keys(result?.data).length > 0) {
        onGetDetailPending(result, item);
      }
    } catch (error) {
      console.log({error});
      setTimeout(() => {
        Alert.alert('Thông báo', 'Dự án đang xử lí. Vui lòng quay lại sau');
      }, 300);
    }
  };
  const percent = 100 - (item?.total_invested / item?.total_call_project) * 100;

  const TextItemNewProject = ({title, content}) => {
    return (
      <Block flex row>
        <Text style={styles.titleItemNewProject}>{title}</Text>
        <Text style={styles.contentItemNewProject}>{content}</Text>
      </Block>
    );
  };

  const renderTextItemNewProject = () => {
    return (
      <>
        <TextItemNewProject
          title={`${HOME_KEYWORD.Website}:`}
          content={item?.project_website}
        />
        <TextItemNewProject
          title={`${HOME_KEYWORD.StartDate}:`}
          content={moment(item?.project_date).format(FORMAT_TIME.FULL)}
        />
        <TextItemNewProject
          title={`${HOME_KEYWORD.Turnover}:`}
          content={item?.project_revenue_month}
        />
        <TextItemNewProject
          title={`${HOME_KEYWORD.Invest}:`}
          content={formatCurrency({value: item?.total_invested})}
        />
      </>
    );
  };

  const renderNewProjectItem = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          onGetDetailProject(item);
        }}>
        <Block width={width} paddingBottom={16} alignCenter style={style}>
          <Block
            paddingVertical={20}
            paddingLeft={8}
            paddingRight={16}
            backgroundColor={theme.colors.white}
            radius={10}
            width={widthItem ? widthItem : width - 24}
            marginLeft={index === 0 ? 0 : 0}
            style={[AppStyles.viewShadow]}>
            <Block row>
              <FastImage
                style={styles.imageNewProject}
                source={{
                  uri: BaseUrl.Image + item?.project_avata,
                }}
              />

              <Block flex marginLeft={32}>
                {renderTextItemNewProject()}

                <Block row marginTop={12} marginBottom={8}>
                  <Block
                    borderWidth={4}
                    borderColor={theme.colors.secondary}
                    width={`${100 - percent}%`}
                    borderTopLeftRadius={99}
                    borderBottomLeftRadius={99}
                  />
                  <Block
                    borderWidth={4}
                    borderColor={'#D2E8FF'}
                    width={`${percent}%`}
                    borderTopRightRadius={99}
                    borderBottomRightRadius={99}
                  />
                </Block>

                <Block row space="between">
                  <Text style={styles.numberOfInvestors}>
                    {item?.project_count_investment || 0}{' '}
                    {HOME_KEYWORD.Investors}
                  </Text>
                  <Text style={styles.investmentAmount}>
                    {formatCurrency({value: item?.total_invested})}/
                    {formatCurrency({value: item?.total_call_project})}
                    {Currency.VietnamDong}
                  </Text>
                </Block>
              </Block>
            </Block>

            <Block
              width={3}
              height={41}
              absolute
              left={0}
              top={47}
              zIndex={99}
              backgroundColor={theme.colors.secondary}
            />

            {data?.length > 1 && (
              <TouchableOpacity
                style={[styles.wrapChevronRight, AppStyles.viewShadow]}
                onPress={() => {
                  handleScrollToNextIndex(
                    newProjectRef,
                    lastIndex ? 0 : index + 1,
                  );
                }}>
                <FastImage
                  source={icons.chevron_right}
                  style={styles.iconChevronRight}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </Block>
        </Block>
      </TouchableOpacity>
    );
  };

  return <>{renderNewProjectItem()}</>;
};

export default NewProjectItem;
