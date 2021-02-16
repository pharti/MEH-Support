/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions';
import Header from 'components/common/header';
import CardHeader from 'components/common/cardHeader';

import GraphOverview from 'components/common/overview';
import Constants from 'constants';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import Summary from './calendarSummary';
import CreateProfile from './createProfile';
import DailyReflections from './dailyReflections';
import Goals from './goals';
import Logs from './logs';
import MenteeMeeting from './meeting';
import SoberTracker from './soberTracker';
import TodaysTask from './todaysTask';

const {width, height} = Dimensions.get('window');
export const Home = props => {
  const dispatch = useDispatch();
  let {componentId} = props;
  const [todaysDate, setTodaysDate] = useState(moment().format('YYYY-MM-DD'));
  const [summaryDate, setSummaryDate] = useState(moment().format('YYYY-MM-DD'));
  useEffect(() => {
    dispatch(AppActions.getUserDetails());
    dispatch(AppActions.getTodaysReflection());
  }, []);
  const userDetails = useSelector(state => state.usersReducer.userDetails);
  const isNewUser = useSelector(
    state => state.usersReducer.userDetails.isNewUser,
  );
  const userType = useSelector(
    state => state.usersReducer.userDetails.userType,
  );
  const dailyReflections = useSelector(
    state => state.usersReducer.userDetails.dailyReflections,
  );

  _goToAddTask = () => {
    dispatch(AppActions.pushWithOptions(componentId, 'AddTask'));
  };
  _goToAddGoals = () => {
    dispatch(AppActions.pushWithOptions(componentId, 'AddGoals'));
  };
  _setCurrentStrike = () => {
    dispatch(AppActions.setCurrentStrike());
  };
  _taskCompleted = (id, isCompleted) => {
    const requestPayload = {
      isCompleted: !isCompleted,
    };
    dispatch(AppActions.setTaskCompleted(id, requestPayload));
  };
  _getSummaryDate = date => {
    setSummaryDate(moment(date).format('YYYY-MM-DD'));
  };
  return isNewUser ? (
    <CreateProfile />
  ) : (
    <View style={styles.wrapper}>
      <Header componentId={componentId} />
      <Summary getSummaryDate={_getSummaryDate} />
      {todaysDate == summaryDate ? (
        <>
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            <CardHeader title={'Daily Reflections'} />
            <DailyReflections componentId={componentId} />
            {userType && userType == 'mentee' && (
              <>
                <CardHeader title={'Goals'} />
                <Goals
                  goToAddGoals={_goToAddGoals}
                  goals={userDetails && userDetails.goals}
                />
              </>
            )}
            {userType && userType == 'mentor' && (
              <>
                <CardHeader title={'Mentee Meetings'} />
                <MenteeMeeting />
              </>
            )}
            <CardHeader title={"Today's Tasks"} />
            <TodaysTask
              goToAddTask={_goToAddTask}
              todaysTask={userDetails && userDetails.tasks}
              taskCompleted={_taskCompleted}
            />
            <CardHeader title={'Overview'} />
            <GraphOverview />
            {userType && userType == 'mentor' && (
              <Goals
                goToAddGoals={_goToAddGoals}
                goals={userDetails && userDetails.goals}
              />
            )}
            <SoberTracker setCurrentStrike={_setCurrentStrike} />
          </ScrollView>
        </>
      ) : (
        <Logs summaryDate={summaryDate} />
      )}
    </View>
  );
};
export default Home;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Constants.Colors.BACKGROUND,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: '20%',
    paddingHorizontal: RFValue(16),
  },
});
