import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import Constants from 'constants';
import * as Images from 'assets/icons';
import FullScreenLoader from 'components/common/fullScreenLoader';
const {width, height} = Dimensions.get('window');
export default (VerifyOTP = props => {
  let {isOTPModalVisible, closeOTPModal, onAccountVerify, reSendOTP} = props;
  const [resendButton, setResendButton] = useState(false);
  const isLoading = useSelector(state => state.authReducer.isLoading);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOTPModalVisible}
      onRequestClose={() => {}}>
      <View
        style={{
          height: height,
          backgroundColor: Constants.Colors.BACKGROUND,
          padding: RFValue(16),
        }}>
        <View
          style={{
            height: '5%',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.2,
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}
            onPress={() => closeOTPModal()}>
            <Image source={Images.Close} style={{height: RFValue(16)}} />
          </TouchableOpacity>
        </View>
        <View style={{height: '90%'}}>
          <View
            style={{
              height: '30%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: RFValue(24),
                color: Constants.Colors.TEXT_COLOR,
                fontFamily: Constants.Fonts.Medium,
              }}>
              Verify Account
            </Text>
            <Text
              style={{
                paddingTop: RFValue(12),
                fontSize: RFValue(12),
                color: Constants.Colors.TEXT_COLOR,
                fontFamily: Constants.Fonts.Regular,
                textAlign: 'center',
              }}>
              Please type the verification code sent{'\n'} to your registered
              email account.
            </Text>
          </View>
          <View
            style={{
              height: '70%',
              alignItems: 'center',
              paddingHorizontal: RFValue(24),
            }}>
            <OTPInputView
              style={{width: '100%', height: '20%'}}
              pinCount={4}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad={false}
              codeInputFieldStyle={{
                borderWidth: 0,
                borderBottomWidth: 1,
                color: Constants.Colors.TEXT_COLOR,
                borderColor: Constants.Colors.TEXT_COLOR,
                fontSize: RFValue(24),
              }}
              codeInputHighlightStyle={{
                borderColor: Constants.Colors.PRIMARY,
              }}
              onCodeFilled={code => {
                onAccountVerify(code);
              }}
            />
            <View
              style={{
                height: '10%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {resendButton ? (
                <TouchableOpacity
                  onPress={() => reSendOTP()}
                  style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: Constants.Colors.TEXT_COLOR,
                      fontSize: RFValue(16),
                    }}>
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              ) : (
                <CountDown
                  until={60 * 2}
                  onFinish={() => {
                    setResendButton(!resendButton);
                  }}
                  onPress={() => {}}
                  size={16}
                  timeToShow={['M', 'S']}
                  timeLabels={{m: null, s: null}}
                  digitStyle={{}}
                  timeLabelStyle={{color: '#fff', fontWeight: 'bold'}}
                  digitTxtStyle={{color: Constants.Colors.TEXT_COLOR}}
                  showSeparator
                  separatorStyle={{color: Constants.Colors.TEXT_COLOR}}
                />
              )}
            </View>
            <FullScreenLoader isLoading={isLoading} />
          </View>
        </View>
      </View>
    </Modal>
  );
});
