
import React from 'react';
import { AppRegistry } from 'react-native';
import { Root } from 'native-base'

import App from './src/App';

const Coingym = () => (
  <Root>
    <App />
  </Root>
)

AppRegistry.registerComponent('coingym', () => Coingym)
