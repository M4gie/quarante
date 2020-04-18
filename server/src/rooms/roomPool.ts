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
      this.rooms.push(new Room({ name: defaultRooms[i], nameSpace: server.of(defaultRooms[i]) }));
    }
  }

  /* Get all online rooms name */
  getNames = () => {
    const roomNames = this.rooms.map((room) => room.nameSpace.name);
    return roomNames;
  };
}
