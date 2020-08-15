import { Audio } from 'expo-av';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import isQuestionTimeState from '../global/isQuestionTimeState';
import timerState from '../global/timerState';
import Text from './Text';

type GameQuestionProps = {
  question: string;
};

export default function GameQuestion({ question }: GameQuestionProps) {
  const setIsQuestionTime = useSetRecoilState(isQuestionTimeState);
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
