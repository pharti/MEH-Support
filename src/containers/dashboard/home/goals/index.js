/* eslint-disable module-resolver/use-alias */
import * as Images from 'assets/icons';
import TouchableCard from 'components/common/touchableCard';
import Constants from 'constants';
import React from 'react';
import {Dimensions, FlatList, Image, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {RFValue} from 'react-native-responsive-fontsize';
const {width, height} = Dimensions.get('window');
export default (Goals = props => {
  const {goToAddGoals, goals} = props;
  return (
    <TouchableCard
      customStyle={{
        padding: RFValue(16),
      }}
      disabled={false}
      onPress={goToAddGoals}>
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        <Image
          source={Images.options}
          style={{height: RFValue(10), width: RFValue(2)}}
        />
      </View>
      <View style={{}}>
        <Text
          style={{
            fontSize: RFValue(18),
            color: Constants.Colors.TEXT_COLOR,
            fontFamily: Constants.Fonts.Regular,
            alignSelf: 'center',
          }}>
          My Goal is:
        </Text>
        <FlatList
          data={goals}
          renderItem={({item, index}) => {
            return (
              !item.isDisabled && (
                <>
                  <Text
                    style={{
                      paddingTop: RFValue(16),
                      fontSize: RFValue(20),
                      color: Constants.Colors.TEXT_COLOR,
                      fontFamily: Constants.Fonts.Regular,
                    }}>
                    {item.name}
                  </Text>
                  <View
                    style={{
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        fontSize: RFValue(10),
                        color: '#575656',
                        fontFamily: Constants.Fonts.Regular,
                        paddingBottom: RFValue(8),
                        opacity: 0.5,
                      }}>
                      0% Completed
                    </Text>
                    <Progress.Bar
                      progress={0.3}
                      width={width / 1.22}
                      color={'#308D85'}
                      unfilledColor={'#E2E2E2'}
                      borderColor={'#E2E2E2'}
                      height={RFValue(12)}
                      borderRadius={RFValue(16)}
                    />
                  </View>
                </>
              )
            );
          }}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: RFValue(16),
              }}>
              <Text
                style={{
                  fontSize: RFValue(16),
                  color: Constants.Colors.TEXT_COLOR,
                  fontFamily: Constants.Fonts.Regular,
                  opacity: 0.5,
                }}>
                No Results Found
              </Text>
              <Text
                style={{
                  fontSize: RFValue(12),
                  color: Constants.Colors.TEXT_COLOR,
                  fontFamily: Constants.Fonts.Regular,
                  paddingBottom: RFValue(8),
                  opacity: 0.5,
                }}>
                You have not added any goals yet.
              </Text>
            </View>
          }
        />
      </View>
    </TouchableCard>
  );
});
