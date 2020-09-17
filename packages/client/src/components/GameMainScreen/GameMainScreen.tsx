import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import isQuestionTimeState from '../../global/isQuestionTimeState';
import timerState from '../../global/timerState';
import { useSocketListener } from '../../utils/hooks/socketListener';
import Answer from './Answer';
import Info from './Info';
import Winner from './Winner';

export enum RoomStatus {
  Waiting,
  Starting,
  InProgress,
  Ended,
}

export default function GameMainScreen() {
  const [isQuestionTime, setIsQuestionTime] = useRecoilState(isQuestionTimeState);
  const setTime = useSetRecoilState(timerState);
  const answers: string[] = useSocketListener('answer', []);
  const status: { status: RoomStatus } = useSocketListener('status', RoomStatus.Waiting);
  const winner: string = useSocketListener('winner', 'UnPseudoRandom');

  useEffect(() => {
    if (!answers) return;
    setIsQuestionTime(false);
    setTime(5);
  }, [answers]);

  useEffect(() => {
    switch (status.status) {
      case RoomStatus.Starting:
        setTime(20);
        break;
      case RoomStatus.Ended:
        setTime(10);
        break;
    }
  }, [status]);

  switch (status.status) {
    case RoomStatus.Starting:
      return <Info />;
    case RoomStatus.InProgress:
      if (!isQuestionTime) {
        return <Answer answers={answers} />;
      }
      break;
    case RoomStatus.Ended:
      return <Winner winner={winner} />;
    default:
      return null;
  }
  return null;
}
