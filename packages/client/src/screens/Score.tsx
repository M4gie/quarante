import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import ScoreBoard from '../components/ScoreBoard/ScoreBoard';

export default function Score() {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.accent }]}>
      <ScoreBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
  },
});
