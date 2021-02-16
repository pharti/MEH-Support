/* eslint-disable module-resolver/use-alias */
import {Picker} from '@react-native-picker/picker';
import Card from 'components/common/card';
import Constants from 'constants';
import React from 'react';
import {Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
export default (ExperienceLevel = React.memo(function Gender(props) {
  const {setExperience, experience} = props;
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
        Experience Level
      </Text>
      <View
        style={{
          paddingTop: RFValue(16),
          overflow: 'hidden',
        }}>
        <Picker
          selectedValue={experience}
          style={{
            height: 84,
            width: '100%',
            fontSize: RFValue(12),
            justifyContent: 'center',
          }}
          onValueChange={(itemValue, itemIndex) => setExperience(itemValue)}
          itemStyle={{
            fontSize: RFValue(12),
            color: Constants.Colors.TEXT_COLOR,
          }}>
          <Picker.Item label="Not Applicable" value="notApplicable" />
          <Picker.Item
            label="Fundamental Awareness (basic knowledge)"
            value="basicKnowledge"
          />
          <Picker.Item label="Novice (limited experience)" value="novice" />
          <Picker.Item
            label="Intermediate (practical application)"
            value="intermediate"
          />
          <Picker.Item label="Advanced (applied theory)" value="advanced" />
          <Picker.Item label="Expert (recognized authority)" value="expert" />
        </Picker>
      </View>
    </Card>
  );
}));
