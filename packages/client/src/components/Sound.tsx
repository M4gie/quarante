import { Audio, AVPlaybackStatus } from 'expo-av';
import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

import isQuestionTimeState from '../global/isQuestionTimeState';
import timerState from '../global/timerState';
import { useSocketListener } from '../utils/hooks/socketListener';

export default function Sound() {
  const question = useSocketListener('question', null);
  const setIsQuestionTime = useSetRecoilState(isQuestionTimeState);
  const setTime = useSetRecoilState(timerState);
  const sound = useRef<{
    sound: Audio.Sound;
    status: AVPlaybackStatus;
  } | null>(null);

  async function playSound() {
    try {
      sound.current = await Audio.Sound.createAsync({ uri: question }, { shouldPlay: true });
    } catch (e) {
      console.log('Error on sound creation: ', e);
    }
  }

  useEffect(() => {
    return () => {
      // eslint-disable-next-line no-unused-expressions
      sound.current?.sound.unloadAsync();
      return undefined;
    };
  }, [sound]);

  useEffect(() => {
    if (!question) return;
    setIsQuestionTime(true);
    setTime(15);
    playSound();
  }, [question]);

  return null;
}
