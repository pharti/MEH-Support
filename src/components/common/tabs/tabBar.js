import Constants from '../../../constants';
import {Tab} from './tabSwitcher';
import React, {useState} from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import * as Images from '../../../assets/icons';
const TabBar = props => {
  const [selectedTab, setSelectedTab] = useState('Home');
  return (
    <View
      style={{
        height: '10%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
      }}>
      <View
        style={{
          backgroundColor: Constants.Colors.WHITE,
          height: '100%',
          width: '100%',
          flexDirection: 'row',
          shadowColor: '#0000001A',
          shadowOffset: {width: 0, height: 5},
          shadowOpacity: 0.6,
          shadowRadius: 5,
          elevation: 5,
          borderTopLeftRadius: RFValue(16),
          borderTopRightRadius: RFValue(16),
          padding: RFValue(16),
        }}>
        <View
          style={{
            flex: 0.2,
          }}>
          <Tab
            id={'Home'}
            tabSelected={() => {
              setSelectedTab('Home');
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={
                  selectedTab == 'Home' ? Images.homeSelected : Images.Home
                }
              />
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      selectedTab == 'Home'
                        ? Constants.Colors.PRIMARY
                        : Constants.Colors.TEXT_COLOR,
                  },
                ]}>
                HOME
              </Text>
            </View>
          </Tab>
        </View>
        <View
          style={{
            flex: 0.2,
          }}>
          <Tab
            id={'Chat'}
            tabSelected={() => {
              setSelectedTab('Chat');
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={
                  selectedTab == 'Chat' ? Images.chatSelected : Images.Chat
                }
              />
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      selectedTab == 'Chat'
                        ? Constants.Colors.PRIMARY
                        : Constants.Colors.TEXT_COLOR,
                  },
                ]}>
                CHAT
              </Text>
            </View>
          </Tab>
        </View>
        <View
          style={{
            flex: 0.2,
          }}>
          <Tab
            id={'AI'}
            tabSelected={() => {
              setSelectedTab('AI');
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={selectedTab == 'AI' ? Images.aiSelected : Images.AI}
              />
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      selectedTab == 'AI'
                        ? Constants.Colors.PRIMARY
                        : Constants.Colors.TEXT_COLOR,
                  },
                ]}>
                AI
              </Text>
            </View>
          </Tab>
        </View>
        <View
          style={{
            flex: 0.2,
          }}>
          <Tab
            id={'Tracker'}
            tabSelected={() => {
              setSelectedTab('Tracker');
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={
                  selectedTab == 'Tracker'
                    ? Images.trackerSelected
                    : Images.Tracker
                }
              />
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      selectedTab == 'Tracker'
                        ? Constants.Colors.PRIMARY
                        : Constants.Colors.TEXT_COLOR,
                  },
                ]}>
                TRACKER
              </Text>
            </View>
          </Tab>
        </View>
        <View
          style={{
            flex: 0.2,
          }}>
          <Tab
            id={'Profile'}
            tabSelected={() => {
              setSelectedTab('Profile');
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={
                  selectedTab == 'Profile'
                    ? Images.profileSelected
                    : Images.Profile
                }
              />
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      selectedTab == 'Profile'
                        ? Constants.Colors.PRIMARY
                        : Constants.Colors.TEXT_COLOR,
                  },
                ]}>
                PROFILE
              </Text>
            </View>
          </Tab>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  tabText: {
    fontSize: RFValue(6),
    fontFamily: Constants.Fonts.Medium,

    lineHeight: RFValue(16),
  },
});
export default TabBar;
