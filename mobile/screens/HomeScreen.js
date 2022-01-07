import React, {useLayoutEffect, useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView,SafeAreaView,TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import CustomListItem from '../component/CustomListItem'
import DarkTheme from "../constant/darkTheme"
import { AntDesign, SimpleLineIcons} from "@expo/vector-icons"
import {auth, db} from "../firebase"

const HomeScreen = ({navigation}) => {
    const [chats, setChats] = useState([]);

    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");
        });
    };

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id,
            chatName,
        });
    }

    useEffect(() => {
        const unsubscribe = db.collection("chats").onSnapshot((snapshot) => 
        setChats(
            //chats is set to be objects referring to every doc in snapshot
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        )); 

        return unsubscribe;
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Chathub",
            headerStyle : { backgroundColor: DarkTheme.grey},
            headerTitleStyle: {color: "white"},
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 5}}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                        <Avatar rounded source={{uri: auth?.currentUser?.photoURL}}/>
                        <Text>{auth?.currentUser?.displayName}</Text>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View 
                    style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color = 'white' style={{ marginLeft: 25}}/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate("AddChat")}
                        activeOpacity={0.5}
                    >
                        <SimpleLineIcons name='pencil' size={24} color = 'white' style={{ marginRight: -7}}/>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);



    return (
        <SafeAreaView>
            <ScrollView style = {styles.container}>
                {chats.map((chat) => (
                    <CustomListItem key={chat.id} id={chat.id} chatName={chat.data.chatName} enterChat = {enterChat}/>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        height: "100%",
    }
})
