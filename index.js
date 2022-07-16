/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { Settings } from 'react-native-fbsdk-next';

// Setting the facebook app id using setAppID
// Remember to set CFBundleURLSchemes in Info.plist on iOS if needed
Settings.setAppID('782428479834733');
Settings.initializeSDK();


AppRegistry.registerComponent(appName, () => App);
