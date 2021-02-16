/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import Card from 'components/common/card';
import Constants from 'constants';
import _ from 'lodash';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
const RecoveringListArray = [
  {id: 0, itemName: 'Alcohol', isActive: false},
  {id: 1, itemName: 'Benzodiazepine', isActive: false},
  {id: 2, itemName: 'Cocaine', isActive: false},
  {id: 3, itemName: 'Fentanyl', isActive: false},
  {id: 4, itemName: 'Heroin', isActive: false},
  {id: 5, itemName: 'Marijuana', isActive: false},
  {id: 6, itemName: 'Methamphetamine', isActive: false},
  {id: 7, itemName: 'Opioid', isActive: false},
  {id: 8, itemName: 'Prescription Drugs', isActive: false},
  {id: 9, itemName: 'Stimulant', isActive: false},
];
export default (RecoveringList = props => {
  const {saveRecoveryItems} = props;
  const [justToRender, render] = useState(false);
  const [selectedRecoveryItems, setSelectedItems] = useState([]);
  const addRecoveryItem = (item, itemName) => {
    if (getSelectProperty(itemName)) {
      _.remove(selectedRecoveryItems, function(item) {
        return item.itemName == itemName;
      });
      setSelectedItems(selectedRecoveryItems);
    } else {
      item = {...item, isActive: true};
      selectedRecoveryItems.push(item);
      setSelectedItems(selectedRecoveryItems);
    }
    render(!justToRender);
    saveRecoveryItems(selectedRecoveryItems);
  };
  const getSelectProperty = itemName => {
    if (selectedRecoveryItems) {
      return selectedRecoveryItems.some(item => item.itemName === itemName);
    }
  };
  return (
    <Card
      customStyle={{
        padding: RFValue(16),
      }}>
      <Text
        style={{
          fontSize: RFValue(18),
          color: Constants.Colors.TEXT_COLOR,
          fontFamily: Constants.Fonts.Regular,
        }}>
        What are you recovering from?
      </Text>
      <Text style={{fontSize: RFValue(18), color: Constants.Colors.TEXT_COLOR}}>
        Select all that apply
      </Text>
      <View style={{paddingTop: RFValue(16)}}>
        <FlatList
          style={{paddingTop: RFValue(8)}}
          data={RecoveringListArray}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderBottomColor: Constants.Colors.BORDER,
                  borderBottomWidth: 1,
                  paddingVertical: RFValue(8),
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  addRecoveryItem(item, item.itemName);
                }}>
                <Text
                  style={{
                    flex: 0.8,
                    fontSize: RFValue(16),
                    color: Constants.Colors.TEXT_COLOR,
                    fontFamily: Constants.Fonts.Regular,
                  }}>
                  {item.itemName}
                </Text>
                <Image
                  source={
                    getSelectProperty(item.itemName)
                      ? Images.selectedEllipse
                      : Images.ellipse
                  }
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </Card>
  );
});
