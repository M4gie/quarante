import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import io from 'socket.io-client';

import Button from '../components/Button';
import CenterContainer from '../components/CenterContainer';
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
    <CenterContainer>
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
        <Button>Envoyer</Button>
      </View>
    </CenterContainer>
  );
}

const styles = StyleSheet.create({
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
});
