import React, {useState,useEffect, createContext, useCallback} from 'react';
import { StyleSheet, Text, View, Dimensions,StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import HomeScreen from './screen/HomeScreen';
import TranslateScreen from './screen/TranslateScreen';
import ConversationScreen from './screen/ConversationScreen';

import * as SplashScreen from 'expo-splash-screen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { useFonts,loadAsync } from 'expo-font';

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


  let [appIsReady, setAppIsReady] = useState(false);


  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await loadAsync({
          "PoppinsMedium": require("./assets/Poppins-Medium.ttf")
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <View style={{flex:1,backgroundColor:"red"}}></View>
  }
 else{
  return (
    <GlobalContext.Provider 
    value={{from,setFrom,to,setTo}}>
      <StatusBar translucent/>
      <NavigationContainer
      onReady={onLayoutRootView}
      >
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

