import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar,Button } from 'react-native-elements';
import moment from "moment";
import { Logs } from 'expo'

const CustomListItem = ({id, chatName, lastTime, lastMessage, lastPic, enterChat}) => {
    Logs.enableExpoCliLogging();
    // Object.values(lastTime).map((e)=> {console.log(e)})

    return (
        <ListItem 
            key={id} 
            bottomDivider
            onPress = {() => enterChat(id, chatName)}
            // onLongPress = {() => enterChat(id, chatName)}
        >
            {/* <Icon name="user-circle-o" type="font-awesome" color="red" /> */}
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
                <ListItem.Content right>
                {/* <ListItem.Title right >{moment(lastTime).endOf('day').fromNow()}</ListItem.Title> */}
                {
                    (moment(lastTime).endOf('day').fromNow() === "a day ago")
                    ?
                    <ListItem.Title right >{moment(lastTime).format('ll')}</ListItem.Title>
                    :
                    <ListItem.Title right >{moment(lastTime).calendar()}</ListItem.Title>
                }
                    {/* if (moment().endOf('day').fromNow() === "in a day")  */}
                {/* <ListItem.Title right > */}
                    {/* {moment(lastTime.toString()).endOf('day').fromNow()} */}
                    {/* {moment(lastTime.toDate().toString()).calendar()} */}
                    
                {/* </ListItem.Title> */}
                {/* {moment(lastTime.toString()).endOf('day').fromNow()} */}
                    {/* else */}
                        {/* <ListItem.Title right ></ListItem.Title>     */}
                
                
                      {/* {moment(lastTime.toString()).calendar()} */}
                      {/* {Object.values(lastTime).map((e)=> {console.log(e)})} */}
                
                {/* <ListItem.Subtitle right>{Object.values(lastTime).map((e)=> {<Text>{e}</Text>})}</ListItem.Subtitle> */}
                {/* {Object.values(lastTime).map((e)=> {<ListItem.Subtitle right>{e}</ListItem.Subtitle>})} */}
                {/* {Object.values(lastTime).map((e)=> {console.log(e)})} */}
                </ListItem.Content>
        </ListItem>          

    //     <ListItem.Swipeable
    //         onPress = {() => enterChat(id, chatName)}
    //         // onPressIn = {() => enterChat(id, chatName)}
    //         // onPressOut = {() => enterChat(id, chatName)}
    //         bottomDivider
    //         leftContent={
    //         <Button
    //             title="Info"
    //             icon={{ name: 'info', color: 'white' }}
    //             buttonStyle={{ minHeight: '100%' }}
    //         />
    //         }
    //         rightContent={
    //         <Button
    //             title="Delete"
    //             icon={{ name: 'delete', color: 'white' }}
    //             buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
    //         />
    //         }
    //     >
    //     <Avatar
    //             rounded
    //             size = "medium"
    //             source = {{
    //                 uri:
    //                 lastPic
    //                 ?lastPic
    //                 :"https://cdn.iconscout.com/icon/premium/png-256-thumb/chat-2469467-2043406.png",
    //             }}
    //     />
    //     <ListItem.Content>
    //         <ListItem.Title>{chatName}</ListItem.Title>
    //             <ListItem.Subtitle  numberOfLines={1} ellipsizeMode="tail">
    //                 {lastMessage}
    //             </ListItem.Subtitle>
    //     </ListItem.Content>
    //     {/* <ListItem.Chevron /> */}
    //   </ListItem.Swipeable>
      
        // {/* <ListItem onPress = {() => enterChat(id, chatName)} key = {id} bottomDivider>
        //     <Avatar
        //         rounded
        //         size = "medium"
        //         source = {{
        //             uri:
        //             lastPic
        //             ?lastPic
        //             :"https://cdn.iconscout.com/icon/premium/png-256-thumb/chat-2469467-2043406.png",
        //         }}
        //     />
        //     <ListItem.Content>
        //         <ListItem.Title right style={{fontWeight:"800"}}>
        //             {chatName}
        //         </ListItem.Title>
        //         <ListItem.Subtitle  numberOfLines={1} ellipsizeMode="tail">
        //             {/* {chatData.collection('messages').data().messages[0]} */}
        //             {lastMessage}
        //         </ListItem.Subtitle>
        //     </ListItem.Content>
        // </ListItem> */}
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
