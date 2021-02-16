/* eslint-disable module-resolver/use-alias */
import Card from 'components/common/card';
import Constants from 'constants';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Switch} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import SubHeader from 'components/common/subHeader';
const {width, height} = Dimensions.get('window');
export default (TodaysTask = props => {
  const {goToAddTask, todaysTask, taskCompleted} = props;
  const completingTask = useSelector(
    state => state.usersReducer.completingTask,
  );
  const onToggleSwitch = (id, isCompleted) => {
    taskCompleted(id, isCompleted);
  };
  return (
    <Card>
      {completingTask ? (
        <View style={{paddingVertical: RFValue(42)}}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={todaysTask}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomColor: Constants.Colors.BACKGROUND,
                  borderBottomWidth: 1,
                  padding: RFValue(16),
                  justifyContent: 'space-between',
                }}>
                <SubHeader title={item.taskName} />
                <View>
                  <Switch
                    value={item.isCompleted}
                    onValueChange={() =>
                      onToggleSwitch(item._id, item.isCompleted)
                    }
                    color={Constants.Colors.PRIMARY}
                  />
                </View>
              </View>
            );
          }}
          keyExtractor={item => item._id}
          ListEmptyComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: RFValue(16),
              }}>
              <Text
                style={{
                  fontSize: RFValue(16),
                  color: Constants.Colors.TEXT_COLOR,
                  fontFamily: Constants.Fonts.Regular,
                  opacity: 0.5,
                }}>
                No Results Found
              </Text>
              <Text
                style={{
                  fontSize: RFValue(12),
                  color: Constants.Colors.TEXT_COLOR,
                  fontFamily: Constants.Fonts.Regular,
                  paddingBottom: RFValue(8),
                  opacity: 0.5,
                }}>
                Please select your goals or add new goals.
              </Text>
            </View>
          }
        />
      )}
      <TouchableOpacity
        style={{
          margin: RFValue(16),
          height: height / 14,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Constants.Colors.PRIMARY,
          borderRadius: RFValue(10),
        }}
        onPress={() => goToAddTask()}>
        <Text style={{color: Constants.Colors.WHITE, fontSize: RFValue(16)}}>
          ADD TASK
        </Text>
      </TouchableOpacity>
    </Card>
  );
});
