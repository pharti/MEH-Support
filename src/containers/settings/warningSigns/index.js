/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import Calendar from 'components/common/calendar';
import Card from 'components/common/card';
import Header from 'components/common/header';
import Constants from 'constants';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Switch} from 'react-native-paper';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
import Mood from './mood';
import MissedLogs from './missedLogs';
import Location from './location';
import TriggerEvents from './triggerEvents';

const daysNames = moment.weekdaysShort();

const {width, height} = Dimensions.get('window');

export const WarningSigns = props => {
  const {componentId} = props;
  const dispatch = useDispatch();
  const [switchValue, setSwitchValue] = useState(true);
  const [toggleLocationTab, setLocationTab] = useState(false);
  const [toggleMoodTab, setMoodTab] = useState(false);
  const [selectedMood, setSelectedMood] = useState([]);

  const [selectedTriggerAction, setSelectedTriggerAction] = useState([]);
  const [justToRender, reRender] = useState(false);

  const [toggleMissedLogTab, setmissedLogTab] = useState(false);
  const [todaysDay, setSelectedDay] = useState(moment().format('ddd'));
  const [startDate, setStartDate] = useState('');

  const [toggleEventTab, setToggleEventTab] = useState(false);
  const [month, setCurrentMonth] = useState('');

  const [selectedSupport, setSelectedSupport] = useState([]);

  const moodArray = [
    {id: 1, name: '3 Days'},
    {id: 2, name: '4 Days'},
    {id: 3, name: '5 Days'},
    {id: 4, name: '6 Days'},
    {id: 5, name: '1 Week'},
    {id: 6, name: '10 Days'},
  ];
  const triggerActionArray = [{id: 1, name: 'Arrive'}, {id: 2, name: 'Depart'}];

  const locationsArray = [
    {id: 1, name: 'Bar one', distance: '10 ft'},
    {id: 2, name: 'Club Top', distance: '12 ft'},
    {id: 2, name: 'Liquor Store', distance: '5 ft'},
  ];

  const eventArray = [
    {id: 1, name: 'Car Accident', date: '4/17'},
    {id: 2, name: 'Break-Up', date: '7/12'},
  ];

  const supportTeamArray = [
    {
      id: 1,
      name: 'Accountability Partner',
      list: [{name: 'Person 1'}, {name: 'Person 2'}],
    },
    {id: 2, name: 'Mentor', list: [{name: 'Person 1'}, {name: 'Person 2'}]},
    {id: 3, name: 'Peer', list: [{name: 'Person 1'}, {name: 'Person 2'}]},
  ];

  const _toggleMood = () => {
    setMoodTab(!toggleMoodTab);
  };
  const _toggleLocation = () => {
    setLocationTab(!toggleLocationTab);
  };

  const _toggleMissedLog = () => {
    setmissedLogTab(!toggleMissedLogTab);
  };
  const _toggleEvent = () => {
    setToggleEventTab(!toggleEventTab);
  };

  const checkAvailability = moodId => {
    if (selectedMood && selectedMood.length > 0) {
      return selectedMood.some(item => item.id == moodId);
    }
  };

  const setSupportedTeam = supportId => {
    if (selectedSupport && selectedSupport.length > 0) {
      selectedSupport.map((item, index) => {
        if (item.id == supportId) {
          selectedSupport[index].isToggle = true;
        } else selectedSupport[index].isToggle = false;
      });
      setSelectedSupport(selectedSupport);
      reRender(!justToRender);
    }
  };

  const _setStartDate = (day, currentMonth) => {
    setCurrentMonth(currentMonth);
    setStartDate(day);
  };

  const setTriggerAction = triggerId => {
    if (selectedTriggerAction && selectedTriggerAction.length > 0) {
      return selectedTriggerAction.some(item => item.id == triggerId);
    }
  };

  useEffect(() => {
    setSelectedSupport(supportTeamArray);
  }, []);

  return (
    <>
      <View style={styles.headerContainer}>
        <Header
          isBack={true}
          title={'Warning Signs'}
          componentId={componentId}
        />
      </View>
      <ScrollView
        style={{
          flexGrow: 1,
          backgroundColor: Constants.Colors.BACKGROUND,
        }}
        contentContainerStyle={{
          paddingVertical: RFValue(16),
          alignItems: 'center',
        }}>
        <Card>
          <View style={styles.rowView}>
            <Text style={styles.text}>Enable Warning Signs</Text>
            <Switch
              color={Constants.Colors.PRIMARY}
              onValueChange={val => {
                setSwitchValue(val);
              }}
              value={switchValue}
            />
          </View>
        </Card>
        <Mood />
        <Location />
        <MissedLogs />
        <TriggerEvents />
      </ScrollView>
    </>
  );
};

export default WarningSigns;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Constants.Colors.TEXT_COLOR,
    fontSize: RFValue(14),
    fontFamily: Constants.Fonts.Regular,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: RFValue(16),
  },
});
