import React, { useLayoutEffect, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button, Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome"; 
import * as firebase from "firebase";
import {auth, db} from "../firebase";
import io from "socket.io-client"
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddChatScreen = ({navigation}) => {
    const [input, setInput] = useState("");
    const [chats, setChats] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new chat",
            headerBackTitle: "Chats",
        });
    }, [navigation]);
    
    useEffect(() => {
        // clearAll();
        readChatsFromStorge();
    }, []);

    const clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          // clear error
        }
      
        console.log('Done.')
      }
      

    const readChatsFromStorge = async () => {
        try{
            const chatObject = await AsyncStorage.getItem('@chatINAsync');
            chatObject != null ? JSON.parse(chatObject) : null;

            setTimeout(() => {
                console.log("============== read in");
                console.log("item from async store: ",chatObject);
                // setChats(JSON.parse(chatObject)); 
                // setChats([...chats, JSON.parse(chatObject)])

                //这里到底怎么了
                chatObject != null ? setChats(JSON.parse(chatObject).chats) : console.log("--fuck");
                setTimeout(() => {
                    console.log("all chat, ",chats);
                    console.log(typeof(chats));
                    console.log("one from aysnc, ",chatObject);
                    console.log("============== read done");
                }, 200);
                
            }, 100);
        } catch (e) {
            alert(e);
        }
        
    }

    const saveChat = async() => {
        console.log("----: ",chats);
        const stringifiedChats = JSON.stringify({chats});
        console.log("after stringify: ",stringifiedChats);
        await AsyncStorage.setItem('@chatINAsync', stringifiedChats);
    }

    useEffect(
        () => {
            saveChat();
        }
    , [chats]);

    const createChat = async (stuff) => {
        const socket = io("http://192.168.1.71:3000/");
        socket.connect();
        socket.emit("Join-room",input);

        await db
        .collection('chats')
        .add({
            chatName: input,
            lastTimeUpdate: firebase.firestore.FieldValue.serverTimestamp(),

        })
        // .then(() => {
        //     navigation.goBack();
        // })
        // .catch((error) => alert(error));


        // store chat in local Asyncstorage
        try {
            setChats([...chats, {
                // chatName: input,
                // lastTimeUpdate: Date()
                chatName: stuff.content,
                lastTimeUpdate: stuff.date
            }
            ]);
        } catch(e) {
            console.log("fuck");
            alert(e)
        }
        
        
    };

    return (
        <View style={styles.container}>
            <Input 
                placeholder = " Enter a chat name" 
                value={input} 
                onChangeText = {(text) => setInput(text)}
                onSubmitEditing = {createChat}
                leftIcon = {
                    <Icon name="comment" type="antdesign" size={24} color="black"/>
                }
            />
            <Button disabled = {!input} onPress={()=>createChat({content:input,date:Date()})} title = "Create new Chat"/>
            {
                chats.map((chat) => ( 
                    chat != null 
                    ?
                    <Text>{chat.chatName}</Text>
                    :
                    <Text>fuck</Text>
                ))
            }
        </View>
    )
}

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {

    }

});
