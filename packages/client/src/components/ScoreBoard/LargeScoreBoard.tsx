import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
          borderColor: colors.text,
        },
      ]}>
      <Text
        style={[
          styles.containerTitle,
          {
            color: colors.text,
          },
        ]}>
        Classement
      </Text>
      <GameScoreBoard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    borderWidth: 10,
    borderRadius: 50,
    padding: 20,
    width: 400,
    height: 600,
  },
  containerTitle: {
    alignSelf: 'center',
    fontSize: 20,
    fontFamily: 'ZillaSlab_500Medium',
    paddingBottom: 20,
  },
});
