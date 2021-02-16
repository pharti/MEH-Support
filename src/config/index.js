/* eslint-disable module-resolver/use-alias */
import {Dimensions} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {
  manageAuthStackOptions,
  manageNavBarOptions,
  manageSideMenuOptions,
  manageSideMenuStackOptions,
} from './stackConfig';
const {width, height} = Dimensions.get('window');

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'Auth',
        children: [
          {
            component: {
              name: 'LandingPage',
              passProps: {
                text: 'AuthModule',
              },
              options: manageAuthStackOptions(),
            },
          },
        ],
      },
    },
  });

export const goHome = () =>
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: manageSideMenuOptions(),
        center: {
          stack: {
            id: 'dashboard',
            children: [
              {
                component: {
                  name: 'Dashboard',
                  options: manageNavBarOptions(),
                },
              },
            ],
          },
        },
        options: manageSideMenuStackOptions(),
      },
    },
  });
export const goToSettings = () =>
  Navigation.setRoot({
    root: {
      sideMenu: {
        left: manageSideMenuOptions(),
        center: {
          stack: {
            id: 'settings',
            children: [
              {
                component: {
                  name: 'Settings',
                  options: manageNavBarOptions(),
                },
              },
            ],
          },
        },
        options: manageSideMenuStackOptions(),
      },
    },
  });
