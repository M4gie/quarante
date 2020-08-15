import { Audio } from 'expo-av';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import isQuestionTimeState from '../global/isQuestionTimeState';
import timerState from '../global/timerState';
import { useSocketListener } from '../utils/hooks/socketListener';
import Text from './Text';

export default function GameQuestion() {
  const setIsQuestionTime = useSetRecoilState(isQuestionTimeState);
  const question = useSocketListener('question', null);
  const setTime = useSetRecoilState(timerState);

  async function playSound() {
    await Audio.Sound.createAsync({ uri: question }, { shouldPlay: true });
  }

  useEffect(() => {
    if (!question) return;
    setIsQuestionTime(true);
    setTime(15);
    playSound();
  }, [question]);

  if (!question) {
    return <Text fontSize="xl">La partie va bientôt commencer !</Text>;
  }
  return null;
}
