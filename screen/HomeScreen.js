import React, {useRef, useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity,ActivityIndicator,ScrollView, BackHandler, TextInput, useWindowDimensions, Image, Pressable, Touchable, ToastAndroid } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons'; 

import { useIsFocused } from '@react-navigation/native';

import Voice from '@react-native-voice/voice';

import country from '../utils/country';

import RBSheet from "react-native-raw-bottom-sheet";

import { StatusBarHeight } from '../utils/HeightUtils';

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
  } from 'expo-ads-admob';

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
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
}

export default function HomeScreen(props) {

    let [topTextInputLoading, setTopTextInputLoading] = useState(false);
    let [bottomTextInputLoading, setBottomTextInputLoading] = useState(false);

    let [mic,setMic] = useState("");

    let focused = useIsFocused();

    let [focusedCursor, setFocusedCursor] = useState("bottom");

    let triggerTextInput = useRef();
    let bottomTextInput = useRef();
    let topTextInput = useRef();

    let [lang,setLang] = useState(country);

    let globalContext = useContext(GlobalContext);

    let height = useWindowDimensions().height;

    const refRBSheet = useRef();


    const modalFromLang = useRef();
    const modalToLang = useRef();
    let [modalFromLangOpened, setModalFromLangOpened] = useState(false);
    let [modalToLangOpened, setModalToLangOpened] = useState(false);


    let [bottomMicLoading, setBottomMicLoading] = useState(false);
    let [topMicLoading, setTopMicLoading] = useState(false);

    let [topText, setTopText] = useState("");
    let [bottomText, setBottomText] = useState("");

    let [placeholderText, setPlaceholderText] = useState("");

    useEffect(()=>{
        if(focused){
            setTopMicLoading(false);
            setBottomMicLoading(false);
            
            Voice.destroy().then(Voice.removeAllListeners);
            if(focused){
              Voice.onSpeechStart = ()=>{
                console.log("speech start");
              }
              Voice.onSpeechEnd = ()=>{
                console.log("speech end");
                setTopMicLoading(false);
                setBottomMicLoading(false);
                // setLeftMicIsOn(false);
                // setRightMicIsOn(false);
              }
              Voice.onSpeechResults = (event)=>{
                let text = event.value[0];
    
                setPlaceholderText(text);
              }
            }
        }
       
      },[focused]);


      useEffect(() => {
        if(focused){
            const backAction = () => {
            
                BackHandler.exitApp();
                return true;
             
            };
        
            const backHandler = BackHandler.addEventListener(
              "hardwareBackPress",
              backAction
            );
        
            return () => backHandler.remove();
        }
      }, [focused]);


      let showAds = async()=>{
        await AdMobInterstitial.setAdUnitID('ca-app-pub-5944538170419621/3603788220'); 
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false});
        await AdMobInterstitial.showAdAsync();
      }
    
      useEffect(()=>{
        showAds();
    },[focused]);


 let translateFrom = async()=>{

    let request = await fetch(`https://language-translator-mediatech.herokuapp.com/translate`,{
        method:"POST",
        headers:{
          "content-type":"application/json",
        },
        body:JSON.stringify({
          "text": placeholderText,
          "from": globalContext.from.code,
          "to": globalContext.to.code,
        })
      });
      let response = await request.json();
      return response;
 }



 let translateTo = async()=>{

    let request = await fetch(`https://language-translator-mediatech.herokuapp.com/translate`,{
        method:"POST",
        headers:{
          "content-type":"application/json",
        },
        body:JSON.stringify({
          "text": placeholderText,
          "from": globalContext.to.code,
          "to": globalContext.from.code,
        })
      });
      let response = await request.json();
      return response;
 }


  useEffect(()=>{
    setTimeout(() => {
        if(mic==="bottom"){
            setBottomText(placeholderText);
            setBottomMicLoading(false);

            setTopTextInputLoading(true);

            translateFrom().then((res)=>{
                setTopText(res.result);
                setTopTextInputLoading(false);
                setMic("");
                setPlaceholderText("");
            })
  
        }  
        else if(mic==="top"){
            setTopText(placeholderText);
            setTopMicLoading(false);

            setBottomTextInputLoading(true);

            translateTo().then((res)=>{
                setBottomText(res.result);
                setBottomTextInputLoading(false);
                setMic("");
                setPlaceholderText("");
            })
        }
    }, 1000);
  },[placeholderText])


  return (
    <View style={{flex:1,backgroundColor:"#f4f5f9",minHeight:height+EStyleSheet.value("30rem")}}>

        <TextInput 
        value={""}
        ref={(ref)=>{
            triggerTextInput = ref;
        }}
        style={{height:1,position:"absolute"}}/>

        <LinearGradient 
         colors={['#ef3136', '#ffb040']}
         end={{ x: 1, y: 0.6 }}
        style={{flex:1,backgroundColor:"#ef3136",paddingTop:StatusBarHeight}}>
              <View style={{height:EStyleSheet.value("90rem"),flexDirection:"row",alignItems:"flex-end",justifyContent:"space-between",paddingHorizontal:EStyleSheet.value("20rem")}}>
                <FontAwesome5 style={{transform:[{rotate:"180deg"}]}} name="question-circle" size={EStyleSheet.value("33rem")} color="white" />
                <View>
                  {
                      (topMicLoading) ?
                      <LinearGradient 
                      colors={['white', 'white']}
                      end={{ x: 1, y: 0.6 }}
                      style={{position:"absolute",transform:[{rotate:"180deg"}],justifyContent:"center",alignItems:"center",borderRadius:999,bottom:EStyleSheet.value("-30rem"),width:EStyleSheet.value("80rem"),height:EStyleSheet.value("80rem"),backgroundColor:"red",right:EStyleSheet.value("-40rem")}}>
                          <ActivityIndicator size="large" color="#ef3136"/>
                      </LinearGradient>
                      :
                      <LinearGradient 
                      colors={['white', 'white']}
                      end={{ x: 1, y: 0.6 }}
                      style={{position:"absolute",transform:[{rotate:"180deg"}],justifyContent:"center",alignItems:"center",borderRadius:999,bottom:EStyleSheet.value("-30rem"),width:EStyleSheet.value("80rem"),height:EStyleSheet.value("80rem"),backgroundColor:"red",right:EStyleSheet.value("-40rem")}}>
                          <Mic2/>
                          <Pressable 
                          onPress={async ()=>{

                                let avail = await Voice.isAvailable();
                                
                                if(avail){
                                    let preload = function(){
                                        return new Promise((resolve,reject)=>{
                                            setTopMicLoading(true);
                                            setMic("top");
                                            resolve();
                                        })
                                    }

                                    preload().then(()=>{
                                        Voice.start(`${globalContext.to.code}`); 
                                    });
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
                <View style={{opacity:0}}>
                <Keyboard/>
                </View>
            </View>
            <View style={{flex:1,justifyContent:"center",transform:[{rotate:"180deg"}],paddingVertical:EStyleSheet.value("40rem"),paddingHorizontal:EStyleSheet.value("50rem"),alignItems:"center"}}>
                {
                    (topTextInputLoading) ? 
                    <View>
                        <ActivityIndicator size="large" color="white"/>
                    </View>
                    :
                    <TextInput 
                    ref={(ref)=>{
                        topTextInput = ref;
                    }}
                    onFocus={()=>{
                        setFocusedCursor("top");
                    }}
                    onChangeText={(text)=>{
                        setTopText(text);
                    }}
                    showSoftInputOnFocus={false} placeholder="Press to speak" value={topText} multiline={true} style={{fontSize:EStyleSheet.value("30rem"),color:"white"}}/>
                }
            </View>
        </LinearGradient>
        <View style={{...shadow,height:EStyleSheet.value("60rem"),flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",paddingHorizontal:EStyleSheet.value("20rem")}}>
                <TouchableOpacity 
                activeOpacity={0.8}
                onPress={()=>{
                    modalFromLang.current.open();
                    setTimeout(() => {
                    setModalFromLangOpened(true);
                    }, 250);
                }}
                style={{flexDirection:"row",paddingHorizontal:EStyleSheet.value("20rem")}}>
                    <Text numberOfLines={1} style={{fontSize:EStyleSheet.value("15rem")}}>{globalContext.from.language}</Text>
                    <Feather style={{marginLeft:EStyleSheet.value("5rem")}} name="chevron-down" size={EStyleSheet.value("20rem")} color="black" />
                </TouchableOpacity>
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
                style={{...shadow,position:"absolute",justifyContent:"center",alignItems:"center",backgroundColor:"white",borderRadius:999,bottom:EStyleSheet.value("-8rem"),right:EStyleSheet.value("-5rem"),width:EStyleSheet.value("80rem"),height:EStyleSheet.value("80rem")}}>
                    <MaterialIcons name="swap-horiz" size={EStyleSheet.value("40rem")} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{flex:1,flexDirection:"row",justifyContent:"center",alignItems:"center",paddingHorizontal:EStyleSheet.value("20rem")}}>
                 <TouchableOpacity 
                activeOpacity={0.8}
                onPress={()=>{
                    modalToLang.current.open();
                    setTimeout(() => {
                    setModalToLangOpened(true);
                    }, 250);
                }}
                style={{flexDirection:"row",paddingHorizontal:EStyleSheet.value("20rem")}}>
                    <Text numberOfLines={1} style={{fontSize:EStyleSheet.value("15rem")}}>{globalContext.to.language}</Text>
                    <Feather style={{marginLeft:EStyleSheet.value("5rem")}} name="chevron-down" size={EStyleSheet.value("20rem")} color="black" />
                </TouchableOpacity>
            </View>
        </View>
        <View style={{flex:1,backgroundColor:"#f4f5f9"}}>
            <View style={{flex:1,justifyContent:"center",paddingVertical:EStyleSheet.value("40rem"),paddingHorizontal:EStyleSheet.value("50rem"),alignItems:"center"}}>
                {
                    (bottomTextInputLoading) ?
                    <View>
                        <ActivityIndicator size="large" color="black"/>
                    </View>
                    :
                    <TextInput 
                    ref={(ref)=>{
                        bottomTextInput = ref;
                    }}
                    onFocus={()=>{
                        setFocusedCursor("bottom");
                    }}
                    onChangeText={(text)=>{
                        setBottomText(text);
                    }}
                    showSoftInputOnFocus={false} placeholder="Press to speak" value={bottomText} multiline={true} style={{fontSize:EStyleSheet.value("30rem")}}/>
               
                }
               </View>
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
                       (bottomMicLoading) ?
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
                              
                                let avail = await Voice.isAvailable();

                                if(avail){
                                    let preload = function(){
                                        return new Promise((resolve,reject)=>{
                                            setBottomMicLoading(true);
                                            setMic("bottom");
                                            resolve();
                                        })
                                    }
    
                                    preload().then(()=>{
                                        Voice.start(`${globalContext.from.code}`); 
                                    });
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
                    triggerTextInput.blur();
                    topTextInput.blur();

                    triggerTextInput.focus();

                    if(focusedCursor==="top"){
                        topTextInput.focus();
                    }
                    else{

                        bottomTextInput.focus();
                    }
                }}
                >
                <Keyboard/>
                </TouchableOpacity>
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
  );
}

