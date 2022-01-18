import React, {useState,useEffect, createContext} from 'react';
import { StyleSheet, Text, View, Dimensions,StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import HomeScreen from './screen/HomeScreen';
import TranslateScreen from './screen/TranslateScreen';
import ConversationScreen from './screen/ConversationScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { useFonts } from 'expo-font';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

const Tab = createBottomTabNavigator();

export const GlobalContext = createContext();

export default function App() {

  let [from, setFrom] = useState({
    "language": "English",
    "code": "en"
  });

  let [to, setTo] = useState( {
    "language": "Indonesian",
    "code": "id"
  });


  const [fontLoaded] = useFonts({
    PoppinsMedium: require('./assets/Poppins-Medium.ttf'),
  });

  if (!fontLoaded) {
    return null;
  }
 else{
  return (
    <GlobalContext.Provider value={{from,setFrom,to,setTo}}>
      <StatusBar translucent/>
      <NavigationContainer>
          <Tab.Navigator tabBar={props => null}>
            <Tab.Screen 
            options={{
              headerShown:false
            }}
            name="Home" component={HomeScreen} />
            <Tab.Screen 
              options={{
                headerShown:false
              }}
            name="Conversation" component={ConversationScreen} />
              <Tab.Screen 
              options={{
                headerShown:false
              }}
            name="Translate" component={TranslateScreen} />
        </Tab.Navigator>
      </NavigationContainer>
   </GlobalContext.Provider>
  );
 }
}

