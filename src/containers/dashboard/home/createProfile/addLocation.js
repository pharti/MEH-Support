/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import Card from 'components/common/card';
import Constants from 'constants';
import React from 'react';
import {Image, Text, TextInput, View, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
export default (AddLocation = React.memo(function AddLocation(props) {
  const {setCity, setState, city, state, setCurrentLocation} = props;
  return (
    <Card
      customStyle={{
        padding: RFValue(16),
      }}>
      <Text
        style={{
          fontSize: RFValue(16),
          color: Constants.Colors.TEXT_COLOR,
          fontFamily: Constants.Fonts.Medium,
        }}>
        Change Location
      </Text>
      <View style={{paddingTop: RFValue(16)}}>
        <TouchableOpacity
          onPress={() => setCurrentLocation()}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Image source={Images.arrowRight} style={{marginRight: RFValue(8)}} />
          <Text
            style={{
              color: Constants.Colors.TEXT_COLOR,
              fontSize: RFValue(16),
            }}>
            Use your current location
          </Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', paddingTop: RFValue(12)}}>
          <View style={{flex: 0.5, alignItems: 'center'}}>
            <Text
              style={{
                color: Constants.Colors.TEXT_COLOR,
                fontSize: RFValue(16),
              }}>
              City
            </Text>
            <View style={{paddingVertical: RFValue(16)}}>
              <TextInput
                placeholder="Start by typing..."
                placeholderTextColor={Constants.Colors.PLACEHOLDER}
                style={{color: Constants.Colors.TEXT_COLOR}}
                onChangeText={city => {
                  setCity(city);
                }}
                value={city}
              />
            </View>
          </View>
          <View style={{flex: 0.5, alignItems: 'center'}}>
            <Text
              style={{
                color: Constants.Colors.TEXT_COLOR,
                fontSize: RFValue(16),
              }}>
              State
            </Text>
            <View style={{paddingVertical: RFValue(16)}}>
              <TextInput
                placeholder="Start by typing..."
                placeholderTextColor={Constants.Colors.PLACEHOLDER}
                style={{color: Constants.Colors.TEXT_COLOR}}
                onChangeText={state => {
                  setState(state);
                }}
                value={state}
              />
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
}));
