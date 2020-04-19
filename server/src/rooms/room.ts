/**
 * Room object
 */

import { Namespace } from 'socket.io';

import { GameTheme } from '../games/classic';

export type RoomProps = {
  theme: GameTheme;
  nameSpace: Namespace;
  roomNumber: string;
};

export default class Room {
  theme: GameTheme;
  nameSpace: Namespace; // Socket.io room namespace
  id: string;
  clients: number = 0;

  constructor({ theme, nameSpace, roomNumber }: RoomProps) {
    this.theme = theme;
    this.nameSpace = nameSpace;
    this.id = roomNumber;
  }
}
