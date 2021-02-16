import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Constants from 'constants';
export const AddComunityModal = props => {
  const {addCommunityModal, setAddCommunityModal} = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={addCommunityModal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={{flex: 1, backgroundColor: '#0009'}}>
        <TouchableOpacity
          onPress={() => {
            setAddCommunityModal(false);
          }}
          style={{flex: 0.3}}
        />
        <View
          style={{
            flex: 0.4,
            backgroundColor: 'white',
            marginHorizontal: RFValue(20),
            borderRadius: RFValue(10),
          }}>
          <View
            style={{
              flex: 0.25,
              flexDirection: 'row',
              paddingHorizontal: RFValue(20),
            }}>
            <TouchableOpacity
              onPress={() => {
                setAddCommunityModal(false);
              }}
              style={{flex: 0.5, justifyContent: 'center'}}>
              <Text
                style={{
                  color: Constants.Colors.SUB_HEADING,
                  fontSize: RFValue(15),
                }}>
                Delete
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setAddCommunityModal(false);
              }}
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  color: Constants.Colors.SUB_HEADING,
                  fontSize: RFValue(15),
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.25,
              flexDirection: 'row',
              paddingHorizontal: RFValue(20),
            }}>
            <View style={{flex: 0.5, justifyContent: 'center'}}>
              <Text
                style={{
                  color: Constants.Colors.SUB_HEADING,
                  fontSize: RFValue(15),
                }}>
                Name
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  color: Constants.Colors.SUB_HEADING,
                  fontSize: RFValue(15),
                }}>
                Choose Goal Name
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.25,
              flexDirection: 'row',
              borderBottomWidth: 0.5,
              borderBottomColor: 'grey',
              borderTopWidth: 0.5,
              borderTopColor: 'grey',
              paddingHorizontal: RFValue(20),
            }}>
            <View style={{flex: 0.5, justifyContent: 'center'}}>
              <Text
                style={{
                  color: Constants.Colors.SUB_HEADING,
                  fontSize: RFValue(15),
                }}>
                Start Date
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  color: Constants.Colors.SUB_HEADING,
                  fontSize: RFValue(15),
                }}>
                01/18/2020{' '}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 0.25,
              flexDirection: 'row',
              paddingHorizontal: RFValue(20),
            }}>
            <View style={{flex: 0.5, justifyContent: 'center'}}>
              <Text
                style={{
                  color: Constants.Colors.SUB_HEADING,
                  fontSize: RFValue(15),
                }}>
                End Date{' '}
              </Text>
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text
                style={{
                  color: Constants.Colors.SUB_HEADING,
                  fontSize: RFValue(15),
                }}>
                01/18/2020{' '}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setAddCommunityModal(false);
          }}
          style={{flex: 0.3}}
        />
      </View>
    </Modal>
  );
};
