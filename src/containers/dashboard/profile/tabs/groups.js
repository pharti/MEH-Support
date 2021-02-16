/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import Constants from 'constants';
import React from 'react';
import {Dimensions, FlatList, Image, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('window');
export default (Groups = props => {
  const {goToAddDailyReflections, dailyReflections} = props;
  return (
    <FlatList
      data={[1, 1, 1, 1, 1, 1]}
      contentContainerStyle={{
        paddingVertical: RFValue(16),
      }}
      numColumns={2}
      columnWrapperStyle={{flex: 1, justifyContent: 'space-between'}}
      renderItem={({item, index}) => {
        return (
          <View
            style={{
              width: width / 2.3,
              height: height / 5.5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: RFValue(10),
              shadowColor: Constants.Colors.PRIMARY,
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 5,
              marginBottom: RFValue(16),
              borderColor: Constants.Colors.BORDER,
              borderWidth: 1,
              backgroundColor: Constants.Colors.WHITE,
            }}>
            <Image
              source={Images.dummyGroup}
              style={{height: RFValue(52), width: RFValue(52)}}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: RFValue(14),
                color: Constants.Colors.TEXT_COLOR,
                paddingTop: RFValue(8),
              }}>
              Group Name
            </Text>
            <Text
              style={{
                fontSize: RFValue(12),
                color: Constants.Colors.TEXT_COLOR,
              }}>
              Group Description
            </Text>
          </View>
        );
      }}
      keyExtractor={item => item.id}
      ListEmptyComponent={
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: RFValue(16),
          }}>
          <Text
            style={{
              fontSize: RFValue(16),
              color: Constants.Colors.TEXT_COLOR,
              fontFamily: Constants.Fonts.Regular,
              opacity: 0.5,
            }}>
            No Results Found
          </Text>
          <Text
            style={{
              fontSize: RFValue(12),
              color: Constants.Colors.TEXT_COLOR,
              fontFamily: Constants.Fonts.Regular,
              paddingBottom: RFValue(8),
              opacity: 0.5,
            }}>
            You have not added any goals yet.
          </Text>
        </View>
      }
    />
  );
});
