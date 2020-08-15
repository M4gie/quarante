import React from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useSocketListener } from '../../utils/hooks/socketListener';
import Text from '../Text';

const avatars = [
  'alien',
  'avocado',
  'boom',
  'burn',
  'clown',
  'eagle',
  'fox',
  'gun',
  'robot',
  'scream',
];

export default function ScoreBoardContent() {
  const players: { name: string; score: number; avatar: number }[] = useSocketListener(
    'players',
    []
  );
  const { colors } = useTheme();

  return (
    <ScrollView style={styles.container}>
      {players.map((player) => (
        <View key={player.name} style={[styles.card, { backgroundColor: colors.primary }]}>
          <Image
            style={styles.avatar}
            source={require(`../../../assets/avatars/${
              avatars[player.avatar ? player.avatar : 0]
            }.png`)}
          />
          <Text fontSize="lg" style={styles.pseudo}>
            {player.name}
          </Text>
          <Text fontSize="lg" fontFamily="medium" style={styles.score}>
            {player.score}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '80vh',
  },
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
