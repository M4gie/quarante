import React from 'react';
import { View, StyleSheet } from 'react-native';

import CenterContainer from '../components/CenterContainer';
import GameAnswer from '../components/GameAnswer';
import GameInput from '../components/GameInput';
import GameQuestion from '../components/GameQuestion';
import { LargeScoreBoard } from '../components/ScoreBoard';

export default function Game() {
  return (
    <CenterContainer>
      <LargeScoreBoard />
      <View style={styles.info}>
        <GameAnswer />
      </View>
      <View style={styles.info}>
        <GameQuestion />
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
