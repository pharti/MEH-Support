/* eslint-disable module-resolver/use-alias */
import Header from 'components/common/header';
import Constants from 'constants';
import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import CalendarMenu from './calendarSummary';
const {width, height} = Dimensions.get('window');
export default (Summary = props => {
  const {_getSummaryDate} = props;
  return (
    <ScrollView
      style={{backgroundColor: Constants.Colors.BACKGROUND}}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: RFValue(16),
        paddingBottom: '34%',
      }}>
      <Header />
      <View style={{height: '85%'}}>
        <CalendarMenu getSummaryDate={_getSummaryDate} />
      </View>
    </ScrollView>
  );
});
