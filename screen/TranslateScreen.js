import React, {useState,useEffect, useRef, useContext} from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity, TextInput, Image, useWindowDimensions, Pressable, ScrollView, ActivityIndicator, Touchable, ToastAndroid } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons'; 

import RBSheet from "react-native-raw-bottom-sheet";

import { StatusBarHeight } from '../utils/HeightUtils';

import MenuBurger from '../svg/MenuBurger';
import Keyboard from '../svg/Keyboard';
import Mic from '../svg/Mic';
import Question from '../svg/Question';
import Mic2 from '../svg/Mic2';

import {GlobalContext} from '../App';


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

export default function TranslateScreen(props) {

    let triggerTextInput = useRef();
    let topTextInput = useRef();

    let globalContext = useContext(GlobalContext);

    const refRBSheet = useRef();

    let [text, setText] = useState("");

    let [result, setResult] = useState("");
    let [resultLoading, setResultLoading] = useState(true);
    let [resultDone, setResultDone] = useState(false);

    let height = useWindowDimensions().height;

    let [micLoading, setMicLoading] = useState(false);

    

    return (
        <View style={{flex:1,backgroundColor:"white",minHeight:height+EStyleSheet.value("30rem")}}>

        <TextInput 
        value={""}
        ref={(ref)=>{
            triggerTextInput = ref;
        }}
        style={{height:1,position:"absolute"}}/>

            <View style={{height:StatusBarHeight}}></View>
            <View style={{height:EStyleSheet.value("60rem"),paddingHorizontal:EStyleSheet.value("20rem"),flexDirection:"row",justifyContent:"space-between",backgroundColor:"white"}}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                        <TouchableOpacity
                         activeOpacity={0.8}
                         onPress={()=>{
                             props.navigation.goBack();
                         }}
                         >
                         <Feather name="arrow-left" style={{marginBottom:EStyleSheet.value("3rem")}} size={EStyleSheet.value("20rem")} color="black" />
                         </TouchableOpacity>
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
                                    <Text numberOfLines={1} style={{fontSize:EStyleSheet.value("15rem")}}>{globalContext.from.language}</Text>
                                    <Feather style={{marginLeft:EStyleSheet.value("5rem")}} name="chevron-down" size={EStyleSheet.value("20rem")} color="black" />
                                </View>
                            </View>
                            <View style={{width:EStyleSheet.value("70rem")}}>
                                <TouchableOpacity
                                activeOpacity={0.9} 
                                onPress={()=>{
                                    let oldFrom = {...globalContext.from};
                                    let oldTo = {...globalContext.to};
                
                                    globalContext.setFrom(oldTo);
                                    globalContext.setTo(oldFrom);
                                }}
                                style={{...shadow,position:"absolute",justifyContent:"center",alignItems:"center",backgroundColor:"white",borderRadius:999,bottom:EStyleSheet.value("-10rem"),right:EStyleSheet.value("-5rem"),width:EStyleSheet.value("75rem"),height:EStyleSheet.value("75rem")}}>
                                    <MaterialIcons name="swap-horiz" size={EStyleSheet.value("40rem")} color="black" />
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",paddingHorizontal:EStyleSheet.value("20rem")}}>
                                <View style={{flexDirection:"row",paddingHorizontal:EStyleSheet.value("20rem")}}>
                                    <Text numberOfLines={1} style={{fontSize:EStyleSheet.value("15rem")}}>{globalContext.to.language}</Text>
                                    <Feather style={{marginLeft:EStyleSheet.value("5rem")}} name="chevron-down" size={EStyleSheet.value("20rem")} color="black" />
                                </View>
                            </View>
                        </View>
                 </View>
                <ScrollView contentContainerStyle={{paddingBottom:EStyleSheet.value("150rem")}}>
                    <View style={{paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <View style={{backgroundColor:"white",paddingBottom:EStyleSheet.value("40rem"),height:EStyleSheet.value("180rem"),padding:EStyleSheet.value("20rem"),borderRadius:EStyleSheet.value("5rem")}}>
                            <Text style={{color:"#868889",fontSize:EStyleSheet.value("18rem")}}>{globalContext.from.language} Language</Text>
                            <TextInput 
                            ref={(ref)=>{
                                topTextInput = ref;
                            }}
                            onChangeText={(text)=>{
                                setText(text);
                            }}
                            value={text} multiline={true} style={{fontSize:EStyleSheet.value("28rem"),paddingBottom:EStyleSheet.value("55rem"),paddingTop:EStyleSheet.value("0rem")}} placeholder="Tap to enter text"/>
                            {
                                (resultDone) ?
                                <LinearGradient 
                                colors={['#ef3136', '#ffb040']}
                                end={{ x: 1, y: 0.6 }}
                                style={{position:"absolute",justifyContent:"center",alignItems:"center",backgroundColor:"red",bottom:0,borderRadius:999,left:EStyleSheet.value("20rem"),bottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("40rem"),height:EStyleSheet.value("40rem")}}>
                                    <AntDesign name="sound" size={EStyleSheet.value("18rem")} color="white" />
                                </LinearGradient>
                                :
                                <LinearGradient 
                                colors={['#ef3136', '#ffb040']}
                                end={{ x: 1, y: 0.6 }}
                                style={{position:"absolute",justifyContent:"center",alignItems:"center",backgroundColor:"red",bottom:0,borderRadius:EStyleSheet.value("10rem"),left:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("10rem"),bottom:EStyleSheet.value("20rem"),height:EStyleSheet.value("40rem")}}>
                                    <TouchableOpacity
                                    onPress={()=>{
                                        if(text.length===0){
                                            ToastAndroid.show("Please fill the input",500);
                                        }
                                        else{
                                            setResultLoading(true);
                                            setResult("");
                                            setResultDone(true);
    
                                            setTimeout(() => {
                                                setResult("Halo");
                                                setResultLoading(false);
                                            }, 1000);
                                        }
                                    }}
                                    >
                                        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                                            <Text style={{color:"white"}}>Translate</Text>
                                        </View>
                                    </TouchableOpacity>
                                </LinearGradient>
                            }
                        </View>
                    </View>
                    {
                        (resultDone) ?
                        <View style={{paddingHorizontal:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("20rem")}}>
                       
                        {
                            (resultLoading) &&     
                            <View style={{position:"absolute",width:"100%",zIndex:999,marginLeft:EStyleSheet.value("20rem"),height:"100%",justifyContent:"center",alignItems:"center"}}>
                                <ActivityIndicator size="large" color="#ef3136"/>
                            </View>
                  
                        }
                        
                        <View style={{backgroundColor:"#fff4e6",paddingBottom:EStyleSheet.value("40rem"),height:EStyleSheet.value("180rem"),padding:EStyleSheet.value("20rem"),borderRadius:EStyleSheet.value("5rem")}}>
                          
                         
                           <Text style={{color:"#868889",fontSize:EStyleSheet.value("18rem")}}>{globalContext.to.language} Language</Text>
                            <TextInput multiline={true} value={result} style={{fontSize:EStyleSheet.value("28rem"),paddingBottom:EStyleSheet.value("55rem"),paddingTop:EStyleSheet.value("0rem")}} placeholder="..."/>
                            <LinearGradient 
                             colors={['#ef3136', '#ffb040']}
                             end={{ x: 1, y: 0.6 }}
                            style={{position:"absolute",justifyContent:"center",alignItems:"center",backgroundColor:"red",bottom:0,borderRadius:999,left:EStyleSheet.value("20rem"),bottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("40rem"),height:EStyleSheet.value("40rem")}}>
                                <AntDesign name="sound" size={EStyleSheet.value("18rem")} color="white" />
                            </LinearGradient>

                            <View style={{flexDirection:"row",position:"absolute",right:EStyleSheet.value("25rem"),bottom:EStyleSheet.value("25rem")}}>
                                <Feather name="copy" size={EStyleSheet.value("18rem")} color="black" />
                                <AntDesign style={{marginLeft:EStyleSheet.value("10rem")}} name="sharealt" size={EStyleSheet.value("18rem")} color="black" />
                            </View>
                             
                        </View>
                        
                    </View>
                    :
                    null
                    }
                </ScrollView>
                 <View style={{flex:1,justifyContent:"flex-end"}}>
                    <View style={{height:EStyleSheet.value("90rem"),flexDirection:"row",justifyContent:"space-between",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{
                            refRBSheet.current.open()
                        }}
                        >
                        <MenuBurger/>
                        </TouchableOpacity>
                        <View>
                          {
                              (micLoading) ? 
                              <LinearGradient 
                              colors={['#ef3136', '#ffb040']}
                              end={{ x: 1, y: 0.6 }}
                              style={{position:"absolute",justifyContent:"center",alignItems:"center",borderRadius:999,bottom:EStyleSheet.value("35rem"),width:EStyleSheet.value("80rem"),height:EStyleSheet.value("80rem"),backgroundColor:"red",right:EStyleSheet.value("-40rem")}}>
                                 <ActivityIndicator size="large" color="white"/>
                              </LinearGradient>
                              :
                              <LinearGradient 
                              colors={['#ef3136', '#ffb040']}
                              end={{ x: 1, y: 0.6 }}
                              style={{position:"absolute",justifyContent:"center",alignItems:"center",borderRadius:999,bottom:EStyleSheet.value("35rem"),width:EStyleSheet.value("80rem"),height:EStyleSheet.value("80rem"),backgroundColor:"red",right:EStyleSheet.value("-40rem")}}>
                                  <Mic/>
                                  <Pressable 
                                  onPress={()=>{
                                      setText("");
                                      setResultLoading(true);
                                      setResult("");
                                      setResultDone(false);
                                      
                                      setMicLoading(true);

                                      setTimeout(() => {
                                            setMicLoading(false);
                                      }, 1000);
                                  }}
                                  style={{width:EStyleSheet.value("80rem"),height:EStyleSheet.value("80rem"),position:"absolute"}}>
                                  </Pressable>
                              </LinearGradient>
                          }
                          
                        </View>
                        <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{
                            topTextInput.blur();
                            triggerTextInput.blur();

                            topTextInput.focus();
                        }}
                        >
                        <Keyboard/>
                        </TouchableOpacity>
                    </View>
                 </View>
            </View>


            <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        height={EStyleSheet.value("180rem")}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.2)"
          },
          draggableIcon: {
            backgroundColor: "white"
          },
          container:{
              borderTopLeftRadius:EStyleSheet.value("20rem"),
              borderTopRightRadius:EStyleSheet.value("20rem"),
              overflow:"visible"
          }
        }}
      >
          <View style={{flex:1}}>
              <View style={{flex:1,flexDirection:"row"}}>

                  <Pressable 
                  onPress={()=>{
                     refRBSheet.current.close();
                  }}
                  style={{position:"absolute",right:EStyleSheet.value("25rem"),backgroundColor:"#ef3136",justifyContent:"center",alignItems:"center",borderRadius:999,top:EStyleSheet.value("-45rem"),width:EStyleSheet.value("40rem"),height:EStyleSheet.value("40rem")}}>
                        <AntDesign name="close" size={EStyleSheet.value("20rem")} color="white" />
                  </Pressable>

                  <TouchableOpacity 
                  activeOpacity={0.8}
                  onPress={()=>{
                        refRBSheet.current.close();
                      props.navigation.navigate("Home");
                  }}
                  style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                      <Image style={{width:EStyleSheet.value("40rem"),height:EStyleSheet.value("40rem")}} source={require("../assets/interpret.png")}></Image>
                      <Text style={{fontSize:EStyleSheet.value("18rem"),marginTop:EStyleSheet.value("10rem")}}>Interpret</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  activeOpacity={0.8}
                  onPress={()=>{
                    refRBSheet.current.close();
                    props.navigation.navigate("Conversation");
                  }}
                  style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                      <Image style={{width:EStyleSheet.value("40rem"),height:EStyleSheet.value("40rem")}} source={require("../assets/conversation.png")}></Image>
                      <Text style={{fontSize:EStyleSheet.value("18rem"),marginTop:EStyleSheet.value("10rem")}}>Conversation</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  activeOpacity={0.8}
                  onPress={()=>{
                    refRBSheet.current.close();
                    props.navigation.navigate("Translate");
                  }}
                  style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                      <Image style={{width:EStyleSheet.value("40rem"),height:EStyleSheet.value("40rem")}} source={require("../assets/translate.png")}></Image>
                      <Text style={{fontSize:EStyleSheet.value("18rem"),marginTop:EStyleSheet.value("10rem")}}>Translate</Text>
                  </TouchableOpacity>
              </View>
               <View style={{height:EStyleSheet.value("60rem"),alignItems:"center",flexDirection:"row",borderTopWidth:1,borderColor:"#e8e8e8",marginHorizontal:EStyleSheet.value("20rem")}}>
                    <AntDesign name="heart" size={EStyleSheet.value("20rem")} style={{marginRight:EStyleSheet.value("10rem")}} color="#ef3136" />
                  <Text>Favourite</Text>
              </View>
             
          </View>
      </RBSheet>

        </View>
    )
}