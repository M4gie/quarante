import { Audio } from 'expo-av';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import isQuestionTimeState from '../global/isQuestionTimeState';
import timerState from '../global/timerState';
import { useSocketListener } from '../utils/hooks/socketListener';

export default function Sound() {
  const question = useSocketListener('question', null);
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

  return null;
}
