const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

const userList = {};

io.on("connection", socket => {
    console.log("a user connected :D ",socket.id);
    socket.on("yo", (message) => {
        console.log(message);
    });

    socket.on("user", (name) => {
        console.log("--- user info")
        console.log(name)
        console.log(socket.id);
    })

    socket.on("Join-room", (roomName,userName) => {
        socket.join(roomName)
        console.log("______ join room _____");
        console.log("room name is", roomName);
        console.log("username", userName);
        userList[socket.id] = userName;
    })

    socket.on("send-message", (room, message) => {
        socket.to(room).emit("receive-message",message)
        console.log(message);
        console.log(room);
        console.log("---")
    })
})

server.listen(3003, ()=>{
    console.log('listeoning on *:3000: ');
})