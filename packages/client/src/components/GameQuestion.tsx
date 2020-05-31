import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useSetRecoilState } from 'recoil';

import isQuestionTimeState from '../global/isQuestionTimeState';
import { useSocketListener } from '../utils/hooks/socketListener';

export default function GameQuestion() {
  const [question, setQuestion] = useState('');
  const setIsQuestionTime = useSetRecoilState(isQuestionTimeState);
  const data = useSocketListener('question', 'La partie va bientôt commencer !');

  useEffect(() => {
    setIsQuestionTime(true);
    setQuestion(data);
  }, [data]);

  return <Text style={styles.question}>{question}</Text>;
}

const styles = StyleSheet.create({
  question: {
    fontSize: 30,
  },
});
