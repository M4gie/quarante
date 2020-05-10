import Theme from 'quarante-api/build/app/Models/Theme';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Title } from 'react-native-paper';
import io from 'socket.io-client';

import getEnv from '../constant/index';
import { HomeNavigationProp } from '../typings/navigation';

type Props = {
  navigation: HomeNavigationProp<'Home'>;
};

export default function Home({ navigation }: Props) {
  const { colors } = useTheme();
  const [rooms, setRooms] = useState<{ theme: Theme; id: string }[]>([]);
  let socket = null;

  useEffect(function mount() {
    socket = io(getEnv().serverUrl);
    socket.on('rooms', (data: { theme: Theme; id: string }[]) => {
      setRooms(data);
    });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      {rooms.map((room) => (
        <Title
          style={{ fontSize: 40 }}
          onPress={() => navigation.navigate('Room', { id: room.id, title: room.theme.title })}
          key={room.id}>
          {room.theme.title}
        </Title>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
