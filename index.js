import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import App from './app/controllers/app';
import { name as appName } from './app.json';

// navigator.geolocation was removed from React Native core; the app still
// calls it, so restore it from the community module.
if (!global.navigator) {
    global.navigator = {};
}
if (!global.navigator.geolocation) {
    global.navigator.geolocation = Geolocation;
}

AppRegistry.registerComponent(appName, () => App);
