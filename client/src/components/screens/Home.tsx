import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import io from 'socket.io-client';
import styled from 'styled-components/native';

export default function Home() {
  const [rooms, setRooms] = useState([]);
  let socket = null;

  useEffect(function mount() {
    socket = io('ws://localhost:4040/');
    socket.on('rooms', (data: any) => {
      setRooms(data);
    });
  }, []);

  return (
    <Container>
      <Text>Rooms:</Text>
      {rooms.map((room) => (
        <Text key={room.id}>{room.theme}</Text>
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
