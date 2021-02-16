/* eslint-disable module-resolver/use-alias */
import * as AppActions from 'actions';
import Card from 'components/common/card';
import Constants from 'constants';
import _ from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Switch} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddGoalModal from './addGoalModal';
const {width, height} = Dimensions.get('window');
const ChooseGoals = React.memo(function ChooseGoals(props) {
  const {setGoal, AppActions} = props;
  const isLoading = useSelector(state => state.goalsReducer.isLoading);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [adminGoals, setAdminGoals] = useState([]);
  const [justToRender, render] = useState(false);
  const [addGoalVisible, setAddGoalVisible] = useState(false);

  useEffect(() => {
    AppActions.getAdminGoals(goals => {
      setAdminGoals(goals);
    });
  }, [props]);
  const _setGoal = (goal, goalId) => {
    if (getSelectProperty(goalId)) {
      _.remove(selectedGoals, function(item) {
        return item._id == goalId;
      });
      setSelectedGoals(selectedGoals);
      render(!justToRender);
    } else {
      selectedGoals.push(goal);
      setSelectedGoals(selectedGoals);
      render(!justToRender);
    }
    setGoal(selectedGoals);
  };
  const getSelectProperty = goalId => {
    if (selectedGoals) {
      return selectedGoals.some(selectedGoal => selectedGoal._id === goalId);
    }
  };
  const _toggleAddGoalModal = () => {
    setAddGoalVisible(!addGoalVisible);
  };
  const _addGoal = goal => {
    adminGoals.push(goal);
    setAdminGoals(adminGoals);
    selectedGoals.push(goal);
    setSelectedGoals(selectedGoals);
    setGoal(selectedGoals);
    render(!justToRender);
    _toggleAddGoalModal();
  };
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
        Choose Goals
      </Text>
      <View style={{paddingTop: RFValue(16)}}>
        <Text
          style={{
            fontSize: RFValue(9),
            color: Constants.Colors.TEXT_COLOR,
            textAlign: 'right',
            width: '100%',
          }}>
          Set your goals here.{'\n'}To create Milestones please go to tracker.
        </Text>
        {isLoading ? (
          <View style={{paddingVertical: RFValue(16)}}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            style={{paddingTop: RFValue(8)}}
            data={adminGoals}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: '#DEDEDE',
                    borderBottomWidth: 1,
                    paddingVertical: RFValue(8),
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      flex: 0.8,
                      fontSize: RFValue(17),
                      color: Constants.Colors.SUB_HEADING,
                      fontFamily: Constants.Fonts.Regular,
                    }}>
                    {item.name}
                  </Text>
                  <Switch
                    value={getSelectProperty(item._id)}
                    onValueChange={() => _setGoal(item, item._id)}
                    color={Constants.Colors.PRIMARY}
                  />
                </View>
              );
            }}
            keyExtractor={item => item._id}
          />
        )}
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
            elevation: 5,
          }}
          onPress={() => {
            _toggleAddGoalModal();
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
      {addGoalVisible && (
        <AddGoalModal
          addGoalVisible={addGoalVisible}
          toggleAddGoalModal={_toggleAddGoalModal}
          addGoal={_addGoal}
        />
      )}
    </Card>
  );
});
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = dispatch => ({
  AppActions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseGoals);
