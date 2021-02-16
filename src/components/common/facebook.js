// Facebook component for social login

import Constants from 'constants';
import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
const {width, height} = Dimensions.get('window');
export const GRAPH_API =
  'https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,name,picture&access_token='; // Facebook graph api
class Facebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueValue: 1,
    };
  }
  componentWillMount = () => {};
  fbLogin = async () => {
    const result = await LoginManager.logInWithPermissions([
      'email',
      'public_profile',
    ]);
    if (result.isCancelled) {
      // throw errorConsts.cancelledLogin;
    } else {
      const {accessToken} = await AccessToken.getCurrentAccessToken();
      if (accessToken) {
        const {
          first_name,
          last_name,
          name,
          id,
          email,
          picture,
        } = await this.fetchFbProfile(accessToken);
        let userData = {first_name, last_name, name, id, email, picture};
        console.log(userData, '****FACEBOOK_DATA******');
      }
    }
  };
  //Fetching profile details
  fetchFbProfile = async accessToken => {
    try {
      const response = await fetch(`${GRAPH_API}${accessToken}`);
      return response.json();
    } catch (error) {}
  };
  //Clear facebook session from device
  logout = () => {
    LoginManager.logOut();
  };
  render() {
    return (
      <TouchableOpacity style={styles.loginWithFbText} onPress={this.fbLogin}>
        <Text style={styles.subHeadingGrey}>
          Login with <Text style={styles.subHeadingPrimary}>Facebook</Text>
        </Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  loginWithFbText: {
    bottom: 0,
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
});
function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {},
)(Facebook);
