/**
 * Firebase Cloud Messaging Background Handler
 * This file handles push notifications when the app is in the background or quit state
 * Must be imported in index.js before AppRegistry.registerComponent
 */

import messaging from '@react-native-firebase/messaging';
import { displayNotification } from './src/services/notifications';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('FCM Background Message:', remoteMessage);
  await displayNotification(
    remoteMessage.notification?.title || 'Background Title',
    remoteMessage.notification?.body || 'Background Body',
    'default',
    remoteMessage.data
  );
});

