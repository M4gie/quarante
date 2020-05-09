import Theme from 'quarante-api/build/app/Models/Theme';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import io from 'socket.io-client';

import getEnv from '../constant/index';
import { HomeNavigationProp } from '../typings/navigation';

type Props = {
  navigation: HomeNavigationProp<'Home'>;
};

export default function Home({ navigation }: Props) {
  const [rooms, setRooms] = useState<{ theme: Theme; id: string }[]>([]);
  let socket = null;

  useEffect(function mount() {
    socket = io(getEnv().serverUrl);
    socket.on('rooms', (data: { theme: Theme; id: string }[]) => {
      setRooms(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Rooms:</Text>
      {rooms.map((room) => (
        <Text onPress={() => navigation.navigate('Room', { id: room.id })} key={room.id}>
          {room.theme.title}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
