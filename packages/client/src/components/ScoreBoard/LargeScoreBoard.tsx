import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useScreenWidth } from '../../utils/hooks/screenWidth';
import GameScoreBoard from './ScoreBoard';

export default function LargeScoreBoard() {
  const isLargeScreen = useScreenWidth();
  const { colors } = useTheme();

  if (!isLargeScreen) {
    return null;
  }
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.accent,
        },
      ]}>
      <GameScoreBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 350,
    maxWidth: 350,
    padding: 4,
  },
});
