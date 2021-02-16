// @ts-nocheck
import React from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as Images from '../../assets/icons';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import * as AppActions from '../../actions';
import {bindActionCreators} from 'redux';
import {Navigation} from 'react-native-navigation';
const {width, height} = Dimensions.get('window');
export const Header = props => {
  const {AppActions, componentId} = props;
  const _goBack = () => {
    Navigation.pop(componentId);
  };
  return (
    <TouchableOpacity
      style={{
        height: '5%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
      onPress={() => {
        _goBack();
      }}>
      <Image source={Images.backArrow} />
    </TouchableOpacity>
  );
};

const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => ({
  AppActions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
