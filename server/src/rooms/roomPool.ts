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
      this.rooms.push(new Room({ nameSpace: server.of(defaultRooms[i]) }));
    }
  }
}
