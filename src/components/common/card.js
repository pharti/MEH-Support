// @ts-nocheck
/* eslint-disable prettier/prettier */
import React from 'react';
import { Dimensions, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Constants from '../../constants';
const { width, height } = Dimensions.get('window');
export default (Card = props => {
  let { children, customStyle, bgColor, isSimpleCard } = props;
  return (
    <View
      style={[
        customStyle, isSimpleCard ?
          {
            width: width / 1.1,
            alignSelf: 'center',
            marginBottom: RFValue(8),
            backgroundColor: bgColor || Constants.Colors.WHITE,
          } :
          {
            width: width / 1.1,
            alignSelf: 'center',
            borderRadius: RFValue(10),
            shadowColor: Constants.Colors.PRIMARY,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 4,
            marginBottom: RFValue(16),
            backgroundColor: bgColor || Constants.Colors.WHITE,
          },
      ]}>
      {children}
    </View>
  );
});
