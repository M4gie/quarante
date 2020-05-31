import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useRecoilState } from 'recoil';
import io from 'socket.io-client';

import getEnv from '../constant/index';
import socketState from '../global/socket';
import { HomeNavigatorProps } from '../typings/navigation';
import { useScreenWidth } from '../utils/hooks/screenWidth';
import Game from './Game';
import Score from './Score';

const initialLayout = { width: Dimensions.get('window').width };

export default function Room({ route, navigation }: HomeNavigatorProps<'Room'>) {
  const isLargeScreen = useScreenWidth();
  navigation.setOptions({ headerTitle: route.params.title });
  const [socket, setSocket] = useRecoilState(socketState);
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
      const tmpSocket = io(getEnv().serverUrl + route.params.id);
      setSocket(tmpSocket);
      return () => socket?.close();
    }, [])
  );

  if (isLargeScreen) {
    return <Game />;
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
