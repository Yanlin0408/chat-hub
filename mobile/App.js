import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from './screens/HomeScreen';
import AddChat from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DarkTheme from "./constant/darkTheme"
// import Realm from "realm";
import io from "socket.io-client"

const Stack = createNativeStackNavigator();

//screenOptions applies to all the screens inside of Stack.Navigator
const globalScreenOptions = {
  headerStyle: {backgroundColor: DarkTheme.grey},
  headerTitleStyle: {color: "white"},
  headerTintColor: "white",
  headerTitleAlign: "center",
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Login" screenOptions = {globalScreenOptions}>
        <Stack.Screen name='Login' component = {LoginScreen} />
        <Stack.Screen name='Register' component = {RegisterScreen} />
        <Stack.Screen name='Home' component = {HomeScreen} />
        <Stack.Screen name='AddChat' component = {AddChat} />
        <Stack.Screen name='Chat' component = {ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});