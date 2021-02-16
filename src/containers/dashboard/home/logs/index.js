/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions';
import * as Images from 'assets/icons';
import Card from 'components/common/card';
import Constants from 'constants';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
export const Logs = props => {
  const {summaryDate, componentId} = props;
  const dispatch = useDispatch();
  const [moodTab, setMoodTab] = useState(false);
  const [taskTab, setTaskTab] = useState(false);
  const [achievementTab, setAchievementTab] = useState(false);
  const userLogs = useSelector(state => state.usersReducer.userLogs);
  const loadingLogs = useSelector(state => state.usersReducer.loadingLogs);
  useEffect(() => {
    const date = moment.utc(summaryDate).format();
    dispatch(AppActions.getLogs(date));
  }, [summaryDate]);
  const _toggleMoodTab = () => {
    setMoodTab(!moodTab);
  };
  const _toggleTaskTab = () => {
    setTaskTab(!taskTab);
  };
  const _toggleAchievementTab = () => {
    setAchievementTab(!achievementTab);
  };
  const EmptyListComponent = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: RFValue(16),
        }}>
        <Text
          style={{
            fontSize: RFValue(12),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
            opacity: 0.5,
          }}>
          No Entries Recorded.
        </Text>
      </View>
    );
  };
  const _getOverallMood = () => {
    const length = userLogs && userLogs.moods && userLogs.moods.length;
    if (length) {
      console.log(userLogs.moods[length - 1].title);
      return userLogs.moods[length - 1] && userLogs.moods[length - 1].title;
    }
  };
  const OverallMood = () => {
    return (
      userLogs &&
      userLogs.moods &&
      userLogs.moods.length && (
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#DEDEDE',
            borderBottomWidth: 1,
            justifyContent: 'space-between',
            padding: RFValue(12),
          }}>
          <Text
            style={[styles.itemTitle, {fontFamily: Constants.Fonts.Medium}]}>
            Overall Mood
          </Text>
          <View>
            <Text
              style={[styles.itemTitle, {fontFamily: Constants.Fonts.Medium}]}>
              {_getOverallMood()}
            </Text>
          </View>
        </View>
      )
    );
  };
  return (
    <ScrollView
      contentContainerStyle={styles.scrollview}
      showsVerticalScrollIndicator={false}>
      <Card
        customStyle={{
          flexDirection: 'row',
          padding: RFValue(16),
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: RFValue(16),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Bold,
          }}>
          Logs
        </Text>
        <Text
          style={{
            fontSize: RFValue(16),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
          }}>
          {userLogs && userLogs.moods && userLogs.moods.length}
        </Text>
      </Card>
      <TouchableCard customStyle={styles.dropdown} onPress={_toggleMoodTab}>
        <Text style={styles.dropdownTitle}>Mood Entries</Text>
        <Image source={moodTab ? Images.arrowUp : Images.arrowDown} />
      </TouchableCard>
      {moodTab && (
        <Card customStyle={styles.card}>
          <FlatList
            data={userLogs && userLogs.moods}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: '#DEDEDE',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                    padding: RFValue(12),
                  }}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <View>
                    <Text style={styles.itemTitle}>
                      {item.timeInHoursMinutes}
                    </Text>
                  </View>
                </View>
              );
            }}
            ListEmptyComponent={EmptyListComponent()}
            ListFooterComponent={OverallMood()}
            keyExtractor={item => item._id}
          />
        </Card>
      )}
      <TouchableCard customStyle={styles.dropdown} onPress={_toggleTaskTab}>
        <Text style={styles.dropdownTitle}>Tasks</Text>
        <Image source={taskTab ? Images.arrowUp : Images.arrowDown} />
      </TouchableCard>
      {taskTab && (
        <Card customStyle={styles.card}>
          <FlatList
            data={userLogs && userLogs.tasks}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: '#DEDEDE',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                    padding: RFValue(12),
                  }}>
                  <Text style={styles.itemTitle}>{item.taskName}</Text>
                  {item.isCompleted ? (
                    <Image source={Images.selectedEllipse} />
                  ) : (
                    <Image source={Images.pendingEllipse} />
                  )}
                </View>
              );
            }}
            ListEmptyComponent={EmptyListComponent()}
            keyExtractor={item => item._id}
          />
        </Card>
      )}
      <TouchableCard
        customStyle={styles.dropdown}
        onPress={_toggleAchievementTab}>
        <Text style={styles.dropdownTitle}>Achievements</Text>
        <Image source={achievementTab ? Images.arrowUp : Images.arrowDown} />
      </TouchableCard>
      {achievementTab && (
        <Card customStyle={styles.card}>
          <FlatList
            data={userLogs && userLogs.achievements}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: '#DEDEDE',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                    padding: RFValue(12),
                  }}>
                  <Text style={styles.itemTitle}>{/* {item} */}</Text>
                </View>
              );
            }}
            ListEmptyComponent={EmptyListComponent()}
            keyExtractor={item => item._id}
          />
        </Card>
      )}
      <Card customStyle={{padding: RFValue(16)}}>
        <Text style={styles.dropdownTitle}>Reflection Entry</Text>
        {userLogs &&
        userLogs.dailyReflections &&
        userLogs.dailyReflections[0] ? (
          <>
            <Image
              source={{uri: userLogs.dailyReflections[0].refImage}}
              style={{
                height: height / 6,
                width: '100%',
                borderRadius: RFValue(8),
                marginTop: RFValue(8),
                backgroundColor: Constants.Colors.BACKGROUND,
              }}
              resizeMode="cover"
            />
            <Text
              style={[
                styles.dropdownTitle,
                {paddingTop: RFValue(8), alignSelf: 'center'},
              ]}>
              {userLogs.dailyReflections[0].refTitle}
            </Text>
          </>
        ) : (
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
                opacity: 0.5,
              }}>
              No reflection recorded
            </Text>
          </View>
        )}
      </Card>

      <Card customStyle={{padding: RFValue(16)}}>
        <Text style={styles.dropdownTitle}>Gratitude List</Text>
        {userLogs && userLogs.gratefulList && (
          <FlatList
            data={userLogs.gratefulList}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: RFValue(12),
                  }}>
                  <Text style={styles.itemTitle}>{item.gratefulTo}</Text>
                </View>
              );
            }}
            ListEmptyComponent={EmptyListComponent()}
            keyExtractor={item => item._id}
          />
        )}
      </Card>
    </ScrollView>
  );
};

export default Logs;
const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
    paddingBottom: height / 10,
    paddingTop: height / 30,
    paddingHorizontal: RFValue(16),
  },
  dropdown: {
    padding: RFValue(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  dropdownTitle: {
    fontSize: RFValue(16),
    color: Constants.Colors.TEXT_COLOR,
    fontFamily: Constants.Fonts.Regular,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: RFValue(-12),
  },
  itemTitle: {
    flex: 0.8,
    fontSize: RFValue(16),
    color: Constants.Colors.TEXT_COLOR,
    fontFamily: Constants.Fonts.Regular,
  },
});
