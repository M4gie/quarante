import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Home from '../screens/Home';
import Room from '../screens/Room';
import { HomeStackParamList } from '../typings/navigation';

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
