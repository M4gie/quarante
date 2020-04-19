/**
 * Classic game object
 */

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
  players = [];
  maxPlayers: number;

  constructor({ theme, nameSpace, roomNumber, ...gameSetup }: Props & RoomProps) {
    super({ theme, nameSpace, roomNumber });
    this.maxPlayers = gameSetup.maxPlayers;
  }

  gameLoop = (): void => {
    this.nameSpace.on('connection', function (socket) {
      console.log('Welcome to the game !');

      socket.on('disconnect', function () {
        console.log('Left the game !');
      });
    });
  };
}
