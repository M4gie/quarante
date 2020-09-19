import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import io from 'socket.io-client';

import Sound from '../components/Sound';
import Timer from '../components/Timer';
import getEnv from '../constant/index';
import pseudoState from '../global/pseudoState';
import socketState from '../global/socket';
import { HomeNavigatorProps } from '../typings/navigation';
import Game from './Game';

export default function Room({ route, navigation }: HomeNavigatorProps<'Room'>) {
  navigation.setOptions({ headerTitle: 'Youtube' }); // Will set it dynamicaly later :D
  const setSocket = useSetRecoilState(socketState);
  const pseudo = useRecoilValue(pseudoState);

  useFocusEffect(
    React.useCallback(() => {
      console.log('Join the game');
      if (!pseudo) return;
      const tmpSocket = io(getEnv().serverUrl + route.params.id, {
        query: {
          pseudo,
        },
      });
      setSocket(tmpSocket);
      return () => tmpSocket.close();
    }, [pseudo])
  );

  return (
    <>
      <Timer />
      <Game />
      <Sound />
    </>
  );
}
