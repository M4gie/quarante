/**
 * RoomPool object
 */

import { Server } from 'socket.io';

import Classic from '../games/classic';
import { Theme } from '../typings/data';

type Props = {
  themes: Theme[];
  server: Server;
};

export default class RoomPool {
  rooms: Classic[] = [];
  server: Server;

  constructor({ themes, server }: Props) {
    this.server = server;
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

  getRooms = (): { theme: string; id: string }[] => {
    const roomNames = this.rooms.map(({ theme, id }) => {
      return { theme: theme.title, id };
    });
    return roomNames;
  };
}
