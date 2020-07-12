import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import isQuestionTimeState from '../global/isQuestionTimeState';
import timerState from '../global/timerState';
import { useSocketListener } from '../utils/hooks/socketListener';
import Text from './Text';

export default function GameAnswer() {
  const [isQuestionTime, setIsQuestionTime] = useRecoilState(isQuestionTimeState);
  const setTime = useSetRecoilState(timerState);
  const answer = useSocketListener('answer', '');

  useEffect(() => {
    if (!answer) return;
    setIsQuestionTime(false);
    setTime(5);
  }, [answer]);

  return (
    <Text fontSize="lg">{!isQuestionTime && answer !== '' && `La réponse était: ${answer}`}</Text>
  );
}
