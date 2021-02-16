import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import * as Images from 'assets/icons';
import Spacer from 'components/common/spacer';
import Constants from 'constants';
const {width} = Dimensions.get('window');
export default (UserTypeModal = props => {
  let {isModalVisible, closeModal, onUserTypeSelection} = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {}}>
      <View
        style={{
          flex: 1,
          backgroundColor: Constants.Colors.BACKGROUND,
          padding: RFValue(16),
        }}>
        <View
          style={{
            flex: 0.06,
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.2,
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}
            onPress={() => closeModal()}>
            <Image source={Images.Close} style={{height: RFValue(16)}} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.12,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: RFValue(18),
              color: Constants.Colors.TEXT_COLOR,
              fontFamily: Constants.Fonts.Medium,
            }}>
            What brings you here?
          </Text>
          <Text
            style={{
              fontSize: RFValue(12),
              color: Constants.Colors.TEXT_COLOR,
              fontFamily: Constants.Fonts.Regular,
              lineHeight: RFValue(16),
            }}>
            Choose one
          </Text>
        </View>
        <View style={{flex: 0.6, justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              flex: 0.35,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Constants.Colors.WHITE,
              borderRadius: RFValue(16),
              shadowColor: Constants.Colors.PRIMARY,
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 5,
            }}
            onPress={() => onUserTypeSelection('mentee')}>
            <Image source={Images.Personal} />
            <Spacer />
            <Spacer />
            <Text
              style={{
                fontSize: RFValue(18),
                color: Constants.Colors.TEXT_COLOR,
                fontFamily: Constants.Fonts.Regular,
              }}>
              PERSONAL
            </Text>
            <Text
              style={{
                fontSize: RFValue(12),
                color: Constants.Colors.TEXT_COLOR,
                fontFamily: Constants.Fonts.Regular,
                lineHeight: RFValue(24),
              }}>
              I am searching for support for my recovery
            </Text>
          </TouchableOpacity>
          <Spacer />
          <TouchableOpacity
            style={{
              flex: 0.35,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Constants.Colors.WHITE,
              borderRadius: RFValue(16),
              shadowColor: '#000',
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 5,
            }}
            onPress={() => onUserTypeSelection('mentor')}>
            <Image source={Images.Mentor} />
            <Spacer />
            <Spacer />
            <Text
              style={{
                fontSize: RFValue(18),
                color: Constants.Colors.TEXT_COLOR,
                fontFamily: Constants.Fonts.Regular,
              }}>
              MENTOR
            </Text>
            <Text
              style={{
                fontSize: RFValue(12),
                color: Constants.Colors.TEXT_COLOR,
                fontFamily: Constants.Fonts.Regular,
                lineHeight: RFValue(24),
              }}>
              I am here to support peers on their recovery
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});
