import React, {useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {RFValue} from 'react-native-responsive-fontsize';
import Constants from 'constants';
import Slider from '@react-native-community/slider';
import Card from 'components/common/card';
import {useDispatch} from 'react-redux';
import * as AppActions from 'actions';
const {width, height} = Dimensions.get('window');
const moods = [
  {id: 0, label: 'Great', value: 'great'},
  {id: 1, label: 'Excited', value: 'excited'},
  {id: 2, label: 'Happy', value: 'happy'},
  {id: 3, label: 'Good', value: 'good'},
  {id: 4, label: 'Calm', value: 'calm'},
  {id: 5, label: 'Okay', value: 'okay'},
  {id: 6, label: 'Sad', value: 'sad'},
  {id: 7, label: 'Irritated', value: 'irritated'},
  {id: 8, label: 'Angry', value: 'angry'},
];
export default (MoodSetter = props => {
  const {} = props;
  const dispatch = useDispatch();
  const [moodType, setMoodType] = useState(5);
  const _setMood = () => {
    const iterator = moods.values();
    let moodValue = '';
    for (const item of iterator) {
      if (item.id == moodType) {
        moodValue = item.value;
      }
    }
    dispatch(AppActions.setMood(moodValue));
  };
  return (
    <Card customStyle={{padding: RFValue(16)}}>
      <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <FlatList
            horizontal
            contentContainerStyle={{
              justifyContent: 'space-between',
              width: '100%',
              marginTop: RFValue(8),
              alignItems: 'center',
            }}
            data={moods}
            renderItem={({item, index}) => {
              return (
                <Text
                  style={{
                    fontSize: index == moodType ? RFValue(12) : RFValue(8),
                    color:
                      index == moodType
                        ? Constants.Colors.TEXT_COLOR
                        : '#E2E2E2',
                  }}>
                  {item.label}
                </Text>
              );
            }}
          />
        </View>
        <Slider
          style={{width: '90%', height: height / 8}}
          minimumValue={0}
          maximumValue={8}
          value={moodType}
          minimumTrackTintColor={Constants.Colors.PRIMARY}
          maximumTrackTintColor={Constants.Colors.BACKGROUND}
          thumbTintColor={Constants.Colors.PRIMARY}
          onValueChange={value => {
            setMoodType(Math.trunc(value));
          }}
        />
      </View>
      <View style={{flex: 0.2}}>
        <TouchableOpacity
          style={{
            height: RFValue(52),
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Constants.Colors.PRIMARY,
            borderRadius: RFValue(10),
          }}
          onPress={() => _setMood()}>
          <Text
            style={{
              fontSize: RFValue(16),
              color: Constants.Colors.WHITE,
              fontWeight: 'bold',
            }}>
            Set Mood
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
});
const styles = StyleSheet.create({
  mood: {fontSize: RFValue(6)},
});
