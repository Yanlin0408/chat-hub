const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

io.on("connection", socket => {
    console.log("a user connected :D");
    socket.on("yo", (message) => {
        console.log(message);
    });

    socket.on("user", (name) => {
        console.log("--- user info")
        console.log(name)
        console.log(socket.id);
    })

    socket.on("Join-room", (roomName) => {
        socket.join(roomName)
        console.log("room name is", roomName);
        console.log("socket id is ", socket.id);
    })

    socket.on("send-message", (message, room) => {
        socket.to(room).emit("receive-message",message)
        console.log(message);
        console.log(room);
        console.log("---")
    })
})

server.listen(3000, ()=>{
    console.log('listeoning on *:3000: ');
})