import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

import isQuestionTimeState from '../../global/isQuestionTimeState';
import timerState from '../../global/timerState';
import { useSocketListener } from '../../utils/hooks/socketListener';
import QSounds from '../../utils/sounds';

export default function BlindTestSound() {
  const question = useSocketListener('question', null);
  const find = useSocketListener('find', null);
  const setIsQuestionTime = useSetRecoilState(isQuestionTimeState);
  const setTime = useSetRecoilState(timerState);
  const sounds = useRef<QSounds>(new QSounds());

  async function playFindSound() {
    if (!sounds.current.isLoaded('find')) {
      await sounds.current.add('find', require('../../../assets/sounds/pop.mp3'));
    }
    sounds.current.play('find');
  }

  useEffect(() => {
    return () => {
      // eslint-disable-next-line no-unused-expressions
      sounds.current.unloadAll();
      return undefined;
    };
  }, [sounds]);

  useEffect(() => {
    if (!question) return;
    setIsQuestionTime(true);
    setTime(15);
    sounds.current.add('question', { uri: question }, { shouldPlay: true });
  }, [question]);

  useEffect(() => {
    if (find) {
      playFindSound();
    }
  }, [find]);

  return null;
}
