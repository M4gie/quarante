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

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
  }
}
