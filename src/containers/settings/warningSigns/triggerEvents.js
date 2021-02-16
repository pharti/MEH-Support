/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import Calendar from 'components/common/calendar';
import Constants from 'constants';
import moment from 'moment';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
const {width, height} = Dimensions.get('window');
export const WarningSigns = props => {
  const {componentId} = props;
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('');
  const [toggleEventTab, setToggleEventTab] = useState(false);
  const [month, setCurrentMonth] = useState('');
  const eventArray = [
    {id: 1, name: 'Car Accident', date: '4/17'},
    {id: 2, name: 'Break-Up', date: '7/12'},
  ];
  const _toggleEvent = () => {
    setToggleEventTab(!toggleEventTab);
  };
  const _setStartDate = (day, currentMonth) => {
    setCurrentMonth(currentMonth);
    setStartDate(day);
  };

  return (
    <TouchableCard customStyle={{padding: RFValue(16)}} onPress={_toggleEvent}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.title}>Trigger Event</Text>
        <Image source={toggleEventTab ? Images.arrowUp : Images.arrowDown} />
      </View>
      {toggleEventTab && (
        <>
          <Calendar
            title={false}
            isSimpleCard={true}
            selectedDate={startDate}
            setSelectedDate={_setStartDate}
          />
          <View style={styles.locationList}>
            <TextInput
              placeholder="Name Event"
              style={{marginHorizontal: RFValue(16)}}
            />
            <TouchableOpacity>
              <Image source={Images.greenAddFilled} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={eventArray}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    marginVertical: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.location}>{item.name}</Text>
                  <Text style={styles.location}>{item.date}</Text>
                </View>
              );
            }}
            keyExtractor={item => item.id}
          />
        </>
      )}
    </TouchableCard>
  );
};

export default WarningSigns;

const styles = StyleSheet.create({
  title: {
    fontSize: RFValue(15),
    color: Constants.Colors.TEXT_COLOR,
    fontFamily: Constants.Fonts.Bold,
  },
  location: {
    fontSize: RFValue(15),
    color: Constants.Colors.TEXT_COLOR,
    fontFamily: Constants.Fonts.Light,
  },
  locationList: {
    backgroundColor: '#F0F0F0',
    height: 40,
    borderRadius: RFValue(24),
    marginBottom: RFValue(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: RFValue(4),
  },
});
