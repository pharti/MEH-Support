/* eslint-disable module-resolver/use-alias */
import {Picker} from '@react-native-picker/picker';
import Card from 'components/common/card';
import Constants from 'constants';
import React from 'react';
import {Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
export default (Gender = React.memo(function Gender(props) {
  const {setGender, gender} = props;
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
        Gender
      </Text>
      <View
        style={{
          paddingTop: RFValue(16),
          overflow: 'hidden',
        }}>
        <Picker
          selectedValue={gender}
          style={{
            height: 84,
            width: '100%',
            fontSize: RFValue(12),
            justifyContent: 'center',
          }}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
          itemStyle={{
            fontSize: RFValue(12),
            color: Constants.Colors.TEXT_COLOR,
          }}>
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Non-Binary" value="nonBinary" />
          <Picker.Item label="MTF" value="mtf" />
          <Picker.Item label="FTM" value="ftm" />
        </Picker>
      </View>
    </Card>
  );
}));
