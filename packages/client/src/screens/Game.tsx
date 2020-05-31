import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useRecoilState, useRecoilValue } from 'recoil';

import CenterContainer from '../components/CenterContainer';
import GameInput from '../components/GameInput';
import answerState from '../global/answer';
import isQuestionTimeState from '../global/isQuestionTimeState';
import questionState from '../global/question';

export default function Game() {
  const isQuestionTime = useRecoilValue(isQuestionTimeState);
  const answer = useRecoilValue(answerState);
  const question = useRecoilState(questionState);

  return (
    <CenterContainer>
      <View style={styles.info}>
        <Text style={{ fontSize: 20 }}>
          {!isQuestionTime && answer !== '' && `La réponse était: ${answer}`}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={{ fontSize: 30 }}>{question}</Text>
      </View>
      <GameInput />
    </CenterContainer>
  );
}

const styles = StyleSheet.create({
  info: {
    marginBottom: 'auto',
    marginTop: 10,
  },
});
