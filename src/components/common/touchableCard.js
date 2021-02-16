// @ts-nocheck
/* eslint-disable prettier/prettier */
import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Constants from '../../constants';
const {width, height} = Dimensions.get('window');
export default (TouchableCard = props => {
  let {children, customStyle, onPress, bgColor, isDisabled = false} = props;
  return (
    <TouchableOpacity
      style={[
        customStyle,
        {
          width: width / 1.1,
          borderRadius: RFValue(10),
          shadowColor: '#308D85',
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 4,
          backgroundColor: bgColor || Constants.Colors.WHITE,
          marginBottom: RFValue(16),
        },
      ]}
      disabled={isDisabled}
      activeOpacity={0.8}
      onPress={() => onPress()}>
      {children}
    </TouchableOpacity>
  );
});
