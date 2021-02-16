// @ts-nocheck
/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Constants from 'constants';
const {width, height} = Dimensions.get('window');
export default (SubHeader = props => {
  let {title, opacity} = props;
  return (
    <Text
      style={{
        flex: 0.8,
        fontSize: RFValue(16),
        color: Constants.Colors.SUB_HEADING,
        fontFamily: Constants.Fonts.Regular,
        opacity: opacity || 1,
      }}>
      {title}
    </Text>
  );
});
