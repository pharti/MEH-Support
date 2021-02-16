/* eslint-disable module-resolver/use-alias */
import React, {useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as AppActions from 'actions';
import Header from 'components/common/header';
import Constants from 'constants';

const {width, height} = Dimensions.get('window');
export const TakeATour = props => {
  const [focus, setFocus] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let {AppActions, componentId} = props;
  return (
    <View style={{backgroundColor: Constants.Colors.BACKGROUND}}>
      <Header componentId={componentId} />
      <View style={{height: '85%'}} />
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
)(TakeATour);

const styles = StyleSheet.create({});
