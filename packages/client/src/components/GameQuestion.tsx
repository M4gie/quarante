import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import isQuestionTimeState from '../global/isQuestionTimeState';
import socketState from '../global/socket';

export default function GameQuestion() {
  const socket = useRecoilValue(socketState);
  const [question, setQuestion] = useState('La partie va bientôt commencer !');
  const setIsQuestionTime = useSetRecoilState(isQuestionTimeState);

  useEffect(() => {
    listenQuestions();
  }, []);

  function listenQuestions() {
    if (socket === null) return;
    socket.on('question', (data: any) => {
      setIsQuestionTime(true);
      setQuestion(data);
    });
  }

  return <Text style={styles.question}>{question}</Text>;
}

const styles = StyleSheet.create({
  question: {
    fontSize: 30,
  },
});
