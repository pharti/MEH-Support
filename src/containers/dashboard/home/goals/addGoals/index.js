/* eslint-disable module-resolver/use-alias */
import Goals from 'components/common/goalsDropdown/goals';
import Soberity from 'components/common/goalsDropdown/soberity';
import PopHeader from 'components/common/popHeader';
import Constants from 'constants';
import React from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
export const AddGoals = props => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.usersReducer.userDetails);
  return (
    <FlatList
      ListHeaderComponent={
        <View style={{paddingTop: RFValue(16)}}>
          <PopHeader componentId={props.componentId} />
          <Text
            style={{
              paddingTop: RFValue(24),
              fontSize: RFValue(16),
              color: Constants.Colors.TEXT_COLOR,
              fontFamily: Constants.Fonts.Regular,
            }}>
            MILESTONES
          </Text>
        </View>
      }
      style={{flex: 1, backgroundColor: Constants.Colors.BACKGROUND}}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: RFValue(16),
      }}
      data={userDetails && userDetails.goals}
      renderItem={({item, index}) => {
        return item.name == 'Sobriety' ? (
          <Soberity />
        ) : (
          <Goals goalDetails={item} />
        );
      }}
      keyExtractor={item => item._id}
    />
  );
};

export default AddGoals;
const styles = StyleSheet.create({});
