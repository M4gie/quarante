import { atom } from 'recoil';

const playersState = atom<{ name: string; score: number }[]>({
  key: 'playersState',
  default: [],
});

export default playersState;
