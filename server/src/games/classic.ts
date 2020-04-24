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
  isGuessTime: boolean = false;
  maxPlayers: number;
  currentRound: Round | null = null;
  rounds: Round[] = [];
  time: NodeJS.Timer | null = null;

  constructor({ theme, nameSpace, roomNumber, ...gameSetup }: Props & RoomProps) {
    super({ theme, nameSpace, roomNumber });
    this.maxPlayers = gameSetup.maxPlayers;
  }

  emitAnswer = () => {
    this.emit('answer', this.currentRound?.answer);
  };

  emitQuestion = () => {
    if (this.rounds.length <= 0) {
      this.fetchRounds();
    }
    const newRound = this.rounds.shift();
    if (newRound) {
      this.currentRound = newRound;
      this.emit('question', this.currentRound.question);
    }
  };

  fetchRounds = () => {
    this.rounds = [
      { question: 'Poupi poupi poupipou', answer: 'Malcolm' },
      { question: 'Now, say my name.', answer: 'Breaking Bad' },
    ];
  };

  gameLoop = () => {
    const interval = setInterval(() => {
      if (this.getTopPlayer().score >= 40) {
        this.emit('winner', this.getTopPlayer().name);
        clearInterval(interval);
      } else {
        this.isGuessTime = true;
        this.emitQuestion();
        setTimeout(() => {
          this.isGuessTime = false;
          this.emitAnswer();
        }, 15 * 1000);
      }
    }, 20 * 1000);
  };

  getTopPlayer = (): Player => {
    return this.players.reduce(function (prev, current) {
      return prev.score > current.score ? prev : current;
    });
  };

  initGame = () => {
    this.fetchRounds();
    this.event.on('start', () => this.gameLoop());
  };

  playerGuess = (id: string, guess: string) => {
    if (!guess) return;
    if (guess === this.currentRound?.answer && this.isGuessTime === true) {
      this.addPlayerPoint(id, 1);
    }
  };

  startGame = (socket: Socket) => {
    this.emitStatusToSocket(socket.id);
    if (this.status === Status.Waiting && this.players.length >= 2) {
      this.event.emit('start');
    }
    socket.on('guess', (guess) => this.playerGuess(socket.id, guess));
  };
}
