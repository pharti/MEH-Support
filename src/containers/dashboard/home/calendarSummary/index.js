/* eslint-disable module-resolver/use-alias */
import Constants from 'constants';
import CalendarStrip from 'modifiedModules/react-native-calendar-strip';
import moment from 'moment';
import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('window');
export default (Summary = props => {
  const {getSummaryDate} = props;
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );

  let customDatesStyles = [];
  let markedDates = [];
  let startDate = moment();
  for (let i = 0; i < 6; i++) {
    let _date = startDate.clone().add(i, 'days');
    customDatesStyles.push({
      startDate: _date, // Single date since no endDate provided
    });
    markedDates.push({
      date: _date,
      dots: [
        {
          key: i,
        },
      ],
    });
  }
  return (
    <CalendarStrip
      calendarAnimation={{type: 'sequence', duration: 30}}
      daySelectionAnimation={{
        type: 'background',
        duration: 300,
      }}
      style={{height: RFValue(82)}}
      maxDate={moment().add(6, 'days')}
      dateNameStyle={{
        color: Constants.Colors.TEXT_COLOR,
        fontSize: RFValue(11),
      }}
      iconContainer={{flex: 0.1}}
      customDatesStyles={customDatesStyles}
      highlightDateNumberStyle={{
        color: Constants.Colors.WHITE,
        fontSize: RFValue(12),
      }}
      highlightDateNameStyle={{
        color: Constants.Colors.PRIMARY,
        fontSize: RFValue(11),
      }}
      calendarHeaderStyle={{
        color: 'transparent',
      }}
      selectedDate={selectedDate}
      scrollable
      onDateSelected={date => {
        getSummaryDate(date);
      }}
    />
  );
});
