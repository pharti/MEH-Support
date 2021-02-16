/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import Card from 'components/common/card';
import Header from 'components/common/header';
import React from 'react';
import Constants from 'constants';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
const {width, height} = Dimensions.get('window');
import * as AppActions from 'actions';
export const Settings = props => {
  const {componentId} = props;
  console.log('componentId', componentId);
  const dispatch = useDispatch();
  const onRowClick = screen => {
    dispatch(AppActions.pushWithOptions(componentId, screen));
  };
  return (
    <>
      <View style={styles.headerContainer}>
        <Header title={'Settings'} componentId={componentId} />
      </View>
      <View style={styles.mainContainer}>
        <Card>
          <TouchableOpacity
            onPress={() => onRowClick('EditProfile')}
            style={[styles.rowView, styles.border]}>
            <Text style={styles.text}>Edit Profile</Text>
            <Image source={Images.arrowRight} style={styles.image} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.rowView, styles.border]}>
            <Text style={styles.text}>Reset Password</Text>
            <Image source={Images.arrowRight} style={styles.image} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onRowClick('SharingPrivacy')}
            style={[styles.rowView, styles.border]}>
            <Text style={styles.text}>Sharing & Privacy</Text>
            <Image source={Images.arrowRight} style={styles.image} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onRowClick('WarningSigns')}
            style={[styles.rowView]}>
            <Text style={styles.text}>Warning Signs</Text>
            <Image source={Images.arrowRight} style={styles.image} />
          </TouchableOpacity>
        </Card>
        <Card>
          <TouchableOpacity style={[styles.rowView, styles.border]}>
            <Text style={styles.text}>Push Notifications</Text>
            <Image source={Images.arrowRight} style={styles.image} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.rowView, styles.border]}>
            <Text style={styles.text}>Devices</Text>
            <Image source={Images.arrowRight} style={styles.image} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.rowView, styles.border]}>
            <Text style={styles.text}>Change Plan</Text>
            <Image source={Images.arrowRight} style={styles.image} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.rowView]}>
            <Text style={styles.text}>Logout</Text>
            <Image source={Images.arrowRight} style={styles.image} />
          </TouchableOpacity>
        </Card>
      </View>
    </>
  );
};

export default Settings;
const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {flex: 1, paddingTop: RFValue(16), backgroundColor: '#F0F0F0'},
  border: {
    borderBottomWidth: 1,
    borderBottomColor: Constants.Colors.BORDER,
  },
  rowView: {
    padding: RFValue(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: Constants.Colors.TEXT_COLOR,
    fontSize: RFValue(16),
    fontFamily: Constants.Fonts.Medium,
  },
  image: {width: RFValue(8), height: RFValue(10)},
});
