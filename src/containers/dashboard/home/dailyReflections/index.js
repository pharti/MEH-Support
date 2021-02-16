/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import TouchableCard from 'components/common/touchableCard';
import Constants from 'constants';
import React from 'react';
import {Dimensions, Image, ImageBackground, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector, useDispatch} from 'react-redux';
import * as AppActions from 'actions';
const {width, height} = Dimensions.get('window');
export default (DailyReflections = props => {
  const {componentId} = props;
  const dispatch = useDispatch();
  const todaysReflection = useSelector(
    state => state.usersReducer.todaysReflection,
  );
  const loadingReflection = useSelector(
    state => state.usersReducer.loadingReflection,
  );
  const _goToAddDailyReflections = () => {
    dispatch(AppActions.pushWithOptions(componentId, 'AddReflections'));
    if (todaysReflection && todaysReflection._id) {
      dispatch(AppActions.getReflectionDetail(todaysReflection._id));
      dispatch(AppActions.getGratitudeList(todaysReflection._id));
    }
  };
  return (
    <TouchableCard
      customStyle={{overflow: 'hidden'}}
      isDisabled={todaysReflection ? false : true}
      onPress={() => _goToAddDailyReflections()}>
      {todaysReflection ? (
        <ImageBackground
          source={{uri: todaysReflection && todaysReflection.refImage}}
          style={{
            flex: 1,
            height: height / 8,
            justifyContent: 'center',
            alignItems: 'center',
            padding: RFValue(16),
            backgroundColor: Constants.Colors.GREY,
          }}>
          <Text
            style={{
              color: Constants.Colors.WHITE,
              fontFamily: Constants.Fonts.Bold,
              fontSize: RFValue(22),
              textAlign: 'center',
            }}>
            {todaysReflection.refTitle}
          </Text>
        </ImageBackground>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: RFValue(16),
            height: height / 8,
          }}>
          <Image
            source={Images.placeholderImage}
            style={{height: RFValue(30), width: RFValue(40)}}
          />
          <Text
            style={{
              fontSize: RFValue(12),
              color: Constants.Colors.TEXT_COLOR,
              fontFamily: Constants.Fonts.Regular,
              paddingTop: RFValue(8),
              opacity: 0.5,
            }}>
            No reflections for today.
          </Text>
        </View>
      )}
    </TouchableCard>
  );
});
