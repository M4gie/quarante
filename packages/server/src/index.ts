import 'dotenv/config';
import Theme from 'quarante-api/build/app/Models/Theme';
import io, { Socket, Server } from 'socket.io';

import { getThemes } from './requests';
import RoomPool from './rooms/roomPool';

const ioServer = io.listen(4240);
if (process.env.ALLOWED_ORIGIN) {
  ioServer.origins(process.env.ALLOWED_ORIGIN);
}

async function server(ioServer: Server) {
  let themes: Theme[] = [];
  try {
    themes = await getThemes();
    console.log('Success getTheme: ', themes);
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
