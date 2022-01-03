import React, {useState, useLayoutEffect, useEffect} from 'react'
import { StyleSheet,Platform, TextInput, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import {StatusBar} from "expo-status-bar"
import DarkTheme from "../constant/darkTheme"
import { Input, Image, Button} from "react-native-elements"
import LoginScreen from "./LoginScreen"
import InputStyle from "../constant/inputContainer"
import io from "socket.io-client"

const RegisterScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const socket = io("http://192.168.1.71:3000/");
    socket.connect();
    socket.emit("yo","heyheyhey");

    const register = () => {

    };

    useLayoutEffect(() => {
        navigation.setOptions({
            //headerTitle: "login",
            headerBackTitle: "back",
            headerStyle: {
                backgroundColor: DarkTheme.grey,
            },
            headerTitleStyle: {
                marginLeft: 10,
                fontSize: 20,
            },
        //     headerLeft: () => (
        //     <Button style = {{marginLeft:40}} onPress={() => navigation.navigate({name: LoginScreen})} />
        //   ),
        });
        
    }, [navigation]);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setName("bitch");
    //         // navigation.navigate("Login");
    //         navigation.navigate({name: LoginScreen});
    //     }, 3000);
        
    // }, [name])

    // useLayoutEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     };
    // }, [input])

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style = {styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style = {styles.touchable}>
                <View>
                    <StatusBar style = "light"/>
                    <Text 
                    style = {{
                        height:40, 
                        textAlign:"center", 
                        fontSize:26, 
                        color:DarkTheme.grey, 
                        borderRadius: 3, 
                        marginBottom: 20, 
                        backgroundColor: DarkTheme.black}}>create a chathub account</Text>
                    <View>
                        <StatusBar style = "light"/>
                        <TextInput
                            autofocus
                            value = {name}
                            placeholder = "Full name"
                            placeholderTextColor={DarkTheme.grey} 
                            style = {styles.input}
                            onChangeText = {(text) => setName(text)}
                        />
                        <TextInput
                            value = {email}
                            placeholder = "Email"
                            placeholderTextColor={DarkTheme.grey}
                            style = {styles.input}
                            onChangeText = {(text) => setEmail(text)}
                        />
                        <TextInput
                            secureTextEntry
                            value = {password}
                            placeholder = "Password"
                            placeholderTextColor={DarkTheme.grey}
                            style = {styles.input}
                            onChangeText = {(text) => setPassword(text)}
                        />
                        <TextInput
                            value = {imageUrl}
                            placeholder = "Profile Picture Url (optional)"
                            placeholderTextColor={DarkTheme.grey}
                            style = {styles.input}
                            onChangeText = {(text) => setImageUrl(text)}
                            onSubmitEditing = {register}
                        />
                        <Button
                            title="Register"
                            buttonStyle={{
                            backgroundColor: DarkTheme.orange,
                            }}
                            titleStyle={{ color: "black" }}
                            containerStyle={{
                            width: "100%",
                            marginVertical: 10,
                            }}
                            onPress = {register}
                            />
                        <View style = {{height:80}}/>
                    </View>
                </View>
            
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: DarkTheme.black,
        justifyContent: "center",
        padding: 20,
    },
    input: {
        ...InputStyle, 
        // width:300,
    },
})
