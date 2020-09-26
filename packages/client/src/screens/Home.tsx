import Theme from 'quarante-api/build/app/Models/Theme';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Button from '../components/Button';
import CenterContainer from '../components/CenterContainer';
import Text from '../components/Text';
import getEnv from '../constant/index';
import { HomeNavigationProp } from '../typings/navigation';

type Props = {
  navigation: HomeNavigationProp<'Home'>;
};

export default function Home({ navigation }: Props) {
  const [rooms, setRooms] = useState<{ theme: Theme; id: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  let socket = null;

  useEffect(function mount() {
    socket = io(getEnv().serverUrl, { reconnectionAttempts: 3 });
    socket.on('full', (error: string) => {
      navigation.navigate('Home');
      setError(error);
    });
    socket.on('rooms', (data: { theme: Theme; id: string }[]) => {
      setRooms(data);
    });
  }, []);

  return (
    <CenterContainer footerEnable>
      <Text fontFamily="medium" fontSize="lg">
        {error}
      </Text>
      {rooms.map((room) => (
        <Button key={room.id} onPress={() => navigation.navigate('Room', { id: room.id })}>
          {room.theme.title}
        </Button>
      ))}
      <Button onPress={() => navigation.navigate('Upload')}>Proposer un son</Button>
    </CenterContainer>
  );
}
