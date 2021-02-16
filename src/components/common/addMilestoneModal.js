import DateTimePicker from '@react-native-community/datetimepicker';
import * as AppActions from 'actions';
import * as Images from 'assets/icons';
import SubHeader from 'components/common/subHeader';
import Constants from 'constants';
import _ from 'lodash';
import moment from 'moment';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
const frequencyArray = [
  {id: 1, name: 'Never'},
  {id: 2, name: 'Daily'},
  {id: 3, name: 'Weekly'},
  {id: 4, name: 'Bi-Weekly'},
  {id: 5, name: 'Monthly'},
  {id: 6, name: 'Annually'},
];
export default (AddMilestoneModal = React.memo(function AddMilestoneModal(
  props,
) {
  const {milestoneModalVisible, setAddMilestoneModal, activeGoalId} = props;
  const dispatch = useDispatch();
  const [milestoneName, setMilestoneName] = useState('');
  const [startDate, setStartDate] = useState(new Date(1598051730000));
  const [endDate, setEndDate] = useState(new Date(1598051730000));
  const [timeFrame, setTimeFrame] = useState('');

  const [startDatePicker, setStartDatePicker] = useState(false);
  const [endDatePicker, setEndDatePicker] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [currentReminder, setCurrentReminder] = useState('');
  const [justToRender, reRender] = useState(false);
  const [toggleFrequencyTab, setFrequencyTab] = useState(false);
  const [alertsArray, setAlertsArray] = useState([]);
  const [selectedFrequency, setSelectedFrequency] = useState([]);
  const creatingMilestone = useSelector(
    state => state.goalsReducer.creatingMilestone,
  );
  const showDatePicker = pickerType => {
    setDatePickerVisibility(true);
    if (pickerType == 'startDate') {
      setStartDatePicker(true);
      setEndDatePicker(false);
    } else {
      setStartDatePicker(false);
      setEndDatePicker(true);
    }
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    startDatePicker ? setStartDate(date) : setEndDate(date);
    hideDatePicker();
  };
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const timePickerHandler = time => {
    setTimeFrame(time);
    hideTimePicker();
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
  const _showCurrentReminder = index => {
    setCurrentReminder(index);
    reRender(!justToRender);
  };
  const onChange = (event, selectedDate) => {
    if (alertsArray && alertsArray[currentReminder]) {
      alertsArray[currentReminder].alertTime = selectedDate;
    }
    reRender(!justToRender);
  };
  const _toggleFrequency = () => {
    setFrequencyTab(!toggleFrequencyTab);
  };
  const _createMilestone = () => {
    const requestPayload = {
      goalId: activeGoalId,
      name: milestoneName,
      startDate: startDate,
      endDate: endDate,
      frequency: selectedFrequency && selectedFrequency.name,
      timeFrames: '20min',
      reminders: alertsArray,
    };
    if (milestoneName !== '') {
      dispatch(
        AppActions.createMilestone(requestPayload, () => {
          setAddMilestoneModal(false);
        }),
      );
    }
  };
  console.log('selectedFrequency', selectedFrequency);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={milestoneModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#0009'}}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            setAddMilestoneModal(false);
          }}
          style={{flex: 0.2}}
        />
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: RFValue(16),
            borderRadius: RFValue(10),
            paddingVertical: RFValue(32),
            paddingHorizontal: RFValue(16),
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                setAddMilestoneModal(false);
              }}
              style={{flex: 0.5, justifyContent: 'center'}}>
              <Text
                style={{
                  color: Constants.Colors.SUB_HEADING,
                  fontSize: RFValue(12),
                  fontFamily: Constants.Fonts.Regular,
                }}>
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                _createMilestone();
              }}
              style={styles.valueView}>
              {creatingMilestone ? (
                <ActivityIndicator />
              ) : (
                <Text
                  style={{
                    color: Constants.Colors.SUB_HEADING,
                    fontSize: RFValue(12),
                    fontFamily: Constants.Fonts.Regular,
                  }}>
                  Save
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={{paddingVertical: RFValue(24)}}>
            <View style={styles.milestoneView}>
              <SubHeader title={'Name'} />
              <View style={styles.valueView}>
                <TextInput
                  placeholder="Enter name here"
                  placeholderTextColor={Constants.Colors.PLACEHOLDER}
                  style={{
                    color: Constants.Colors.TEXT_COLOR,
                    fontSize: RFValue(14),
                  }}
                  onChangeText={name => {
                    setMilestoneName(name);
                  }}
                />
              </View>
            </View>
            <View style={styles.milestoneView}>
              <SubHeader title={'Start Date'} />
              <TouchableOpacity
                onPress={() => showDatePicker('startDate')}
                style={styles.valueView}>
                <Text style={styles.milestoneValue}>
                  {moment(startDate).format('MM/DD/YYYY')}
                </Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                datePickerContainerStyleIOS={{paddingHorizontal: 40}}
              />
            </View>
            <View style={styles.milestoneView}>
              <SubHeader title={'End Date'} />
              <TouchableOpacity
                onPress={() => showDatePicker('endDate')}
                style={styles.valueView}>
                <Text style={styles.milestoneValue}>
                  {moment(endDate).format('MM/DD/YYYY')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.milestoneView}>
              <SubHeader title={'Time Frame'} />
              <TouchableOpacity
                onPress={() => showTimePicker()}
                style={styles.valueView}>
                <Text style={styles.milestoneValue}>20 Mins</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={timePickerHandler}
                onCancel={hideTimePicker}
                datePickerContainerStyleIOS={{paddingHorizontal: 40}}
              />
            </View>
            <View style={styles.milestoneView}>
              <SubHeader title={'Frequency'} />
              <TouchableOpacity
                style={styles.valueView}
                onPress={() => _toggleFrequency()}>
                <Text style={styles.milestoneValue}>
                  {selectedFrequency.name}
                </Text>
              </TouchableOpacity>
            </View>
            {toggleFrequencyTab && (
              <FlatList
                data={frequencyArray}
                contentContainerStyle={{
                  borderWidth: 1,
                  borderColor: Constants.Colors.BACKGROUND,
                  borderRadius: 8,
                }}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: RFValue(12),
                      }}
                      onPress={() => {
                        setSelectedFrequency(item);
                        _toggleFrequency();
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
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={item => item.id}
              />
            )}
            <View
              style={[
                styles.milestoneView,
                {borderTopWidth: toggleFrequencyTab ? 0 : 1},
              ]}>
              <SubHeader title={'Reminders'} />
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
                          Reminder
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
                    Add Reminder
                  </Text>
                </TouchableOpacity>
              }
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setAddMilestoneModal(false);
          }}
          style={{flex: 0.2}}
        />
      </ScrollView>
    </Modal>
  );
}));

const styles = StyleSheet.create({
  milestoneView: {
    flexDirection: 'row',
    paddingVertical: RFValue(12),
    borderTopColor: Constants.Colors.BACKGROUND,
    borderTopWidth: 1,
  },
  milestoneName: {
    color: Constants.Colors.SUB_HEADING,
    fontSize: RFValue(14),
  },
  milestoneValue: {
    color: Constants.Colors.SUB_HEADING,
    fontSize: RFValue(14),
    opacity: 0.5,
  },
  nameView: {flex: 0.5, justifyContent: 'center'},
  valueView: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
