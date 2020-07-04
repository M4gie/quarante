import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useRecoilState, useSetRecoilState } from 'recoil';

import isQuestionTimeState from '../global/isQuestionTimeState';
import timerState from '../global/timerState';
import { useSocketListener } from '../utils/hooks/socketListener';

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
    <Text style={styles.answer}>
      {!isQuestionTime && answer !== '' && `La réponse était: ${answer}`}
    </Text>
  );
}

const styles = StyleSheet.create({
  answer: {
    fontSize: 20,
  },
});
