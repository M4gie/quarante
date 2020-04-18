import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

export default function App() {
  return (
    <Container>
      <Text>Open up App.tsx to start working on your app!</Text>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;
