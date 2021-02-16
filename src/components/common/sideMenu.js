// @ts-nocheck
import * as AppActions from 'actions';
import * as Images from 'assets/icons';
import Constants from 'constants';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {goToSettings, goHome} from 'config';
export const SideMenu = props => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.usersReducer.userDetails);
  const {componentId} = props;
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: RFValue(32),
        paddingHorizontal: RFValue(16),
      }}>
      <View
        style={{
          flex: 0.3,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {userDetails && userDetails.avatar ? (
            <Image
              source={{uri: userDetails.avatar}}
              style={{
                height: RFValue(74),
                width: RFValue(74),
                borderRadius: RFValue(74),
              }}
            />
          ) : (
            <Image
              source={Images.Avatar}
              style={{height: RFValue(74), width: RFValue(74)}}
            />
          )}
        </View>
        <View style={{flex: 0.7, paddingHorizontal: RFValue(16)}}>
          <Text
            style={{fontSize: RFValue(22), color: Constants.Colors.TEXT_COLOR}}>
            {userDetails && userDetails.firstName}
          </Text>
          <Text
            style={{fontSize: RFValue(14), color: Constants.Colors.TEXT_COLOR}}>
            {userDetails &&
              userDetails.location &&
              userDetails.location.city + ', ' + userDetails.location.state}
          </Text>
          <Text
            style={{fontSize: RFValue(12), color: Constants.Colors.TEXT_COLOR}}>
            Level Name (points)
          </Text>
        </View>
      </View>
      <View style={{flex: 0.6}}>
        <TouchableOpacity
          style={styles.menuView}
          onPress={() => {
            goHome();
          }}>
          <Image source={Images.profileIcon} />
          <Text style={styles.menuOption}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuView} onPress={() => {}}>
          <Image source={Images.tour} />
          <Text style={styles.menuOption}>Take a Tour</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            goToSettings();
          }}
          style={styles.menuView}>
          <Image source={Images.settings} />
          <Text style={styles.menuOption}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuView}>
          <Image source={Images.science} />
          <Text style={styles.menuOption}>The Science</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuView}>
          <Image source={Images.faq} />
          <Text style={styles.menuOption}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuView}>
          <Image source={Images.privacy} />
          <Text style={styles.menuOption}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuView}>
          <Image source={Images.terms} />
          <Text style={styles.menuOption}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuView}>
          <Image source={Images.support} />
          <Text style={styles.menuOption}>Support</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.1}}>
        <TouchableOpacity
          style={styles.menuView}
          onPress={() => {
            dispatch(AppActions.logout());
          }}>
          <Image source={Images.logout} />
          <Text style={styles.menuOption}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SideMenu;
const styles = StyleSheet.create({
  menuView: {
    flexDirection: 'row',
    paddingBottom: RFValue(16),
    alignItems: 'center',
  },
  menuOption: {
    fontSize: RFValue(15),
    color: Constants.Colors.TEXT_COLOR,
    paddingLeft: RFValue(16),
  },
});
