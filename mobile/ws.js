import io from 'socket.io-client'

const ws = io("http://192.168.1.71:3003/");

export { ws }