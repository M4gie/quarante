/**
 * RoomPool object
 */

import GameType from 'quarante-api/app/Models/GameType';
import Theme from 'quarante-api/app/Models/Theme';
import Game from 'quarante-api/build/app/Models/Game';
import { Server } from 'socket.io';

import BlindTest from '../games/blindTest';
import Quiz from '../games/quiz';
import Room from './room';

type Props = {
  games: Game[];
  server: Server;
};

export const enum GameTypes {
  BlindTest = 'blind test',
  Quiz = 'quiz',
}

export default class RoomPool {
  rooms: Room[] = [];
  server: Server;

  constructor({ games, server }: Props) {
    this.server = server;
    // Init RoomPool with one room of each themes
    for (let i = 0; i < games.length; i++) {
      this.addRoom(games[i]);
    }
  }

  addRoom = (game: Game): void => {
    const roomNumber = this.rooms.length.toString(); // Get a unique ID for the room
    const roomData = {
      icon: game.icon,
      nameSpace: this.server.of(roomNumber),
      roomNumber,
      theme: game.theme as Theme,
      type: game.gameType as GameType,
    };
    let room;
    switch (game.gameType.title) {
      case GameTypes.BlindTest:
        room = new BlindTest(roomData);
        break;
      case GameTypes.Quiz:
        room = new Quiz(roomData);
        break;
      default:
        room = new Quiz(roomData);
    }
    room.roomLoop();
    room.initGame();
    this.rooms.push(room);
  };

  getRooms = () => {
    const roomNames = this.rooms.map(({ theme, type, icon, id }) => {
      return { theme, type, icon, id };
    });
    return roomNames;
  };
}
