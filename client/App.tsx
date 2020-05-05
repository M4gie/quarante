import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import HomeStack from './src/navigation/HomeStack';

export default function App() {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}
