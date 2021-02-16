/* eslint-disable module-resolver/use-alias */
import Card from 'components/common/card';
import Constants from 'constants';
import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
export default (SoberTracker = props => {
  const {setCurrentStrike} = props;
  const sobriety = useSelector(
    state => state.usersReducer.userDetails.sobriety,
  );
  return (
    <Card
      customStyle={{
        paddingTop: RFValue(16),
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: RFValue(20),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
          }}>
          Did you stay sober today?
        </Text>
        <Text
          style={{
            paddingTop: RFValue(16),
            fontSize: RFValue(40),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
          }}>
          {(sobriety && sobriety.currentStreak) || 0} Days
        </Text>
        <Text
          style={{
            paddingTop: RFValue(16),
            fontSize: RFValue(14),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
          }}>
          Your current strike
        </Text>
      </View>
      <TouchableOpacity
        style={{
          margin: RFValue(16),
          height: height / 14,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            sobriety && sobriety.isSoberToday
              ? Constants.Colors.SECONDARY
              : Constants.Colors.PRIMARY,
          borderRadius: RFValue(10),
        }}
        onPress={() =>
          sobriety && !sobriety.isSoberToday && setCurrentStrike()
        }>
        <Text style={{color: Constants.Colors.WHITE, fontSize: RFValue(16)}}>
          VIRTUAL HIGH FIVE!
        </Text>
      </TouchableOpacity>
    </Card>
  );
});
