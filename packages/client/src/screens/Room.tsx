import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react';
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
  const setSocket = useSetRecoilState(socketState);
  const pseudo = useRecoilValue(pseudoState);

  useEffect(() => {
    navigation.setOptions({ headerTitle: 'Youtube' }); // Will set it dynamicaly later :D
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (!pseudo) return;
      const socket = io(getEnv().serverUrl + route.params.id, {
        query: {
          pseudo,
        },
      });
      setSocket(socket);
      return () => socket.close();
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
