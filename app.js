const express = require('express');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io').listen(server);

server.listen(9999);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); //директория в которой мы находимся плюс индекс
});

users = [];
connections = [];

io.sockets.on('connection', socket =>{
    console.log("Успешное соединение")
    connections.push(socket);
    
    socket.on('disconnect', data => {
        connections.splice(connections.indexOf(socket),1);
        console.log("Oтключились");
    });
    socket.on('send mess', data =>{
     io.sockets.emit('add mess', {mess: data.mess, name: data.name});
    });
    
});

