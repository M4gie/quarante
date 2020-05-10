import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import io from 'socket.io-client';

import getEnv from '../constant/index';
import { HomeNavigatorProps } from '../typings/navigation';

export default function Room({ route, navigation }: HomeNavigatorProps<'Room'>) {
  navigation.setOptions({ headerTitle: route.params.title });
  const socket: SocketIOClient.Socket = io(getEnv().serverUrl + route.params.id);
  return (
    <View style={styles.container}>
      <RoomContent socket={socket} />
    </View>
  );
}

function RoomContent({ socket }: { socket: SocketIOClient.Socket }) {
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [players, setPlayers] = useState<{ name: string; score: number }[]>([]);
  const [playerAnswer, setPlayerAnswer] = useState('');

  useEffect(function mount() {
    socket.on('answer', (data: any) => {
      setAnswer(data);
    });
    socket.on('question', (data: any) => {
      setQuestion(data);
    });
    socket.on('players', (data: any) => {
      setPlayers(data);
    });
  }, []);

  function emitAnswer() {
    socket.emit('guess', playerAnswer);
  }

  return (
    <View style={styles.container}>
      <Text>Réponse: {answer}</Text>
      <Text>Citation: {question}</Text>
      <Text>Joueurs: </Text>
      {players.map((player) => (
        <Text key={player.name}>
          {player.name} {player.score}
        </Text>
      ))}
      <Text>Donner une réponse: </Text>
      <TextInput onChangeText={(text) => setPlayerAnswer(text)} />
      <Button title="Envoyer" onPress={emitAnswer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
