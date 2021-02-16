/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions';
import PopHeader from 'components/common/popHeader';
import Spacer from 'components/common/spacer';
import Constants from 'constants';
import Helpers from 'helpers/OtherHelper';
import Regex from 'helpers/Regex';
import React, {useState} from 'react';
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
export const ForgotPassword = props => {
  const {componentId} = props;
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const forgotPwdRequest = useSelector(
    state => state.authReducer.forgotPwdRequest,
  );
  const _onSendOTPRequest = () => {
    if (email == '') {
      Helpers.toast(
        `Your registered email ID is required to send reset password instructions.`,
      );
    } else if (!Regex.validateEmail(email)) {
      Helpers.toast(`Please enter a valid email address.`);
    } else {
      Keyboard.dismiss();
      const requestPayload = {
        email: email.toLowerCase(),
      };
      dispatch(
        AppActions.forgotPassword(requestPayload, () => {
          dispatch(
            AppActions.pushWithOptions(componentId, 'ChangePassword', {
              email: email,
            }),
          );
        }),
      );
    }
  };
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      style={{backgroundColor: Constants.Colors.BACKGROUND}}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Constants.Colors.BACKGROUND,
        paddingHorizontal: width / 12,
      }}
      showsVerticalScrollIndicator={false}>
      <PopHeader componentId={props.componentId} />
      <View
        style={{
          height: height / 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: RFValue(24),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
          }}>
          PASSWORD RESET
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: RFValue(18),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Bold,
          }}>
          Forgot your password?
        </Text>
        <Text
          style={{
            fontSize: RFValue(12),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
            textAlign: 'center',
            paddingTop: RFValue(16),
          }}>
          Confirm your email address and we’ll send the instructions
        </Text>
      </View>
      <View style={{height: height / 6, justifyContent: 'flex-end'}}>
        <Spacer />
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="example@gmail.com"
          selectionColor={Constants.Colors.PRIMARY}
          onChangeText={email => {
            setEmail(email);
          }}
          theme={{
            colors: {
              primary: Constants.Colors.PRIMARY,
              placeholder: Constants.Colors.TEXT_COLOR,
            },
            underlineColor: 'transparent',
            roundness: RFValue(8),
          }}
          style={{
            backgroundColor: Constants.Colors.WHITE,
            height: height / 15,
          }}
        />
      </View>
      <Spacer />
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => _onSendOTPRequest()}
          style={{width: '100%'}}>
          <LinearGradient
            colors={[
              Constants.Colors.BUTTON_COLOR_LIGHT,
              Constants.Colors.BUTTON_COLOR_DARK,
            ]}
            style={styles.joinUsButton}>
            {forgotPwdRequest ? (
              <ActivityIndicator color={Constants.Colors.WHITE} />
            ) : (
              <Text style={styles.joinUsText}>Sent OTP</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default ForgotPassword;
const styles = StyleSheet.create({
  joinUsButton: {
    height: height / 14,
    borderRadius: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    height: height / 2.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  joinUsText: {
    fontSize: RFValue(16),
    color: Constants.Colors.WHITE,
    fontFamily: Constants.Fonts.Medium,
  },
});
