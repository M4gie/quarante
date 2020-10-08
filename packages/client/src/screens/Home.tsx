import GameType from 'quarante-api/build/app/Models/GameType';
import Theme from 'quarante-api/build/app/Models/Theme';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import io from 'socket.io-client';

import Card from '../components/Card';
import CenterContainer from '../components/CenterContainer';
import Text from '../components/Text';
import getEnv from '../constant/index';
import { HomeNavigationProp } from '../typings/navigation';

type Props = {
  navigation: HomeNavigationProp<'Home'>;
};

export default function Home({ navigation }: Props) {
  const [rooms, setRooms] = useState<
    { theme: Theme; id: string; icon: string; players: number; type: GameType }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  let socket = null;

  useEffect(function mount() {
    socket = io(getEnv().serverUrl, { reconnectionAttempts: 3 });
    socket.on('full', (error: string) => {
      navigation.navigate('Home');
      setError(error);
    });
    socket.on(
      'rooms',
      (data: { theme: Theme; id: string; icon: string; players: number; type: GameType }[]) => {
        setRooms(data);
      }
    );
  }, []);

  function navigate(id: string) {
    navigation.navigate('Room', { id });
  }

  return (
    <CenterContainer footerEnable>
      <Text fontFamily="medium" fontSize="lg">
        {error}
      </Text>
      <View style={styles.cardsContainter}>
        {rooms.map((room) => (
          <Card
            key={room.id}
            onPress={() => navigate(room.id)}
            icon={room.icon}
            players={room.players}
            title={room.theme.title}
            subTitle={room.type.title}
          />
        ))}
      </View>
      {/* Add new question is temporaly disable https://github.com/M4gie/quarante/issues/70
       <Button onPress={() => navigation.navigate('Upload')}>Proposer un son</Button> 
       */}
    </CenterContainer>
  );
}

const styles = StyleSheet.create({
  cardsContainter: {
    flexDirection: 'row',
  },
});
