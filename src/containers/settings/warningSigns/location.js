/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import Card from 'components/common/card';
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
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
const daysNames = moment.weekdaysShort();

const {width, height} = Dimensions.get('window');

export const Location = props => {
  const {componentId} = props;
  const dispatch = useDispatch();
  const [toggleLocationTab, setLocationTab] = useState(false);
  const [selectedTriggerAction, setSelectedTriggerAction] = useState([]);
  const [justToRender, reRender] = useState(false);
  const [todaysDay, setSelectedDay] = useState(moment().format('ddd'));
  const triggerActionArray = [{id: 1, name: 'Arrive'}, {id: 2, name: 'Depart'}];
  const locationsArray = [
    {id: 1, name: 'Bar one', distance: '10 ft'},
    {id: 2, name: 'Club Top', distance: '12 ft'},
    {id: 2, name: 'Liquor Store', distance: '5 ft'},
  ];

  const _toggleLocation = () => {
    setLocationTab(!toggleLocationTab);
  };

  const setTriggerAction = triggerId => {
    if (selectedTriggerAction && selectedTriggerAction.length > 0) {
      return selectedTriggerAction.some(item => item.id == triggerId);
    }
  };
  return (
    <>
      <TouchableCard
        customStyle={styles.cardContainer}
        onPress={_toggleLocation}>
        <Text style={styles.title}>Location</Text>
        <Image source={toggleLocationTab ? Images.arrowUp : Images.arrowDown} />
      </TouchableCard>
      {toggleLocationTab && (
        <Card
          customStyle={{
            marginTop: RFValue(-12),
            padding: RFValue(16),
          }}>
          <View style={styles.browseLocation}>
            <TextInput placeholder="Browse Location" style={{}} />
          </View>
          {/* <View
            style={{
              height: 240,
              width: '90%',
              backgroundColor: Constants.Colors.GREY,
            }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{flex: 1}}
              initialRegion={{
                latitude: 37.78825,
                longitude: 76.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
            <TouchableOpacity style={styles.touchOpacity}>
              <View style={styles.view3} />
              <View style={styles.view4} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchOpacity2}>
              <Text style={styles.text4}>+</Text>
              <Text style={styles.text5}>Add Pickles Pub</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.subHeading}>
            <Text style={styles.title}>New Location</Text>
            <Text style={styles.subTitle}>Pickles Pub</Text>
          </View>
          <View style={styles.subHeading}>
            <Text style={styles.title}>Trigger Action when</Text>
            <FlatList
              data={triggerActionArray}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.triggerAction}
                    onPress={() => {
                      let array = [];
                      array.push(item);
                      setSelectedTriggerAction(array);
                      reRender(!justToRender);
                    }}>
                    <Text style={styles.subTitle}>{item.name}</Text>
                    {setTriggerAction(item.id) ? (
                      <Image source={Images.selectedEllipse} />
                    ) : (
                      <Image source={Images.ellipse} />
                    )}
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={styles.subHeading}>
            <Text style={styles.title}>Trigger Day</Text>
            <View style={styles.triggerDay}>
              {daysNames.map((d, i) => {
                return (
                  <Text
                    style={{
                      color:
                        todaysDay == d
                          ? Constants.Colors.TEXT_COLOR
                          : Constants.Colors.BUTTON_COLOR_DARK,
                      fontSize: RFValue(14),
                    }}>
                    {d.toLocaleUpperCase()}
                  </Text>
                );
              })}
            </View>
          </View>
          <View style={styles.subHeading}>
            <Text style={styles.title}>Trigger Distance</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: RFValue(24),
              }}>
              <TouchableOpacity>
                <Image source={Images.greenRemoveFilled} />
              </TouchableOpacity>
              <Text style={styles.distance}>12 ft</Text>
              <TouchableOpacity>
                <Image source={Images.greenAddFilled} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.subHeading}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.title}>Locations</Text>
              <Text style={styles.textEdit}>Edit</Text>
            </View>
            <FlatList
              data={locationsArray}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      marginVertical: 8,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.subTitle}>{item.name}</Text>
                    <Text style={styles.subTitle}>{item.distance}</Text>
                  </View>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        </Card>
      )}
    </>
  );
};

export default Location;

const styles = StyleSheet.create({
  cardContainer: {
    padding: RFValue(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: RFValue(15),
    color: Constants.Colors.TEXT_COLOR,
    fontFamily: Constants.Fonts.Bold,
  },
  browseLocation: {
    backgroundColor: Constants.Colors.BACKGROUND,
    height: 40,
    borderRadius: 20,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: RFValue(16),
  },
  touchOpacity: {
    position: 'absolute',
    bottom: RFValue(16),
    right: RFValue(16),
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.Colors.BUTTON_COLOR_DARK,
    padding: 8,
    elevation: 6,
  },
  view3: {
    width: RFValue(22),
    height: RFValue(2),
    backgroundColor: Constants.Colors.WHITE,
  },
  view4: {
    position: 'absolute',
    width: RFValue(2),
    height: RFValue(22),
    backgroundColor: Constants.Colors.WHITE,
  },
  touchOpacity2: {
    paddingHorizontal: 12,
    position: 'absolute',
    left: RFValue(16),
    bottom: RFValue(48),
    flexDirection: 'row',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constants.Colors.WHITE,
    padding: 8,
    elevation: 6,
    borderColor: Constants.Colors.BUTTON_COLOR_DARK,
    borderWidth: 1,
  },
  text4: {fontSize: RFValue(12), color: Constants.Colors.BUTTON_COLOR_DARK},
  text5: {
    marginLeft: 4,
    fontSize: RFValue(9),
    color: Constants.Colors.BUTTON_COLOR_DARK,
  },
  subHeading: {paddingTop: RFValue(32)},
  subTitle: {
    paddingTop: RFValue(8),
    fontSize: RFValue(15),
    color: Constants.Colors.TEXT_COLOR,
    fontFamily: Constants.Fonts.Regular,
  },
  triggerAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: RFValue(6),
  },
  triggerDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: RFValue(16),
    paddingHorizontal: RFValue(8),
  },
  textEdit: {
    fontSize: RFValue(15),
    color: Constants.Colors.TEXT_COLOR,
    fontFamily: Constants.Fonts.Light,
  },
  distance: {
    paddingHorizontal: RFValue(32),
    color: Constants.Colors.TEXT_COLOR,
    fontSize: RFValue(18),
  },
});
