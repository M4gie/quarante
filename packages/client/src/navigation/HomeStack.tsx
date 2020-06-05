import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import Home from '../screens/Home';
import Room from '../screens/Room';
import { HomeStackParamList } from '../typings/navigation';

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: colors.text,
        headerStyle: { backgroundColor: colors.accent, borderBottomColor: colors.text },
        headerTitleStyle: { fontFamily: 'ZillaSlab_500Medium' },
      }}>
      <Stack.Screen name="Home" options={{ headerTitle: 'Quarante' }} component={Home} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
