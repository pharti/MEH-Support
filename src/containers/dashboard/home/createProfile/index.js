/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions';
import Constants from 'constants';
import moment from 'moment';
import React, {useCallback, useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddAvatar from './addAvatar';
import AddLocation from './addLocation';
import AddSoberDate from './addSoberDate';
import Birthday from './birthday';
import ChooseGoals from './chooseGoals';
import ExperienceLevel from './experienceLevel';
import Gender from './gender';
import Support from './support';
import RecoveringList from './recoveringList';
import FormattedLocation from 'utils/FormatAddressUtils';
import Geolocation from '@react-native-community/geolocation';
import idx from 'idx';
import Helpers from 'helpers/OtherHelper';
import Regex from 'helpers/Regex';
const {width, height} = Dimensions.get('window');
export const CreateProfile = props => {
  const {AppActions} = props;
  const [userAvatar, setUserAvatar] = useState(null);
  const [birthday, setBirthday] = useState(new Date(1598051730000));
  const [gender, setGender] = useState('male');
  const [experience, setExperience] = useState('novice');

  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [selectedGoal, setGoal] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [month, setCurrentMonth] = useState(null);
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [recoveryItems, setRecoveryList] = useState(null);

  const creatingProfile = useSelector(
    state => state.usersReducer.creatingProfile,
  );
  const userType = useSelector(
    state => state.usersReducer.userDetails.userType,
  );
  useEffect(() => {
    _requestLocation();
  }, []);
  const _saveSelectedSupport = useCallback(
    supportArray => setSelectedSupport(supportArray),
    [],
  );
  const _saveRecoveryItems = useCallback(
    recoveryItems => setRecoveryList(recoveryItems),
    [],
  );

  const _setUserAvatar = useCallback(avatar => setUserAvatar(avatar), []);
  const _setBirthday = useCallback(birthday => setBirthday(birthday), []);
  const _setGender = useCallback(gender => setGender(gender), []);
  const _setCity = useCallback(city => setCity(city), []);
  const _setState = useCallback(state => setState(state), []);
  const _setExperience = useCallback(
    experience => setExperience(experience),
    [],
  );

  const _setSoberDate = (day, month) => {
    setStartDate(day);
    setCurrentMonth(month);
  };
  const _setCurrentLocation = () => {
    _requestLocation();
  };
  const _requestLocation = () => {
    Geolocation.getCurrentPosition(info => {
      let sourceLatitude = idx(info, _ => _.coords.latitude);
      let sourceLongitude = idx(info, _ => _.coords.longitude);
      _getFormattedAddress(sourceLatitude, sourceLongitude);
    });
  };

  const _getFormattedAddress = async (sourceLatitude, sourceLongitude) => {
    let formattedAddress = await FormattedLocation(
      sourceLatitude,
      sourceLongitude,
      true,
    );
    setCity(idx(formattedAddress, _ => _.city.long_name));
    setState(idx(formattedAddress, _ => _.state.long_name));
  };

  const _saveUserProfile = () => {
    if (
      Regex.validateCreateProfile(
        userAvatar,
        startDate,
        selectedGoal,
        selectedSupport,
        recoveryItems,
        userType,
      )
    ) {
      let date = month._d;
      let dateArray = date && date.toString().split(' ');
      dateArray[2] = startDate.toString();
      const newDate = dateArray.join(' ');
      let requestPayload = {
        avatar: userAvatar,
        birthday: birthday.toString(),
        gender: gender,
        sobriety: {
          startDate: Number(moment(newDate).format('x')),
        },
        location: {
          latitude: '30.320971',
          longitude: '78.040398',
          city: city,
          state: state,
        },
        goals: selectedGoal,
        goalSupports: selectedSupport,
        experienceLevel: userType == 'mentee' ? '' : experience,
        recoveringFromItems: recoveryItems,
      };
      console.log('requestPayload', requestPayload);
      AppActions.createUserProfile(requestPayload);
    } else {
      // Helpers.toast('All fields are required to create your profile.');
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: RFValue(16),
        paddingVertical: '20%',
      }}
      style={{
        backgroundColor: Constants.Colors.BACKGROUND,
      }}>
      {/* <PopHeader /> */}
      <Text
        style={{
          textAlign: 'center',
          fontSize: RFValue(19),
          color: Constants.Colors.TEXT_COLOR,
          fontFamily: Constants.Fonts.Medium,
          paddingVertical: RFValue(24),
        }}>
        Welcome! Let’s create your profile
      </Text>
      <AddAvatar setUserAvatar={_setUserAvatar} userAvatar={userAvatar} />
      <Birthday setBirthday={_setBirthday} birthday={birthday} />
      <Gender setGender={_setGender} gender={gender} />
      <AddLocation
        setCity={_setCity}
        setState={_setState}
        city={city}
        state={state}
        setCurrentLocation={_setCurrentLocation}
      />
      <AddSoberDate setSoberDate={_setSoberDate} startDate={startDate} />
      {userType == 'mentee' ? (
        <ChooseGoals setGoal={setGoal} />
      ) : (
        <ExperienceLevel
          setExperience={_setExperience}
          experience={experience}
        />
      )}
      {userType == 'mentee' && (
        <Support saveSelectedSupport={_saveSelectedSupport} />
      )}
      <RecoveringList saveRecoveryItems={_saveRecoveryItems} />
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
        {creatingProfile ? (
          <ActivityIndicator color={Constants.Colors.WHITE} />
        ) : (
          <Text style={{color: Constants.Colors.WHITE, fontSize: RFValue(16)}}>
            SAVE
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => ({
  AppActions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateProfile);

const styles = StyleSheet.create({});
