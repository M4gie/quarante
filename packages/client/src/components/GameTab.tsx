import React from 'react';
import { Dimensions } from 'react-native';
import SceneMap from 'react-native-tab-view/src/SceneMap';
import TabBar from 'react-native-tab-view/src/TabBar';
import TabView from 'react-native-tab-view/src/TabView';

import Game from '../screens/Game';
import Score from '../screens/Score';

const RenderTabBar = (props: any) => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: '#272745' }}
    />
  );
};

const initialLayout = { width: Dimensions.get('window').width };

export default function GameTab() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Jeu' },
    { key: 'second', title: 'Score' },
  ]);

  const renderScene = SceneMap({
    first: Game,
    second: Score,
  });

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
