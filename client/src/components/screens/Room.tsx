import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import io from 'socket.io-client';
import styled from 'styled-components/native';

export default function Room() {
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [players, setPlayers] = useState([]);

  useEffect(function mount() {
    const socket = io('ws://localhost:4240/1');
    socket.on('answer', (data: any) => {
      setAnswer(data);
    });
    socket.on('question', (data: any) => {
      setQuestion(data);
    });
    socket.on('players', (data: any) => {
      console.log(players);
      setPlayers(data);
    });
  }, []);

  return (
    <Container>
      <Text>Answer: {answer}</Text>
      <Text>Question: {question}</Text>
      <Text>Players: </Text>
      {players.map((player) => (
        <Text key={player.name}>{player.name}</Text>
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
