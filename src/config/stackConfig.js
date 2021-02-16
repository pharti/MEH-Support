/* eslint-disable module-resolver/use-alias */

import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('window');

export function manageSideMenuStackOptions() {
  return Platform.isPad
    ? {
        sideMenu: {
          left: {
            width: width / 2,
          },
        },
      }
    : {};
}

export function manageNavBarOptions() {
  return {
    statusBar: {
      visible: true,
      style: 'dark',
      backgroundColor: 'white',
    },
    topBar: {
      visible: false,
      height: 0,
    },
  };
}

export function manageAuthStackOptions() {
  return {
    statusBar: {
      visible: true,
      style: 'dark',
      backgroundColor: 'white',
    },
    topBar: {
      visible: false,
      height: 0,
    },
  };
}

export function manageSideMenuOptions() {
  return {
    shouldStretchDrawer: true,
    animationVelocity: 2500,
    component: {
      id: 'SideMenu',
      name: 'SideMenu',
      options: {
        statusBar: {
          visible: true,
          style: 'dark',
          backgroundColor: 'white',
        },
        topBar: {
          visible: false,
          height: 0,
        },
        layout: {
          backgroundColor: 'white',
        },
        animations: {
          setRoot: {
            enabled: 'true',
            alpha: {
              from: 0,
              to: 1,
              duration: 400,
              startDelay: 100,
              interpolation: 'accelerate',
            },
            waitForRender: true,
          },
        },
      },
    },
  };
}
