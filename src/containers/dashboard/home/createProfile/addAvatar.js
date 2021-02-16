/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import Card from 'components/common/card';
import Constants from 'constants';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
export default (ChooseGoals = React.memo(function AddAvatar(props) {
  const {setUserAvatar, userAvatar} = props;
  const _openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        setUserAvatar(response);
      },
    );
  };
  return (
    <Card
      customStyle={{
        padding: RFValue(16),
      }}>
      <Text
        style={{
          fontSize: RFValue(21),
          color: Constants.Colors.TEXT_COLOR,
          fontFamily: Constants.Fonts.Regular,
        }}>
        Add an avatar
      </Text>
      <View style={{flexDirection: 'row', paddingTop: RFValue(16)}}>
        <View style={{flex: 0.35}}>
          {userAvatar ? (
            <Image
              source={{uri: userAvatar.uri}}
              style={{
                height: RFValue(74),
                width: RFValue(74),
                borderRadius: RFValue(74),
              }}
            />
          ) : (
            <Image
              source={Images.Avatar}
              style={{height: RFValue(74), width: RFValue(74)}}
            />
          )}
        </View>
        <View style={{flex: 0.65, justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#F0F0F0',
              width: RFValue(122),
              height: RFValue(32),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: RFPercentage(8),
              shadowColor: '#308D85',
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 5,
            }}
            onPress={() => _openImagePicker()}>
            <Text
              style={{
                fontSize: RFValue(14),
                color: Constants.Colors.TEXT_COLOR,
              }}>
              Choose image
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
}));
