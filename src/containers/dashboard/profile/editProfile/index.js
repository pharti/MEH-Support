/* eslint-disable module-resolver/use-alias */
import Geolocation from '@react-native-community/geolocation';
import * as Images from 'assets/icons';
import Calendar from 'components/common/calendar';
import PopHeader from 'components/common/popHeader';
import Constants from 'constants';
import idx from 'idx';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import FormattedLocation from 'utils/FormatAddressUtils';

const {width, height} = Dimensions.get('window');
const EditProfile = props => {
  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [month, setCurrentMonth] = useState('');

  useEffect(() => {
    requestLocation();
  }, []);
  const setCurrentLocation = () => {
    requestLocation();
  };
  const _setStartDate = (day, currentMonth) => {
    setCurrentMonth(currentMonth);
    setStartDate(day);
  };

  const requestLocation = () => {
    Geolocation.getCurrentPosition(info => {
      let sourceLatitude = idx(info, _ => _.coords.latitude);
      let sourceLongitude = idx(info, _ => _.coords.longitude);
      getFormattedAddress(sourceLatitude, sourceLongitude);
    });
  };

  const getFormattedAddress = async (sourceLatitude, sourceLongitude) => {
    let formattedAddress = await FormattedLocation(
      sourceLatitude,
      sourceLongitude,
      true,
    );
    setCity(idx(formattedAddress, _ => _.city.long_name));
    setState(idx(formattedAddress, _ => _.state.long_name));
  };

  const ProfilePicture = () => {
    return (
      <View
        style={{
          height: RFPercentage(20),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={{}}>
          <View
            style={{
              height: width / 2.5,
              width: width / 2.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode={'contain'}
              source={Images.editAvatar}
              style={{height: width / 2.8, width: width / 2.8}}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 10,
              right: 10,
            }}>
            <Image
              resizeMode={'contain'}
              source={Images.addAvatar}
              style={{height: width / 10, width: width / 10}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const Button = () => {
    return (
      <TouchableOpacity
        style={{
          margin: RFValue(16),
          height: height / 14,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Constants.Colors.PRIMARY,
          borderRadius: RFValue(10),
        }}
        onPress={() => _saveUserProfile()}>
        {false ? (
          <ActivityIndicator color={Constants.Colors.WHITE} />
        ) : (
          <Text style={{color: Constants.Colors.WHITE, fontSize: RFValue(16)}}>
            SAVE
          </Text>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Constants.Colors.BACKGROUND,
      }}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          paddingHorizontal: RFValue(16),
          paddingBottom: Platform.OS == 'ios' ? height / 16 : height / 12,
        }}
        style={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <PopHeader componentId={props.componentId} />
        <ProfilePicture />
        <Card
          customStyle={{
            padding: RFValue(16),
            marginTop: height / 20,
          }}>
          <Text
            style={{
              fontSize: RFValue(16),
              color: Constants.Colors.TEXT_COLOR,
              fontFamily: Constants.Fonts.Regular,
            }}>
            Change Name
          </Text>
          <TextInput
            placeholder="Enter your task name"
            placeholderTextColor={Constants.Colors.PLACEHOLDER}
            style={{
              color: Constants.Colors.TEXT_COLOR,
              backgroundColor: Constants.Colors.BACKGROUND,
              paddingHorizontal: RFValue(16),
              borderRadius: RFValue(12),
              fontSize: RFValue(16),
              paddingVertical: RFValue(16),
              marginTop: RFValue(8),
            }}
            selectionColor={Constants.Colors.PRIMARY}
            onChangeText={taskName => {
              setName(taskName);
            }}
          />
        </Card>
        <Card
          customStyle={{
            padding: RFValue(16),
          }}>
          <Text
            style={{
              fontSize: RFValue(16),
              color: Constants.Colors.TEXT_COLOR,
              fontFamily: Constants.Fonts.Regular,
            }}>
            Change Email
          </Text>
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor={Constants.Colors.PLACEHOLDER}
            style={{
              color: Constants.Colors.TEXT_COLOR,
              backgroundColor: Constants.Colors.BACKGROUND,
              paddingHorizontal: RFValue(16),
              borderRadius: RFValue(12),
              fontSize: RFValue(16),
              paddingVertical: RFValue(16),
              marginTop: RFValue(8),
            }}
            selectionColor={Constants.Colors.PRIMARY}
            onChangeText={taskName => {
              setEmail(taskName);
            }}
          />
        </Card>
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
              <Image
                source={Images.arrowRight}
                style={{marginRight: RFValue(8)}}
              />
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
        <Calendar
          title={false}
          selectedDate={startDate}
          setSelectedDate={_setStartDate}
        />
        <Button />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EditProfile;
