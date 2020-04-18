/**
 * RoomPool object
 */

import { Server } from 'socket.io';

import Room from './room';

type Props = {
  defaultRooms: string[];
  server: Server;
};

export default class RoomPool {
  rooms: Room[] = [];
  server: Server;

  constructor({ defaultRooms, server }: Props) {
    this.server = server;
    for (let i = 0; i < defaultRooms.length; i++) {
      this.addRoom(defaultRooms[i]);
    }
  }

  addRoom = (roomTheme: string) => {
    const roomNumber = this.rooms.length.toString(); // Get a unique ID for the room
    const room = new Room({
      name: roomTheme,
      nameSpace: this.server.of(roomNumber),
      roomNumber,
    });
    room.gameLoop();
    this.rooms.push(room);
  };

  getRooms = () => {
    const roomNames = this.rooms.map(({ name, id }) => {
      return { name, id };
    });
    return roomNames;
  };
}
