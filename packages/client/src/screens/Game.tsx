import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import GameAnswer from '../components/GameAnswer';
import GameInput from '../components/GameInput';
import { ScoreBoard } from '../components/ScoreBoard';
import { useScreenWidth } from '../utils/hooks/screenWidth';

export default function Game() {
  const { colors } = useTheme();
  const isLargeScreen = useScreenWidth();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.primary },
        isLargeScreen && { flexDirection: 'row' },
      ]}>
      {!isLargeScreen && <GameAnswer />}
      <ScoreBoard />
      {isLargeScreen ? (
        <>
          <View style={styles.gameContainer}>
            <View style={styles.info}>
              <GameAnswer />
            </View>
            <GameInput />
          </View>
        </>
      ) : (
        <GameInput />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
