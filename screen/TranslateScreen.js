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
    shadowOpacity: 0.60,
    shadowRadius: 4.41,

    elevation: 2,
}

export default function TranslateScreen() {

    let height = useWindowDimensions().height;

    return (
        <View style={{flex:1,backgroundColor:"white",minHeight:height+EStyleSheet.value("30rem")}}>
            <View style={{height:StatusBarHeight}}></View>
            <View style={{height:EStyleSheet.value("60rem"),paddingHorizontal:EStyleSheet.value("20rem"),flexDirection:"row",justifyContent:"space-between",backgroundColor:"white"}}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Feather name="arrow-left" style={{marginBottom:EStyleSheet.value("3rem")}} size={EStyleSheet.value("20rem")} color="black" />
                         <Text style={{fontSize:EStyleSheet.value("23rem"),marginLeft:EStyleSheet.value("10rem")}}>Translate</Text>
                </View>
                <View style={{opacity:0}}>
                    <Text>123</Text>
                </View>
            </View>
            <View style={{flex:1,backgroundColor:"#f4f5f9"}}>
                 <View style={{marginTop:EStyleSheet.value("50rem"),marginBottom:EStyleSheet.value("40rem")}}>
                        <View style={{...shadow,height:EStyleSheet.value("50rem"),flexDirection:"row",backgroundColor:"white"}}>
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
                                style={{...shadow,position:"absolute",justifyContent:"center",alignItems:"center",backgroundColor:"white",borderRadius:999,bottom:EStyleSheet.value("-10rem"),right:EStyleSheet.value("-5rem"),width:EStyleSheet.value("75rem"),height:EStyleSheet.value("75rem")}}>
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
                 </View>
                 <View style={{paddingHorizontal:EStyleSheet.value("20rem")}}>
                     <View style={{backgroundColor:"white",paddingBottom:EStyleSheet.value("40rem"),height:EStyleSheet.value("200rem"),padding:EStyleSheet.value("20rem"),borderRadius:EStyleSheet.value("5rem")}}>
                         <Text style={{color:"#868889",fontSize:EStyleSheet.value("18rem")}}>English Language</Text>
                         <TextInput multiline={true} style={{fontSize:EStyleSheet.value("28rem"),paddingTop:EStyleSheet.value("10rem")}} placeholder="Tap to enter text"/>
                     </View>
                 </View>
                 <View style={{flex:1,justifyContent:"flex-end"}}>
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
        </View>
    )
}