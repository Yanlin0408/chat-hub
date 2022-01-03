import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DarkTheme from "../constant/darkTheme"

const logo = () => {
    return (
        <View style = {styles.container}>
            <View style = {styles.left}>
                <Text style = {styles.textInsideLeft}>Chat</Text>
            </View>
            <View style = {styles.right}>
                <Text style = {styles.textInsideRight}>hub</Text>
            </View>
        </View>
    )
}

export default logo

const styles = StyleSheet.create({
    container:{
        // flex:0.05,
        flexDirection:"row",
        justifyContent:"center",
        width:"100%",
        height:50,
    },
    left:{
        backgroundColor:DarkTheme.grey,
        paddingLeft:12,
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
        justifyContent:"center",
        alignItems:"center",
        width:90,
    },
    right:{
        backgroundColor:DarkTheme.orange,
        paddingLeft:3,
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        justifyContent:"center",
        width:75,
    },
    textInsideLeft:{
        color:"white",
        fontWeight: 'bold',
        fontSize: 30,
    },
    textInsideRight:{
        color:"black",
        fontWeight: 'bold',
        fontSize: 30,
    },
})




