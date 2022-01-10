import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar,Button } from 'react-native-elements';
import moment from "moment";
import { Logs } from 'expo'

const CustomListItem = ({id, chatName, lastTime, lastMessage, lastPic, enterChat}) => {
    Logs.enableExpoCliLogging();

    return (
        <ListItem 
            key={id} 
            bottomDivider
            onPress = {() => enterChat(id, chatName)}
            // onLongPress = {() => enterChat(id, chatName)}
        >
            <Avatar
                rounded
                size = "medium"
                source = {{
                    uri:
                    lastPic
                    ?lastPic
                    :"https://cdn.iconscout.com/icon/premium/png-256-thumb/chat-2469467-2043406.png",
                }}
        />
                <ListItem.Content>
                <ListItem.Title style={{fontWeight:"800"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle>{lastMessage}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right >
                {
                    (moment(lastTime).endOf('day').fromNow() === "a day ago")
                    ?
                    <ListItem.Title right>{moment(lastTime).format('ll')}</ListItem.Title>
                    :
                    <ListItem.Title right >{moment(lastTime).calendar()}</ListItem.Title>
                }
                </ListItem.Content>
        </ListItem>          
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
