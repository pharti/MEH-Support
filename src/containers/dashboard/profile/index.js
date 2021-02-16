/* eslint-disable module-resolver/use-alias */
import Constants from 'constants';
import React, {useEffect} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import MyProfile from './myProfile';
import * as AppActions from 'actions';
// import PermissionManager from '../../../utils/PermissionManager';

const {width, height} = Dimensions.get('window');
export const Profile = props => {
  const dispatch = useDispatch();
  const {componentId} = props;
  useEffect(() => {
    // PermissionManager(status => {});
  }, []);
  return (
    <View style={styles.wrapper}>
      <MyProfile componentId={componentId} />
    </View>
  );
};
export default Profile;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Constants.Colors.WHITE,
  },
});
