import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useRecoilState, useSetRecoilState } from 'recoil';
import io from 'socket.io-client';

import getEnv from '../constant/index';
import answerState from '../global/answer';
import playersState from '../global/players';
import questionState from '../global/question';
import socketState from '../global/socket';
import { HomeNavigatorProps } from '../typings/navigation';
import Game from './Game';
import Score from './Score';

const initialLayout = { width: Dimensions.get('window').width };

export default function Room({ route, navigation }: HomeNavigatorProps<'Room'>) {
  const [socket, setSocket] = useRecoilState(socketState);
  const setAnswer = useSetRecoilState(answerState);
  const setQuestion = useSetRecoilState(questionState);
  const setPlayers = useSetRecoilState(playersState);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Jeu' },
    { key: 'second', title: 'Score' },
  ]);

  const renderScene = SceneMap({
    first: Game,
    second: Score,
  });

  useFocusEffect(
    React.useCallback(() => {
      const tmpSocket = io(getEnv().serverUrl + 0);
      setSocket(tmpSocket);
      addSocketListener(tmpSocket);
      return () => socket?.close();
    }, [])
  );

  function addSocketListener(socket: SocketIOClient.Socket): void {
    if (socket === null) return;
    socket.on('answer', (data: any) => {
      setAnswer(data);
    });
    socket.on('question', (data: any) => {
      setQuestion(data);
    });
    socket.on('players', (data: any) => {
      setPlayers(data);
    });
  }

  return (
    <TabView
      renderTabBar={RenderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
}

const RenderTabBar = (props: any) => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#272745' }}
    />
  );
};
