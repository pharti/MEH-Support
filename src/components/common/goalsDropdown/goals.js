/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions';
import * as Images from 'assets/icons';
import AddMilestoneModal from 'components/common/addMilestoneModal';
import Card from 'components/common/card';
import SubHeader from 'components/common/subHeader';
import Constants from 'constants';
import moment from 'moment';
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
const {width, height} = Dimensions.get('window');
export default (Goals = React.memo(function Goals(props) {
  const {goalDetails} = props;
  const dispatch = useDispatch();
  const [employmentEdit, setEmploymentEdit] = useState(false);
  const [employment, setEmployment] = useState(false);
  const [milestoneModalVisible, setAddMilestoneModal] = useState(false);
  const [activeGoalId, setActiveGoalId] = useState(false);
  const _deleteMilestone = item => {
    dispatch(AppActions.deleteMilestone(item._id, activeGoalId));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setEmployment(!employment);
          goalDetails && setActiveGoalId(goalDetails._id);
        }}
        style={{
          height: RFValue(52),
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: employment ? '#BBD6D4' : '#308D85',
          borderRadius: RFValue(10),
          flexDirection: 'row',
          paddingHorizontal: RFValue(15),
          marginTop: RFValue(10),
        }}>
        <Text
          style={{
            fontSize: RFValue(16),
            color: 'white',
          }}>
          {goalDetails && goalDetails.name}
        </Text>
        <Image
          source={employment ? Images.whiteDownArrow : Images.whiteRightArrow}
        />
      </TouchableOpacity>
      {employment && (
        <Card customStyle={{marginTop: RFValue(8)}}>
          <View
            style={{
              height: RFValue(50),
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: RFValue(20),
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{flex: 0.9}}
              onPress={() => {
                setEmploymentEdit(!employmentEdit);
              }}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  color: employmentEdit
                    ? '#308D85'
                    : Constants.Colors.SUB_HEADING,
                  fontWeight: 'bold',
                }}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flex: 0.1, alignItems: 'flex-end'}}
              onPress={() => {
                setAddMilestoneModal(true);
                setActiveGoalId(goalDetails._id);
              }}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  color: employmentEdit
                    ? '#308D85'
                    : Constants.Colors.SUB_HEADING,
                  fontWeight: 'bold',
                }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={goalDetails && goalDetails.milestones}
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
                  <View style={{flex: 0.6}}>
                    <SubHeader title={item.name} />
                  </View>
                  <View
                    style={{
                      flex: 0.4,
                      flexDirection: 'row',
                      justifyContent: employmentEdit
                        ? 'space-between'
                        : 'flex-end',
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(16),
                        color: Constants.Colors.SUB_HEADING,
                        fontFamily: Constants.Fonts.Regular,
                        opacity: 0.5,
                      }}>
                      {moment(item.startDate).format('MM/DD/YYYY')}
                    </Text>
                    {employmentEdit && (
                      <TouchableOpacity
                        onPress={() => {
                          _deleteMilestone(item);
                        }}>
                        <Image source={Images.removeCircle} />
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
      <AddMilestoneModal
        milestoneModalVisible={milestoneModalVisible}
        setAddMilestoneModal={setAddMilestoneModal}
        activeGoalId={activeGoalId}
      />
    </>
  );
}));
