import React, {useState,useEffect, useRef, useContext} from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity, TextInput, Image, useWindowDimensions, Share, Pressable, ScrollView, ActivityIndicator, Touchable, ToastAndroid } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons'; 

import * as Speech from 'expo-speech';

import RBSheet from "react-native-raw-bottom-sheet";

import { StatusBarHeight } from '../utils/HeightUtils';

import { useIsFocused } from '@react-navigation/native';

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';

import Voice from '@react-native-voice/voice';

import * as Clipboard from 'expo-clipboard';


import MenuBurger from '../svg/MenuBurger';
import Keyboard from '../svg/Keyboard';
import Mic from '../svg/Mic';
import Question from '../svg/Question';
import Mic2 from '../svg/Mic2';

import {GlobalContext} from '../App';

import country from '../utils/country';


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

    let focused = useIsFocused();

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


    let translateFrom = async(text)=>{

    let request = await fetch(`https://language-translator-mediatech.herokuapp.com/translate`,{
        method:"POST",
        headers:{
          "content-type":"application/json",
        },
        body:JSON.stringify({
          "text": text,
          "from": globalContext.from.code,
          "to": globalContext.to.code,
        })
      });
      let response = await request.json();
      return response;
 }


    useEffect(()=>{
       if(focused){
        setMicLoading(false);

        Voice.destroy().then(Voice.removeAllListeners);
        if(focused){
          Voice.onSpeechStart = ()=>{
            console.log("speech start");
          }
          Voice.onSpeechEnd = ()=>{
            console.log("speech end");
            setMicLoading(false);
            // setLeftMicIsOn(false);
            // setRightMicIsOn(false);
          }
          Voice.onSpeechResults = (event)=>{
            let text = event.value[0];
            setMicLoading(false);
            setText(text);

            
          }
        }
       }
      },[focused]);

      let showAds = async()=>{
        await AdMobInterstitial.setAdUnitID('ca-app-pub-5944538170419621/3603788220'); 
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false});
        await AdMobInterstitial.showAdAsync();
      }
    
      useEffect(()=>{
        showAds();
    },[focused]);


    const modalFromLang = useRef();
    const modalToLang = useRef();
    let [modalFromLangOpened, setModalFromLangOpened] = useState(false);
    let [modalToLangOpened, setModalToLangOpened] = useState(false);


    

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
                            <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress={()=>{
                                modalFromLang.current.open();
                                setTimeout(() => {
                                setModalFromLangOpened(true);
                                }, 250);
                            }}
                            style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",paddingHorizontal:EStyleSheet.value("20rem")}}>
                                <View style={{flexDirection:"row",paddingHorizontal:EStyleSheet.value("20rem")}}>
                                    <Text numberOfLines={1} style={{fontSize:EStyleSheet.value("15rem")}}>{globalContext.from.language}</Text>
                                    <Feather style={{marginLeft:EStyleSheet.value("5rem")}} name="chevron-down" size={EStyleSheet.value("20rem")} color="black" />
                                </View>
                            </TouchableOpacity>
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
                            <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress={()=>{
                                modalToLang.current.open();
                                setTimeout(() => {
                                setModalToLangOpened(true);
                                }, 250);
                            }}
                             style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",paddingHorizontal:EStyleSheet.value("20rem")}}>
                                <View style={{flexDirection:"row",paddingHorizontal:EStyleSheet.value("20rem")}}>
                                    <Text numberOfLines={1} style={{fontSize:EStyleSheet.value("15rem")}}>{globalContext.to.language}</Text>
                                    <Feather style={{marginLeft:EStyleSheet.value("5rem")}} name="chevron-down" size={EStyleSheet.value("20rem")} color="black" />
                                </View>
                            </TouchableOpacity>
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
                                    <TouchableOpacity 
                                    activeOpacity={0.8}
                                    onPress={async ()=>{
                                        await Speech.speak(text,{
                                            language:globalContext.from.code
                                        });
                                    }}
                                    style={{width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
                                        <AntDesign name="sound" size={EStyleSheet.value("18rem")} color="white" />
                                    </TouchableOpacity>
                                </LinearGradient>
                                :
                                <LinearGradient 
                                colors={['#ef3136', '#ffb040']}
                                end={{ x: 1, y: 0.6 }}
                                style={{position:"absolute",justifyContent:"center",alignItems:"center",backgroundColor:"red",bottom:0,borderRadius:EStyleSheet.value("10rem"),left:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("10rem"),bottom:EStyleSheet.value("20rem"),height:EStyleSheet.value("40rem")}}>
                                    <TouchableOpacity
                                    onPress={async ()=>{
                                        if(text.length===0){
                                            ToastAndroid.show("Please fill the input",500);
                                        }
                                        else{
                                            setResultLoading(true);
                                            setResult("");
                                            setResultDone(true);
    
                                            // setTimeout(() => {
                                            //     setResult("Halo");
                                            //     setResultLoading(false);
                                            // }, 1000);

                                            let result = await translateFrom(text);
                                            setResult(result.result);
                                            setResultLoading(false);
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
                                  <TouchableOpacity 
                                    activeOpacity={0.8}
                                    onPress={async ()=>{
                                        await Speech.speak(result,{
                                            language:globalContext.to.code
                                        });
                                    }}
                                    style={{width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
                                <AntDesign name="sound" size={EStyleSheet.value("18rem")} color="white" />
                                </TouchableOpacity>
                            </LinearGradient>

                            <View style={{flexDirection:"row",position:"absolute",right:EStyleSheet.value("25rem"),bottom:EStyleSheet.value("25rem")}}>
                                <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={()=>{
                                    Clipboard.setString(result);
                                    ToastAndroid.show("Success copy to clipboard",500);
                                }}
                                >
                                    <Feather name="copy" size={EStyleSheet.value("18rem")} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={async ()=>{
                                    const res = await Share.share({
                                        message:
                                          `${result}`,
                                      });
                                      if (res.action === Share.sharedAction) {
                                        if (res.activityType) {
                                          // shared with activity type of result.activityType
                                        } else {
                                          // shared
                                        }
                                      } else if (res.action === Share.dismissedAction) {
                                        // dismissed
                                      }
                                }}
                                >
                                <AntDesign style={{marginLeft:EStyleSheet.value("10rem")}} name="sharealt" size={EStyleSheet.value("18rem")} color="black" />
                                </TouchableOpacity>
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
                                  onPress={async ()=>{
                                      setText("");
                                      setResultLoading(true);
                                      setResult("");
                                      setResultDone(false);
                                      
                                      setMicLoading(true);

                                      let avail = await Voice.isAvailable();
                                
                                      if(avail){
                                            Voice.start(`${globalContext.from.code}`); 
                                        
                                      }
                                      else{
                                          ToastAndroid.show("Voice recognition is not supported in this device",500);
                                      }
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



      <RBSheet
        ref={modalFromLang}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        closeOnPressMask={true}
        openDuration={250}
        onClose={()=>{
            setModalFromLangOpened(false);
        }}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.2)"
          },
          draggableIcon: {
          }
        }}
      >
          <ScrollView contentContainerStyle={{flex:(modalFromLangOpened) ? null:1}}>
              <View style={{flex:1}}>
                {
                    (modalFromLangOpened) &&
                    
                        (country).map((item,index)=>{
                            return (
                              <Pressable 
                              onPress={()=>{
                                  globalContext.setFrom(item);
                                  modalFromLang.current.close();
                              }}
                              android_ripple={{
                                  color:"#e8e8e8"
                              }}
                              style={{justifyContent:"center",alignItems:"center",paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("20rem")}}>
                                  <Text style={{fontSize:EStyleSheet.value("16rem")}}>{item.language}</Text>
                              </Pressable> 
                            )
                        })                        
                    
                }
                {
                    (!modalFromLangOpened) &&
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                            <ActivityIndicator color="#ef3136" size="large"/>
                        </View>
                }
              </View>
          </ScrollView>
      </RBSheet>


      <RBSheet
        ref={modalToLang}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        closeOnPressMask={true}
        openDuration={250}
        onClose={()=>{
            setModalToLangOpened(false);
        }}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.2)"
          },
          draggableIcon: {
          }
        }}
      >
          <ScrollView contentContainerStyle={{flex:(modalToLangOpened) ? null:1}}>
              <View style={{flex:1}}>
                {
                    (modalToLangOpened) &&
                        (country).map((item,index)=>{
                            return (
                              <Pressable 
                              onPress={()=>{
                                globalContext.setTo(item);
                                modalToLang.current.close();
                              }}
                              android_ripple={{
                                  color:"#e8e8e8"
                              }}
                              style={{justifyContent:"center",alignItems:"center",paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("20rem")}}>
                                  <Text style={{fontSize:EStyleSheet.value("16rem")}}>{item.language}</Text>
                              </Pressable> 
                            )
                        })
                        
                       
                    
                }
                {
                    (!modalToLangOpened) &&
                    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                        <ActivityIndicator color="#ef3136" size="large"/>
                    </View>
                }
              </View>
          </ScrollView>
      </RBSheet>

        </View>
    )
}