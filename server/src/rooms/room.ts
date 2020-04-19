/**
 * Room object
 */

import { Namespace, Socket } from 'socket.io';

import { GameTheme } from '../games/classic';
import Player from '../player';

export type RoomProps = {
  theme: GameTheme;
  nameSpace: Namespace;
  roomNumber: string;
};

export default class Room {
  theme: GameTheme;
  nameSpace: Namespace; // Socket.io room namespace
  id: string;
  players: Player[] = [];

  constructor({ theme, nameSpace, roomNumber }: RoomProps) {
    this.theme = theme;
    this.nameSpace = nameSpace;
    this.id = roomNumber;
  }

  addPlayer = (socket: Socket) => {
    this.players.push(new Player({ name: socket.id, id: socket.id }));
    this.emitScoreBoard();
  };

  removePlayer = (socket: Socket) => {
    this.players = this.players.filter(({ id }) => id !== socket.id);
    this.emitScoreBoard();
  };

  emitScoreBoard = () => {
    this.nameSpace.emit('players', this.getPlayers());
  };

  getPlayers = (): { name: string; score: number }[] => {
    return this.players.map(({ name, score }) => {
      return { name, score };
    });
  };
}
