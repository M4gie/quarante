import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import io from 'socket.io-client';

import getEnv from '../constant/index';
import { HomeNavigatorProps } from '../typings/navigation';

export default function Room({ route, navigation }: HomeNavigatorProps<'Room'>) {
  const { colors } = useTheme();
  navigation.setOptions({ headerTitle: route.params.title });
  let socket: SocketIOClient.Socket | null = null;
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  /* const [players, setPlayers] = useState<{ name: string; score: number }[]>([]); */
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [isQuestionTime, setisQuestionTime] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      socket = io(getEnv().serverUrl + route.params.id);
      addSocketListener();
      return () => socket?.close();
    }, [])
  );

  function addSocketListener(): void {
    if (!socket) return;
    socket.on('answer', (data: any) => {
      setAnswer(data);
      setisQuestionTime(false);
    });
    socket.on('question', (data: any) => {
      setQuestion(data);
      setisQuestionTime(true);
    });
    /* socket.on('players', (data: any) => {
      setPlayers(data);
    }); */
  }

  function emitAnswer() {
    if (socket) {
      socket.emit('guess', playerAnswer);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.info}>
        <Text style={{ fontSize: 20 }}>
          {!isQuestionTime && answer !== '' && `La réponse était: ${answer}`}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={{ fontSize: 30 }}>{question}</Text>
      </View>
      <View style={styles.answer}>
        <TextInput
          value={playerAnswer}
          onChangeText={(text) => setPlayerAnswer(text)}
          multiline={false}
          style={[styles.input, { backgroundColor: colors.text }]}
        />
        <Button
          onPress={emitAnswer}
          theme={{ roundness: 0 }}
          style={[styles.button, { backgroundColor: colors.text }]}>
          Envoyer
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    marginBottom: 'auto',
    marginTop: 10,
  },
  content: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  answer: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 10,
  },
  input: {
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
    paddingLeft: 8,
  },
  button: {
    borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
  },
});

/*
      <Text>Joueurs: </Text>
      {players.map((player) => (
        <Text key={player.name}>
          {player.name} {player.score}
        </Text>
      ))} 
 */
