import React from 'react';
import io from 'socket.io-client';

import Home from './src/components/screens/Home';
import Room from './src/components/screens/Room';

export default function App() {
  const socket = io('ws://localhost:4240/1');
  return <Room socket={socket} />;
}
