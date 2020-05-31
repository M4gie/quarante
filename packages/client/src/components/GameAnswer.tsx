import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useRecoilValue, useRecoilState } from 'recoil';

import isQuestionTimeState from '../global/isQuestionTimeState';
import socketState from '../global/socket';

export default function GameAnswer() {
  const socket = useRecoilValue(socketState);
  const [answer, setAnswer] = useState('');
  const [isQuestionTime, setIsQuestionTime] = useRecoilState(isQuestionTimeState);

  useEffect(() => {
    listenAnswers();
  }, []);

  function listenAnswers() {
    if (socket === null) return;
    socket.on('answer', (data: any) => {
      setIsQuestionTime(false);
      setAnswer(data);
    });
  }

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
