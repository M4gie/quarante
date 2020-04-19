/**
 * Classic game object
 */

import { Socket } from 'socket.io';

import Player from '../player';
import Room, { RoomProps } from '../rooms/room';

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

  constructor({ theme, nameSpace, roomNumber, ...gameSetup }: Props & RoomProps) {
    super({ theme, nameSpace, roomNumber });
    this.maxPlayers = gameSetup.maxPlayers;
  }

  gameLoop = (): void => {
    this.nameSpace.on('connection', (socket: Socket) => {
      console.log('Welcome to the game !');
      this.addPlayer(socket);

      socket.on('disconnect', () => {
        console.log('Left the game !');
        this.removePlayer(socket);
      });
    });
  };
}
