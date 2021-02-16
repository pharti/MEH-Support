/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import Constants from 'constants';
import React, {useEffect} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector, useDispatch} from 'react-redux';
import * as AppActions from 'actions';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
export const Posts = props => {
  const {groupId} = props;
  console.log('groupIdgroupId', groupId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AppActions.getGroupPosts(groupId));
  }, [groupId]);
  const groupPosts = useSelector(state => state.groupsReducer.groupPosts);
  const gettingGroupPosts = useSelector(
    state => state.groupsReducer.gettingGroupPosts,
  );
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
          No Results Found.
        </Text>
      </View>
    );
  };
  return gettingGroupPosts ? (
    <View
      style={{
        flex: 1,
        paddingTop: RFValue(32),
      }}>
      <ActivityIndicator />
    </View>
  ) : (
    <FlatList
      data={groupPosts}
      contentContainerStyle={{}}
      renderItem={({item, index}) => (
        <View
          style={{
            paddingVertical: RFValue(24),
            borderBottomWidth: 10,
            borderBottomColor: Constants.Colors.BORDER,
            paddingHorizontal: RFValue(16),
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.15}}>
              <View
                style={{
                  backgroundColor: Constants.Colors.BACKGROUND,
                  height: RFValue(32),
                  width: RFValue(32),
                  borderRadius: RFValue(24),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {item && item.user && item.user.firstName ? (
                  <Image
                    source={{uri: item.user.avatar}}
                    style={{
                      height: RFValue(32),
                      width: RFValue(32),
                      borderRadius: RFValue(24),
                    }}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={Images.placeholderImage}
                    style={{width: RFValue(16)}}
                    resizeMode="contain"
                  />
                )}
              </View>
            </View>
            <View style={{flex: 0.85}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    fontFamily: Constants.Fonts.Medium,
                    fontSize: RFValue(16),
                    color: Constants.Colors.TEXT_COLOR,
                  }}>
                  {item && item.user && item.user.firstName}
                </Text>
                <Text
                  style={{
                    fontFamily: Constants.Fonts.Regular,
                    fontSize: RFValue(16),
                    color: Constants.Colors.TEXT_COLOR,
                    opacity: 0.8,
                    paddingLeft: RFValue(8),
                  }}>
                  shared their post
                </Text>
              </View>
              <View style={styles.listView}>
                <Text
                  style={{
                    fontFamily: Constants.Fonts.Regular,
                    fontSize: RFValue(14),
                    color: Constants.Colors.TEXT_COLOR,
                  }}>
                  {item.type}
                </Text>
                <View style={styles.listDot} />
                <Text
                  style={{
                    fontFamily: Constants.Fonts.Regular,
                    fontSize: RFValue(14),
                    color: Constants.Colors.TEXT_COLOR,
                  }}>
                  {moment(item.createdAt).fromNow()}
                </Text>
              </View>
            </View>
          </View>
          <View>
            {item && item.image ? (
              <Image
                source={{uri: item.image}}
                style={{
                  width: '100%',
                  height: height / 4,
                  marginVertical: RFValue(8),
                  borderRadius: RFValue(8),
                  backgroundColor: Constants.Colors.BACKGROUND,
                }}
                resizeMode="cover"
              />
            ) : null}
          </View>
          <Text
            style={{
              fontFamily: Constants.Fonts.Regular,
              fontSize: RFValue(14),
              color: Constants.Colors.TEXT_COLOR,
              paddingTop: RFValue(16),
            }}>
            {item.message}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderTopWidth: 1,
              marginTop: RFValue(16),
              borderTopColor: Constants.Colors.BORDER,
              paddingVertical: RFValue(8),
            }}>
            <Text
              style={{
                fontFamily: Constants.Fonts.Medium,
                fontSize: RFValue(10),
                color: Constants.Colors.TEXT_COLOR,
                opacity: 0.5,
              }}>
              {item.likes} Likes
            </Text>
            <Text
              style={{
                fontFamily: Constants.Fonts.Medium,
                fontSize: RFValue(10),
                color: Constants.Colors.TEXT_COLOR,
                opacity: 0.5,
              }}>
              {item.totalComments} Comments
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: RFValue(8),
            }}>
            <Image source={Images.likeButton} />
            <Image source={Images.commentButton} />
          </View>
        </View>
      )}
      ListEmptyComponent={EmptyListComponent()}
      keyExtractor={item => item._id}
    />
  );
};
export default Posts;
const styles = StyleSheet.create({
  listView: {marginTop: 4, flexDirection: 'row', alignItems: 'center'},
  listDot: {
    backgroundColor: 'grey',
    marginHorizontal: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
