/**
 * Player object
 */

type Props = {
  name: string;
  id: string;
};

export default class Player {
  id: string;
  name: string;
  score: number = 0;
  canGuess: boolean = true;
  avatar: number = 0;

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.avatar = Math.floor(Math.random() * Math.floor(18));
  }
}
