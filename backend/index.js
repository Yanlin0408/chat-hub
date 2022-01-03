const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

/*const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;
*/

io.on("connection", socket => {
    console.log("a user connected :D");
    socket.on("yo", (message) => {
        console.log(message);
    });

})

server.listen(3000, ()=>{
    console.log('listeoning on *:3000: ');
})