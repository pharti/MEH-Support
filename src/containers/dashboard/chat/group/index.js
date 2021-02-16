/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions';
import * as Images from 'assets/icons';
import FullScreenLoader from 'components/common/fullScreenLoader';
import Header from 'components/common/header';
import Constants from 'constants';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import Posts from './posts';
import InviteModal from './invite';

const {width, height} = Dimensions.get('window');
export const Group = props => {
  const {componentId} = props;
  const dispatch = useDispatch();
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const gettingGroupDetail = useSelector(
    state => state.groupsReducer.gettingGroupDetail,
  );
  const joiningGroup = useSelector(state => state.groupsReducer.joiningGroup);
  const groupDetail = useSelector(state => state.groupsReducer.groupDetail);
  const userDetails = useSelector(state => state.usersReducer.userDetails);
  const _leaveGroup = () => {
    const id = groupDetail && groupDetail._id;
    dispatch(AppActions.leaveGroup(id));
  };
  const _joinGroup = () => {
    const id = groupDetail && groupDetail._id;
    dispatch(AppActions.joinGroup(id));
  };
  const _goToAddPostScreen = () => {
    dispatch(AppActions.pushWithOptions(componentId, 'CreatePost'));
  };
  const _showGroupDetails = () => {
    dispatch(AppActions.pushWithOptions(componentId, 'GroupDetails'));
  };
  const _checkIfAMember = () => {
    if (groupDetail) {
      return (
        groupDetail.joinedAsMember ||
        groupDetail.joinedAsMentorAssigned ||
        groupDetail.joinedAsOwner
      );
    }
  };
  const _toggleInviteModal = () => {
    setInviteModalVisible(!inviteModalVisible);
  };
  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Header
          isBack={true}
          componentId={componentId}
          title={groupDetail && groupDetail.title}
        />
      </View>
      {gettingGroupDetail ? (
        <View
          style={{
            flex: 1,
            backgroundColor: Constants.Colors.BACKGROUND,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#B9B9B9',
              }}>
              {groupDetail && groupDetail.image ? (
                <Image
                  source={{uri: groupDetail.image}}
                  style={{width: '100%', height: width / 2}}
                  resizeMode={'cover'}
                />
              ) : (
                <Image
                  source={Images.defaultGroup}
                  style={{width: width / 3, height: width / 2}}
                  resizeMode={'contain'}
                />
              )}
            </View>
            <View style={styles.mainContinar}>
              <View style={styles.view}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: Constants.Fonts.Regular,
                      fontSize: RFValue(22),
                      color: Constants.Colors.TEXT_COLOR,
                    }}>
                    {groupDetail && groupDetail.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      _showGroupDetails();
                    }}
                    style={{
                      paddingLeft: RFValue(8),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={Images.greenRightArrow}
                      style={{
                        height: RFValue(12),
                        width: RFValue(6),
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.viewH}>
                  <Image source={Images.location} />
                  <Text style={styles.textLocation}>
                    {groupDetail && groupDetail.city + ', ' + groupDetail.state}
                  </Text>
                </View>
                <Text style={styles.textMember}>
                  {groupDetail &&
                    groupDetail.members &&
                    groupDetail.members.length}{' '}
                  Members
                </Text>
              </View>
              <View style={styles.view2}>
                <TouchableOpacity
                  onPress={() => {
                    _checkIfAMember() ? _leaveGroup() : _joinGroup();
                  }}
                  style={{
                    ...styles.btnView,
                    backgroundColor: _checkIfAMember()
                      ? Constants.Colors.GREY
                      : Constants.Colors.PRIMARY,
                  }}>
                  <Text style={styles.text2}>LEAVE GROUP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    _toggleInviteModal();
                  }}
                  style={{
                    ...styles.btnView,
                    marginLeft: RFValue(16),
                    backgroundColor: Constants.Colors.PRIMARY,
                  }}>
                  <Text style={styles.text2}>INVITE</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.horizontalLine} />
              <TouchableOpacity
                onPress={() => _goToAddPostScreen()}
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  paddingHorizontal: RFValue(16),
                  paddingVertical: RFValue(16),
                  alignItems: 'center',
                }}>
                <View style={{flex: 0.15}}>
                  <View
                    style={{
                      backgroundColor: Constants.Colors.BACKGROUND,
                      height: RFValue(32),
                      width: RFValue(32),
                      borderRadius: RFValue(24),
                    }}>
                    {userDetails && userDetails.avatar ? (
                      <Image
                        source={{uri: userDetails.avatar}}
                        style={{
                          height: RFValue(32),
                          width: RFValue(32),
                          borderRadius: RFValue(24),
                        }}
                        resizeMode={'cover'}
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
                <View
                  style={{
                    flex: 0.7,
                    paddingHorizontal: RFValue(4),
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      color: Constants.Colors.TEXT_COLOR,
                      fontFamily: Constants.Fonts.Regular,
                    }}>
                    Write something...
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.15,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity onPress={() => _openImagePicker()}>
                    <Image
                      source={Images.camera}
                      style={{width: RFValue(25), height: RFValue(18)}}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  paddingHorizontal: RFValue(16),
                  backgroundColor: Constants.Colors.BACKGROUND,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: RFValue(12),
                }}>
                <Text style={styles.textPost}>Top Post</Text>
                <Text style={styles.textFilter}>Filter</Text>
              </View>
              <View
                style={{
                  marginTop: 8,
                  marginBottom: 16,
                }}>
                <Posts groupId={groupDetail && groupDetail._id} />
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      {joiningGroup && <FullScreenLoader />}
      {inviteModalVisible && (
        <InviteModal
          inviteModalVisible={inviteModalVisible}
          setInviteModalVisible={_toggleInviteModal}
        />
      )}
    </>
  );
};
export default Group;
const styles = StyleSheet.create({
  horizontalLine: {backgroundColor: '#F0F0F0', height: 2},
  mainContinar: {
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: -16,
    borderRadius: 16,
  },
  view: {marginTop: 16, alignItems: 'center', justifyContent: 'center'},
  viewH: {alignItems: 'center', marginTop: 4, flexDirection: 'row'},
  textLocation: {
    marginLeft: 8,
    fontSize: RFValue(16),
    color: '#808080',
    fontWeight: '500',
  },
  textMember: {
    marginTop: 4,
    fontSize: RFValue(16),
    color: '#808080',
    fontWeight: '500',
  },
  view2: {flexDirection: 'row', justifyContent: 'center', marginVertical: 24},
  btnView: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#CFD2D5',
    elevation: 6,
    shadowColor: '#46464629',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 6,
    shadowRadius: 2,
  },
  text2: {color: 'white', fontSize: RFValue(14), fontWeight: '500'},
  textPost: {fontSize: RFValue(12), color: '#808080', fontWeight: '700'},
  textFilter: {fontSize: RFValue(12), color: '#808080'},
});
