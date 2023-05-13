/* eslint-disable react-hooks/exhaustive-deps */
import Block from '@components/Block';
import ModalCustom from '@components/ModalCustom';
import {theme} from '@theme';
import {AppStyles} from '@theme/AppStyles';
import {Currency} from '@utils/constants';
import {formatCurrency} from '@utils/helper';
import {HOME_KEYWORD} from '@utils/mockData';
import {getSize, width} from '@utils/responsive';
import React, {useMemo, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import {
  BarChart,
  LineChart,
  PieChart,
  ProgressChart,
} from 'react-native-chart-kit';
import styles from './styles';

const ChartKit = ({
  pieChart,
  population1,
  population2,
  pieChartStyle,
  lineChart,
  lineChartLabels,
  lineChartData,
  lineChartStyle,
  bezier,
  progressChart,
  progressChartStyle,
  barChart,
  barChartStyle,
  chartConfig,
  style,
}) => {
  const [pointClick, setPointClick] = useState('');
  const [isPointClick, setIsPointClick] = useState(false);

  const pieData = [
    {
      name: HOME_KEYWORD.Received,
      color: '#88A1BC',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
      population: population1,
    },
    {
      name: HOME_KEYWORD.Expected,
      color: '#0045A2',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
      population: population2,
    },
  ];

  const DATA_PROGRESS_RING = {
    labels: ['Swim', 'Bike', 'Run'], // optional
    data: [0.4, 0.6, 0.8],
  };

  const propsForDots = {
    r: '4',
    strokeWidth: '1',
    stroke: theme.colors.stroke,
  };

  const chartConfigPie = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const chartConfigLine = {
    backgroundColor: theme.colors.white,
    backgroundGradientFrom: theme.colors.white,
    backgroundGradientTo: theme.colors.white,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 115, 230, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: propsForDots,
  };

  const chartConfigLineCustom = {
    backgroundGradientFrom: theme.colors.white,
    backgroundColor: theme.colors.white,
    backgroundGradientTo: theme.colors.white,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 115, 230, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    linejoinType: 'round',
    scrollableDotFill: theme.colors.white,
    scrollableDotRadius: 6,
    scrollableDotStrokeColor: theme.colors.stroke,
    scrollableDotStrokeWidth: 2,
    scrollableInfoViewStyle: {
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: theme.colors.investment,
      borderRadius: 8,
    },
    scrollableInfoTextStyle: {
      color: '#C4C4C4',
      flex: 1,
      textAlign: 'center',
    },
    scrollableInfoSize: {width: getSize.s(65), height: getSize.v(32)},
    scrollableInfoOffset: 12,
    propsForDots: propsForDots,
  };

  const chartConfigProgress = {
    backgroundGradientFrom: theme.colors.background,
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: theme.colors.background,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 115, 215, ${opacity})`,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const chartConfigBar = {
    backgroundColor: theme.colors.white,
    backgroundGradientFrom: theme.colors.white,
    backgroundGradientTo: theme.colors.white,
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 111, 222, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 10, 15, ${opacity})`,
    style: {borderRadius: 16},
    propsForDots: propsForDots,
  };

  const DATA_BAR = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const PieChartKit = () => (
    <PieChart
      data={pieData}
      width={width}
      height={220}
      chartConfig={chartConfigPie}
      accessor={'population'}
      backgroundColor={'transparent'}
      paddingLeft={'8'}
      center={[0, -15]}
      style={[pieChartStyle]}
      // absolute
    />
  );

  const DATA_DATE = [
    '2022/01/01',
    '2022/02/01',
    '2022/03/01',
    '2022/04/01',
    '2022/05/01',
    '2022/06/01',
  ];

  const LineChartKit = useMemo(
    () => (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <LineChart
          data={{
            labels: lineChartLabels || [],
            datasets: [
              {
                data: lineChartData || [],
              },
            ],
          }}
          // width={width - getSize.m(48)}
          width={
            lineChartLabels?.length > 4
              ? (lineChartLabels?.length / 4) * width
              : width - getSize.m(48)
          }
          height={320}
          // verticalLabelRotation={30}
          // yAxisLabel="$"
          // yAxisSuffix="k"
          yAxisInterval={9}
          chartConfig={chartConfigLine}
          bezier={bezier}
          style={styles.chart}
          xLabelsOffset={16}
          yLabelsOffset={6}
          formatXLabel={value => value}
          onDataPointClick={({index, dataset, x, y, getColor}) => {
            console.log(index, dataset, x, y, getColor(0.5));
            setIsPointClick(true);
            setPointClick({index, dataset: dataset.data[index], x, y});
          }}
          // segments={5}
          // hidePointsAtIndex={[]}

          // verticalLabelRotation={30}
        />
      </ScrollView>
    ),
    [lineChartLabels, lineChartData],
  );

  const ProgressChartKit = () => (
    <ProgressChart
      data={DATA_PROGRESS_RING}
      width={width}
      height={220}
      strokeWidth={16}
      radius={32}
      chartConfig={chartConfigProgress}
      hideLegend={false}
      style={[progressChartStyle]}
    />
  );

  const BarChartKit = () => (
    <BarChart
      style={[AppStyles.columnCenterTop, styles.chart, barChartStyle]}
      data={DATA_BAR}
      width={width - getSize.m(32)}
      height={220}
      chartConfig={chartConfigBar}
    />
  );

  const renderStatisticalData = () => {
    return (
      <Block paddingBottom={16} paddingTop={8}>
        <Text style={[styles.textDefault, {marginBottom: getSize.m(8)}]}>
          {HOME_KEYWORD.AtTime}: {lineChartLabels[pointClick.index]}
        </Text>

        <Text style={styles.textDefault}>
          {HOME_KEYWORD.GetTheAmount}:{' '}
          {formatCurrency({value: pointClick.dataset})}{' '}
          {Currency.VietnamDong.toUpperCase()}
        </Text>
      </Block>
    );
  };

  return (
    <Block style={style}>
      {pieChart && <PieChartKit />}
      {lineChart && LineChartKit}
      {progressChart && <ProgressChartKit />}
      {barChart && <BarChartKit />}

      {isPointClick && (
        <ModalCustom
          isShowAlert={isPointClick}
          onAccept={() => setIsPointClick(false)}
          onCancel={() => setIsPointClick(false)}
          child={renderStatisticalData()}
          title={HOME_KEYWORD.RevenueDetails.toUpperCase()}
        />
      )}
    </Block>
  );
};

export default ChartKit;
