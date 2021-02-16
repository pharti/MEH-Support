/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import Card from 'components/common/card';
import Constants from 'constants';
import moment from 'moment';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
export default (Calendar = React.memo(function Calendar(props) {
  const { title, setSelectedDate, selectedDate } = props;
  const daysNames = moment.weekdaysShort();
  const [firstDay, setFirstDay] = useState(
    moment(moment())
      .startOf('month')
      .format('d'),
  );
  const [endDay, setEndDay] = useState(
    moment(moment())
      .endOf('month')
      .format('d'),
  );
  const [daysInAMonth, setDaysInAMonth] = useState(moment().daysInMonth());
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [momentsDates, setMomentsDates] = useState();
  let blanks = [];
  let endBlanks = [];
  for (let i = 0; i < firstDay; i++) {
    blanks.push('');
  }
  for (let i = 6; i > endDay; i--) {
    endBlanks.push('');
  }
  let daysInMonth = [];
  for (let d = 1; d <= daysInAMonth; d++) {
    daysInMonth.push(d);
  }

  var totalSlots = [...blanks, ...daysInMonth, ...endBlanks];
  let rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row); // if index not equal 7 that means not go to next week
    } else {
      rows.push(cells); // when reach next week we contain all td in last week to rows
      cells = []; // empty container
      cells.push(row); // in current loop we still push current row to new container
    }
    if (i === totalSlots.length - 1) {
      // when end loop we add remain date
      rows.push(cells);
    }
  });

  const prevMonth = () => {
    setMomentsDates([]);
    setCurrentMonth(moment(currentMonth).subtract(1, 'months'));
    setFirstDay(
      moment(moment(currentMonth).subtract(1, 'months'))
        .startOf('month')
        .format('d'),
    );
    setEndDay(
      moment(moment(currentMonth).subtract(1, 'months'))
        .endOf('month')
        .format('d'),
    );
    setDaysInAMonth(
      moment(moment(currentMonth).subtract(1, 'months')).daysInMonth(),
    );
    setSelectedDate(0);
  };

  const nextMonth = () => {
    setMomentsDates([]);
    setCurrentMonth(moment(currentMonth).add(1, 'months'));
    setFirstDay(
      moment(moment(currentMonth).add(1, 'months'))
        .startOf('month')
        .format('d'),
    );
    setEndDay(
      moment(moment(currentMonth).add(1, 'months'))
        .endOf('month')
        .format('d'),
    );
    setDaysInAMonth(
      moment(moment(currentMonth).add(1, 'months')).daysInMonth(),
    );
    setSelectedDate(0);
  };

  const prevYear = () => {
    setMomentsDates([]);
    setCurrentMonth(moment(currentMonth).subtract(1, 'years'));
    setFirstDay(
      moment(moment(currentMonth).subtract(1, 'years'))
        .startOf('month')
        .format('d'),
    );
    setEndDay(
      moment(moment(currentMonth).subtract(1, 'years'))
        .endOf('month')
        .format('d'),
    );
    setDaysInAMonth(
      moment(moment(currentMonth).subtract(1, 'years')).daysInMonth(),
    );
    setSelectedDate(0);
  };

  const nextYear = () => {
    setMomentsDates([]);
    setCurrentMonth(moment(currentMonth).add(1, 'years'));
    setFirstDay(
      moment(moment(currentMonth).add(1, 'years'))
        .startOf('month')
        .format('d'),
    );
    setEndDay(
      moment(moment(currentMonth).add(1, 'years'))
        .endOf('month')
        .format('d'),
    );
    setDaysInAMonth(moment(moment(currentMonth).add(1, 'years')).daysInMonth());
    setSelectedDate(0);
  };
  return (
    <Card isSimpleCard={props.isSimpleCard}
      customStyle={{
        padding: RFValue(16),
      }}>
      {title && (
        <Text
          style={{
            fontSize: RFValue(21),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Medium,
          }}>
          Add sober date
        </Text>
      )}
      <View style={{ flexDirection: 'row', paddingTop: RFValue(16) }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flex: 0.8,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: Constants.Colors.TEXT_COLOR,
                  fontSize: RFValue(16),
                }}>
                {currentMonth.format('MMMM yyyy')}
              </Text>
            </View>
            <View
              style={{
                flex: 0.2,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity onPress={() => prevMonth()} style={{}}>
                <Image source={Images.greenLeftArrow} style={{}} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => nextMonth()} style={{}}>
                <Image source={Images.greenRightArrow} style={{}} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: RFValue(16),
            }}>
            {daysNames.map((d, i) => (
              <Text
                style={{
                  color: Constants.Colors.TEXT_COLOR,
                  fontSize: RFValue(11),
                }}>
                {d.toLocaleUpperCase()}
              </Text>
            ))}
          </View>
          <View>
            {rows.map((d, i) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: RFValue(8),
                  }}>
                  {d.map(day => {
                    return (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: RFValue(20),
                          width: RFValue(24),
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedDate(day, currentMonth);
                          }}
                          style={{
                            width: RFValue(24),
                            height: RFValue(24),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: RFValue(24),
                            backgroundColor:
                              selectedDate && selectedDate == day
                                ? Constants.Colors.PRIMARY
                                : Constants.Colors.WHITE,
                          }}>
                          <Text
                            style={{
                              fontSize: RFValue(12),
                              color:
                                selectedDate == day
                                  ? Constants.Colors.WHITE
                                  : Constants.Colors.TEXT_COLOR,
                            }}>
                            {day}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </Card>
  );
}));
