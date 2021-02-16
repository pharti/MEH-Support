/* eslint-disable module-resolver/use-alias */
import Card from 'components/common/card';
import CardHeader from 'components/common/cardHeader';
import Header from 'components/common/header';
import React, {useState} from 'react';
import Constants from 'constants';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
import {Switch} from 'react-native-paper';
const {width, height} = Dimensions.get('window');
export const SharingPrivacy = props => {
  const {componentId} = props;
  const dispatch = useDispatch();
  const [switchValue, setSwitchValue] = useState(true);
  return (
    <>
      <View style={styles.headerContainer}>
        <Header
          isBack={true}
          title={'Sharing & Privacy'}
          componentId={componentId}
        />
      </View>
      <ScrollView
        style={{
          flexGrow: 1,
          backgroundColor: Constants.Colors.BACKGROUND,
        }}
        contentContainerStyle={{paddingVertical: RFValue(16)}}>
        <Card>
          <View style={styles.rowView}>
            <Text style={styles.text}>Private Account</Text>
            <Switch
              color={Constants.Colors.PRIMARY}
              onValueChange={val => {
                setSwitchValue(val);
              }}
              value={false}
            />
          </View>
        </Card>
        <CardHeader title={'Profile Sharing'} />
        <Card>
          <View style={[styles.rowView, styles.border]}>
            <Text style={styles.text}>Supporters</Text>
            <Switch
              color={Constants.Colors.PRIMARY}
              onValueChange={val => {
                setSwitchValue(val);
              }}
              value={switchValue}
            />
          </View>
          <View style={[styles.rowView, styles.border]}>
            <Text style={styles.text}>Achievements</Text>
            <Switch
              color={Constants.Colors.PRIMARY}
              onValueChange={val => {
                setSwitchValue(val);
              }}
              value={switchValue}
            />
          </View>
          <View style={[styles.rowView, styles.border]}>
            <Text style={styles.text}>Location</Text>
            <Switch
              color={Constants.Colors.PRIMARY}
              onValueChange={val => {
                setSwitchValue(val);
              }}
              value={switchValue}
            />
          </View>

          <View style={[styles.rowView, styles.border]}>
            <Text style={styles.text}>Levels</Text>
            <Switch
              color={Constants.Colors.PRIMARY}
              onValueChange={val => {
                setSwitchValue(val);
              }}
              value={switchValue}
            />
          </View>

          <View style={[styles.rowView, styles.border]}>
            <Text style={styles.text}>Goals</Text>
            <Switch
              color={Constants.Colors.PRIMARY}
              onValueChange={val => {
                setSwitchValue(val);
              }}
              value={switchValue}
            />
          </View>

          <View style={[styles.rowView]}>
            <Text style={styles.text}>Groups</Text>
            <Switch
              color={Constants.Colors.PRIMARY}
              onValueChange={val => {
                setSwitchValue(val);
              }}
              value={switchValue}
            />
          </View>
        </Card>
        <CardHeader title={'Interactions'} />
        <Card>
          <View style={[styles.rowView, styles.border]}>
            <Text style={styles.text}>Messages</Text>
            <Switch
              color={Constants.Colors.PRIMARY}
              onValueChange={val => {
                setSwitchValue(val);
              }}
              value={false}
            />
          </View>

          <View style={[styles.rowView, styles.border]}>
            <Text style={styles.text}>Comments</Text>
            <Switch
              color={Constants.Colors.PRIMARY}
              onValueChange={val => {
                setSwitchValue(val);
              }}
              value={switchValue}
            />
          </View>

          <View style={[styles.rowView]}>
            <Text style={styles.text}>Activities</Text>
            <Switch
              color={Constants.Colors.PRIMARY}
              onValueChange={val => {
                setSwitchValue(val);
              }}
              value={switchValue}
            />
          </View>
        </Card>
      </ScrollView>
    </>
  );
};

export default SharingPrivacy;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: RFValue(16),
  },
  text: {
    color: Constants.Colors.TEXT_COLOR,
    fontSize: RFValue(16),
    fontFamily: Constants.Fonts.Medium,
  },
  image: {width: RFValue(8), height: RFValue(10)},
  border: {
    borderBottomWidth: 1,
    borderBottomColor: Constants.Colors.BORDER,
  },
});
