import React, { useState } from 'react';
import { TextInput, StyleSheet, AsyncStorage } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSetRecoilState } from 'recoil';

import Button from '../components/Button';
import CenterContainer from '../components/CenterContainer';
import { fontSizes } from '../constant/theme';
import pseudoState from '../global/pseudoState';
import { useScreenWidth } from '../utils/hooks/screenWidth';

export default function SignIn() {
  const [pseudo, setPseudo] = useState<null | string>(null);
  const { colors } = useTheme();
  const isLargeScreen = useScreenWidth();
  const setRecoilPseudo = useSetRecoilState(pseudoState);

  async function handleSignIn() {
    await AsyncStorage.setItem('pseudo', JSON.stringify(pseudo));
    setRecoilPseudo(pseudo);
  }
  async function checkKey(key: string) {
    if (key === 'Enter') {
      handleSignIn();
    }
  }

  return (
    <CenterContainer style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.text, width: isLargeScreen ? '20%' : '80%' },
        ]}
        maxLength={16}
        placeholder="Pseudonyme"
        onChange={(data) => setPseudo(data.nativeEvent.text)}
        onKeyPress={(e) => checkKey(e.nativeEvent.key)}
      />
      <Button onPress={handleSignIn} style={styles.button}>
        Jouer
      </Button>
    </CenterContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 0,
    margin: 0,
    height: 50,
    justifyContent: 'center',
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
  },
  container: {
    flexDirection: 'row',
  },
  input: {
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    outlineWidth: 0,
    paddingLeft: 15,
    textAlign: 'center',
    height: 50,
    fontFamily: 'ZillaSlab_400Regular',
    fontSize: fontSizes.lg,
  },
});
