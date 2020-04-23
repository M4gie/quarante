/**
 * RoomPool object
 */

import { Server } from 'socket.io';

import Classic, { GameType, GameTheme } from '../games/classic';

export type RoomConfig = {
  game: GameType;
  theme: GameTheme;
};

type Props = {
  defaultRooms: RoomConfig[];
  server: Server;
};

export default class RoomPool {
  rooms: Classic[] = [];
  server: Server;

  constructor({ defaultRooms, server }: Props) {
    this.server = server;
    for (let i = 0; i < defaultRooms.length; i++) {
      this.addRoom(defaultRooms[i]);
    }
  }

  addRoom = (roomConfig: RoomConfig) => {
    const roomNumber = this.rooms.length.toString(); // Get a unique ID for the room
    const roomData = {
      theme: roomConfig.theme,
      nameSpace: this.server.of(roomNumber),
      roomNumber,
      maxPlayers: 10,
    };
    const room = new Classic(roomData);
    room.roomLoop();
    this.rooms.push(room);
  };

  getRooms = () => {
    const roomNames = this.rooms.map(({ theme, id }) => {
      return { theme, id };
    });
    return roomNames;
  };
}
