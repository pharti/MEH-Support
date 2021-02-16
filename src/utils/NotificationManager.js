import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

export const BackgroundNotificationManager = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('***********MESSAGE_IN_BACKGROUND************', remoteMessage);
  });
  messaging().onMessage(async remoteMessage => {
    console.log(
      '***********NEW_MESSAGE************',
      JSON.stringify(remoteMessage),
    );
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      '***********NOTIFICATION_OPENED_APP_FROM_BACKGROUND_STATE**********',
      remoteMessage.notification,
    );
  });
};

export const InitiateNotification = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('***********NOTI_AUTH_STATUS************', authStatus);
  } else {
    console.log('***********REQUEST************');
  }

  messaging()
    .getToken()
    .then(token => {
      console.log('***********NOTIF_TOKEN************', token);
    });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      console.log(
        '***********NOTIFICATION_OPENED_APP_FROM_QUIT_STATE************',
        remoteMessage,
      );
    });

  PushNotification.createChannel(
    {
      channelId: 'fcm_fallback_notification_channel', // (required)
      channelName: 'fcm_fallback_notification_channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 1, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    created => console.log('***********CHANNEL_CREATED************', created), // (optional) callback returns whether the channel was created, false means it already existed.
  );
};
