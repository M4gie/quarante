import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import io from 'socket.io-client';

import CenterContainer from '../components/CenterContainer';
import { Quiz, BlindTest } from '../components/Game';
import getEnv from '../constant/index';
import pseudoState from '../global/pseudoState';
import socketState from '../global/socket';
import { HomeNavigatorProps } from '../typings/navigation';
import { useSocketListener } from '../utils/hooks/socketListener';
import { titleCase } from '../utils/text';

export enum GameTypes {
  BlindTest = 'blind test',
  Quiz = 'quiz',
}

export default function Room({ route, navigation }: HomeNavigatorProps<'Room'>) {
  const setSocket = useSetRecoilState(socketState);
  const pseudo = useRecoilValue(pseudoState);
  const { colors } = useTheme();
  const roomInfos: { theme: string; type: string } | null = useSocketListener('infos', null);

  useEffect(() => {
    if (!roomInfos) return;
    navigation.setOptions({ headerTitle: titleCase(roomInfos.theme) });
  }, [roomInfos]);

  useFocusEffect(
    React.useCallback(() => {
      if (!pseudo) return;
      const socket = io(getEnv().serverUrl + route.params.id, {
        query: {
          pseudo,
        },
        reconnectionAttempts: 3,
      });
      setSocket(socket);
      return () => socket.close();
    }, [pseudo])
  );

  if (!roomInfos)
    return (
      <CenterContainer>
        <ActivityIndicator color={colors.text} />
      </CenterContainer>
    );

  switch (roomInfos.type) {
    case GameTypes.BlindTest:
      return <BlindTest />;
    case GameTypes.Quiz:
      return <Quiz />;
  }
  return null;
}
