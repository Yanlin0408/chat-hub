import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

const CustomListItem = ({id, chatName, lastTime, lastMessage, lastPic, enterChat}) => {



    return (
        <ListItem onPress = {() => enterChat(id, chatName)} key = {id} bottomDivider>
            <Avatar
                rounded
                size = "medium"
                source = {{
                    uri:
                    lastPic
                    ?lastPic
                    :"https://cdn.iconscout.com/icon/premium/png-256-thumb/chat-2469467-2043406.png",
                    // ?

                    // :
                    // "https://cdn.iconscout.com/icon/premium/png-256-thumb/chat-2469467-2043406.png",
                }}

            />
            <ListItem.Swipeable>
                <ListItem.Title style={{fontWeight:"800"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle right={"true"} numberOfLines={1} ellipsizeMode="tail">
                    {/* {chatData.collection('messages').data().messages[0]} */}
                    {lastMessage}
                </ListItem.Subtitle>
            </ListItem.Swipeable>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
