import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import io from 'socket.io-client';
import styled from 'styled-components/native';

import { HomeNavigationProp } from '../typings/navigation';
import getEnv from '../constant';

type Props = {
  navigation: HomeNavigationProp<'Home'>;
};

export default function Home({ navigation }: Props) {
  const [rooms, setRooms] = useState([]);
  let socket = null;

  useEffect(function mount() {
    console.log('SERVER_URL: ', getEnv().serverUrl);
    socket = io(getEnv().serverUrl);
    socket.on('rooms', (data: any) => {
      setRooms(data);
    });
  }, []);

  return (
    <Container>
      <Text>Rooms:</Text>
      {rooms.map((room) => (
        <Text onPress={() => navigation.navigate('Room', { id: room.id })} key={room.id}>
          {room.theme}
        </Text>
      ))}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
