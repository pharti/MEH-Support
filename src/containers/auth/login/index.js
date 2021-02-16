import * as AppActions from 'actions';
import Spacer from 'components/common/spacer';
import Constants from 'constants';
import Helpers from 'helpers/OtherHelper';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {TextInput} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import Facebook from '../../../components/common/facebook';

const {width, height} = Dimensions.get('window');
export const Login = props => {
  let {componentId} = props;
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector(state => state.authReducer.isLoading);
  const _onPressSignup = () => {
    dispatch(AppActions.pushWithOptions(componentId, 'Register'));
  };
  const _onPressLogin = () => {
    Keyboard.dismiss();
    if (username == '' && password == '') {
      Helpers.toast(`Username and password is required.`);
      return;
    }
    const requestPayload = {
      usernameOrEmail: username.toLowerCase(),
      password: password,
    };
    dispatch(AppActions.login(requestPayload, componentId));
  };
  const _onPressForgotPassword = () => {
    dispatch(AppActions.pushWithOptions(componentId, 'ForgotPassword'));
  };
  return (
    <KeyboardAwareScrollView
      style={{backgroundColor: Constants.Colors.BACKGROUND}}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: Constants.Colors.BACKGROUND,
        padding: width / 12,
      }}
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}>
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
            fontFamily: Constants.Fonts.Medium,
          }}>
          LOGIN
        </Text>
      </View>
      <View style={{height: height / 4, justifyContent: 'flex-end'}}>
        <TextInput
          mode="outlined"
          label="User Name or Email"
          selectionColor={Constants.Colors.PRIMARY}
          underlineColor="red"
          onChangeText={username => {
            setUsername(username);
          }}
          theme={{
            colors: {
              primary: Constants.Colors.PRIMARY,
              placeholder: Constants.Colors.TEXT_COLOR,
            },
          }}
          style={{
            fontSize: RFValue(16),
            backgroundColor: Constants.Colors.WHITE,
          }}
        />
        <Spacer />
        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry
          selectionColor={Constants.Colors.PRIMARY}
          onChangeText={password => {
            setPassword(password);
          }}
          theme={{
            colors: {
              primary: Constants.Colors.PRIMARY,
              placeholder: Constants.Colors.TEXT_COLOR,
            },
            underlineColor: 'transparent',
          }}
          style={{
            fontSize: RFValue(16),
            backgroundColor: Constants.Colors.WHITE,
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          alignItems: 'flex-end',
          width: '100%',
          paddingTop: RFValue(12),
        }}
        onPress={() => _onPressForgotPassword()}>
        <Text
          style={{
            fontSize: RFValue(14),
            color: Constants.Colors.PRIMARY,
            fontWeight: 'bold',
            fontFamily: Constants.Fonts.Medium,
          }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <Spacer />
      <View style={styles.bottomView}>
        <TouchableOpacity onPress={() => _onPressLogin()}>
          <LinearGradient
            colors={[
              Constants.Colors.BUTTON_COLOR_LIGHT,
              Constants.Colors.BUTTON_COLOR_DARK,
            ]}
            style={styles.joinUsButton}>
            {isLoading ? (
              <ActivityIndicator color={Constants.Colors.WHITE} />
            ) : (
              <Text
                style={{
                  fontSize: RFValue(16),
                  color: Constants.Colors.WHITE,
                  fontFamily: Constants.Fonts.Medium,
                }}>
                Login
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginText}
          onPress={() => _onPressSignup()}>
          <Text style={styles.subHeadingGrey}>
            Not a member?
            <Text style={styles.subHeadingPrimary}> Sign up now!</Text>
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.loginWithFbText}>
          <Text style={styles.subHeadingGrey}>
            Login with <Text style={styles.subHeadingPrimary}>Facebook</Text>
          </Text>
        </TouchableOpacity> */}
        {/* <Facebook /> */}
      </View>
    </KeyboardAwareScrollView>
  );
};
export default Login;

const styles = StyleSheet.create({
  joinUsButton: {
    width: width / 1.5,
    height: height / 14,
    borderRadius: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeadingGrey: {
    fontSize: RFValue(14),
    color: Constants.Colors.TEXT_COLOR,
    fontWeight: 'bold',
    fontFamily: Constants.Fonts.Medium,
  },
  subHeadingPrimary: {
    color: Constants.Colors.PRIMARY,
    fontFamily: Constants.Fonts.Bold,
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
  loginText: {
    height: '20%',
    justifyContent: 'center',
  },
  loginWithFbText: {
    bottom: 0,
    position: 'absolute',
    paddingBottom: height / 16,
  },
});
