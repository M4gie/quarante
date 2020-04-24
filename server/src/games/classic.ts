/**
 * Classic game object
 */

import { Socket } from 'socket.io';

import Player from '../player';
import Room, { RoomProps, Status } from '../rooms/room';

export enum GameType {
  Classic,
}

export enum GameTheme {
  MangaAnime,
  Movie,
}

type Round = {
  question: string;
  answer: string;
};

type Props = {
  maxPlayers: number;
};

export default class Classic extends Room {
  maxPlayers: number;
  currentRound: Round | null = null;
  rounds: Round[] = [];
  time: NodeJS.Timer | null = null;

  constructor({ theme, nameSpace, roomNumber, ...gameSetup }: Props & RoomProps) {
    super({ theme, nameSpace, roomNumber });
    this.maxPlayers = gameSetup.maxPlayers;
  }

  emitAnswer = () => {};

  emitQuestion = () => {};

  fetchQuestions = () => {
    this.rounds = [
      { question: 'Poupi poupi poupipou', answer: 'Malcolm' },
      { question: 'Now, say my name.', answer: 'Breaking Bad' },
    ];
  };

  gameLoop(id: string) {
    setInterval(() => {
      this.emitToSocket('question', { question: this.currentRound }, id);
      setTimeout(() => {
        this.emitToSocket('answer', { answer: 'Malcolm' }, id);
      }, 3 * 1000);
    }, 5 * 1000);
  }

  getTopPlayer = (): Player => {
    return this.players.reduce(function (prev, current) {
      return prev.score > current.score ? prev : current;
    });
  };

  startGame = (socket: Socket) => {
    if (this.status === Status.Waiting && this.players.length >= 1) {
      this.setStatus(Status.InProgress, socket.id);
      this.gameLoop(socket.id);
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
