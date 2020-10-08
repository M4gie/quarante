import 'dotenv/config';
import Game from 'quarante-api/build/app/Models/Game';
import io, { Socket, Server } from 'socket.io';

import { getGames } from './requests';
import RoomPool from './rooms/roomPool';

const ioServer = io.listen(4240);
if (process.env.ALLOWED_ORIGIN) {
  ioServer.origins(process.env.ALLOWED_ORIGIN);
}

async function server(ioServer: Server) {
  let games: Game[] = [];
  try {
    games = await getGames();
  } catch (e) {
    console.log('API request error (getThemes): ', e);
  }

  const Rooms = new RoomPool({ games, server: ioServer });

  let clients = 0;

  ioServer.on('connection', function (socket: Socket) {
    if (clients >= 20) {
      socket.emit('full', '💥 Pas de chance nos serveurs sont pleins ! 💥');
      socket.disconnect(true);
      return;
    }
    /* Easy way to count client, .clients doesn't send the "real" value */
    clients++;
    ioServer.emit('connected', clients);
    ioServer.emit('rooms', Rooms.getRooms());
    socket.on('disconnect', function () {
      clients--;
      ioServer.emit('connected', clients);
    });
  });
}

server(ioServer);
