import Constants from 'constants';
import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch} from 'react-redux';
export default (AddGoalModal = React.memo(function AddGoalModal(props) {
  const {addGoalVisible, toggleAddGoalModal, addGoal} = props;
  const [userGoal, setUserGoal] = useState('');
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={addGoalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#0009'}}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            toggleAddGoalModal();
          }}
          style={{flex: 0.4}}
        />
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: RFValue(16),
            borderRadius: RFValue(10),
            paddingTop: RFValue(16),
            paddingBottom: RFValue(32),
            paddingHorizontal: RFValue(16),
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                toggleAddGoalModal();
              }}
              style={{flex: 0.5, justifyContent: 'center'}}>
              <Text
                style={{
                  color: Constants.Colors.SUB_HEADING,
                  fontSize: RFValue(12),
                  fontFamily: Constants.Fonts.Regular,
                }}>
                Close
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              keyboardShouldPersistTaps="always"
              onPress={() => {
                if (userGoal != '') {
                  const goal = {
                    name: userGoal,
                    isDisabled: false,
                    milestones: [],
                  };
                  addGoal(goal);
                }
              }}
              style={{flex: 0.5, alignItems: 'flex-end'}}>
              <Text
                style={{
                  color: Constants.Colors.SUB_HEADING,
                  fontSize: RFValue(12),
                  fontFamily: Constants.Fonts.Regular,
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingTop: RFValue(32),
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                flex: 0.2,
                fontSize: RFValue(16),
                color: Constants.Colors.SUB_HEADING,
                fontFamily: Constants.Fonts.Regular,
              }}>
              Name
            </Text>
            <View
              style={{
                flex: 0.8,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <TextInput
                placeholder="Choose goal name"
                placeholderTextColor={Constants.Colors.PLACEHOLDER}
                style={{
                  color: Constants.Colors.TEXT_COLOR,
                  fontSize: RFValue(14),
                }}
                onChangeText={value => {
                  setUserGoal(value);
                }}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            toggleAddGoalModal();
          }}
          style={{flex: 0.6}}
        />
      </KeyboardAwareScrollView>
    </Modal>
  );
}));
const styles = StyleSheet.create({});
