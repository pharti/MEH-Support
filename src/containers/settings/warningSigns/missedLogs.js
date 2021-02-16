/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import Constants from 'constants';
import React, {useState} from 'react';
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
export const MissedLogs = props => {
  const {componentId} = props;
  const dispatch = useDispatch();
  const [toggleMissedLogTab, setmissedLogTab] = useState(false);
  const _toggleMissedLog = () => {
    setmissedLogTab(!toggleMissedLogTab);
  };
  return (
    <>
      <TouchableCard
        customStyle={{padding: RFValue(16)}}
        onPress={_toggleMissedLog}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>Missed Log</Text>
          <Image
            source={toggleMissedLogTab ? Images.arrowUp : Images.arrowDown}
          />
        </View>
        {toggleMissedLogTab && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingTop: RFValue(24),
            }}>
            <TouchableOpacity>
              <Image source={Images.greenRemoveFilled} />
            </TouchableOpacity>
            <Text style={styles.distance}>12 ft</Text>
            <TouchableOpacity>
              <Image source={Images.greenAddFilled} />
            </TouchableOpacity>
          </View>
        )}
      </TouchableCard>
    </>
  );
};
export default MissedLogs;
const styles = StyleSheet.create({
  title: {
    fontSize: RFValue(15),
    color: Constants.Colors.TEXT_COLOR,
    fontFamily: Constants.Fonts.Bold,
  },
  distance: {
    paddingHorizontal: RFValue(32),
    color: Constants.Colors.TEXT_COLOR,
    fontSize: RFValue(18),
  },
});
