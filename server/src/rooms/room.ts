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
  id: string;
  nameSpace: Namespace; // Socket.io room namespace
  players: Player[] = [];
  status: Status = Status.Waiting;
  theme: GameTheme;

  constructor({ theme, nameSpace, roomNumber }: RoomProps) {
    this.theme = theme;
    this.nameSpace = nameSpace;
    this.id = roomNumber;
  }

  addPlayer = (socket: Socket) => {
    this.players.push(new Player({ name: socket.id, id: socket.id }));
    this.emitScoreBoard();
  };

  emit = (event: string, data: any) => {
    this.nameSpace.emit(event, data);
  };

  emitScoreBoard = () => {
    this.emit('players', this.getPlayers());
  };

  emitStatus = () => {
    this.emit('status', { status: this.status });
  };

  emitStatusToSocket = (id: string) => {
    this.emitToSocket('status', { status: this.status }, id);
  };

  emitToSocket = (event: string, data: any, id: string) => {
    this.nameSpace.to(id).emit(event, data);
  };

  getPlayers = (): { name: string; score: number }[] => {
    return this.players.map(({ name, score }) => {
      return { name, score };
    });
  };

  roomLoop = (): void => {
    this.nameSpace.on('connection', (socket: Socket) => {
      this.addPlayer(socket);
      this.startGame(socket);
      socket.on('disconnect', () => {
        this.removePlayer(socket);
      });
    });
  };

  removePlayer = (socket: Socket) => {
    this.players = this.players.filter(({ id }) => id !== socket.id);
    this.emitScoreBoard();
  };

  setStatus = (status: Status) => {
    this.status = status;
    this.emit('status', { status: this.status });
  };

  startGame(socket: Socket) {}
}
