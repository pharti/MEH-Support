/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import Header from 'components/common/header';
import Constants from 'constants';
import React from 'react';
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
export const GroupDetails = props => {
  const {componentId} = props;
  const dispatch = useDispatch();
  const groupDetail = useSelector(state => state.groupsReducer.groupDetail);
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
      <ScrollView
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}>
        <View style={{}}>
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
          <View style={styles.mainContainer}>
            <View
              style={{
                padding: RFValue(16),
                borderBottomColor: Constants.Colors.BORDER,
                borderBottomWidth: 1,
              }}>
              <Text style={styles.groupName}>
                {groupDetail && groupDetail.title}
              </Text>
              <Text style={styles.groupDesc}>
                {groupDetail && groupDetail.description}
              </Text>
              <View style={styles.locationView}>
                <Image source={Images.location} />
                <Text style={styles.location}>Location</Text>
              </View>
              <Text style={styles.locationURL}>www.website.com</Text>
            </View>
            <View
              style={{
                padding: RFValue(16),
                borderBottomColor: Constants.Colors.BORDER,
                borderBottomWidth: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.members}>
                  {groupDetail &&
                    groupDetail.members &&
                    groupDetail.members.length}{' '}
                  Members
                </Text>
                <Text style={styles.seeAll}>See All</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row-reverse',
                  alignSelf: 'flex-start',
                  paddingTop: RFValue(8),
                }}>
                {groupDetail &&
                  groupDetail.members &&
                  groupDetail.members.map((item, index) => {
                    return (
                      <View
                        style={{
                          marginRight: -16,
                          width: RFValue(32),
                          height: RFValue(32),
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: Constants.Colors.BACKGROUND,
                          borderColor: 'white',
                          borderWidth: 3,
                          borderRadius: RFValue(16),
                        }}>
                        <Image
                          source={item.image}
                          style={{width: RFValue(18), height: RFValue(14)}}
                        />
                      </View>
                    );
                  })}
              </View>
            </View>
            <View style={{padding: RFValue(16)}}>
              <Text style={styles.rulesTitle}>Group Rules</Text>
              <FlatList
                contentContainerStyle={{paddingTop: RFValue(16)}}
                data={groupDetail && groupDetail.rules}
                renderItem={({item, index}) => (
                  <View>
                    <Text style={styles.rulesCount}>{index + 1} Rule One</Text>
                    <Text style={styles.groupRule}>{item}</Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default GroupDetails;
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: -16,
    borderRadius: 16,
  },
  groupName: {
    fontFamily: Constants.Fonts.Medium,
    fontSize: RFValue(22),
    color: Constants.Colors.TEXT_COLOR,
  },
  groupDesc: {
    fontFamily: Constants.Fonts.Regular,
    fontSize: RFValue(14),
    color: Constants.Colors.TEXT_COLOR,
    lineHeight: RFValue(20),
    marginVertical: RFValue(16),
  },
  locationView: {alignItems: 'center', flexDirection: 'row'},
  members: {
    fontFamily: Constants.Fonts.Medium,
    fontSize: RFValue(16),
    color: Constants.Colors.TEXT_COLOR,
  },
  location: {
    marginLeft: RFValue(8),
    fontFamily: Constants.Fonts.Regular,
    fontSize: RFValue(14),
    color: Constants.Colors.TEXT_COLOR,
  },
  locationURL: {
    paddingTop: RFValue(16),
    fontFamily: Constants.Fonts.Regular,
    fontSize: RFValue(14),
    color: Constants.Colors.TEXT_COLOR,
  },
  seeAll: {
    fontFamily: Constants.Fonts.Regular,
    fontSize: RFValue(14),
    color: Constants.Colors.TEXT_COLOR,
  },
  rulesTitle: {
    fontFamily: Constants.Fonts.Medium,
    fontSize: RFValue(16),
    color: Constants.Colors.TEXT_COLOR,
  },
  rulesCount: {
    fontFamily: Constants.Fonts.Regular,
    fontSize: RFValue(14),
    color: Constants.Colors.TEXT_COLOR,
  },
  groupRule: {
    fontFamily: Constants.Fonts.Regular,
    fontSize: RFValue(12),
    color: Constants.Colors.TEXT_COLOR,
    paddingLeft: RFValue(12),
    paddingTop: RFValue(8),
    lineHeight: RFValue(15),
  },
});
