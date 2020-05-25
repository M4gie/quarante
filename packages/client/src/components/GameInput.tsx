import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';

import Button from '../components/Button';

type GameInputProps = {
  socket: SocketIOClient.Socket | null;
};

export default function GameInput(props: GameInputProps) {
  const [playerAnswer, setPlayerAnswer] = useState('');
  const { colors } = useTheme();

  function emitAnswer() {
    if (props.socket) {
      props.socket.emit('guess', playerAnswer);
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
    minWidth: 400,
    paddingLeft: 8,
    marginRight: 20,
  },
});
