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
  /* All rooms */
  rooms: Room[] = [];

  /* Socket.io server */
  server: Server;

  constructor({ defaultRooms, server }: Props) {
    this.server = server;
    for (let i = 0; i < defaultRooms.length; i++) {
      this.addRoom(defaultRooms[i]);
    }
  }

  /* Add room */
  addRoom = (roomTheme: string) => {
    const roomNumber = this.rooms.reduce(function (acc, curr) {
      if (curr.name === roomTheme) {
        acc++;
      }
      return acc;
    }, 0);
    const room = new Room({
      name: roomTheme,
      nameSpace: this.server.of(roomTheme),
      roomNumber,
    });
    this.rooms.push(room);
  };

  /* Get all online rooms name */
  getNames = () => {
    const roomNames = this.rooms.map((room) => room.nameSpace.name);
    return roomNames;
  };
}
