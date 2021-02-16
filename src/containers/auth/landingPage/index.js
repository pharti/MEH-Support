/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import Constants from 'constants';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
import * as AppActions from 'actions';
import Facebook from '../../../components/common/facebook';

const {width, height} = Dimensions.get('window');
const LandingPage = props => {
  let {componentId} = props;
  const dispatch = useDispatch();
  const _onPressJoinUs = () => {
    dispatch(AppActions.pushWithOptions(componentId, 'Register'));
  };
  const _onPressLogin = () => {
    dispatch(AppActions.pushWithOptions(componentId, 'Login'));
  };
  const _onPressLoginWithFb = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Image source={Images.LangingPageBg} style={styles.backgroundImage} />
        <View style={styles.logoView}>
          <Image resizeMode={'contain'} source={Images.AppLogo} />
          <Text style={styles.title}>MEH SUPPORT</Text>
          <Text style={styles.subTitle}>YOUR ECOSYSTEM OF SUPPORT</Text>
        </View>
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity onPress={() => _onPressJoinUs()} activeOpacity={0.9}>
          <LinearGradient
            colors={[
              Constants.Colors.GRADE_ONE_SECONDARY,
              Constants.Colors.GRADE_TWO_SECONDARY,
            ]}
            style={styles.joinUsButton}>
            <Text style={styles.joinUsText}>JOIN US NOW</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginText}
          onPress={() => _onPressLogin()}>
          <Text style={styles.subHeadingGrey}>
            Already a member?
            <Text style={styles.subHeadingPrimary}> Login!</Text>
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.loginWithFbText}>
          <Text style={styles.subHeadingGrey}>
            Login with <Text style={styles.subHeadingPrimary}>Facebook</Text>
          </Text>
        </TouchableOpacity> */}
        {/* <Facebook /> */}
      </View>
    </View>
  );
};
export default LandingPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.Colors.WHITE,
  },
  backgroundImage: {
    height: height,
    width: '100%',
    marginTop: -height / 2.8,
  },
  logoView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {fontSize: RFValue(38), color: Constants.Colors.WHITE},
  subTitle: {
    fontSize: RFValue(16),
    color: Constants.Colors.WHITE,
    lineHeight: 38,
  },
  joinUsButton: {
    width: width / 1.5,
    height: height / 14,
    borderRadius: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subHeadingGrey: {
    fontSize: RFValue(16),
    color: Constants.Colors.TEXT_COLOR,
    fontWeight: 'bold',
    fontFamily: Constants.Fonts.Medium,
  },
  subHeadingPrimary: {
    color: Constants.Colors.PRIMARY,
    fontFamily: Constants.Fonts.Bold,
  },
  bottomView: {
    zIndex: 1,
    height: '40%',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  joinUsText: {
    fontSize: RFValue(22),
    color: Constants.Colors.WHITE,
    fontFamily: Constants.Fonts.Bold,
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
  topView: {
    height: '60%',
    zIndex: 1,
  },
});
