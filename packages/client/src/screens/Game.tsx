import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import GameAnswer from '../components/GameAnswer';
import GameInput from '../components/GameInput';
import GameQuestion from '../components/GameQuestion';
import { LargeScoreBoard } from '../components/ScoreBoard';

export default function Game() {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <LargeScoreBoard />
      <View style={styles.gameContainer}>
        <View style={styles.info}>
          <GameAnswer />
        </View>
        <View style={styles.info}>
          <GameQuestion />
        </View>
        <GameInput />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    marginBottom: 'auto',
    marginTop: 10,
  },
});
