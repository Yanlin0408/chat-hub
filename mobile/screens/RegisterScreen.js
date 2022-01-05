import React, {useState, useLayoutEffect, useEffect} from 'react'
import { StyleSheet,Platform, TextInput, Text, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import {StatusBar} from "expo-status-bar"
import DarkTheme from "../constant/darkTheme"
import { Input, Image, Button} from "react-native-elements"
import LoginScreen from "./LoginScreen"
import InputStyle from "../constant/inputContainer"
import io from "socket.io-client"
import * as firebase from "firebase";
import {auth} from "../firebase"

const RegisterScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("123123");
    const [imageUrl, setImageUrl] = useState("");

    const socket = io("http://192.168.1.71:3000/");
    socket.connect();
    socket.emit("yo","heyheyhey");

    const register = () => {
        auth
        .createUserWithEmailAndPassword(email, password)   //probably have some problem
        .then((authUser) => {
            console.log(authUser.user);
            // console.log("---------yo---",password);
            // console.log("---------yo---",name);
            // console.log("===== displayname")
            // console.log(authUser.user.displayName);
            // console.log("===== providedrID")
            // console.log(authUser.user.providerData);
            // console.log("---------------------");
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "http://img.crcz.com/allimg/202003/03/1583242569661699.jpg",
            });
        })
        .catch((error) => alert(error.message));
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
                        {/* <TextInput
                            secureTextEntry
                            value = {password}
                            placeholder = "Password"
                            placeholderTextColor={DarkTheme.grey}
                            style = {styles.input}
                            onChangeText = {(text) => setPassword(text)}
                        /> */}
                        {/* <Input
                            placeholder="password"
                            type = "password"
                            secureTextEntry
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        /> */}
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
