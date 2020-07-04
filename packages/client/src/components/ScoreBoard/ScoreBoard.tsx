import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { useSocketListener } from '../../utils/hooks/socketListener';

export default function ScoreBoard() {
  const players: { name: string; score: number }[] = useSocketListener('players', []);

  return (
    <>
      {players.map((player) => (
        <View
          key={player.name}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ color: '#FFF' }}>{player.name}</Text>
          <Text style={{ color: '#FFF' }}>{player.score}</Text>
        </View>
      ))}
    </>
  );
}
