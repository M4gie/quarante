//@ts-ignore
import ReactTimer from '@xendora/react-timer';
import React from 'react';
import { ProgressBar } from 'react-native-paper';
import { useRecoilValue } from 'recoil';

import timerState from '../global/timerState';

export default function Timer() {
  const timer = useRecoilValue(timerState);

  return (
    <ReactTimer
      interval={1000}
      start={timer}
      key={timer} // Allow to reset the timer
      end={(t: number) => t === 0}
      onTick={(t: number) => t - 1}>
      {(time: number) => (
        <ProgressBar progress={time / timer} color="darkgreen" style={{ height: 10 }} />
      )}
    </ReactTimer>
  );
}
