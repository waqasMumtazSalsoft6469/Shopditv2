import AsyncStorage from '@react-native-async-storage/async-storage';

export const reduxStorage = {
  setItem: (key, value) => AsyncStorage.setItem(key, value),
  getItem: key => AsyncStorage.getItem(key),
  removeItem: key => AsyncStorage.removeItem(key),
};
