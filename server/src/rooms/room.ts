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

export enum Status {
  Waiting,
  Starting,
  InProgress,
  Ended,
}

export default class Room {
  theme: GameTheme;
  nameSpace: Namespace; // Socket.io room namespace
  id: string;
  players: Player[] = [];
  status: Status = Status.Waiting;

  constructor({ theme, nameSpace, roomNumber }: RoomProps) {
    this.theme = theme;
    this.nameSpace = nameSpace;
    this.id = roomNumber;
  }

  startGame(socket: Socket) {}

  roomLoop = (): void => {
    this.nameSpace.on('connection', (socket: Socket) => {
      this.addPlayer(socket);
      this.startGame(socket);
      socket.on('disconnect', () => {
        this.removePlayer(socket);
      });
    });
  };

  addPlayer = (socket: Socket) => {
    this.players.push(new Player({ name: socket.id, id: socket.id }));
    this.emitScoreBoard();
  };

  removePlayer = (socket: Socket) => {
    this.players = this.players.filter(({ id }) => id !== socket.id);
    this.emitScoreBoard();
  };

  emitScoreBoard = () => {
    this.emit('players', this.getPlayers());
  };

  getPlayers = (): { name: string; score: number }[] => {
    return this.players.map(({ name, score }) => {
      return { name, score };
    });
  };

  emitStatus = () => {
    this.emit('status', { status: this.status });
  };

  emitStatusToSocket = (id: string) => {
    this.emitToSocket('status', { status: this.status }, id);
  };

  emit = (event: string, data: any) => {
    this.nameSpace.emit(event, data);
  };

  emitToSocket = (event: string, data: any, id: string) => {
    this.nameSpace.to(id).emit(event, data);
  };
}
