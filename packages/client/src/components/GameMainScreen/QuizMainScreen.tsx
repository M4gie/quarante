import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import isQuestionTimeState from '../../global/isQuestionTimeState';
import timerState from '../../global/timerState';
import { useSocketListener } from '../../utils/hooks/socketListener';
import Answer from './GameStatus/Answer';
import Info from './GameStatus/Info';
import Question from './GameStatus/Question';
import Winner from './GameStatus/Winner';

export enum RoomStatus {
  Waiting,
  Starting,
  InProgress,
  Ended,
}

export default function QuizMainScreen() {
  const [isQuestionTime, setIsQuestionTime] = useRecoilState(isQuestionTimeState);
  const setTime = useSetRecoilState(timerState);
  const answers: string[] = useSocketListener('answer', []);
  const status: { status: RoomStatus } = useSocketListener('status', RoomStatus.Waiting);
  const winner: string = useSocketListener('winner', 'UnPseudoRandom');
  const question = useSocketListener('question', null);

  useEffect(() => {
    if (!answers) return;
    setIsQuestionTime(false);
    setTime(5);
  }, [answers]);

  useEffect(() => {
    if (!question) return;
    setIsQuestionTime(true);
    setTime(15);
  }, [question]);

  useEffect(() => {
    switch (status.status) {
      case RoomStatus.Starting:
        setTime(20);
        break;
      case RoomStatus.Ended:
        setTime(10);
        break;
      default:
        setTime(20);
    }
  }, [status]);

  switch (status.status) {
    case RoomStatus.Starting:
      return <Info />;
    case RoomStatus.InProgress:
      if (isQuestionTime) {
        return <Question question={question} />;
      } else {
        return <Answer answers={answers} />;
      }
    case RoomStatus.Ended:
      return <Winner winner={winner} />;
    default:
      return <Info />;
  }
}
