import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRecoilValue } from 'recoil';

import Button from '../components/Button';
import { fontSizes } from '../constant/theme';
import socketState from '../global/socket';
import { useScreenWidth } from '../utils/hooks/screenWidth';

export default function GameInput() {
  const [playerAnswer, setPlayerAnswer] = useState('');
  const socket = useRecoilValue(socketState);
  const { colors } = useTheme();
  const isLargeScreen = useScreenWidth();

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
        style={[
          styles.input,
          { backgroundColor: colors.text, width: isLargeScreen ? '30%' : '80%' },
        ]}
      />
      <Button onPress={emitAnswer}>Envoyer</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  answer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 10,
  },
  input: {
    outlineWidth: 0,
    borderRadius: 20,
    paddingLeft: 15,
    marginRight: 20,
    fontFamily: 'ZillaSlab_400Regular',
    fontSize: fontSizes.lg,
  },
});
