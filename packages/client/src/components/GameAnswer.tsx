import React, { useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';

import isQuestionTimeState from '../global/isQuestionTimeState';
import timerState from '../global/timerState';
import { useSocketListener } from '../utils/hooks/socketListener';
import Text from './Text';

export default function GameAnswer() {
  const [isQuestionTime, setIsQuestionTime] = useRecoilState(isQuestionTimeState);
  const setTime = useSetRecoilState(timerState);
  const answers: string[] | null = useSocketListener('answer', null);
  const fontSize = Platform.OS === 'web' ? 'xl' : 'md';

  useEffect(() => {
    if (!answers) return;
    setIsQuestionTime(false);
    setTime(5);
  }, [answers]);

  if (!isQuestionTime && !answers) {
    return (
      <Text fontSize={fontSize} fontFamily="regular" style={styles.text}>
        La partie va bientôt commencer !
      </Text>
    );
  } else if (!isQuestionTime && answers) {
    return (
      <>
        <Text fontSize={fontSize} fontFamily="regular" style={styles.text}>
          {answers.length > 1 ? 'Les réponses étaient:' : 'La réponse était:'}
        </Text>
        <Text fontSize={fontSize} fontFamily="medium" style={styles.text}>
          {answers.length > 1 ? answers.join(' / ') : answers}
        </Text>
      </>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  text: {
    padding: Platform.OS === 'web' ? 10 : 2,
    textAlign: 'center',
  },
});
