/* eslint-disable module-resolver/use-alias */
import Card from 'components/common/card';
import Constants from 'constants';
import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {RFValue} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('window');

export default (GraphOverview = () => {
  const data = {
    labels: [],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => '#9A9A9A', // optional
        strokeWidth: 1, // optional
      },
    ],
    legend: [], // optional
  };
  const chartConfig = {
    fillShadowGradient: '#fff',
    fillShadowGradientOpacity: 0,
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    color: (opacity = 10) => '#f0f0f0',
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    propsForBackgroundLines: {
      strokeDasharray: '',
      // solid background lines with no dashes
    },
    propsForDots: {
      r: '0',
      strokeWidth: '0',
      stroke: '#ffa726',
    },
  };
  return (
    <Card
      customStyle={{
        padding: RFValue(16),
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: RFValue(14),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
          }}>
          Mood
        </Text>
        <Text
          style={{
            fontSize: RFValue(14),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
          }}>
          Milestones
        </Text>
        <Text
          style={{
            fontSize: RFValue(14),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
          }}>
          Task
        </Text>
        <Text
          style={{
            fontSize: RFValue(14),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
          }}>
          All
        </Text>
      </View>
      <LineChart
        data={data}
        width={width / 1.25}
        height={220}
        chartConfig={chartConfig}
        withVerticalLabels={false}
        withHorizontalLabelsLabels={false}
        style={{paddingRight: 0}}
      />
    </Card>
  );
});
