/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import Header from 'components/common/header';
import Constants from 'constants';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
import * as AppActions from 'actions';
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
export const ChatUser = props => {
  let {componentId} = props;
  const [currentTab, setCurrentTab] = useState(1);
  const dispatch = useDispatch();
  const _setCurrentTab = tabName => {
    setCurrentTab(tabName);
  };
  const userDetails = useSelector(state => state.usersReducer.userDetails);
  const _goToActivities = () => {
    dispatch(AppActions.pushWithOptions(componentId, 'Activities'));
  };
  const _addGroup = () => {
    dispatch(AppActions.pushWithOptions(componentId, 'BrowseGroups'));
  };
  const _openGroup = item => {
    dispatch(AppActions.pushWithOptions(componentId, 'GroupFeeds'));
    const {_id} = item;
    dispatch(AppActions.getGroupDetail(_id));
  };

  const _openChat = item => {
    dispatch(
      AppActions.pushWithOptions(componentId, 'ChatScreen', {userData: item}),
    );
  };
  return (
    <>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View>
          <Text style={styles.title}>My Support Groups</Text>
          <FlatList
            data={userDetails && userDetails.groups}
            contentContainerStyle={{
              marginTop: RFValue(16),
              paddingVertical: RFValue(6),
              paddingHorizontal: RFValue(8),
            }}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={
              <TouchableOpacity
                onPress={() => _addGroup()}
                style={{
                  ...styles.listGroupContainer,
                  backgroundColor: '#308D85',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image source={Images.addGroups} />
              </TouchableOpacity>
            }
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => _openGroup(item)}
                style={{
                  ...styles.listGroupContainer,
                  backgroundColor: Constants.Colors.GREY,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{uri: item.image}}
                  style={{width: height / 14, height: height / 14}}
                />
              </TouchableOpacity>
            )}
          />
          <View style={styles.tabView}>
            <View style={{flex: 0.3}}>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: RFValue(12),
                    color: Constants.Colors.TEXT_COLOR,
                    fontFamily: Constants.Fonts.Regular,
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flex: 0.7,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={[
                  currentTab == 1 && tabSelectedStyle,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: RFValue(8),
                  },
                ]}
                onPress={() => _setCurrentTab(1)}>
                <Text
                  style={{
                    color:
                      currentTab == 1
                        ? Constants.Colors.WHITE
                        : Constants.Colors.TEXT_COLOR,
                    fontSize: RFValue(12),
                  }}>
                  Messages
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: RFValue(8),
                }}
                onPress={() => {
                  _goToActivities();
                }}>
                <Text
                  style={{
                    color: Constants.Colors.TEXT_COLOR,
                    fontSize: RFValue(12),
                  }}>
                  Activities
                </Text>
              </TouchableOpacity>
              <Image style={styles.noteImg} source={Images.groupNote} />
            </View>
          </View>
          <View
            style={{
              marginTop: RFValue(16),
            }}>
            <FlatList
              data={[]}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => (
                <>
                  <TouchableOpacity
                    onPress={() => _openChat(item)}
                    style={styles.listContent}>
                    <View style={{flex: 0.2}}>
                      <View style={styles.listImageView}>
                        <Image source={item.image} />
                      </View>
                    </View>
                    <View style={{flex: 0.8}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text style={styles.listNameText}>{item.name}</Text>
                        <Image source={Images.arrowRight} />
                      </View>
                      <Text style={styles.listMessageText}>{item.msg}</Text>
                      <Text style={styles.listDateText}>{item.date}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.horizontalLine} />
                </>
              )}
              ListEmptyComponent={
                <View
                  style={{
                    height: height / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: RFValue(16),
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(24),
                      color: Constants.Colors.TEXT_COLOR,
                      fontFamily: Constants.Fonts.Regular,
                      opacity: 0.5,
                    }}>
                    No Conversation.
                  </Text>
                  <Text
                    style={{
                      fontSize: RFValue(12),
                      color: Constants.Colors.TEXT_COLOR,
                      fontFamily: Constants.Fonts.Regular,
                      opacity: 0.5,
                    }}>
                    You didn't made any conversation yet.
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default ChatUser;
const myGroups = [
  {id: 1, image: Images.placeholderImage, type: ''},
  {id: 2, image: Images.placeholderImage, type: ''},
  {id: 3, image: Images.addGroups, type: 'add'},
];
const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingBottom: '20%',
    paddingHorizontal: RFValue(16),
  },
  title: {
    color: Constants.Colors.TEXT_COLOR,
    fontSize: RFValue(16),
    fontFamily: Constants.Fonts.Regular,
    paddingTop: RFValue(16),
  },
  listGroupContainer: {
    width: height / 14,
    height: height / 14,
    marginRight: RFValue(16),
    borderRadius: RFValue(8),
    elevation: 4,
    shadowColor: '#46464629',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 4,
    shadowRadius: 4,
  },
  listDotView: {position: 'absolute', top: RFValue(2), right: RFValue(4)},
  listDot: {
    margin: RFValue(2),
    borderRadius: RFValue(2),
    width: RFValue(2),
    height: RFValue(2),
    backgroundColor: 'grey',
  },
  tabView: {
    alignItems: 'center',
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height / 40,
  },
  messageView: {
    paddingHorizontal: RFValue(8),
    paddingVertical: RFValue(4),
    backgroundColor: '#308D85',
    borderRadius: RFValue(8),
  },
  messageText: {fontSize: RFValue(15), color: 'white', fontWeight: '500'},
  text: {fontSize: RFValue(15), color: '#808080', fontWeight: '500'},
  noteImg: {width: RFValue(24), height: RFValue(24)},
  horizontalLine: {backgroundColor: Constants.Colors.BACKGROUND, height: 1},
  listContent: {padding: RFValue(8), flexDirection: 'row'},
  listImageView: {
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 31,
    width: 62,
    height: 62,
  },
  listNameText: {fontSize: RFValue(16), color: '#308D85', fontWeight: '600'},
  listMessageText: {fontSize: RFValue(12), color: '#9F9D9D', fontWeight: '500'},
  listDateText: {marginTop: 8, fontSize: RFValue(10), color: '#9F9D9D'},
  listArrow: {position: 'absolute', top: 2, right: 4},
});
