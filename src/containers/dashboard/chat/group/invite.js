import * as AppActions from 'actions';
import SubHeader from 'components/common/subHeader';
import Constants from 'constants';
import * as Images from 'assets/icons';
import _ from 'lodash';
import React, {useState, useEffect} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
export const InviteModal = props => {
  const {inviteModalVisible, setInviteModalVisible} = props;
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AppActions.getAllUsers());
  }, []);
  const allUserList = useSelector(state => state.usersReducer.allUserList);
  console.log('allUserList', allUserList);
  const _searchUser = searchName => {
    console.log('searchName', searchName, allUserList);
    if (searchName.length > 4) {
      const filteredList =
        allUserList &&
        allUserList.filter(item => {
          console.log('item', item);
          return (
            item &&
            item.username &&
            item.username.toLowerCase().includes(searchName)
          );
        });
      setUserList(filteredList);
    }
  };
  const _onPressInvite = () => {};
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={inviteModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: '#0009'}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            setInviteModalVisible(false);
          }}
          style={{flex: 0.1}}
        />
        <View
          style={{
            backgroundColor: 'white',
            marginHorizontal: RFValue(16),
            borderRadius: RFValue(10),
            paddingVertical: RFValue(24),
          }}>
          <TouchableOpacity
            onPress={() => {
              setInviteModalVisible();
            }}
            style={styles.cancel}>
            <Text
              style={{
                paddingHorizontal: RFValue(16),
                color: Constants.Colors.PRIMARY,
                fontSize: RFValue(14),
                fontFamily: Constants.Fonts.Regular,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <View style={styles.inviteView}>
            <Text
              style={{
                flex: 0.2,
                fontSize: RFValue(16),
                color: Constants.Colors.SUB_HEADING,
                fontFamily: Constants.Fonts.Regular,
              }}>
              Invite
            </Text>
            <View style={styles.input}>
              <TextInput
                placeholder="Start typing name..."
                placeholderTextColor={Constants.Colors.PLACEHOLDER}
                style={{
                  color: Constants.Colors.TEXT_COLOR,
                  fontSize: RFValue(14),
                }}
                onChangeText={name => {
                  _searchUser(name.toLowerCase());
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                flex: 0.15,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Image source={Images.greenAddCircle} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={userList}
            contentContainerStyle={{
              borderTopWidth: 1,
              paddingHorizontal: RFValue(16),
              borderColor: Constants.Colors.BACKGROUND,
            }}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: RFValue(12),
                  }}>
                  <Text
                    style={{
                      fontSize: RFValue(14),
                      color: Constants.Colors.SUB_HEADING,
                      fontFamily: Constants.Fonts.Regular,
                    }}>
                    {item.username}
                  </Text>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: RFValue(16),
                      paddingVertical: RFValue(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: Constants.Colors.PRIMARY,
                      borderRadius: RFValue(10),
                    }}
                    onPress={() => _onPressInvite()}>
                    <Text
                      style={{
                        color: Constants.Colors.WHITE,
                        fontSize: RFValue(16),
                      }}>
                      Invite
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setInviteModalVisible(false);
          }}
          style={{flex: 0.3}}
        />
      </ScrollView>
    </Modal>
  );
};
export default InviteModal;

const styles = StyleSheet.create({
  inviteView: {
    flexDirection: 'row',
    paddingVertical: RFValue(16),
    paddingHorizontal: RFValue(16),
  },
  milestoneName: {
    color: Constants.Colors.SUB_HEADING,
    fontSize: RFValue(14),
  },
  milestoneValue: {
    color: Constants.Colors.SUB_HEADING,
    fontSize: RFValue(14),
    opacity: 0.5,
  },
  nameView: {flex: 0.5, justifyContent: 'center'},
  input: {
    flex: 0.65,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cancel: {justifyContent: 'center', alignItems: 'flex-end'},
});
