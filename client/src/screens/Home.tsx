import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import io from 'socket.io-client';
import styled from 'styled-components/native';

import { SERVER_URL } from '../constant';
import { HomeNavigationProp } from '../typings/navigation';

type Props = {
  navigation: HomeNavigationProp<'Home'>;
};

export default function Home({ navigation }: Props) {
  const [rooms, setRooms] = useState([]);
  let socket = null;

  useEffect(function mount() {
    console.log('Connect to :', SERVER_URL);
    socket = io(SERVER_URL);
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
