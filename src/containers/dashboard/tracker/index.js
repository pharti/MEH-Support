import CardHeader from 'components/common/cardHeader';
import Goals from 'components/common/goalsDropdown/goals';
import Soberity from 'components/common/goalsDropdown/soberity';
import Header from 'components/common/header';
import GraphOverview from 'components/common/overview';
import Constants from 'constants';
import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import MoodSetter from './moodSetter';
import SoberTracker from './soberTracker';
export const Tracker = props => {
  const componentId = props;
  const userDetails = useSelector(state => state.usersReducer.userDetails);
  useEffect(() => {}, []);
  return (
    <View style={styles.wrapper}>
      <Header componentId={componentId} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <CardHeader title={'Overview'} />
        <GraphOverview />
        <CardHeader title={'Mood'} />
        <MoodSetter />
        <CardHeader title={'Goals & Milestones'} />
        {userDetails &&
          userDetails.goals &&
          userDetails.goals.map(item => {
            return item.name == 'Sobriety' ? (
              <Soberity />
            ) : (
              <Goals goalDetails={item} />
            );
          })}
        <View style={{paddingTop: RFValue(24)}} />
        <CardHeader title={'Sober Tracker'} />
        <SoberTracker />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Constants.Colors.WHITE,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: '20%',
    paddingHorizontal: RFValue(16),
  },
  chartStyle: {borderRadius: 16, marginTop: 16},
});

export default Tracker;
