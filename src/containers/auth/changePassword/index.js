/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions';
import PopHeader from 'components/common/popHeader';
import Spacer from 'components/common/spacer';
import Constants from 'constants';
import Helpers from 'helpers/OtherHelper';
import React, {useState} from 'react';
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
export const ChangePassword = props => {
  let {componentId, email} = props;
  const dispatch = useDispatch();
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const changePwdRequest = useSelector(
    state => state.authReducer.changePwdRequest,
  );
  const _onChangePassword = () => {
    Keyboard.dismiss();
    const requestPayload = {
      email: email.toLowerCase(),
      otp: otp,
      password: newPassword,
    };
    dispatch(
      AppActions.changePassword(requestPayload, response => {
        dispatch(AppActions.pushWithOptions(componentId, 'Login'));
        Helpers.toast(response && response.message);
      }),
    );
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
          height: height / 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: RFValue(24),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
          }}>
          CHANGE PASSWORD
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: RFValue(12),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
            textAlign: 'center',
          }}>
          Please enter the OTP received on your registered email account and
          your new password below.
        </Text>
      </View>
      <View
        style={{
          height: height / 4,
          justifyContent: 'flex-end',
        }}>
        <Spacer />
        <TextInput
          mode="outlined"
          label="One Time Password"
          placeholder="XXXX"
          selectionColor={Constants.Colors.PRIMARY}
          onChangeText={otp => {
            setOTP(otp);
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
        <Spacer />
        <TextInput
          mode="outlined"
          label="New Password"
          secureTextEntry
          placeholder="**********"
          selectionColor={Constants.Colors.PRIMARY}
          onChangeText={password => {
            setNewPassword(password);
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
          onPress={() => _onChangePassword()}
          style={{width: '100%'}}>
          <LinearGradient
            colors={[
              Constants.Colors.BUTTON_COLOR_LIGHT,
              Constants.Colors.BUTTON_COLOR_DARK,
            ]}
            style={styles.joinUsButton}>
            {changePwdRequest ? (
              <ActivityIndicator color={Constants.Colors.WHITE} />
            ) : (
              <Text style={styles.joinUsText}>Change Password</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default ChangePassword;

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
