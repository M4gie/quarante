/**
 * RoomPool object
 */

import Theme from 'quarante-api/build/app/Models/Theme';
import { Server } from 'socket.io';

import Classic from '../games/classic';

type Props = {
  themes: Theme[];
  server: Server;
};

export default class RoomPool {
  rooms: Classic[] = [];
  server: Server;

  constructor({ themes, server }: Props) {
    this.server = server;
    // Init RoomPool with one room of each themes
    for (let i = 0; i < themes.length; i++) {
      this.addRoom(themes[i]);
    }
  }

  addRoom = (roomTheme: Theme): void => {
    const roomNumber = this.rooms.length.toString(); // Get a unique ID for the room
    const roomData = {
      theme: roomTheme,
      nameSpace: this.server.of(roomNumber),
      roomNumber,
      maxPlayers: 10,
    };
    const room = new Classic(roomData);
    room.roomLoop();
    room.initGame();
    this.rooms.push(room);
  };

  getRooms = (): { theme: Theme; id: string }[] => {
    const roomNames = this.rooms.map(({ theme, id }) => {
      return { theme, id };
    });
    return roomNames;
  };
}
