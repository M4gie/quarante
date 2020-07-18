import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { useRecoilValue } from 'recoil';

import pseudoState from '../global/pseudoState';
import Home from '../screens/Home';
import Room from '../screens/Room';
import SignIn from '../screens/SignIn';
import { HomeStackParamList } from '../typings/navigation';

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  const pseudo = useRecoilValue(pseudoState);
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
      {pseudo == null ? (
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: 'Quarante',
          }}
        />
      ) : (
        <>
          <Stack.Screen name="Home" options={{ headerTitle: 'Quarante' }} component={Home} />
          <Stack.Screen
            name="Room"
            component={Room}
            options={{
              headerStyle: { backgroundColor: colors.accent, borderBottomColor: colors.accent },
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
