var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
      var ID = (socket.id).toString().substr(0, 5);
      var time = (new Date).toLocaleTimeString();
      socket.json.send({'event': 'connected', 'name': ID, 'time': time});
      socket.broadcast.json.send({'event': 'userJoined', 'name': ID, 'time': time});

      socket.on('disconnect', function() {
          io.emit('user disconnect', '** user disconnected ***');
      });
      socket.on('status',function(msg){
           io.emit('status', msg);
           //socket.broadcast.emit('user typing...');
      });
      socket.on('chat message', function(msg) {
          var time = (new Date).toLocaleTimeString();
          io.emit('chat message', msg);
      });
});

http.listen(3030, function(){
    console.log('listening on *:3030');
});
