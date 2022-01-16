import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import HomeScreen from './screen/HomeScreen';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

export default function App() {
  return (
   <HomeScreen/>
  );
}

