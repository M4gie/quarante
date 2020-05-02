import io, { Socket, Server } from 'socket.io';

import { getThemes } from './requests';
import RoomPool from './rooms/roomPool';
import { Theme } from './typings/data';

const ioServer = io.listen(4040);

async function server(ioServer: Server) {
  let themes: Theme[] = [];
  try {
    themes = await getThemes();
  } catch (e) {
    console.log('API request error (getThemes): ', e);
  }

  const Rooms = new RoomPool({ themes, server: ioServer });

  let clients = 0;

  ioServer.on('connection', function (socket: Socket) {
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
