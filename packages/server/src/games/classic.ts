/**
 * Classic game object
 */

import Answer from 'quarante-api/app/Models/Answer';
import Round from 'quarante-api/build/app/Models/Round';
import { Socket } from 'socket.io';
import stringSimilarity from 'string-similarity';

import Player from '../player';
import { getRandomRounds } from '../requests';
import Room, { RoomProps, RoomStatus } from '../rooms/room';

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
  answers: string[] = [];
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

  setPlayerCanGuess = (id: string, canGuess: boolean): void => {
    const player: Player | undefined = this.getPlayer(id);
    if (player) {
      player.canGuess = canGuess;
      this.updatePlayer(player, id);
    }
  };

  setPlayersCanGuess = (canGuess: boolean): void => {
    this.players.forEach((player) => {
      if (player.canGuess === !canGuess) {
        this.setPlayerCanGuess(player.id, canGuess);
      }
    });
  };

  emitAnswer = () => {
    this.emit(GameEvent.Answer, this.answers);
  };

  emitQuestion = async () => {
    if (this.rounds.length <= 0) {
      await this.fetchRounds();
    }
    const newRound = this.rounds.shift();
    if (newRound) {
      this.currentRound = newRound;
      this.emit(GameEvent.Question, this.currentRound.data);
      this.answers = newRound.answers.map((answer: Answer) => answer.answer);
    }
  };

  fetchRounds = async () => {
    this.rounds = await getRandomRounds([this.theme.id]);
  };

  gameLoop = () => {
    this.roundTimer = global.setInterval(() => {
      const topPlayer = this.getTopPlayer();
      if (topPlayer && topPlayer.score >= 40) {
        this.emit(GameEvent.Winner, topPlayer.name);
        if (this.roundTimer) {
          clearInterval(this.roundTimer);
        }
      } else {
        this.isGuessTime = true;
        this.emitQuestion();
        this.answerTimer = global.setTimeout(() => {
          this.isGuessTime = false;
          this.setPlayersCanGuess(true);
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
    const player = this.getPlayer(id);
    if (!guess || !player || this.answers.length < 1) return;
    const result = stringSimilarity.findBestMatch(guess.toLowerCase(), this.answers);
    if (player.canGuess === true && result.bestMatch.rating >= 0.8 && this.isGuessTime === true) {
      this.setPlayerCanGuess(id, false);
      this.addPlayerPoint(id, 1);
    }
  };

  startGame = (socket: Socket) => {
    this.emitStatusToSocket(socket.id);
    if (this.status === RoomStatus.Waiting && this.players.length >= 1) {
      this.setStatus(RoomStatus.Starting);
      this.event.emit(GameEvent.Start);
    }
    socket.on(GameEvent.Guess, (guess) => this.playerGuess(socket.id, guess));
  };
}
