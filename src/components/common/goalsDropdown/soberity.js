/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions';
import * as Images from 'assets/icons';
import Card from 'components/common/card';
import React, {useState, useEffect} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/FontAwesome';
import Constants from 'constants';
import {useSelector, useDispatch} from 'react-redux';
export default (Soberity = React.memo(function Soberity(props) {
  const {} = props;
  const dispatch = useDispatch();
  const [soberityEdit, setSoberityEdit] = useState(false);
  const [soberaity, setSoberaity] = useState(false);
  const deleteSoberityData = data => {};
  useEffect(() => {
    // This is also used for user Achievements.
    dispatch(AppActions.getSoberDates());
  }, []);
  const soberMilestone = useSelector(
    state => state.goalsReducer.soberMilestone,
  );
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setSoberaity(!soberaity);
        }}
        style={{
          height: RFValue(52),
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: soberaity ? '#BBD6D4' : '#308D85',
          borderRadius: RFValue(10),
          flexDirection: 'row',
          paddingHorizontal: RFValue(15),
          marginTop: RFValue(10),
        }}>
        <Text
          style={{
            fontSize: RFValue(16),
            color: 'white',
            paddingVertical: RFValue(20),
          }}>
          Soberity
        </Text>
        <Image
          source={soberaity ? Images.whiteDownArrow : Images.whiteRightArrow}
        />
      </TouchableOpacity>
      {soberaity && (
        <Card customStyle={{marginTop: RFValue(8)}}>
          <FlatList
            data={soberMilestone}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    padding: RFValue(16),
                    alignItems: 'center',
                    borderTopColor: Constants.Colors.BACKGROUND,
                    borderTopWidth: 1,
                  }}>
                  <View style={{flex: 0.85}}>
                    <SubHeader title={item.textValue} />
                  </View>
                  <View
                    style={{
                      flex: 0.15,
                      flexDirection: 'row',
                      justifyContent: soberityEdit
                        ? 'space-between'
                        : 'flex-end',
                    }}>
                    <Image
                      source={
                        item.isChecked ? Images.selectedEllipse : Images.ellipse
                      }
                    />
                    {soberityEdit && (
                      <TouchableOpacity
                        onPress={() => {
                          deleteSoberityData(item);
                        }}>
                        <Icon name="minus-circle" size={15} color="red" />
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id}
          />
        </Card>
      )}
    </>
  );
}));
