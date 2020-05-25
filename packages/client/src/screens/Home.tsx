import Theme from 'quarante-api/build/app/Models/Theme';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Button from '../components/Button';
import CenterContainer from '../components/CenterContainer';
import getEnv from '../constant/index';
import { HomeNavigationProp } from '../typings/navigation';

type Props = {
  navigation: HomeNavigationProp<'Home'>;
};

export default function Home({ navigation }: Props) {
  const [rooms, setRooms] = useState<{ theme: Theme; id: string }[]>([]);
  let socket = null;

  useEffect(function mount() {
    socket = io(getEnv().serverUrl);
    socket.on('rooms', (data: { theme: Theme; id: string }[]) => {
      setRooms(data);
    });
  }, []);

  return (
    <CenterContainer>
      {rooms.map((room) => (
        <Button
          key={room.id}
          onPress={() => navigation.navigate('Room', { id: room.id, title: room.theme.title })}>
          {room.theme.title}
        </Button>
      ))}
    </CenterContainer>
  );
}
