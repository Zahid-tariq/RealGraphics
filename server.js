var express = require('express');
var app = express(); 
var server = require('http').createServer(app);

server.listen(process.env.PORT || 4000);
console.log('Server is Running');

app.use(express.static('index'));

app.get('/',function(req,res)
{
  res.sendFile(__dirname + '/index.html');
});

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection',function(socket){
    console.log('Client Connected: ' , socket.id);


    socket.on('join', function(room) {
      socket.join(room);
      console.log('User Joins the Room ' + room);

     socket.on('user-image',function(data){
     // console.log(data);
       socket.broadcast.to(room).emit('user-image1', data);
         });

     socket.on('image',function(data){
        socket.broadcast.to(room).emit('image1', data);
          });
     });

        socket.on('disconnect',function(data){
        console.log('USer Disconnected');
  });
});
