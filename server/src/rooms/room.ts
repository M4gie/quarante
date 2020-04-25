/**
 * Room object
 */

import { EventEmitter } from 'events';
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

enum RoomEvent {
  Connection = 'connection',
  Disconnect = 'disconnect',
  Players = 'players',
  Status = 'status',
}

export default class Room {
  event: EventEmitter = new EventEmitter();
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

  addPlayerPoint = (id: string, point: number) => {
    const player = this.getPlayer(id);
    if (player) {
      player.score += point;
      this.updatePlayer(player, id);
      this.emitScoreBoard();
    }
  };

  emit = (event: string, data: any) => {
    this.nameSpace.emit(event, data);
  };

  emitScoreBoard = () => {
    this.emit(RoomEvent.Players, this.getPlayers());
  };

  emitStatus = () => {
    this.emit(RoomEvent.Status, { status: this.status });
  };

  emitStatusToSocket = (id: string) => {
    this.emitToSocket(RoomEvent.Status, { status: this.status }, id);
  };

  emitToSocket = (event: string, data: any, id: string) => {
    this.nameSpace.to(id).emit(event, data);
  };

  getPlayer = (id: string): Player | undefined => {
    return this.players.find((player) => player.id === id);
  };
  getPlayers = (): { name: string; score: number }[] => {
    return this.players.map(({ name, score }) => {
      return { name, score };
    });
  };

  initGame = () => {};

  roomLoop = (): void => {
    this.nameSpace.on(RoomEvent.Connection, (socket: Socket) => {
      this.addPlayer(socket);
      this.startGame(socket);
      this.initGame();
      socket.on(RoomEvent.Disconnect, () => {
        this.removePlayer(socket);
      });
    });
  };

  removePlayer = (socket: Socket) => {
    this.players = this.players.filter(({ id }) => id !== socket.id);
    this.emitScoreBoard();
  };

  setStatus = (status: Status, id: string) => {
    this.status = status;
    this.emitToSocket(RoomEvent.Status, { status: this.status }, id);
  };

  startGame(socket: Socket) {}

  updatePlayer = (player: Player, id: string) => {
    const index = this.players.findIndex((player) => player.id === id);
    if (index !== -1) {
      this.players[index] = player;
    }
  };
}
