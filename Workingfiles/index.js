/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './new';
import UASS from './UAS/UASS/MainApp'
import Remed from './UAS/Remedial/MainApp'
import Susu from './UAS/Susulan/MainApp'
import UasreAl from './UAS/UAsReal/MainApp'
import CMRT from './CameraImageTest/CMRT'
import PushIt from './Push Notification Learn/Notife'
import Appp from './TestApp/AppX'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => PushIt );
