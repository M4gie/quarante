import io from 'socket.io';

import RoomPool from './rooms/roomPool';

const server = io.listen(3000);
const defaultRooms = ['Mangas/Animes', 'Cinéma'];
const Rooms = new RoomPool({ defaultRooms, server });
let clients = 0;

server.on('connection', function (socket) {
  /* Easy way to count client, .clients doesn't send the "real" value */
  clients++;
  server.emit('connected', clients);
  server.emit('rooms', Rooms.getRooms());
  socket.on('disconnect', function () {
    clients--;
    server.emit('connected', clients);
  });
});
