/* eslint-disable react-hooks/exhaustive-deps */
import {
  useGetListProjectInvestmentQuery,
  useGetSaleReportsChartQuery,
} from '@api/dashboard';
import {icons} from '@assets';
import {Block, ChartKit, ModalCustom} from '@components';
import {theme} from '@theme';
import {FILTER_DATE, FORMAT_TIME, HOME_KEYWORD} from '@utils/mockData';
import {getSize} from '@utils/responsive';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';
import styles from './styles';

const SalesReport = ({projectId, projectName, isTitle, style}) => {
  const [isFilterProject, setIsFilterProject] = useState(false);
  const [isFilterDate, setIsFilterDate] = useState(false);
  const [selected, setSelected] = useState({
    project: '',
    date_type: 'day',
  });

  const {data: projectInvestment = []} = useGetListProjectInvestmentQuery();

  const {data: saleReportsChartData, isLoading = []} =
    useGetSaleReportsChartQuery({
      project: projectId || selected.project,
      date_type: selected.date_type,
    });

  console.log({isLoading});
  const saleReportsChart = saleReportsChartData?.data;
  const listProjectInvestment = projectInvestment?.list;

  const projectInvestmentDefault = listProjectInvestment?.find(
    i => i.project_id === selected.project,
  )?.project_name;

  const dateDefault = FILTER_DATE?.find(
    i => i.value === selected.date_type,
  )?.name;

  console.log({
    projectInvestment,
    saleReportsChartData,
    projectName,
  });

  useEffect(() => {
    if (listProjectInvestment?.length > 0) {
      setSelected({
        ...selected,
        project: listProjectInvestment?.[0].project_id,
      });
    }
  }, [listProjectInvestment]);

  const onSelectDropDown = item => {
    if (isFilterProject) {
      setSelected({...selected, project: item.project_id});
      setIsFilterProject(false);
    }

    if (isFilterDate) {
      setSelected({...selected, date_type: item.value});
      setIsFilterDate(false);
    }
  };

  console.log({selected});

  const onDropDownProject = () => {
    setIsFilterProject(true);
  };

  const onAcceptProject = () => {
    setIsFilterProject(false);
  };

  const onCancelProject = () => {
    setIsFilterProject(false);
  };

  const onDropDownDate = () => {
    setIsFilterDate(true);
  };

  const onAcceptDate = () => {
    setIsFilterDate(false);
  };

  const onCancelDate = () => {
    setIsFilterDate(false);
  };

  const Button = ({title, onPress, buttonStyle, textStyle}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.buttonSelect, buttonStyle]}>
        <Text numberOfLines={1} style={[styles.textDrop, textStyle]}>
          {title}
        </Text>

        <FastImage
          style={styles.iconDown}
          source={icons.iconDown}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  const renderAction = () => {
    return (
      <Block>
        {isTitle && (
          <Text style={styles.textTitle}>{HOME_KEYWORD.SalesReport}</Text>
        )}

        <Block
          backgroundColor={theme.colors.white}
          paddingTop={16}
          paddingBottom={16}
          radius={16}>
          <Block paddingHorizontal={16} row justifyEnd marginBottom={16}>
            {!projectId && (
              <Button
                textStyle={styles.textStyleDrop}
                title={
                  projectName ||
                  projectInvestmentDefault ||
                  HOME_KEYWORD.Projects
                }
                onPress={onDropDownProject}
              />
            )}

            <Button
              buttonStyle={{marginLeft: getSize.m(8)}}
              title={dateDefault}
              onPress={onDropDownDate}
            />
          </Block>

          {saleReportsChart?.x?.length > 0 &&
          saleReportsChart?.y?.length > 0 &&
          !isLoading ? (
            <ChartKit
              lineChart={true}
              lineChartLabels={saleReportsChart?.y?.map(i =>
                moment(i).format(FORMAT_TIME.DATE),
              )}
              lineChartData={saleReportsChart?.x}
              bezier={true}
            />
          ) : (
            <Block height={320} alignCenter justifyCenter>
              <Text style={styles.textNoRevenue}>{HOME_KEYWORD.NoRevenue}</Text>
            </Block>
          )}
        </Block>
      </Block>
    );
  };

  const renderDropDown = () => {
    return (
      <FlatList
        style={styles.scrollDropDown}
        showsVerticalScrollIndicator={false}
        data={isFilterProject ? listProjectInvestment : FILTER_DATE}
        keyExtractor={(item, index) =>
          (isFilterProject ? item?.project_name : item?.name) + index.toString()
        }
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => onSelectDropDown(item)}
              style={styles.wrapItemDropDown}>
              <Text style={styles.itemTextContentDropDown}>
                {isFilterProject ? item?.project_name : item?.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  return (
    <>
      <Block style={[style]}>
        {renderAction()}

        {isFilterProject && (
          <ModalCustom
            isShowAlert={isFilterProject}
            onAccept={onAcceptProject}
            onCancel={onCancelProject}
            child={renderDropDown()}
            title={HOME_KEYWORD.SelectProject.toUpperCase()}
          />
        )}

        {isFilterDate && (
          <ModalCustom
            isShowAlert={isFilterDate}
            onAccept={onAcceptDate}
            onCancel={onCancelDate}
            child={renderDropDown()}
            title={HOME_KEYWORD.SelectFilterTime.toUpperCase()}
          />
        )}
      </Block>
    </>
  );
};

export default SalesReport;
