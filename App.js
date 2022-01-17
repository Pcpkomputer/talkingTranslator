import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import HomeScreen from './screen/HomeScreen';
import TranslateScreen from './screen/TranslateScreen';
import ConversationScreen from './screen/ConversationScreen';

import { useFonts } from 'expo-font';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});



export default function App() {

  const [fontLoaded] = useFonts({
    PoppinsMedium: require('./assets/Poppins-Medium.ttf'),
  });

  if (!fontLoaded) {
    return null;
  }

  return (
   <HomeScreen/>
  );
}

