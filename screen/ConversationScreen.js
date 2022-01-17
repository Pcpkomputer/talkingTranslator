import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity, TextInput, BackHandler, Pressable, useWindowDimensions, ScrollView, ActivityIndicator } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons'; 

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

export default function ConversationScreen(props) {

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
      }, [conversationStep,selectedCategory,selectedBox]);
   
    if(conversationStep===0){

    return (
        <View style={{flex:1,backgroundColor:"white",minHeight:height+EStyleSheet.value("30rem")}}>
            <View style={{height:StatusBarHeight}}></View>
            <View style={{height:EStyleSheet.value("60rem"),paddingHorizontal:EStyleSheet.value("20rem"),flexDirection:"row",justifyContent:"space-between",backgroundColor:"white"}}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Feather name="arrow-left" style={{marginBottom:EStyleSheet.value("3rem")}} size={EStyleSheet.value("20rem")} color="black" />
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
        </View>
        )
    }
    else if(conversationStep===1){

    return (
        <View style={{flex:1,backgroundColor:"white",minHeight:height+EStyleSheet.value("30rem")}}>
            <View style={{height:StatusBarHeight}}></View>
            <View style={{height:EStyleSheet.value("60rem"),paddingHorizontal:EStyleSheet.value("20rem"),flexDirection:"row",justifyContent:"space-between",backgroundColor:"white"}}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Feather name="arrow-left" style={{marginBottom:EStyleSheet.value("3rem")}} size={EStyleSheet.value("20rem")} color="black" />
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
                                <View style={{flexDirection:"row",paddingHorizontal:EStyleSheet.value("20rem")}}>
                                    <Text numberOfLines={1} style={{fontSize:EStyleSheet.value("15rem")}}>English</Text>
                                    <Feather style={{marginLeft:EStyleSheet.value("5rem")}} name="chevron-down" size={EStyleSheet.value("20rem")} color="black" />
                                </View>
                            </View>
                            <View style={{width:EStyleSheet.value("70rem")}}>
                                <TouchableOpacity
                                activeOpacity={0.9} 
                                onPress={()=>{
                                  console.log(capturedOffset);
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
                                                                    <AntDesign name="sound" size={EStyleSheet.value("18rem")} color="white" />
                                                                </LinearGradient>
                                                                <View style={{flexDirection:"row"}}>
                                                                    <Feather name="copy" size={EStyleSheet.value("18rem")} color="black" />
                                                                    <AntDesign style={{marginLeft:EStyleSheet.value("10rem")}} name="sharealt" size={EStyleSheet.value("18rem")} color="black" />
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
                                                        
                                                        setTimeout(() => {
                                                            setBoxLoading(false);
                                                            setPlaceholderText("Bisakah saya mendapatkan tanda terima?")
                                                        }, 1000);
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
        </View>
    )
    }
}