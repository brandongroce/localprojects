'use strict';

// it is important to import the react package before anything else
import React from 'react';
import {
  AppRegistry
} from 'react-native';

import App from './src/components/Layout/Layout';

AppRegistry.registerComponent('nativeApp', () => App);
