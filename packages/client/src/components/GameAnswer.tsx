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
  const answer = useSocketListener('answer', '');
  const fontSize = Platform.OS === 'web' ? 'xl' : 'md';

  useEffect(() => {
    if (!answer) return;
    setIsQuestionTime(false);
    setTime(5);
  }, [answer]);

  if (!isQuestionTime && !answer) {
    return (
      <Text fontSize={fontSize} fontFamily="regular" style={styles.text}>
        La partie va bientôt commencer !
      </Text>
    );
  } else if (!isQuestionTime && answer !== '') {
    return (
      <>
        <Text fontSize={fontSize} fontFamily="regular" style={styles.text}>
          La réponse était:
        </Text>
        <Text fontSize={fontSize} fontFamily="medium" style={styles.text}>
          {answer}
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
