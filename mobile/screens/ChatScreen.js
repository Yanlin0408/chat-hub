import React, {useLayoutEffect, useState, useEffect} from 'react'
import { TouchableOpacity, TouchableWithoutFeedback, StyleSheet,TextInput, Text, View, SafeAreaView, KeyboardAvoidingView,Platform, ScrollView, Keyboard } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { AntDesign, SimpleLineIcons, Ionicons} from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar';
import DarkTheme from "../constant/darkTheme"
import * as firebase from "firebase";
import { auth, db } from "../firebase";
// import firebase from 'firebase';


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
                    <Avatar rounded source = {{uri: messages[messages.length - 1]?messages[messages.length -1].data.photoURL:"https://cdn.iconscout.com/icon/premium/png-256-thumb/chat-2469467-2043406.png"}}/>
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

    const sendMessage = () => {
        Keyboard.dismiss();  

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        db.collection('chats').doc(route.params.id).set({
            lastTimeUpdate: firebase.firestore.FieldValue.serverTimestamp(),
            lastTimePic: auth.currentUser.photoURL,
            chatName: route.params.chatName,
            lastMessage: input,
        })

        setInput('');
    };

    useEffect(() => {
        const unsubscribe = db
        .collection("chats")
        .doc(route.params.id)
        .collection("messages")
        .orderBy("timestamp","asc")
        .onSnapshot((snapshot) => 
        setMessages(
            //chats is set to be objects referring to every doc in snapshot
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        )); 

        return unsubscribe;
    }, [route]);


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
                    <ScrollView contentContainerStyle = {{paddingTop: 15}}>
                        {/* {messages.map((ms) => {
                            if(ms.data.displayName == auth.currentUser.displayName)
                                return <Text style={{ marginLeft: 70}}>{ms.data.message}</Text>
                            return <Text>{ms.data.message}</Text>
                            })} */}
                        {messages.map(({id,data}) => (
                            data.email === auth.currentUser.email
                            ?
                            <View key = {id} style = {styles.receiver}>
                                <Avatar source = {{uri: data.photoURL}} size = {40} position = "absolute" top = {0} right = {"-15%"}/>
                                <Text style={styles.receiverText}>{data.message}</Text>
                            </View>
                            :
                            <View position = "relative" key = {id} style = {styles.sender}>
                                <Avatar source = {{uri: data.photoURL}} size = {40} position = "absolute" top = {-25} left = {"-15%"}/>
                                <View >
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
                            onSubmitEditing = {sendMessage}
                            // placeholder = " chathub message"
                            placeholder = {route.params.chatData}
                            style = {styles.textInput}
                        />
                        <TouchableOpacity
                            onPress={sendMessage}
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
        // paddingTop: 20,
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
        // paddingTop: -15,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        // paddingTop: -20,
        // paddingBottom: 40,
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
    },
})
