/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions';
import Spacer from 'components/common/spacer';
import Constants from 'constants';
import Helpers from 'helpers/OtherHelper';
import React, {useState} from 'react';
import {
  Dimensions,
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
import UserTypeModal from './userTypeModal';
import Facebook from '../../../components/common/facebook';
import moment from 'moment-timezone';
const {width, height} = Dimensions.get('window');
export const Register = props => {
  let {componentId} = props;
  const dispatch = useDispatch();
  const [focus, setFocus] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isLoading = useSelector(state => state.authReducer.isLoading);
  const _onPressLogin = () => {
    dispatch(AppActions.pop(componentId, 'Login'));
  };
  const _onPressSignup = () => {
    if (firstName == '' && username == '' && email == '' && password == '') {
      Helpers.toast(`All fields are required.`);
    }
    // if (!Regex.validateEmail(username)) {
    //   Helpers.toast(`Please enter a valid email or username.`);
    // }
    // else if (!Regex.validatePassword(password)) {
    //   Helpers.toast(`Please enter a valid password.`);
    // }
    else {
      setIsModalVisible(true);
    }
  };
  const _closeModal = () => {
    setIsModalVisible(false);
  };
  const _onUserTypeSelection = userType => {
    var zone_name = moment.tz.guess();
    console.log('zone_name', zone_name);
    const payload = {
      firstName: firstName,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: password,
      userType: userType,
      timeZone: zone_name,
    };
    setIsModalVisible(false);
    dispatch(
      AppActions.signUp(payload, () => {
        dispatch(AppActions.pushWithOptions(componentId, 'VerifyOTP'));
      }),
    );
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
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: RFValue(24),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Medium,
          }}>
          SIGN UP
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
        }}>
        <TextInput
          mode="outlined"
          label="First / Company Name"
          selectionColor={Constants.Colors.PRIMARY}
          onChangeText={firstName => {
            setFirstName(firstName);
          }}
          onFocus={() => setFocus(true)}
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
          label="User Name"
          onFocus={() => setFocus(true)}
          selectionColor={Constants.Colors.PRIMARY}
          onChangeText={username => {
            setUsername(username);
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
          label="Email"
          onFocus={() => setFocus(true)}
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
        <Spacer />
        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry
          onFocus={() => setFocus(true)}
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
          onPress={() => _onPressSignup()}
          style={{width: '100%'}}>
          <LinearGradient
            colors={[
              Constants.Colors.BUTTON_COLOR_LIGHT,
              Constants.Colors.BUTTON_COLOR_DARK,
            ]}
            style={styles.joinUsButton}>
            {isLoading ? (
              <ActivityIndicator color={Constants.Colors.WHITE} />
            ) : (
              <Text style={styles.signUpButton}>Sign Up</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
        <Spacer />
        <TouchableOpacity
          onPress={() => _onPressLogin()}
          style={{width: '100%'}}>
          <LinearGradient
            colors={[
              Constants.Colors.DISABLE_BUTTON_LIGHT,
              Constants.Colors.DISABLE_BUTTON_DARK,
            ]}
            style={styles.joinUsButton}>
            <Text style={styles.loginButton}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View
          style={{
            bottom: 0,
            position: 'absolute',
            paddingBottom: height / 16,
            alignItems: 'center',
          }}>
          {/* <TouchableOpacity>
            <Text style={styles.subHeadingGrey}>
              Login with <Text style={styles.subHeadingPrimary}>Facebook</Text>
            </Text>
          </TouchableOpacity> */}
          {/* <Facebook /> */}
          <Text
            style={{
              textAlign: 'center',
              fontSize: RFValue(12),
              color: Constants.Colors.TEXT_COLOR,
              fontFamily: Constants.Fonts.Medium,
              paddingTop: RFValue(16),
            }}>
            By signing up you agree to our{'\n'}{' '}
            <Text style={styles.subHeadingPrimary}>Terms & Conditions</Text> and
            <Text style={styles.subHeadingPrimary}> Privacy Policy</Text>
          </Text>
        </View>
      </View>
      {isModalVisible && (
        <UserTypeModal
          isModalVisible={isModalVisible}
          closeModal={_closeModal}
          onUserTypeSelection={_onUserTypeSelection}
        />
      )}
    </KeyboardAwareScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  joinUsButton: {
    height: height / 16,
    borderRadius: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeadingGrey: {
    fontSize: RFValue(14),
    color: Constants.Colors.TEXT_COLOR,
    fontFamily: Constants.Fonts.Medium,
  },
  subHeadingPrimary: {
    color: Constants.Colors.PRIMARY,
    fontFamily: Constants.Fonts.Bold,
  },
  bottomView: {
    height: height / 2.8,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  signUpButton: {
    fontSize: RFValue(16),
    color: Constants.Colors.WHITE,
    fontFamily: Constants.Fonts.Medium,
  },
  loginButton: {
    fontSize: RFValue(16),
    color: Constants.Colors.TEXT_COLOR,
    fontFamily: Constants.Fonts.Medium,
  },
});
