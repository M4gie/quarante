import io from 'socket.io';

const server = io.listen(3000);

let clients = 0;

server.on('connection', function (socket) {
  /* Easy way to count client, .clients doesn't send the "real" value */
  clients++;
  console.log('User connected !');
  server.emit('connected', clients);

  socket.on('disconnect', function () {
    clients--;
    console.log('User disconnected !');
    server.emit('connected', clients);
  });
});
