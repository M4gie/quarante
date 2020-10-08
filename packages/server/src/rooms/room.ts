/**
 * Room object
 */

import { EventEmitter } from 'events';
import GameType from 'quarante-api/app/Models/GameType';
import Theme from 'quarante-api/app/Models/Theme';
import { Namespace, Socket } from 'socket.io';

import Player from '../player';

export type RoomProps = {
  icon: string;
  nameSpace: Namespace;
  roomNumber: string;
  theme: Theme;
  type: GameType;
};

export const enum RoomStatus {
  Waiting,
  Starting,
  InProgress,
  Ended,
}

const enum RoomEvent {
  Connection = 'connection',
  Disconnect = 'disconnect',
  Players = 'players',
  Status = 'status',
  Infos = 'infos',
}

export default class Room {
  event: EventEmitter = new EventEmitter();
  icon: string;
  id: string;
  nameSpace: Namespace; // Socket.io room namespace
  players: Player[] = [];
  status: RoomStatus = RoomStatus.Waiting;
  theme: Theme;
  type: GameType;

  constructor({ theme, type, nameSpace, roomNumber, icon }: RoomProps) {
    this.theme = theme;
    this.nameSpace = nameSpace;
    this.id = roomNumber;
    this.type = type;
    this.icon = icon;
  }

  addPlayer = (socket: Socket) => {
    this.players.push(new Player({ name: socket.handshake.query.pseudo, id: socket.id }));
    this.emitScoreBoard();
  };

  addPlayerPoint = (player: Player, point: number) => {};

  emit = (event: string, data: any) => {
    this.nameSpace.emit(event, data);
  };

  emitScoreBoard = () => {
    this.sortPlayers();
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

  gameStop = () => {};

  getPlayer = (id: string): Player | undefined => {
    return this.players.find((player) => player.id === id);
  };

  getPlayers = (): { name: string; score: number; avatar: number }[] => {
    return this.players.map(({ name, score, avatar, id, find }) => {
      return { name, score, avatar, id, find };
    });
  };

  initGame = () => {};

  roomLoop = (): void => {
    this.nameSpace.on(RoomEvent.Connection, (socket: Socket) => {
      this.sendRoomInfos(socket);
      this.addPlayer(socket);
      this.startGame(socket);
      socket.on(RoomEvent.Disconnect, () => {
        this.removePlayer(socket);
        if (this.players.length <= 0) {
          this.gameStop();
          this.status = RoomStatus.Waiting;
        }
      });
    });
  };

  removePlayer = (socket: Socket) => {
    this.players = this.players.filter(({ id }) => id !== socket.id);
    this.emitScoreBoard();
  };

  sendRoomInfos = (socket: Socket) => {
    this.emitToSocket(
      RoomEvent.Infos,
      { theme: this.theme.title, type: this.type.title },
      socket.id,
    );
  };

  setStatus = (status: RoomStatus) => {
    this.status = status;
    this.emit(RoomEvent.Status, { status: this.status });
  };

  sortPlayers = () => {
    this.players.sort((a, b) => b.score - a.score);
  };

  startGame(socket: Socket) {}

  updatePlayer = (player: Player, id: string) => {
    const index = this.players.findIndex((player) => player.id === id);
    if (index !== -1) {
      this.players[index] = player;
    }
  };
}
