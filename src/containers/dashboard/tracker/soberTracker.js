import Card from 'components/common/card';
import SubHeader from 'components/common/subHeader';
import React, {useEffect} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {RFValue} from 'react-native-responsive-fontsize';
import Constants from 'constants';
import * as AppActions from 'actions';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
export default (SoberTracker = props => {
  const {} = props;
  const dispatch = useDispatch();
  useEffect(() => {
    // This is also used for user Achievements.
    dispatch(AppActions.getSoberDates());
  }, []);
  const userDetails = useSelector(state => state.usersReducer.userDetails);
  const soberMilestone = useSelector(
    state => state.goalsReducer.soberMilestone,
  );
  const _getNextMilestone = () => {
    let nextMilestone = soberMilestone.find(item => {
      console.log(' item.isChecked', item.isChecked);
      return item.isChecked == false;
    });
    return nextMilestone && nextMilestone.textValue;
  };
  let sobriety = userDetails && userDetails.sobriety;
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AnimatedCircularProgress
        prefill={10}
        size={180}
        width={RFValue(22)}
        fill={50}
        tintColor="#4B8782"
        lineCap={'round'}
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor="#00000017">
        {fill => (
          <>
            <Text
              style={{
                fontSize: RFValue(16),
                color: Constants.Colors.TEXT_COLOR,
                textAlign: 'center',
                fontFamily: Constants.Colors.Medium,
              }}>
              {_getNextMilestone()}
            </Text>
            <Text
              style={{
                fontSize: RFValue(12),
                color: Constants.Colors.TEXT_COLOR,
                fontFamily: Constants.Colors.Medium,
                textAlign: 'center',
              }}>
              {sobriety &&
                sobriety.startDate &&
                moment(sobriety.startDate).format('L')}
            </Text>
          </>
        )}
      </AnimatedCircularProgress>
      <Card customStyle={{marginTop: RFValue(16)}}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#DEDEDE',
            borderBottomWidth: 1,
            padding: RFValue(16),
            justifyContent: 'space-between',
          }}>
          <SubHeader title={'Current streak'} />
          <View>
            <SubHeader title={sobriety && sobriety.currentStreak} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#DEDEDE',
            borderBottomWidth: 1,
            padding: RFValue(16),
            justifyContent: 'space-between',
          }}>
          <SubHeader title={'Max streak'} />
          <View>
            <SubHeader title={sobriety && sobriety.maxStreak} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#DEDEDE',
            borderBottomWidth: 1,
            padding: RFValue(16),
            justifyContent: 'space-between',
          }}>
          <SubHeader title={'Resets'} />
          <View>
            <SubHeader title={sobriety && sobriety.resets} />
          </View>
        </View>
      </Card>
    </View>
  );
});
