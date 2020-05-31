import React, { useState, useEffect } from 'react';
import { Text } from 'react-native-paper';

import { useSocketListener } from '../utils/hooks/socketListener';

export default function GameScoreBoard() {
  const [players, setPlayers] = useState<{ name: string; score: number }[]>([]);
  const data = useSocketListener('players', []);

  useEffect(() => {
    setPlayers(data);
  }, [data]);

  return (
    <>
      {players.map((player) => (
        <Text key={player.name} style={{ color: '#FFF' }}>
          {player.name} - {player.score}
        </Text>
      ))}
    </>
  );
}
