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
    /* Count all rooms with the same new roomThme name to get a unique ID for the room */
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

  /* Get all online rooms */
  getRooms = () => {
    const roomNames = this.rooms.map(({ name, id }) => {
      return { name, id };
    });
    return roomNames;
  };
}
