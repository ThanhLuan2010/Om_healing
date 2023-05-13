import Block from '@components/Block';
import {routes} from '@navigation/routes';
import {formatCurrency, openLinkPdf} from '@utils/helper';
import {HOME_KEYWORD} from '@utils/mockData';
import {width} from '@utils/responsive';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const InvestmentItem = ({data, item, index, navigation, style}) => {
  const onDetail = () => {
    // Link to Investment details
    navigation.navigate(routes.INVESTMENT_DETAILS, {
      projectSlug: item.project_slug,
      projectId: item.project_id,
      projectName: item.project_name,
    });
  };
  const onSeeContract = () => {
    // Link to Pdf View Contract
    openLinkPdf(item?.url_electronic_contract);
  };

  const TextInvestmentItem = ({title, content, expected}) => {
    return (
      <>
        <Block borderWidth={1} borderColor={'#D2E8FF'} marginVertical={4} />

        <Block row alignCenter padding={8}>
          <Block width={'45%'}>
            <Text style={styles.textTitleItemInvestment}>{title}</Text>
            {expected && (
              <Text style={styles.textExpected}>({HOME_KEYWORD.Expected})</Text>
            )}
          </Block>

          <Block width={'55%'}>
            <Text style={styles.textTitleItemInvestment}>
              {formatCurrency({value: content})}
            </Text>
          </Block>
        </Block>
      </>
    );
  };

  const renderInvestmentItem = () => {
    return (
      <>
        <Block backgroundColor={'#004090'} width={width} style={style}>
          <Block row alignCenter padding={8}>
            <Block width={'45%'}>
              <Text style={styles.textTitleItemInvestment}>TÊN DỰ ÁN</Text>
            </Block>

            <Block width={'55%'}>
              <Text style={styles.textProject}>
                {item?.project_name?.toUpperCase()}
              </Text>

              <Block row marginTop={5}>
                <TouchableOpacity
                  onPress={onDetail}
                  style={[styles.buttonDetailInvestment]}>
                  <Text style={styles.textDetailInvestment}>
                    {HOME_KEYWORD.Detail}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onSeeContract}
                  style={[styles.buttonSeeContractInvestment]}>
                  <Text style={styles.textSeeContract}>
                    {HOME_KEYWORD.SeeContract}
                  </Text>
                </TouchableOpacity>
              </Block>
            </Block>
          </Block>

          <TextInvestmentItem
            title={HOME_KEYWORD.TotalInvestment}
            content={item?.total_inves_project}
          />

          <TextInvestmentItem
            title={HOME_KEYWORD.RevenueReceived}
            content={item?.profit_received?.profit_vnd}
          />
          <TextInvestmentItem
            title={HOME_KEYWORD.TodayRevenue}
            content={item?.profit_today}
            expected={true}
          />
          <TextInvestmentItem
            title={HOME_KEYWORD.TotalRevenue}
            content={item?.total_expected_profit}
            expected={true}
          />

          {/* <Block row>
            <Block borderWidth={4} borderColor={'#D2E8FF'} width={'70%'} />
            <Block
              borderWidth={4}
              borderColor={theme.colors.secondary}
              width={'30%'}
            />
          </Block> */}
        </Block>
      </>
    );
  };

  return <>{renderInvestmentItem()}</>;
};

export default InvestmentItem;
