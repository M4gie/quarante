import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useRecoilState } from 'recoil';
import io from 'socket.io-client';

import GameTab from '../components/GameTab';
import getEnv from '../constant/index';
import socketState from '../global/socket';
import { HomeNavigatorProps } from '../typings/navigation';
import { useScreenWidth } from '../utils/hooks/screenWidth';
import Game from './Game';

export default function Room({ route, navigation }: HomeNavigatorProps<'Room'>) {
  navigation.setOptions({ headerTitle: route.params.title });
  const isLargeScreen = useScreenWidth();
  const [socket, setSocket] = useRecoilState(socketState);

  useFocusEffect(
    React.useCallback(() => {
      const tmpSocket = io(getEnv().serverUrl + route.params.id);
      setSocket(tmpSocket);
      return () => socket?.close();
    }, [])
  );

  if (isLargeScreen) {
    return <Game />;
  }

  return <GameTab />;
}
