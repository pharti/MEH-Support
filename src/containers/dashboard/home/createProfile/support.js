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
export default (Support = props => {
  const {saveSelectedSupport} = props;

  const [justToRender, render] = useState(false);

  const [selectedSupport, setSelectedSupport] = useState([]);
  const [newMileStone, addNewMilestone] = useState('');

  const userDetails = useSelector(state => state.usersReducer.userDetails);
  const addSupport = (item, supportId) => {
    if (getSelectProperty(supportId)) {
      _.remove(selectedSupport, function(item) {
        return item._id == supportId;
      });
      setSelectedSupport(selectedSupport);
    } else {
      selectedSupport.push(item);
      setSelectedSupport(selectedSupport);
    }
    render(!justToRender);
    saveSelectedSupport(selectedSupport);
  };
  const getSelectProperty = supportId => {
    if (selectedSupport) {
      return selectedSupport.some(item => item._id === supportId);
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
        What do mostly need support with while achieving your goals?
      </Text>
      <View style={{paddingTop: RFValue(16)}}>
        <FlatList
          style={{paddingTop: RFValue(8)}}
          data={userDetails && userDetails.goalSupports}
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
                  addSupport(item, item._id);
                }}>
                <Text
                  style={{
                    flex: 0.8,
                    fontSize: RFValue(16),
                    color: Constants.Colors.TEXT_COLOR,
                    fontFamily: Constants.Fonts.Regular,
                  }}>
                  {item.title}
                </Text>
                <Image
                  source={
                    getSelectProperty(item._id)
                      ? Images.selectedEllipse
                      : Images.ellipse
                  }
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item._id}
        />
        <View
          style={{
            borderBottomColor: Constants.Colors.BORDER,
            borderBottomWidth: 1,
          }}>
          <TextInput
            placeholder="Add new goal by typing…"
            placeholderTextColor={Constants.Colors.PLACEHOLDER}
            style={{
              color: Constants.Colors.TEXT_COLOR,
              paddingVertical: RFValue(12),
            }}
            onChangeText={milestone => {
              addNewMilestone(milestone);
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            paddingTop: RFValue(16),
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Constants.Colors.BACKGROUND,
              borderRadius: RFValue(10),
              paddingVertical: RFValue(12),
              paddingHorizontal: RFValue(16),
              shadowColor: Constants.Colors.PRIMARY,
              shadowOffset: {width: 2, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 4,
            }}
            onPress={() => {
              if (newMileStone) {
                const item = {
                  title: newMileStone,
                  createdByRole: 'client',
                  isDisabled: false,
                };
                addSupport(item, item._id);
                userDetails.goalSupports.push(item);
                addNewMilestone('');
              }
            }}>
            <Text
              style={{
                color: Constants.Colors.TEXT_COLOR,
                fontSize: RFValue(16),
              }}>
              ADD
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
});
