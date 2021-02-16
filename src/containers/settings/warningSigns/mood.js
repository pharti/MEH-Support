/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import Card from 'components/common/card';
import Constants from 'constants';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
const {width, height} = Dimensions.get('window');
export const Mood = props => {
  const {componentId} = props;
  const dispatch = useDispatch();
  const [toggleMoodTab, setMoodTab] = useState(false);
  const [selectedMood, setSelectedMood] = useState([]);
  const [justToRender, reRender] = useState(false);
  const moodArray = [{id: 1, name: '3 Days'}];
  const _toggleMood = () => {
    setMoodTab(!toggleMoodTab);
  };
  const checkAvailability = moodId => {
    if (selectedMood && selectedMood.length > 0) {
      return selectedMood.some(item => item.id == moodId);
    }
  };
  useEffect(() => {}, []);
  return (
    <>
      <TouchableCard
        customStyle={{
          padding: RFValue(16),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={_toggleMood}>
        <View>
          <Text style={styles.title}>Mood</Text>
          <Text style={styles.description}>Mood Low mood after set amount</Text>
        </View>
        <Image source={toggleMoodTab ? Images.arrowUp : Images.arrowDown} />
      </TouchableCard>
      {toggleMoodTab && (
        <Card customStyle={styles.cardStyle}>
          <FlatList
            data={moodArray}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={styles.options}
                  onPress={() => {
                    let array = [];
                    array.push(item);
                    setSelectedMood(array);
                    reRender(!justToRender);
                  }}>
                  <Text style={styles.days}>{item.name}</Text>
                  {checkAvailability(item.id) ? (
                    <Image source={Images.selectedEllipse} />
                  ) : (
                    <Image source={Images.ellipse} />
                  )}
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id}
          />
        </Card>
      )}
    </>
  );
};

export default Mood;
const styles = StyleSheet.create({
  title: {
    fontSize: RFValue(15),
    color: Constants.Colors.TEXT_COLOR,
    fontFamily: Constants.Fonts.Bold,
  },
  description: {fontSize: RFValue(9), color: Constants.Colors.TEXT_COLOR},
  cardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: RFValue(-12),
  },
  options: {
    flexDirection: 'row',
    borderBottomColor: Constants.Colors.BORDER,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    padding: RFValue(12),
  },
  days: {
    flex: 0.8,
    fontSize: RFValue(16),
    color: Constants.Colors.SUB_HEADING,
    fontFamily: Constants.Fonts.Regular,
  },
});
