/**
 * Classic game object
 */

import axios from 'axios';
import { Socket } from 'socket.io';

import Player from '../player';
import Room, { RoomProps, Status } from '../rooms/room';

export enum GameType {
  Classic,
}

enum GameEvent {
  Answer = 'answer',
  Guess = 'guess',
  Question = 'question',
  Start = 'start',
  Winner = 'winner',
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
    this.emit(GameEvent.Answer, this.currentRound?.answer);
  };

  emitQuestion = () => {
    if (this.rounds.length <= 0) {
      this.fetchRounds();
    }
    const newRound = this.rounds.shift();
    if (newRound) {
      this.currentRound = newRound;
      this.emit(GameEvent.Question, this.currentRound.question);
    }
  };

  fetchRounds = () => {
    console.log('THEME: ', this.theme);
    this.rounds = [
      { question: 'Poupi poupi poupipou', answer: 'Malcolm' },
      { question: 'Now, say my name.', answer: 'Breaking Bad' },
    ];
  };

  gameLoop = () => {
    const interval = setInterval(() => {
      const topPlayer = this.getTopPlayer();
      if (topPlayer && topPlayer.score >= 40) {
        this.emit(GameEvent.Winner, topPlayer.name);
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

  getTopPlayer = (): Player | null => {
    if (this.players.length > 0) {
      return this.players.reduce(function (prev, current) {
        return prev.score > current.score ? prev : current;
      });
    }
    return null;
  };

  initGame = () => {
    this.fetchRounds();
    this.event.on(GameEvent.Start, () => this.gameLoop());
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
      this.event.emit(GameEvent.Start);
    }
    socket.on(GameEvent.Guess, (guess) => this.playerGuess(socket.id, guess));
  };
}
