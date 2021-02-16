/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions/appActions';
import Header from 'components/common/header';
import Constants from 'constants';
import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
const {width, height} = Dimensions.get('window');
export const AI = props => {
  const _onPressSignup = () => {
    let {componentId, AppActions} = props;
    AppActions.pushWithOptions(componentId, 'Register');
  };
  const _onPressLogin = () => {
    let {componentId, AppActions} = props;
    AppActions.pushWithOptions(componentId, 'Dashboard');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Constants.Colors.BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: RFValue(16),
      }}>
      <Header />
      <View
        style={{height: '85%', justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: RFValue(24),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Medium,
          }}>
          AI
        </Text>
      </View>
    </View>
  );
};
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => ({
  AppActions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AI);

const styles = StyleSheet.create({});
