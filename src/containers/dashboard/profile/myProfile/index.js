/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions';
import * as Images from 'assets/icons';
import Header from 'components/common/header';
import Constants from 'constants';
import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import Achievements from '../tabs/achievements';
import Goals from '../tabs/goals';
import Groups from '../tabs/groups';

const {width, height} = Dimensions.get('window');
export const Profile = props => {
  const dispatch = useDispatch();
  const {componentId} = props;
  const tabs = {
    ACHIEVEMENTS: 'ACHIEVEMENTS',
    MENTEES: 'MENTEES',
    GROUPS: 'GROUPS',
    GOALS: 'GOALS',
  };
  useEffect(() => {
    // This is also used for user Achievements.
    dispatch(AppActions.getSoberDates());
  }, []);
  const soberMilestone = useSelector(
    state => state.goalsReducer.soberMilestone,
  );
  const [currentTab, setCurrentTab] = useState(tabs.ACHIEVEMENTS);
  const userType = useSelector(
    state => state.usersReducer.userDetails.userType,
  );
  const userDetails = useSelector(state => state.usersReducer.userDetails);
  const _getAchievements = () => {
    let achievements =
      soberMilestone && soberMilestone.filter(item => item.isChecked);
    return achievements.length;
  };
  const _ratingCompleted = rating => {};
  _goToAddGoals = () => {
    dispatch(AppActions.pushWithOptions(componentId, 'AddGoals'));
  };
  const tabSelectedStyle = {
    borderRadius: RFValue(10),
    paddingVertical: RFValue(8),
    shadowColor: Constants.Colors.PRIMARY,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    backgroundColor: Constants.Colors.PRIMARY,
  };
  return (
    <>
      <Header componentId={componentId} />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <View style={{height: '85%'}}>
          <View style={{paddingVertical: RFValue(16)}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Constants.Colors.TEXT_COLOR,
                    fontSize: RFValue(12),
                  }}>
                  12
                </Text>
                <Text
                  style={{
                    color: Constants.Colors.TEXT_COLOR,
                    fontSize: RFValue(12),
                  }}>
                  Supporters
                </Text>
              </View>
              <View style={{flex: 0.4}}>
                {userDetails && userDetails.avatar ? (
                  <Image
                    source={{uri: userDetails.avatar}}
                    style={{
                      height: width / 3,
                      width: width / 3,
                      borderRadius: width / 3,
                      backgroundColor: Constants.Colors.BACKGROUND,
                    }}
                  />
                ) : (
                  <Image
                    source={Images.Avatar}
                    style={{height: width / 3, width: width / 3}}
                  />
                )}
              </View>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Constants.Colors.TEXT_COLOR,
                    fontSize: RFValue(12),
                  }}>
                  {_getAchievements()}
                </Text>
                <Text
                  style={{
                    color: Constants.Colors.TEXT_COLOR,
                    fontSize: RFValue(12),
                  }}>
                  Achievements
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: RFValue(8),
              }}>
              <Text
                style={{
                  color: Constants.Colors.TEXT_COLOR,
                  fontSize: RFValue(22),
                }}>
                {userDetails && userDetails.firstName}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: Constants.Colors.TEXT_COLOR,
                    fontSize: RFValue(12),
                  }}>
                  {userDetails &&
                    userDetails.location &&
                    userDetails.location.city +
                      ', ' +
                      userDetails.location.state}
                </Text>
              </View>
              {userType == 'mentee' ? (
                <>
                  <Rating
                    showRating={false}
                    onFinishRating={_ratingCompleted}
                    style={{
                      paddingTop: RFValue(12),
                    }}
                    ratingColor={Constants.Colors.RATING}
                    imageSize={RFValue(24)}
                  />
                  <Text
                    style={{
                      color: Constants.Colors.TEXT_COLOR,
                      fontSize: RFValue(12),
                      paddingBottom: RFValue(16),
                    }}>
                    Rating
                  </Text>
                </>
              ) : (
                <Text
                  style={{
                    color: Constants.Colors.TEXT_COLOR,
                    fontSize: RFValue(12),
                    paddingBottom: RFValue(16),
                  }}>
                  Level Name (Points)
                </Text>
              )}
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Constants.Colors.PRIMARY,
                  borderRadius: RFValue(10),
                  paddingVertical: RFValue(8),
                  paddingHorizontal: RFValue(24),
                  shadowColor: Constants.Colors.PRIMARY,
                  shadowOffset: {width: 2, height: 2},
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                  elevation: 5,
                }}
                onPress={() => {
                  dispatch(
                    AppActions.pushWithOptions(componentId, 'EditProfile'),
                  );
                }}>
                <Text
                  style={{
                    color: Constants.Colors.WHITE,
                    fontSize: RFValue(16),
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={[
                  currentTab == tabs.ACHIEVEMENTS && tabSelectedStyle,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: RFValue(8),
                  },
                ]}
                onPress={() => setCurrentTab(tabs.ACHIEVEMENTS)}>
                <Text
                  style={{
                    color:
                      currentTab == tabs.ACHIEVEMENTS
                        ? Constants.Colors.WHITE
                        : Constants.Colors.TEXT_COLOR,
                    fontSize: RFValue(12),
                  }}>
                  ACHIEVEMENTS
                </Text>
              </TouchableOpacity>
              {userType == 'mentee' ? (
                <TouchableOpacity
                  style={[
                    currentTab == tabs.GOALS && tabSelectedStyle,
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: RFValue(8),
                    },
                  ]}
                  onPress={() => setCurrentTab(tabs.GOALS)}>
                  <Text
                    style={{
                      color:
                        currentTab == tabs.GOALS
                          ? Constants.Colors.WHITE
                          : Constants.Colors.TEXT_COLOR,
                      fontSize: RFValue(12),
                    }}>
                    GOALS
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    currentTab == tabs.MENTEES && tabSelectedStyle,
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: RFValue(8),
                    },
                  ]}
                  onPress={() => setCurrentTab(tabs.MENTEES)}>
                  <Text
                    style={{
                      color:
                        currentTab == tabs.MENTEES
                          ? Constants.Colors.WHITE
                          : Constants.Colors.TEXT_COLOR,
                      fontSize: RFValue(12),
                    }}>
                    MENTEES
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[
                  currentTab == tabs.GROUPS && tabSelectedStyle,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: RFValue(8),
                  },
                ]}
                onPress={() => setCurrentTab(tabs.GROUPS)}>
                <Text
                  style={{
                    color:
                      currentTab == tabs.GROUPS
                        ? Constants.Colors.WHITE
                        : Constants.Colors.TEXT_COLOR,
                    fontSize: RFValue(12),
                  }}>
                  GROUPS
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{}}>
            {currentTab == tabs.ACHIEVEMENTS && <Achievements />}
            {currentTab == tabs.GROUPS && <Groups />}
            {currentTab == tabs.GOALS && (
              <Goals
                goals={userDetails && userDetails.goals}
                goToAddGoals={_goToAddGoals}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default Profile;
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingBottom: '20%',
    paddingHorizontal: RFValue(16),
  },
});
