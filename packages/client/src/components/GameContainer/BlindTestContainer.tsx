import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useScreenWidth } from '../../utils/hooks/screenWidth';
import GameInput from '../GameInput';
import { BlindTestMainScreen } from '../GameMainScreen';
import { ScoreBoard } from '../ScoreBoard';

export default function BlindTestContainer() {
  const { colors } = useTheme();
  const isLargeScreen = useScreenWidth();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.primary },
        isLargeScreen && { flexDirection: 'row' },
      ]}>
      {!isLargeScreen && <BlindTestMainScreen />}
      <ScoreBoard />
      {isLargeScreen ? (
        <>
          <View style={styles.gameContainer}>
            <View style={styles.info}>
              <BlindTestMainScreen />
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
