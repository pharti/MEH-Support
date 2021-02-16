// @ts-nocheck
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Modal} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import Constants from '../../constants';
export default (FullScreenLoader = props => {
  return (
    <Modal
      visible={props.isLoading}
      transparent={true}
      onRequestClose={() => {}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.2)',
        }}>
        <ActivityIndicator color={Constants.Colors.PRIMARY} />
      </View>
    </Modal>
  );
});
