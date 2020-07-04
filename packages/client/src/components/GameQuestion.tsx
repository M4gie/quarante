import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useSetRecoilState } from 'recoil';

import isQuestionTimeState from '../global/isQuestionTimeState';
import timerState from '../global/timerState';
import { useSocketListener } from '../utils/hooks/socketListener';

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

  return <Text style={styles.question}>{question}</Text>;
}

const styles = StyleSheet.create({
  question: {
    fontSize: 30,
  },
});
