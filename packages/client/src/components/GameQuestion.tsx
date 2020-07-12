import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import isQuestionTimeState from '../global/isQuestionTimeState';
import timerState from '../global/timerState';
import { useSocketListener } from '../utils/hooks/socketListener';
import Text from './Text';

export default function GameQuestion() {
  const defaultValue = 'La partie va bientôt commencer !';
  const setIsQuestionTime = useSetRecoilState(isQuestionTimeState);
  const question = useSocketListener('question', defaultValue);
  const setTime = useSetRecoilState(timerState);

  useEffect(() => {
    if (!question || question === defaultValue) return;
    setIsQuestionTime(true);
    setTime(15);
  }, [question]);

  return <Text fontSize="xl">{question}</Text>;
}
