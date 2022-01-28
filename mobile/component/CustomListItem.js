import React, { useEffect, useState } from 'react'
import { Pressable,Modal,StyleSheet, Text, View } from 'react-native';
import { ListItem, Avatar,Button } from 'react-native-elements';
import moment from "moment";
import { Logs } from 'expo'

const CustomListItem = ({id, chatName, lastTime, lastMessage, lastPic, enterChat,deleteChat}) => {
    Logs.enableExpoCliLogging();
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Manipulate chats</Text>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                            >
                            <Text style={styles.textStyle}>Stick On Top</Text>
                            </Pressable>

                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => deleteChat(id)}
                            >
                            <Text style={styles.textStyle}>Delete Chat</Text>
                            </Pressable>

                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                            >
                            <Text style={styles.textStyle}>Hide</Text>
                            </Pressable>
                        </View>
                        </View>
                    </Modal>
        <ListItem 
            key={id} 
            bottomDivider
            onPress = {() => enterChat(id, chatName)}
            onLongPress = {() => setModalVisible(true)}
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
                    /* <ListItem.Title right>{lastTime.toLocalString()}</ListItem.Title> */
                    <ListItem.Title right>{moment(lastTime).format('ll')}</ListItem.Title>
                    :
                    <ListItem.Title right >{moment(lastTime).calendar()}</ListItem.Title>
                }
                </ListItem.Content>
        </ListItem>   
        </View>       
    )
}

export default CustomListItem

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 5,
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
})
