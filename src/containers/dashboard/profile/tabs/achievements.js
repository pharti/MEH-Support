/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions';
import * as Images from 'assets/icons';
import Constants from 'constants';
import React, {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
export default (Achievements = props => {
  const {goToAddDailyReflections, dailyReflections} = props;
  const dispatch = useDispatch();
  useEffect(() => {
    // This is also used for user Achievements.
    dispatch(AppActions.getSoberDates());
  }, []);
  const soberMilestone = useSelector(
    state => state.goalsReducer.soberMilestone,
  );
  const loadingSoberDates = useSelector(
    state => state.goalsReducer.loadingSoberDates,
  );
  const _getAchievements = () => {
    return soberMilestone.filter(item => item.isChecked);
  };
  return loadingSoberDates ? (
    <View
      style={{height: '50%', justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator />
    </View>
  ) : (
    <FlatList
      style={{height: '100%'}}
      data={_getAchievements()}
      contentContainerStyle={{
        paddingVertical: RFValue(16),
      }}
      numColumns={3}
      renderItem={({item, index}) => {
        return (
          <View
            style={{
              width: width / 3.5,
              height: height / 8,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: RFValue(10),
              shadowColor: Constants.Colors.PRIMARY,
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 6,
              marginBottom: RFValue(16),
              borderColor: Constants.Colors.BORDER,
              borderWidth: 1,
              marginRight: width / 40,
            }}>
            <Image
              source={Images.reward}
              style={{height: RFValue(32), width: RFValue(32)}}
            />
            <Text
              style={{
                fontSize: RFValue(12),
                color: Constants.Colors.TEXT_COLOR,
                paddingTop: RFValue(8),
              }}>
              {item.textValue}
            </Text>
          </View>
        );
      }}
      keyExtractor={item => item.id}
      ListEmptyComponent={
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: RFValue(16),
          }}>
          <Text
            style={{
              fontSize: RFValue(12),
              color: Constants.Colors.TEXT_COLOR,
              fontFamily: Constants.Fonts.Regular,
              paddingBottom: RFValue(8),
              opacity: 0.5,
            }}>
            You do not have any achievements yet.
          </Text>
        </View>
      }
    />
  );
});
