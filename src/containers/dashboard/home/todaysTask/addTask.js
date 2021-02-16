/* eslint-disable module-resolver/use-alias */
import DateTimePicker from '@react-native-community/datetimepicker';
import * as AppActions from 'actions';
import * as Images from 'assets/icons';
import Calendar from 'components/common/calendar';
import Card from 'components/common/card';
import PopHeader from 'components/common/popHeader';
import TouchableCard from 'components/common/touchableCard';
import Constants from 'constants';
import _ from 'lodash';
import moment from 'moment';
import React, {useRef, useState} from 'react';
import Helpers from 'helpers/OtherHelper';
import {
  ActivityIndicator,
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
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
const {width, height} = Dimensions.get('window');
export const AddTask = props => {
  const scrollViewRef = useRef();
  const daysNames = moment.weekdaysShort();
  const frequencyArray = [
    {id: 1, name: 'Never'},
    {id: 2, name: 'Daily'},
    {id: 3, name: 'Weekly'},
    {id: 4, name: 'Bi-Weekly'},
    {id: 5, name: 'Monthly'},
    {id: 6, name: 'Annually'},
  ];
  const [justToRender, reRender] = useState(false);
  const [toggleFrequencyTab, setFrequencyTab] = useState(false);
  const [toggleRemindersTab, setRemindersTab] = useState(false);
  const [alertsArray, setAlertsArray] = useState([]);
  const [currentReminder, setCurrentReminder] = useState('');

  const [taskName, setTaskName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [month, setCurrentMonth] = useState('');

  const [selectedFrequency, setSelectedFrequency] = useState([]);
  const [todaysDay, setSelectedDay] = useState(moment().format('ddd'));
  const userId = useSelector(state => state.usersReducer.userDetails._id);
  const creatingTask = useSelector(state => state.usersReducer.creatingTask);
  const _toggleFrequency = () => {
    setFrequencyTab(!toggleFrequencyTab);
  };
  const _toggleReminders = () => {
    setRemindersTab(!toggleRemindersTab);
  };
  const checkAvailability = frequencyId => {
    if (selectedFrequency && selectedFrequency.length > 0) {
      return selectedFrequency.some(item => item.id == frequencyId);
    }
  };
  const _addAlert = () => {
    const alert = {
      alertTime: new Date(),
    };
    alertsArray.push(alert);
    setAlertsArray(alertsArray);
    reRender(!justToRender);
  };
  const _removeAlert = (item, index) => {
    _.remove(alertsArray, function(item) {
      return alertsArray.indexOf(item) === index;
    });
    reRender(!justToRender);
  };

  const onChange = (event, selectedDate) => {
    if (alertsArray && alertsArray[currentReminder]) {
      alertsArray[currentReminder].alertTime = selectedDate;
    }
    reRender(!justToRender);
  };
  const _showCurrentReminder = index => {
    setCurrentReminder(index);
    reRender(!justToRender);
  };
  const _createTask = () => {
    const {AppActions, componentId} = props;
    let date = month._d;
    let dateArray = date && date.toString().split(' ');
    if (
      taskName != '' &&
      startDate != '' &&
      selectedFrequency.length > 0 &&
      alertsArray.length > 0
    ) {
      dateArray[2] = startDate.toString();
      const newDate = dateArray.join(' ');
      const timeToMilliSec = alertsArray.map(item => {
        return {
          alertTime: Number(moment(item.alertTime).format('x')),
        };
      });
      const requestPayload = {
        taskName: taskName,
        startDate: Number(moment(newDate).format('x')),
        frequency:
          selectedFrequency &&
          selectedFrequency[0] &&
          selectedFrequency[0].name,
        createdBy: userId,
        reminder: timeToMilliSec,
      };
      AppActions.createTask(requestPayload, () => {
        AppActions.pop(componentId);
      });
    } else {
      Helpers.toast('All fields are required to create a task.');
    }
  };
  const _setStartDate = (day, currentMonth) => {
    setCurrentMonth(currentMonth);
    setStartDate(day);
  };
  const _setEndDate = (day, currentMonth) => {
    setEndDate(day);
  };
  return (
    <ScrollView
      style={{backgroundColor: Constants.Colors.BACKGROUND}}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: RFValue(16),
        paddingBottom: '34%',
      }}
      ref={scrollViewRef}
      onContentSizeChange={(width, height) => {
        // scrollViewRef.current.scrollToEnd({animated: true});
      }}>
      <PopHeader componentId={props.componentId} />
      <View style={{height: '85%'}}>
        <Text
          style={{
            paddingHorizontal: RFValue(16),
            paddingBottom: RFValue(8),
            paddingTop: RFValue(8),
            fontSize: RFValue(20),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
            alignSelf: 'center',
          }}>
          Add Task
        </Text>
        <Card
          customStyle={{
            padding: RFValue(16),
            marginTop: RFValue(16),
          }}>
          <Text
            style={{
              fontSize: RFValue(16),
              color: Constants.Colors.TEXT_COLOR,
              fontFamily: Constants.Fonts.Regular,
            }}>
            Task Name
          </Text>
          <TextInput
            placeholder="Enter your task name"
            placeholderTextColor={Constants.Colors.PLACEHOLDER}
            style={{
              color: Constants.Colors.TEXT_COLOR,
              backgroundColor: Constants.Colors.BACKGROUND,
              paddingHorizontal: RFValue(16),
              borderRadius: RFValue(12),
              fontSize: RFValue(16),
              paddingVertical: RFValue(16),
              marginTop: RFValue(8),
            }}
            selectionColor={Constants.Colors.PRIMARY}
            onChangeText={taskName => {
              setTaskName(taskName);
            }}
          />
        </Card>
        <Text
          style={{
            fontSize: RFValue(16),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
            paddingBottom: RFValue(16),
          }}>
          Start Date
        </Text>
        <Calendar
          title={false}
          selectedDate={startDate}
          setSelectedDate={_setStartDate}
        />
        <Text
          style={{
            fontSize: RFValue(16),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
            paddingBottom: RFValue(16),
          }}>
          End Date
        </Text>
        <Calendar
          title={false}
          selectedDate={endDate}
          setSelectedDate={_setEndDate}
        />
        <TouchableCard
          customStyle={{
            padding: RFValue(16),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={_toggleFrequency}>
          <Text
            style={{
              fontSize: RFValue(16),
              color: Constants.Colors.TEXT_COLOR,
              fontFamily: Constants.Fonts.Regular,
            }}>
            Frequency
          </Text>
          <Image
            source={toggleFrequencyTab ? Images.arrowUp : Images.arrowDown}
          />
        </TouchableCard>
        {toggleFrequencyTab && (
          <Card
            customStyle={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: RFValue(-12),
            }}>
            <FlatList
              data={frequencyArray}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      borderBottomColor: '#DEDEDE',
                      borderBottomWidth: 1,
                      justifyContent: 'space-between',
                      padding: RFValue(12),
                    }}
                    onPress={() => {
                      let array = [];
                      array.push(item);
                      setSelectedFrequency(array);
                      reRender(!justToRender);
                    }}>
                    <Text
                      style={{
                        flex: 0.8,
                        fontSize: RFValue(16),
                        color: Constants.Colors.SUB_HEADING,
                        fontFamily: Constants.Fonts.Regular,
                      }}>
                      {item.name}
                    </Text>
                    {checkAvailability(item.id) ? (
                      <Image source={Images.selectedEllipse} />
                    ) : (
                      <Image source={Images.ellipse} />
                    )}
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => Math.random()}
            />
          </Card>
        )}
        <TouchableCard
          customStyle={{
            padding: RFValue(16),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={_toggleReminders}>
          <Text
            style={{
              fontSize: RFValue(16),
              color: Constants.Colors.TEXT_COLOR,
              fontFamily: Constants.Fonts.Regular,
            }}>
            Reminders
          </Text>
          <Image
            source={toggleRemindersTab ? Images.arrowUp : Images.arrowDown}
          />
        </TouchableCard>
        {toggleRemindersTab && (
          <Card
            customStyle={{
              marginTop: RFValue(-12),
              padding: RFValue(16),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {daysNames.map((d, i) => {
                return (
                  <LinearGradient
                    colors={[
                      todaysDay == d
                        ? Constants.Colors.BUTTON_COLOR_LIGHT
                        : Constants.Colors.WHITE,
                      todaysDay == d
                        ? Constants.Colors.BUTTON_COLOR_DARK
                        : Constants.Colors.WHITE,
                    ]}
                    style={{
                      width: RFValue(32),
                      height: RFValue(32),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: RFValue(24),
                    }}>
                    <Text
                      style={{
                        color:
                          todaysDay == d
                            ? Constants.Colors.WHITE
                            : Constants.Colors.TEXT_COLOR,
                        fontSize: RFValue(11),
                      }}>
                      {d.toLocaleUpperCase()}
                    </Text>
                  </LinearGradient>
                );
              })}
            </View>
            <FlatList
              data={alertsArray}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      borderBottomColor: '#DEDEDE',
                      borderBottomWidth: 1,
                      justifyContent: 'space-between',
                      padding: RFValue(12),
                    }}
                    onPress={() => {}}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        style={{flex: 0.6}}
                        onPress={() => {
                          _showCurrentReminder(index);
                        }}>
                        <Text
                          style={{
                            fontSize: RFValue(16),
                            color: Constants.Colors.SUB_HEADING,
                            fontFamily: Constants.Fonts.Regular,
                          }}>
                          Alert
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: RFValue(16),
                            color: Constants.Colors.SUB_HEADING,
                            fontFamily: Constants.Fonts.Regular,
                            paddingRight: RFValue(12),
                          }}>
                          {moment(item.alertTime).format('LT')}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            _removeAlert(item, index);
                          }}>
                          <Image source={Images.removeCircle} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {currentReminder === index && (
                      <View
                        style={{
                          paddingVertical: RFValue(8),
                          justifyContent: 'flex-end',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{
                            flex: 0.6,
                            justifyContent: 'center',
                          }}>
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={item.alertTime}
                            mode={'time'}
                            is24Hour={true}
                            display="clock"
                            onChange={onChange}
                            style={{
                              height: RFValue(42),
                            }}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                );
              }}
              ListFooterComponent={
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: RFValue(16),
                  }}
                  onPress={() => {
                    _addAlert();
                  }}>
                  <Image source={Images.circleAdd} />
                  <Text
                    style={{
                      fontSize: RFValue(16),
                      color: Constants.Colors.SUB_HEADING,
                      fontFamily: Constants.Fonts.Regular,
                      paddingLeft: RFValue(16),
                    }}>
                    Alert
                  </Text>
                </TouchableOpacity>
              }
              keyExtractor={item => item.id}
            />
          </Card>
        )}
        <TouchableOpacity
          style={{
            margin: RFValue(16),
            height: height / 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Constants.Colors.PRIMARY,
            borderRadius: RFValue(10),
          }}
          onPress={() => _createTask()}>
          {creatingTask ? (
            <ActivityIndicator color={Constants.Colors.WHITE} />
          ) : (
            <Text
              style={{color: Constants.Colors.WHITE, fontSize: RFValue(16)}}>
              Create Task
            </Text>
          )}
        </TouchableOpacity>
      </View>
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
)(AddTask);

const styles = StyleSheet.create({});
