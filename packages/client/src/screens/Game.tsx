import React from 'react';
import { View, StyleSheet } from 'react-native';

import CenterContainer from '../components/CenterContainer';
import GameAnswer from '../components/GameAnswer';
import GameInput from '../components/GameInput';
import GameQuestion from '../components/GameQuestion';

export default function Game() {
  return (
    <CenterContainer>
      <View style={styles.info}>
        <GameAnswer />
      </View>
      <View style={styles.info}>
        <GameQuestion />
      </View>
      <GameInput />
    </CenterContainer>
  );
}

const styles = StyleSheet.create({
  info: {
    marginBottom: 'auto',
    marginTop: 10,
  },
});
