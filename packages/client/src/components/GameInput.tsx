import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRecoilValue } from 'recoil';

import Button from '../components/Button';
import socketState from '../global/socket';

export default function GameInput() {
  const [playerAnswer, setPlayerAnswer] = useState('');
  const socket = useRecoilValue(socketState);
  const { colors } = useTheme();

  function emitAnswer() {
    if (socket) {
      socket.emit('guess', playerAnswer);
      setPlayerAnswer('');
    }
  }

  return (
    <View style={styles.answer}>
      <TextInput
        value={playerAnswer}
        onChangeText={(text) => setPlayerAnswer(text)}
        multiline={false}
        style={[styles.input, { backgroundColor: colors.text }]}
      />
      <Button onPress={emitAnswer}>Envoyer</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  answer: {
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 10,
  },
  input: {
    borderRadius: 20,
    paddingLeft: 8,
    marginRight: 20,
  },
});
