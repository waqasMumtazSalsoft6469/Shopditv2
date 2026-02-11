/**
 * Must run before any screen or navigation code.
 * React Native 0.65+ removed BackHandler.removeEventListener; some libs still call it.
 */
import { BackHandler } from 'react-native';

if (BackHandler && typeof BackHandler.removeEventListener === 'undefined') {
  BackHandler.removeEventListener = function () {};
}
