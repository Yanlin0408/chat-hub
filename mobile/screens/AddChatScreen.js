import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button, Input} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome"; 
import * as firebase from "firebase";
import {auth, db} from "../firebase";
import io from "socket.io-client"

const AddChatScreen = ({navigation}) => {
    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new chat",
            headerBackTitle: "Chats",
        });
    }, [navigation]);

    const createChat = async () => {
        const socket = io("http://192.168.1.71:3000/");
        socket.connect();
        socket.emit("Join-room",input);

        
        await db
        .collection('chats')
        .add({
            chatName: input,
            lastTimeUpdate: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            navigation.goBack();
        })
        .catch((error) => alert(error));

        
        
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
            <Button disabled = {!input} onPress={createChat} title = "Create new Chat"/>
        </View>
    )
}

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {

    }

});
