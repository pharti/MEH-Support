/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions';
import * as Images from 'assets/icons';
import Header from 'components/common/header';
import Constants from 'constants';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');

export const Activities = props => {
  const {componentId} = props;
  const dispatch = useDispatch();
  const allActivities = useSelector(state => state.chatReducer.allActivities);
  const gettingActivities = useSelector(
    state => state.chatReducer.gettingActivities,
  );
  useEffect(() => {
    dispatch(AppActions.getActivities());
  }, []);
  const _responseToInvitation = () => {};
  const EmptyListComponent = () => {
    return (
      <View
        style={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: RFValue(16),
        }}>
        <Text
          style={{
            fontSize: RFValue(24),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
            opacity: 0.5,
          }}>
          No New Activity.
        </Text>
        <Text
          style={{
            fontSize: RFValue(12),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
            opacity: 0.5,
            paddingHorizontal: RFValue(42),
            textAlign: 'center',
          }}>
          Start by joining a group and interacting with other members in the
          group.
        </Text>
      </View>
    );
  };
  return (
    <>
      <Header
        isBack={true}
        title={'Activities'}
        componentId={componentId}
        // trailingIcon={true}
      />
      <View style={styles.mainContainer}>
        {gettingActivities ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={allActivities}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => _openGroup(item)}
                style={{
                  width: width / 2.2,
                  paddingHorizontal: RFValue(16),
                  paddingVertical: RFValue(24),
                  margin: RFValue(6),
                  borderRadius: RFValue(8),
                  shadowColor: Constants.Colors.PRIMARY,
                  shadowOffset: {width: 2, height: 2},
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                  elevation: 4,
                  backgroundColor: Constants.Colors.WHITE,
                }}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: width / 4,
                    height: width / 4,
                    alignSelf: 'center',
                    borderRadius: RFValue(8),
                    backgroundColor: Constants.Colors.GREY,
                  }}
                />
                <View
                  style={{alignItems: 'center', paddingVertical: RFValue(16)}}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subTitle}>Group Description</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: RFValue(16),
                  }}>
                  <Image
                    source={Images.leaveGroup}
                    style={{height: RFValue(16), width: RFValue(16)}}
                  />
                  <Image
                    source={Images.joinGroup}
                    style={{height: RFValue(16), width: RFValue(16)}}
                  />
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={EmptyListComponent()}
          />
        )}
      </View>
    </>
  );
};
export default Activities;
const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Constants.Colors.BACKGROUND,
  },
  title: {
    fontSize: RFValue(16),
    fontFamily: Constants.Fonts.Medium,
    color: Constants.Colors.TEXT_COLOR,
  },
  subTitle: {
    fontSize: RFValue(12),
    fontFamily: Constants.Fonts.Medium,
    color: Constants.Colors.TEXT_COLOR,
  },
});
