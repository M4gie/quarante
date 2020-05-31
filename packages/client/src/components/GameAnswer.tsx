import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useRecoilState } from 'recoil';

import isQuestionTimeState from '../global/isQuestionTimeState';
import { useSocketListener } from '../utils/hooks/socketListener';

export default function GameAnswer() {
  const [answer, setAnswer] = useState('');
  const [isQuestionTime, setIsQuestionTime] = useRecoilState(isQuestionTimeState);
  const data = useSocketListener('answer', '');

  useEffect(() => {
    setIsQuestionTime(false);
    setAnswer(data);
  }, [data]);

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
