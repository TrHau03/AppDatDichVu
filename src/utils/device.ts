import { Dimensions, Platform } from 'react-native';

export default class Device {
  static getDeviceWidth() {
    return Dimensions.get('window').width;
  }

  static getDeviceHeight() {
    return Dimensions.get('window').height;
  }

  static isIos() {
    return Platform.OS === 'ios';
  }

  static isAndroid() {
    return Platform.OS === 'android';
  }
  static isTablet() {
    return Dimensions.get('window').width >= 768;
  }
}
