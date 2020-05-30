import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';

import Room from '../screens/Room';
import Score from '../screens/Score';

const Tab = createMaterialTopTabNavigator();

export default function RoomTopTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Score" component={Score} />
      <Tab.Screen name="Jeu" component={Room} />
      <Tab.Screen name="Chat" component={Score} />
    </Tab.Navigator>
  );
}
