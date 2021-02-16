/* eslint-disable module-resolver/use-alias */
import DateTimePicker from '@react-native-community/datetimepicker';
import Card from 'components/common/card';
import Constants from 'constants';
import moment from 'moment';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
export default (Birthday = props => {
  const {birthday, setBirthday} = props;
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    setBirthday(selectedDate);
  };
  const showDatepicker = () => {
    setShow(true);
  };
  return (
    <Card
      customStyle={{
        padding: RFValue(16),
      }}>
      <Text
        style={{
          fontSize: RFValue(21),
          color: Constants.Colors.TEXT_COLOR,
          fontFamily: Constants.Fonts.Regular,
        }}>
        Birthday
      </Text>
      <View style={{paddingTop: RFValue(16)}}>
        <TouchableOpacity onPress={() => showDatepicker()}>
          <Text
            style={{
              color: Constants.Colors.TEXT_COLOR,
              fontSize: RFValue(16),
            }}>
            {moment(birthday).format('DD MMMM, yyyy')}
          </Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={birthday || moment()}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={onChange}
            textColor={Constants.Colors.TEXT_COLOR}
            style={{fontSize: RFValue(8)}}
          />
        )}
      </View>
    </Card>
  );
});
