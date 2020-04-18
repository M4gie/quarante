import io from 'socket.io';

const server = io.listen(3000);

server.on('connection', function (socket) {
  console.log('New connection !');
  server.emit('this', { will: 'Is connected' });

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    console.log('User disconnected !');
    server.emit('user disconnected');
  });
});
