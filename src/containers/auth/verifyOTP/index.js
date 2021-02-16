/* eslint-disable module-resolver/use-alias */
import OTPInputView from '@twotalltotems/react-native-otp-input';
import * as AppActions from 'actions';
import * as Images from 'assets/icons';
import FullScreenLoader from 'components/common/fullScreenLoader';
import Constants from 'constants';
import React from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
export const VerifyOTP = props => {
  let {componentId} = props;
  const dispatch = useDispatch();
  const verifyingUser = useSelector(state => state.authReducer.verifyingUser);
  const signupData = useSelector(state => state.authReducer.signupData);

  const _closeScreen = () => {
    dispatch(AppActions.pop(componentId));
  };
  const _onVerifyOTP = code => {
    Keyboard.dismiss();
    const payload = {
      email: signupData && signupData.email,
      otp: code,
    };
    dispatch(
      AppActions.verifyOTP(payload, () => {
        dispatch(AppActions.pushWithOptions(componentId, 'Login'));
      }),
    );
  };

  return (
    <View
      style={{
        flexGrow: 1,
        backgroundColor: Constants.Colors.BACKGROUND,
        paddingHorizontal: RFValue(16),
        paddingTop: RFValue(32),
      }}>
      <View style={{flex: 0.1, justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => _closeScreen()}>
          <Image resizeMode={'contain'} source={Images.Close} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.2,
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
            fontSize: RFValue(12),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
            textAlign: 'center',
          }}>
          Please enter the verification code sent to your registered email
          account.
        </Text>
      </View>
      <View
        style={{
          flex: 0.7,
          alignItems: 'center',
        }}>
        <OTPInputView
          style={{width: '80%', height: height / 6}}
          pinCount={4}
          autoFocusOnLoad
          codeInputFieldStyle={{
            width: 30,
            height: 45,
            borderWidth: 0,
            borderBottomWidth: 1,
            color: Constants.Colors.TEXT_COLOR,
            fontSize: RFValue(16),
          }}
          codeInputHighlightStyle={{
            borderColor: Constants.Colors.PRIMARY,
          }}
          onCodeFilled={code => {
            _onVerifyOTP(code);
          }}
          placeholderCharacter={'X'}
          placeholderTextColor={Constants.Colors.PLACEHOLDER}
        />
        {/* <Text
          style={{
            fontSize: RFValue(16),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
          }}>
          Resend Code
        </Text> */}
      </View>
      {verifyingUser && <FullScreenLoader />}
    </View>
  );
};

export default VerifyOTP;
