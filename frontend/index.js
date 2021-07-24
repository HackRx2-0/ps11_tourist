/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import axios from 'axios';

// axios.defaults.baseURL = 'http://192.168.1.40:5000/';
axios.defaults.baseURL = 'http://97a95553bd6a.ngrok.io/';

AppRegistry.registerComponent(appName, () => App);
