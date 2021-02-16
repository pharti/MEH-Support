// @ts-nocheck
/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Constants from 'constants';
const {width, height} = Dimensions.get('window');
export default (CardHeader = props => {
  let {title} = props;
  return (
    <Text
      style={{
        paddingHorizontal: RFValue(16),
        paddingTop: RFValue(16),
        paddingBottom: RFValue(12),
        fontSize: RFValue(16),
        color: Constants.Colors.TEXT_COLOR,
        fontFamily: Constants.Fonts.Medium,
      }}>
      {title}
    </Text>
  );
});
