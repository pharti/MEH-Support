/* eslint-disable module-resolver/use-alias */
import React from 'react';
import {Dimensions, Text, View} from 'react-native';
const {width, height} = Dimensions.get('window');
export default (Mentees = props => {
  const {goToAddDailyReflections, dailyReflections} = props;
  return (
    <View>
      <Text>Mentee</Text>
    </View>
  );
});
