import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import Text from '../Text';

type Answer = {
  answers: string[];
};

export default function Answer({ answers }: Answer) {
  const fontSize = Platform.OS === 'web' ? 'xl' : 'md';

  if (answers.length <= 0) return null;

  return (
    <>
      <Text fontSize={fontSize} fontFamily="regular" style={styles.text}>
        {answers.length > 1 ? 'Les réponses étaient:' : 'La réponse était:'}
      </Text>
      <Text fontSize={fontSize} fontFamily="medium" style={styles.text}>
        {answers.length > 1 ? answers.join(' / ') : answers}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: Platform.OS === 'web' ? 10 : 2,
    textAlign: 'center',
  },
});
