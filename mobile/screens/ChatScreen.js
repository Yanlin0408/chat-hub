import React, {useLayoutEffect, useState, useEffect, useRef} from 'react'
import { TouchableOpacity, TouchableWithoutFeedback, StyleSheet,TextInput, Text, View, SafeAreaView, KeyboardAvoidingView,Platform, ScrollView, Keyboard } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { AntDesign, SimpleLineIcons, Ionicons} from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar';
import DarkTheme from "../constant/darkTheme"
import * as firebase from "firebase";
import { auth, db } from "../firebase";
import uuid from 'react-native-uuid';
import { Logs } from 'expo'
import {ws} from "../ws"
import moment from "moment";
import AsyncStorage from '@react-native-async-storage/async-storage';

Logs.enableExpoCliLogging()

const ChatScreen = ({navigation, route}) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {

        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAligh: "left",
            headerTitle: () => (
                <View 
                    style = {{
                    flexDirection: "row",
                    alignItems: "center",
                    }}
                >
                    <Avatar 
                        rounded 
                        source = {{uri: messages[messages.length - 1]
                        ?messages[messages.length -1]
                        .data.photoURL:"https://cdn.iconscout.com/icon/premium/png-256-thumb/chat-2469467-2043406.png"}}
                    />
                    <Text style = {{color: "white", marginLeft:10, fontWeight: "500"}}>
                    {route.params.chatName}
                    </Text>
                </View>),
            // headerRight: () => (
            //     <View
            //         style={{
            //         flexDirection: "row",
            //         justifyContent: "space-between",
            //         width: 80,
            //         marginRight: 20,
            //     }}
            //     >
            //         <TouchableOpacity>
            //             <fontAwesome></fontAwesome>
            //         </TouchableOpacity>
            //     </View>
            // )
        });
    }, [navigation, messages]);

    useEffect(() => {
        ws.emit("Join-room",route.params.chatName,auth.currentUser.displayName);
        readMessagesFromStorge();

      return () => {
        ws.removeAllListeners("Join-room")
      };
    }, []);
    
    const readMessagesFromStorge = async () => {
        try{
            const chatObject = await AsyncStorage.getItem(`@${route.params.chatName}`);
            chatObject != null ? JSON.parse(chatObject) : null;

            setTimeout(() => {
                console.log("============== read in");
                console.log("item from async store: ",chatObject);
                chatObject != null ? setMessages(JSON.parse(chatObject).messages) : console.log("--fuck");
                setTimeout(() => {
                    console.log("all chat, ",messages);
                    console.log(typeof(messages));
                    console.log("one from aysnc, ",chatObject);
                    console.log("============== read done");
                }, 200);
                
            }, 100);
        } catch (e) {
            alert(e);
        } 
    };

    const sendMessage = (msg) => {
        Keyboard.dismiss();  
        ws.emit("send-message", route.params.chatName,msg);
        setMessages([...messages,msg]);

        // update field in "message"
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        // update field in "chat"
        db.collection('chats').doc(route.params.id).set({
            lastTimeUpdate: firebase.firestore.FieldValue.serverTimestamp(),
            lastTimePic: auth.currentUser.photoURL,
            chatName: route.params.chatName,
            lastMessage: input,
        })
        console.log("----aaaa ---");

        setInput('');
    };

    const saveMsgs = async() => {
        console.log("----: ",messages);
        const stringifiedChats = JSON.stringify({messages});
        console.log("after stringify: ",stringifiedChats);
        await AsyncStorage.setItem(`@${route.params.chatName}`, stringifiedChats);
    }

    useEffect(
        () => {
            saveMsgs();
            console.log("########   存信息")
        }    
    , [messages]);

    const receiveListener = (msg) =>  {
        setMessages([...messages,msg]);
        // () => {
        //     saveMsgs();
        // }
    }
    // if we choose to render chat messages from local storage
    // read: load from AsyncStorage
    // written: store to AsyncStorage locally 
    //          and store whatever msg emitted from socket io
    useEffect(() => {
        // setMessages 
        ws.on("receive-message",receiveListener);
        // AsyncStorage (the whole useState)
        

        return () => {
            ws.off("receive-message",receiveListener)
        };
    }, [messages]);

    // if we choose to render chat messages from onSnapshot
    // useEffect(() => {
    //     const unsubscribe = db
    //     .collection("chats")
    //     .doc(route.params.id)
    //     .collection("messages")
    //     .orderBy("timestamp","asc")
    //     .onSnapshot((snapshot) => 
    //         setMessages(
    //             //chats is set to be objects referring to every doc in snapshot
    //             snapshot.docs.map((doc) => ({
    //                 id: doc.id,
    //                 data: doc.data(),
    //             }))
    //         )
    //     ); 
        
    //     // 在这，如果想读完数据之后再 unsubscribe, 
    //     // 直接呼叫 unsubscribe 不行，因为都是同步，
    //     // unsubscribe 不会等我们拿到 onSnapshot 再执行
    //     // 所以用 setTimeout, 把 unsubscribe 放入异步队列，就能把顺序设定好

    //     // setTimeout(() => {
    //     //     unsubscribe();
    //     // }, 2000);

    //     return unsubscribe;
    // }, [route]);

    const scrollRef = useRef();

    return (
        <SafeAreaView style = {{flex:1, backgroundColor: "black"}}>
            <StatusBar style = "light"/>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style = {styles.container}
                keyboardVerticalOffset = {90}    
            >
                <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
                <>
                    <ScrollView contentContainerStyle = {{paddingTop: 15}} ref={scrollRef} onContentSizeChange={() => scrollRef.current.scrollToEnd()}>
                        {messages.map(({id,data},index,array) => (
                            
                            data.email === auth.currentUser.email
                            ?
                            
                            <View key = {id} >
                                {(index-1 >= 0 && (Math.abs(Date.parse(array[index].data.date) - Date.parse(array[index-1].data.date))/(60*1000))>0.5)
                                ? 
                                <Text style = {styles.dateStyle}>{moment(array[index].data.date).calendar()}</Text> 
                                : 
                                null }
                                {/* <Text>{parseDate(array[index].data.date).getFullYear()}</Text> */}
                                {/* <Text>{Date.parse(array[index].data.date)}</Text> */}
                                <View style = {styles.receiver}>
                                    <Avatar source = {{uri: data.photoURL}} size = {40} position = "absolute" top = {0} right = {"-15%"}/>
                                    <Text style={styles.receiverText}>{data.message}</Text>
                                </View>
                                
                            </View>
                            :
                            <View position = "relative" key = {id} >
                                {(index-1 >= 0 && (Math.abs(Date.parse(array[index].data.date) - Date.parse(array[index-1].data.date))/(60*1000))>0.5)
                                ? 
                                <Text style = {styles.dateStyle}>{moment(array[index].data.date).calendar()}</Text> 
                                : 
                                null}
                                <View style = {styles.sender}>
                                    <Avatar source = {{uri: data.photoURL}} size = {40} position = "absolute" top = {-25} left = {"-15%"}/>
                                    <Text  style={styles.senderName}>{data.displayName}</Text>
                                    <Text style={styles.senderText}>{data.message}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                    <View style = {styles.footer}>
                        <TextInput 
                            value = {input}
                            onChangeText = {(text) => setInput(text)}
                            onSubmitEditing = {() => sendMessage({
                                                                    id: uuid.v4(),
                                                                    data: {
                                                                        message: input,
                                                                        date: Date(),
                                                                        email: auth.currentUser.email,
                                                                        photoURL: auth.currentUser.photoURL,
                                                                        displayName: auth.currentUser.displayName,
                                                                    },
                                                                })}
                            placeholder = " chathub message"
                            // placeholder = {route.params.chatData}
                            style = {styles.textInput}
                        />
                        <TouchableOpacity
                            onPress={() => sendMessage({
                                                        id: uuid.v4(),
                                                        data: {
                                                            message: input,
                                                            date: Date(),
                                                            email: auth.currentUser.email,
                                                            photoURL: auth.currentUser.photoURL,
                                                            displayName: auth.currentUser.displayName,
                                                        },
                                                    })}
                            activeOpacity={0.5}
                        >
                            <Ionicons name="send" size={24} color={DarkTheme.orange}/>
                        </TouchableOpacity>
                    </View>
                    </>
                </TouchableWithoutFeedback>
                
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen;

const styles = StyleSheet.create({
    receiverText: {
        color: "white",
        padding: 10,
        position: "relative",
        marginLeft: 1,
    },
    receiver: {
        backgroundColor: DarkTheme.orange,

        alignSelf: "flex-end",
        borderRadius: 10,
        marginRight: "16%",
        marginBottom: 10,
        marginTop: 10,
        maxWidth: "80%",
        position: "relative",
    },
    dateStyle: {
        position: "relative",
        color: "white",
        textAlign: 'center',
        paddingVertical: 4,
    },
    senderName: {
        position: "relative",
        color: "white",
        marginLeft: 1,
        bottom: 26
    },
    senderText: {
        position: "relative",
        color: "white",
        marginTop: -20,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    sender: {
        backgroundColor: DarkTheme.grey,
        alignSelf: "flex-start",
        borderRadius: 10,
        marginTop: 30,
        marginLeft: "16%",
        marginBottom: 10,
        maxWidth: "80%",
        position: "relative",
    },
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: DarkTheme.grey,
        borderWidth: 1,
        padding: 10,
        color: DarkTheme.orange,
        borderRadius: 30,
    }
})
