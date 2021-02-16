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
import FullScreenLoader from 'components/common/fullScreenLoader';
const {width, height} = Dimensions.get('window');

export const BrowseGroups = props => {
  const {componentId} = props;
  const [searchText, setSearchText] = useState('');
  const [render, reRender] = useState(false);

  const dispatch = useDispatch();
  const allGroups = useSelector(state => state.groupsReducer.allGroups);
  const gettingGroups = useSelector(state => state.groupsReducer.gettingGroups);
  const joiningGroup = useSelector(state => state.groupsReducer.joiningGroup);

  useEffect(() => {
    dispatch(AppActions.getAllGroups());
  }, []);
  const _openGroup = item => {
    dispatch(AppActions.pushWithOptions(componentId, 'GroupFeeds'));
    const {_id} = item;
    dispatch(AppActions.getGroupDetail(_id));
  };
  const _setSearchText = groupName => {
    setSearchText(groupName);
    reRender(!render);
  };
  const _leaveGroup = item => {
    const {_id} = item;
    dispatch(AppActions.leaveGroup(_id));
  };
  const _joinGroup = item => {
    const {_id} = item;
    dispatch(AppActions.joinGroup(_id));
  };
  return (
    <>
      <Header
        isBack={true}
        title={'Browse Groups'}
        componentId={componentId}
        trailingIcon={true}
        setSearchText={_setSearchText}
      />
      <View style={styles.mainContainer}>
        {gettingGroups ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={
              allGroups &&
              allGroups.filter(item => {
                return (
                  item &&
                  item.title &&
                  item.title.toLowerCase().includes(searchText)
                );
              })
            }
            extraData={searchText}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
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
                  <Text style={styles.subTitle}>{item.description}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: RFValue(16),
                  }}>
                  <TouchableOpacity
                    style={{zIndex: 1}}
                    onPress={() => {
                      _leaveGroup(item);
                    }}>
                    <Image
                      source={Images.leaveGroup}
                      style={{height: RFValue(24), width: RFValue(24)}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{zIndex: 1}}
                    onPress={() => {
                      _joinGroup(item);
                    }}>
                    <Image
                      source={Images.joinGroup}
                      style={{height: RFValue(24), width: RFValue(24)}}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
        {joiningGroup && <FullScreenLoader />}
      </View>
    </>
  );
};
export default BrowseGroups;
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
    textAlign: 'center',
  },
  subTitle: {
    fontSize: RFValue(12),
    fontFamily: Constants.Fonts.Medium,
    color: Constants.Colors.TEXT_COLOR,
    textAlign: 'center',
  },
});
