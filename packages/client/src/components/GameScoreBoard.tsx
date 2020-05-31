import React, { useState, useEffect } from 'react';
import { Text } from 'react-native-paper';
import { useRecoilValue } from 'recoil';

import socketState from '../global/socket';

export default function GameScoreBoard() {
  const socket = useRecoilValue(socketState);
  const [players, setPlayers] = useState<{ name: string; score: number }[]>([]);

  useEffect(() => {
    listenPlayers();
  }, []);

  function listenPlayers() {
    if (socket === null) return;
    socket.on('players', (data: any) => {
      setPlayers(data);
    });
  }

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
