import React from 'react';
import { Text } from 'react-native';
import { useRecoilValue } from 'recoil';

import CenterContainer from '../components/CenterContainer';
import playersState from '../global/players';

export default function Score() {
  const players = useRecoilValue(playersState);

  return (
    <CenterContainer>
      {players.map((player) => (
        <Text key={player.name} style={{ color: '#FFF' }}>
          {player.name} - {player.score}
        </Text>
      ))}
    </CenterContainer>
  );
}
