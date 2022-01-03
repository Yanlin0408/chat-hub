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

})

server.listen(3000, ()=>{
    console.log('listeoning on *:3000: ');
})