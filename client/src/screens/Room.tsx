import React, { useEffect, useState } from 'react';
import { Text, TextInput, Button } from 'react-native';
import io from 'socket.io-client';
import styled from 'styled-components/native';

import getEnv from '../constant';
import { HomeNavigatorProps } from '../typings/navigation';

export default function Room({ route, navigation }: HomeNavigatorProps<'Room'>) {
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [players, setPlayers] = useState([]);
  const [playerAnswer, setPlayerAnswer] = useState('');

  useEffect(function mount() {
    const socket = io(getEnv().serverUrl + route.params.id);
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

  function emitAnswer() {
    /* socket.emit('guess', playerAnswer); */
  }

  return (
    <Container>
      <Text>Réponse: {answer}</Text>
      <Text>Question: {question}</Text>
      <Text>Joueurs: </Text>
      {players.map((player) => (
        <Text key={player.name}>
          {player.name} {player.score}
        </Text>
      ))}
      <Text>Donner une réponse: </Text>
      <TextInput onChangeText={(text) => setPlayerAnswer(text)} />
      <Button title="Envoyer" onPress={emitAnswer} />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
