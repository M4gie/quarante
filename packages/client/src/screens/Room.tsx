import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import io from 'socket.io-client';

import GameTab from '../components/GameTab';
import Timer from '../components/Timer';
import getEnv from '../constant/index';
import pseudoState from '../global/pseudoState';
import socketState from '../global/socket';
import { HomeNavigatorProps } from '../typings/navigation';
import { useScreenWidth } from '../utils/hooks/screenWidth';
import Game from './Game';

export default function Room({ route, navigation }: HomeNavigatorProps<'Room'>) {
  navigation.setOptions({ headerTitle: '' });
  const isLargeScreen = useScreenWidth();
  const [socket, setSocket] = useRecoilState(socketState);
  const pseudo = useRecoilValue(pseudoState);

  useFocusEffect(
    React.useCallback(() => {
      if (!pseudo) return;
      const tmpSocket = io(getEnv().serverUrl + route.params.id, {
        query: {
          pseudo,
        },
      });
      setSocket(tmpSocket);
      return () => socket?.close();
    }, [pseudo])
  );

  return (
    <>
      <Timer />
      {isLargeScreen ? <Game /> : <GameTab />}
    </>
  );
}
