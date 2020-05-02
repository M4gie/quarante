/**
 * Classic game object
 */

import { Socket } from 'socket.io';

import Player from '../player';
import { getRandomRounds } from '../requests';
import Room, { RoomProps, Status } from '../rooms/room';
import { Round } from '../typings/data';

export enum GameType {
  Classic,
}

enum GameEvent {
  Answer = 'answer',
  Guess = 'guess',
  Question = 'question',
  Start = 'start',
  Stop = 'stop',
  Winner = 'winner',
}

type Props = {
  maxPlayers: number;
};

export default class Classic extends Room {
  answerTimer: NodeJS.Timeout | null = null;
  isGuessTime: boolean = false;
  maxPlayers: number;
  currentRound: Round | null = null;
  rounds: Round[] = [];
  roundTimer: NodeJS.Timeout | null = null;
  time: NodeJS.Timer | null = null;

  constructor({ theme, nameSpace, roomNumber, ...gameSetup }: Props & RoomProps) {
    super({ theme, nameSpace, roomNumber });
    this.maxPlayers = gameSetup.maxPlayers;
  }

  emitAnswer = () => {
    this.emit(GameEvent.Answer, this.currentRound?.answer);
  };

  emitQuestion = async () => {
    if (this.rounds.length <= 0) {
      await this.fetchRounds();
    }
    const newRound = this.rounds.shift();
    if (newRound) {
      this.currentRound = newRound;
      this.emit(GameEvent.Question, this.currentRound.data);
    }
  };

  fetchRounds = async () => {
    this.rounds = await getRandomRounds([this.theme.id]);
  };

  gameLoop = () => {
    this.roundTimer = setInterval(() => {
      const topPlayer = this.getTopPlayer();
      if (topPlayer && topPlayer.score >= 40) {
        this.emit(GameEvent.Winner, topPlayer.name);
        if (this.roundTimer) {
          clearInterval(this.roundTimer);
        }
      } else {
        this.isGuessTime = true;
        this.emitQuestion();
        this.answerTimer = setTimeout(() => {
          this.isGuessTime = false;
          this.emitAnswer();
        }, 15 * 1000);
      }
    }, 20 * 1000);
  };

  gameStop = () => {
    if (this.roundTimer) {
      clearInterval(this.roundTimer);
    }
    if (this.answerTimer) {
      clearInterval(this.answerTimer);
    }
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
    if (this.status === Status.Waiting && this.players.length >= 1) {
      this.event.emit(GameEvent.Start);
    }
    socket.on(GameEvent.Guess, (guess) => this.playerGuess(socket.id, guess));
  };
}
