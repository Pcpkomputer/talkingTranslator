import React from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity, TextInput, useWindowDimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Feather, FontAwesome5 } from '@expo/vector-icons'; 

import { StatusBarHeight } from '../utils/HeightUtils';

import MenuBurger from '../svg/MenuBurger';
import Keyboard from '../svg/Keyboard';
import Mic from '../svg/Mic';
import Question from '../svg/Question';
import Mic2 from '../svg/Mic2';


let shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
}

export default function HomeScreen() {

    let height = useWindowDimensions().height;

  return (
    <View style={{flex:1,backgroundColor:"#f4f5f9",minHeight:height+EStyleSheet.value("30rem")}}>
        <LinearGradient 
         colors={['#ef3136', '#ffb040']}
         end={{ x: 1, y: 0.6 }}
        style={{flex:1,backgroundColor:"#ef3136",paddingTop:StatusBarHeight}}>
              <View style={{height:EStyleSheet.value("90rem"),flexDirection:"row",alignItems:"flex-end",justifyContent:"space-between",paddingHorizontal:EStyleSheet.value("20rem")}}>
                <FontAwesome5 style={{transform:[{rotate:"180deg"}]}} name="question-circle" size={EStyleSheet.value("33rem")} color="white" />
                <View>
                    <LinearGradient 
                    colors={['white', 'white']}
                    end={{ x: 1, y: 0.6 }}
                    style={{position:"absolute",transform:[{rotate:"180deg"}],justifyContent:"center",alignItems:"center",borderRadius:999,bottom:EStyleSheet.value("-30rem"),width:EStyleSheet.value("80rem"),height:EStyleSheet.value("80rem"),backgroundColor:"red",right:EStyleSheet.value("-40rem")}}>
                        <Mic2/>
                    </LinearGradient>
                </View>
                <View style={{opacity:0}}>
                <Keyboard/>
                </View>
            </View>
            <View style={{flex:1,justifyContent:"center",transform:[{rotate:"180deg"}],paddingVertical:EStyleSheet.value("40rem"),paddingHorizontal:EStyleSheet.value("50rem"),alignItems:"center"}}>
                <TextInput showSoftInputOnFocus={false} value="Your Head" multiline={true} style={{fontSize:EStyleSheet.value("30rem"),color:"white"}}/>
            </View>
        </LinearGradient>
        <View style={{...shadow,height:EStyleSheet.value("60rem"),flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",paddingHorizontal:EStyleSheet.value("20rem")}}>
                <View style={{flexDirection:"row",paddingHorizontal:EStyleSheet.value("20rem")}}>
                    <Text numberOfLines={1} style={{fontSize:EStyleSheet.value("15rem")}}>English</Text>
                    <Feather style={{marginLeft:EStyleSheet.value("5rem")}} name="chevron-down" size={EStyleSheet.value("20rem")} color="black" />
                </View>
            </View>
            <View style={{width:EStyleSheet.value("70rem")}}>
                <TouchableOpacity
                activeOpacity={0.9} 
                onPress={()=>{
                    alert("123");
                }}
                style={{...shadow,position:"absolute",justifyContent:"center",alignItems:"center",backgroundColor:"white",borderRadius:999,bottom:EStyleSheet.value("-8rem"),right:EStyleSheet.value("-5rem"),width:EStyleSheet.value("80rem"),height:EStyleSheet.value("80rem")}}>
                    <MaterialIcons name="swap-horiz" size={EStyleSheet.value("40rem")} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",paddingHorizontal:EStyleSheet.value("20rem")}}>
                <View style={{flexDirection:"row",paddingHorizontal:EStyleSheet.value("20rem")}}>
                    <Text numberOfLines={1} style={{fontSize:EStyleSheet.value("15rem")}}>Indonesia</Text>
                    <Feather style={{marginLeft:EStyleSheet.value("5rem")}} name="chevron-down" size={EStyleSheet.value("20rem")} color="black" />
                </View>
            </View>
        </View>
        <View style={{flex:1,backgroundColor:"#f4f5f9"}}>
            <View style={{flex:1,justifyContent:"center",paddingVertical:EStyleSheet.value("40rem"),paddingHorizontal:EStyleSheet.value("50rem"),alignItems:"center"}}>
                <TextInput showSoftInputOnFocus={false} value="Your Head" multiline={true} style={{fontSize:EStyleSheet.value("30rem")}}/>
            </View>
            <View style={{height:EStyleSheet.value("90rem"),flexDirection:"row",justifyContent:"space-between",paddingHorizontal:EStyleSheet.value("20rem")}}>
                <MenuBurger/>
                <View>
                    <LinearGradient 
                    colors={['#ef3136', '#ffb040']}
                    end={{ x: 1, y: 0.6 }}
                    style={{position:"absolute",justifyContent:"center",alignItems:"center",borderRadius:999,bottom:EStyleSheet.value("35rem"),width:EStyleSheet.value("80rem"),height:EStyleSheet.value("80rem"),backgroundColor:"red",right:EStyleSheet.value("-40rem")}}>
                        <Mic/>
                    </LinearGradient>
                </View>
                <Keyboard/>
            </View>
        </View>
    </View>
  );
}

