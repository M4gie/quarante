import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useSocketListener } from '../../utils/hooks/socketListener';
import Text from '../Text';

export default function ScoreBoard() {
  const players: { name: string; score: number }[] = useSocketListener('players', []);
  const { colors } = useTheme();

  return (
    <>
      {players.map((player) => (
        <View key={player.name} style={[styles.card, { backgroundColor: colors.primary }]}>
          <Image style={styles.avatar} source={require('../../../assets/avatars/fox.png')} />
          <Text fontSize="lg" style={styles.pseudo}>
            SuperZouloux
          </Text>
          <Text fontSize="lg" fontFamily="medium" style={styles.score}>
            {player.score}
          </Text>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 5,
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  pseudo: {
    paddingLeft: 10,
  },
  score: {
    marginLeft: 'auto',
  },
});
