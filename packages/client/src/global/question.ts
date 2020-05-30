import { atom } from 'recoil';

const questionState = atom<string>({
  key: 'questionState',
  default: 'La partie va bientôt commencer !',
});

export default questionState;
