import React, {useState,useEffect} from 'react'
import { StyleSheet, TextInput, Text, View, KeyboardAvoidingView,Platform, TouchableWithoutFeedback,Keyboard } from 'react-native'
import { Input, Image, Button} from "react-native-elements"
import {StatusBar} from "expo-status-bar"
import DarkTheme from "../constant/darkTheme"
import Logo from "../assets/logo"
import InputStyle from "../constant/inputContainer"
import io from "socket.io-client"
import * as firebase from "firebase";
import {auth} from "../firebase"


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 看看这个能不能改一改，小改可以，改成可以退出
    // Official doc: an observer for changes to the user's sign-in state.
    // a listen knows user state(logined in or not) in firebase when you refresh/first render this page
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace("Home");
            }
        });

        // firebase stop listening onAuthStateChanged (clean up) first
        return unsubscribe;
    }, []);

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch(error => alert(error));
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style = {styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style = {styles.touchable}>
                <View>
                    <StatusBar style = "light"/>
                    <Logo/>
                    <View style = {{marginHorizontal:20}} style = {{alignItems: "center"}}>
                        <View style = {{height:10}}/>
                        <TextInput 
                        onChangeText={e => {setEmail(e)}}
                        fontSize = {18}
                        style = {styles.inputContainer} 
                        placeholderTextColor={DarkTheme.grey} 
                        placeholder="Email"/>
                        <TextInput
                        onChangeText={e => {setPassword(e)}} 
                        fontSize = {18}
                        style = {styles.inputContainer} 
                        placeholderTextColor={DarkTheme.grey} 
                        secureTextEntry = {true}
                        placeholder="Password"
                        onSubmitEditing = {signIn}
                        />
                        <View style = {{height:5}}/>
                        <Button
                        title="Login"
                        buttonStyle={{ backgroundColor: DarkTheme.orange }}
                        containerStyle={{
                        height: 40,
                        width: 140,
                        marginHorizontal: 50,
                        marginTop: 10,
                        }}
                        titleStyle={{
                        color: 'black',
                        marginHorizontal: 20,
                        }}
                        onPress={signIn}
                        />
                        <Button
                        title="Register"
                        buttonStyle={{
                        borderColor: DarkTheme.orange,
                        borderWidth: 1,
                        }}
                        type="outline"
                        titleStyle={{ color: DarkTheme.orange }}
                        containerStyle={{
                        width: 140,
                        marginHorizontal: 50,
                        marginVertical: 10,
                        }}
                        onPress = {() => navigation.navigate("Register")}
                        />
                    </View>
                    <View style = {{height:80}}/>
                </View>
                
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: DarkTheme.black,
        justifyContent: "center",
    },
    inputContainer: {
        ...InputStyle,
        width:350,
    },
    text:{
        backgroundColor:"white",
    },
    button:{
        // fontcolor: DarkTheme.orange,
        backgroundColor: DarkTheme.orange,
        width:90,
        marginTop:15,
    },
})
