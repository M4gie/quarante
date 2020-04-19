import io from 'socket.io';

import { GameType, GameTheme } from './games/classic';
import RoomPool from './rooms/roomPool';

const server = io.listen(3000);

const defaultRooms = [
  { game: GameType.Classic, theme: GameTheme.MangaAnime },
  { game: GameType.Classic, theme: GameTheme.Movie },
];

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
