import React, {useState, useRef, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity, TextInput, BackHandler, Pressable, useWindowDimensions, ToastAndroid, ScrollView, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons'; 

import { useIsFocused } from '@react-navigation/native';

import * as Clipboard from 'expo-clipboard';

import * as Speech from 'expo-speech';

import { StatusBarHeight } from '../utils/HeightUtils';
import RBSheet from "react-native-raw-bottom-sheet";

import MenuBurger from '../svg/MenuBurger';
import Keyboard from '../svg/Keyboard';
import Mic from '../svg/Mic';
import Question from '../svg/Question';
import Mic2 from '../svg/Mic2';

import country from '../utils/country';

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

export default function ConversationScreen(props) {

  
    let focused = useIsFocused();

    let globalContext = useContext(GlobalContext);

    let [offset,setOffset] = useState(0);
    
    let Conversation2Scroll = useRef(null);

    let [capturedOffset, setCapturedOffset] = useState({});

    let [selectedConversation, setSelectedConversation] = useState(0);
    let [conversationStep, setConversationStep] = useState(0);

    let [translateBoxOpened, setTranslateBoxOpened] = useState(true);

    let [selectedSubConversation, setSelectedSubConversation] = useState(0);

    let [placeholderText, setPlaceholderText] = useState("Bisakah saya mendapatkan tanda terimaaa?");

    let [conversation, setConversation] = useState([
    {
        name:"Daily Expressions",
        categories:[
            {
                name:"All",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Check In/Out",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Hotel",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Public Spaces",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
        ]
    },
    {
        name:"Airport",
           categories:[
            {
                name:"All",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Check In/Out",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Hotel",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Public Spaces",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
        ]
    },
    {
        name:"In Flight",
           categories:[
            {
                name:"All",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Check In/Out",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Hotel",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Public Spaces",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
        ]
    },
    {
        name:"Restaurant",
           categories:[
            {
                name:"All",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Check In/Out",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Hotel",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Public Spaces",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
        ]
    },
    {
        name:"Accomodation",
           categories:[
            {
                name:"All",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Check In/Out",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Hotel",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Public Spaces",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
        ]
    },
    {
        name:"Transportation",
           categories:[
            {
                name:"All",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Check In/Out",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Hotel",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Public Spaces",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
        ]
    },
    {
        name:"Shopping",
           categories:[
            {
                name:"All",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Check In/Out",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Hotel",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Public Spaces",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
        ]
    },
    {
        name:"Tourism",
           categories:[
            {
                name:"All",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Check In/Out",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Hotel",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Public Spaces",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
        ]
    },
    {
        name:"Emergency",
           categories:[
            {
                name:"All",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Check In/Out",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Hotel",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Public Spaces",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
        ]
    },
    {
        name:"Favorites",
           categories:[
            {
                name:"All",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Check In/Out",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Hotel",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
            {
                name:"Public Spaces",
                content:[
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                    "Could I get A Receipt, Please?",
                    "I'd Like To Leave One Night Earlier",
                    "Can I Stay Another Night?",
                ]
            },
        ]
    } 
    ]);

    let height = useWindowDimensions().height;

    

    let [selectedCategory,setSelectedCategory] = useState(-1);
    let [selectedBox, setSelectedBox] = useState(-1);

    let [boxLoading, setBoxLoading] = useState(true);

    useEffect(() => {
        if(focused){
            const backAction = () => {
                if(selectedCategory!==-1 && selectedBox!==-1){
                  setSelectedCategory(-1);
                  setSelectedBox(-1);
                  return true;
                }
                else if(conversationStep===1){
                    setConversationStep(0);
                    return true;
                }
                else{
                    props.navigation.goBack();
                    return true;
                }
               
              };
          
              const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
              );
          
              return () => backHandler.remove();
        }
      }, [conversationStep,selectedCategory,selectedBox,focused]);

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
    
     const modalFromLang = useRef();
     const modalToLang = useRef();
     let [modalFromLangOpened, setModalFromLangOpened] = useState(false);
     let [modalToLangOpened, setModalToLangOpened] = useState(false);
   
    if(conversationStep===0){

    return (
        <View style={{flex:1,backgroundColor:"white",minHeight:height+EStyleSheet.value("30rem")}}>
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
                         <Text style={{fontSize:EStyleSheet.value("23rem"),marginLeft:EStyleSheet.value("10rem")}}>Conversation</Text>
                </View>
                <View style={{opacity:0}}>
                    <Text>123</Text>
                </View>
            </View>
            <View style={{flex:1,backgroundColor:"#f4f5f9"}}>
                 <View style={{marginTop:EStyleSheet.value("50rem"),marginBottom:EStyleSheet.value("40rem")}}>
                        <View style={{...shadow,height:EStyleSheet.value("50rem"),flexDirection:"row",backgroundColor:"white"}}>
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
                                style={{...shadow,position:"absolute",justifyContent:"center",alignItems:"center",backgroundColor:"white",borderRadius:999,bottom:EStyleSheet.value("-10rem"),right:EStyleSheet.value("-5rem"),width:EStyleSheet.value("75rem"),height:EStyleSheet.value("75rem")}}>
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
                 </View>
                <View style={{flex:1}}>
                    <ScrollView contentContainerStyle={{paddingBottom:EStyleSheet.value("40rem")}}>
                            {
                                conversation.map((item,index)=>{
                                    return (
                                        <TouchableOpacity 
                                        activeOpacity={0.8}
                                        onPress={()=>{
                                            setSelectedConversation(index);
                                            setConversationStep(1);
                                        }}
                                        key={`conversation-category-${index}`} style={{...shadow,marginBottom:EStyleSheet.value("15rem"),backgroundColor:"white",borderRadius:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("15rem"),paddingHorizontal:EStyleSheet.value("20rem"),marginHorizontal:EStyleSheet.value("20rem")}}>
                                            <Text style={{fontSize:EStyleSheet.value("18rem")}}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                    </ScrollView>
                </View>
            </View>


            <RBSheet
        ref={(ref)=>{
            modalFromLang.current=ref;
        }}
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
    else if(conversationStep===1){

    return (
        <View style={{flex:1,backgroundColor:"white",minHeight:height+EStyleSheet.value("30rem")}}>
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
                         <Text style={{fontSize:EStyleSheet.value("23rem"),marginLeft:EStyleSheet.value("10rem")}}>Conversation</Text>
                </View>
                <View style={{opacity:0}}>
                    <Text>123</Text>
                </View>
            </View>
            <View style={{flexDirection:"row"}}>
                <ScrollView 
                horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    conversation[selectedConversation].categories.map((item,index)=>{
                        return (
                           <Pressable
                           onPress={()=>{
                               let y = capturedOffset[`category-${index}`].y;
                               Conversation2Scroll.current.scrollTo({
                                y:y,
                                animated: true,
                               });
                               setSelectedSubConversation(index);
                           }}
                           >
                                <LinearGradient 
                                colors={(selectedSubConversation===index) ? ['#ef3136', '#ffb040']:["white","white"]}
                                end={{ x: 1, y: 0.6 }}
                                style={{fontSize:EStyleSheet.value("18rem"),justifyContent:"flex-start",alignItems:"flex-start",backgroundColor:"red",paddingHorizontal:EStyleSheet.value("30rem"),paddingVertical:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:(selectedSubConversation===index) ? "white":"black"}}>{item.name}</Text>
                                </LinearGradient>
                           </Pressable>
                        )
                    })
                }
                {/* <View style={{fontSize:EStyleSheet.value("18rem"),justifyContent:"flex-start",alignItems:"flex-start",paddingHorizontal:EStyleSheet.value("30rem"),paddingVertical:EStyleSheet.value("10rem")}}>
                    <Text>Check In/Out</Text>
                </View>
                <View style={{fontSize:EStyleSheet.value("18rem"),justifyContent:"flex-start",alignItems:"flex-start",paddingHorizontal:EStyleSheet.value("30rem"),paddingVertical:EStyleSheet.value("10rem")}}>
                    <Text>Hotel</Text>
                </View>
                <View style={{fontSize:EStyleSheet.value("18rem"),justifyContent:"flex-start",alignItems:"flex-start",paddingHorizontal:EStyleSheet.value("30rem"),paddingVertical:EStyleSheet.value("10rem")}}>
                    <Text>Guest House</Text>
                </View> */}
                </ScrollView>
            </View>
            <View style={{flex:1,backgroundColor:"#f4f5f9"}}>
                 <View style={{marginTop:EStyleSheet.value("50rem"),marginBottom:EStyleSheet.value("40rem")}}>
                 <View style={{...shadow,height:EStyleSheet.value("50rem"),flexDirection:"row",backgroundColor:"white"}}>
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
                                style={{...shadow,position:"absolute",justifyContent:"center",alignItems:"center",backgroundColor:"white",borderRadius:999,bottom:EStyleSheet.value("-10rem"),right:EStyleSheet.value("-5rem"),width:EStyleSheet.value("75rem"),height:EStyleSheet.value("75rem")}}>
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
                 </View>
                <View style={{flex:1}}>
                    <ScrollView 
                    ref={Conversation2Scroll}
                    onScroll={(event)=>{

                        var currentOffset = event.nativeEvent.contentOffset.y;
                        var direction = currentOffset > offset ? 'down' : 'up';
                        setOffset(currentOffset);
                        //console.log(direction);

                        if(direction==="up"){
                            let y = event.nativeEvent.contentOffset.y;

                            if(y<capturedOffset[`category-${selectedSubConversation}`].y){
                                if(y>0){
                                    setSelectedSubConversation(selectedSubConversation-1);
                                }
                            }
                            
                        }
                        else if(direction==="down"){
                            let y = event.nativeEvent.contentOffset.y;
                            if(capturedOffset[`category-${selectedSubConversation+1}`]?.y){
                                if(y>capturedOffset[`category-${selectedSubConversation+1}`].y){
                                    setSelectedSubConversation(selectedSubConversation+1);
                                }
                            }
                        }

                       
                    
                        
                      
                        
                        // if(y<capturedOffset[`category-${selectedSubConversation+1}`].y){
                        //     setSelectedSubConversation(selectedSubConversation-1);

                        //     console.log(y);
                        //     console.log(capturedOffset[`category-${selectedSubConversation+1}`]);
                        // }
                     
                        
                    }}
                    contentContainerStyle={{paddingBottom:EStyleSheet.value("40rem")}}>
                        {
                            conversation[selectedConversation].categories.map((item,index)=>{
                                return (
                                    <View 
                                    onLayout={(event)=>{

                                       let y = event.nativeEvent.layout.y;
                                       setCapturedOffset((prev)=>{
                                          let payload = {...prev};
                                          payload[`category-${index}`]={
                                              index:index,
                                              y:y
                                          };

                                           return payload;
                                       })
                                    }}
                                    style={{marginBottom:EStyleSheet.value("20rem")}}>
                                        <View style={{marginHorizontal:EStyleSheet.value("20rem"),marginBottom:EStyleSheet.value("10rem")}}>
                                            <Text style={{color:"#868889"}}>{item.name}</Text>
                                        </View>
                                        {
                                            item.content.map((content,contentindex)=>{
                                                if(index===selectedCategory && contentindex===selectedBox){
                                                    return (
                                                        <View style={{...shadow,height:EStyleSheet.value("200rem"),marginBottom:EStyleSheet.value("15rem"),backgroundColor:"white",borderRadius:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("15rem"),paddingHorizontal:EStyleSheet.value("20rem"),marginHorizontal:EStyleSheet.value("20rem")}}>
                                                            
                                                            {
                                                                (boxLoading) &&
                                                                <View style={{position:"absolute",justifyContent:"center",alignItems:"center",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),width:Dimensions.get("screen").width-EStyleSheet.value("40rem"),height:EStyleSheet.value("200rem"),zIndex:100}}>
                                                                    <View style={{backgroundColor:"#ef3136",position:"absolute",width:"100%",height:"100%",opacity:0.4}}></View>
                                                                    <ActivityIndicator size="large" color="white"/>
                                                                </View>
                                                            }

                                                            <Text style={{color:"#868889",fontSize:EStyleSheet.value("15rem")}}>{content}</Text>
                                                            <View style={{flex:1,paddingVertical:EStyleSheet.value("5rem")}}>
                                                                <ScrollView>
                                                                <Text style={{fontSize:EStyleSheet.value("23rem")}}>{placeholderText}</Text>
                                                                </ScrollView>
                                                            </View>
                                                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                                                                <LinearGradient 
                                                                 colors={['#ef3136', '#ffb040']}
                                                                 end={{ x: 1, y: 0.6 }}
                                                                style={{width:EStyleSheet.value("40rem"),justifyContent:"center",alignItems:"center",backgroundColor:"red",borderRadius:999,height:EStyleSheet.value("40rem")}}>
                                                                    <TouchableOpacity 
                                                                    activeOpacity={0.6}
                                                                    onPress={async ()=>{
                                                                        await Speech.speak(placeholderText,{
                                                                            language:globalContext.from.code
                                                                        });
                                                                    }}
                                                                    style={{width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
                                                                    <AntDesign name="sound" size={EStyleSheet.value("18rem")} color="white" />
                                                                    </TouchableOpacity>
                                                                </LinearGradient>
                                                                <View style={{flexDirection:"row"}}>
                                                                        <TouchableOpacity
                                                                        activeOpacity={0.5}
                                                                        onPress={()=>{
                                                                            Clipboard.setString(placeholderText);
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
                                                                                `${placeholderText}`,
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
                                                    )
                                                }
                                                return (
                                                    <TouchableOpacity 
                                                    activeOpacity={0.8}
                                                    onPress={async ()=>{
                                                        setBoxLoading(true);

                                                        setPlaceholderText("");
                                                        setSelectedCategory(index);
                                                        setSelectedBox(contentindex);

                                                        let t = conversation[selectedConversation].categories[index].content[contentindex];
                                                        
                                                        let res = await translateFrom(t);


                                                        setBoxLoading(false);
                                                        setPlaceholderText(res.result);

                                                  
                                                    }}
                                                    style={{...shadow,marginBottom:EStyleSheet.value("15rem"),backgroundColor:"white",borderRadius:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("15rem"),paddingHorizontal:EStyleSheet.value("20rem"),marginHorizontal:EStyleSheet.value("20rem")}}>
                                                        <Text style={{fontSize:EStyleSheet.value("15rem")}}>{content}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                )
                            })
                        }

                        
                    </ScrollView>
                </View>
            </View>

            <RBSheet
        ref={(ref)=>{
            modalFromLang.current=ref;
        }}
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
}