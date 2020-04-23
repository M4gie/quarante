/**
 * Classic game object
 */

import { Socket } from 'socket.io';

import Room, { RoomProps, Status } from '../rooms/room';

export enum GameType {
  Classic,
}

export enum GameTheme {
  MangaAnime,
  Movie,
}

type Props = {
  maxPlayers: number;
};

export default class Classic extends Room {
  maxPlayers: number;
  time: NodeJS.Timer | null = null;

  constructor({ theme, nameSpace, roomNumber, ...gameSetup }: Props & RoomProps) {
    super({ theme, nameSpace, roomNumber });
    this.maxPlayers = gameSetup.maxPlayers;
  }

  startGame = (socket: Socket) => {
    if (this.status === Status.Waiting && this.players.length >= 1) {
      this.setStatus(Status.Starting, socket.id);
      setTimeout(() => {
        this.setStatus(Status.InProgress, socket.id);
      }, 5 * 1000);
    }
    switch (this.status) {
      case Status.Waiting:
        this.emitStatusToSocket(socket.id);
        break;
      case Status.Starting:
        this.emitStatusToSocket(socket.id);
        break;
      case Status.Ended:
        this.emitStatusToSocket(socket.id);
        break;
    }
  };
}
