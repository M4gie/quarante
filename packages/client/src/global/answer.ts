import { atom } from 'recoil';

const answerState = atom<string>({
  key: 'answerState',
  default: '',
});

export default answerState;
