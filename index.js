import React from 'react';
import {StatusBar, YellowBox} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {registerScreens} from './src/config/routes';
import {Provider} from 'react-redux';
import setup, {storeObj} from './src/store/setup';
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    assert: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
    time: () => {},
    timeEnd: () => {},
  };
}
Navigation.events().registerAppLaunchedListener(() => {
  <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />;
  const store = setup();
  YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
  registerScreens(storeObj.store, Provider);
  Navigation.setRoot({
    root: {
      component: {
        name: 'Loader',
      },
    },
  });
});
