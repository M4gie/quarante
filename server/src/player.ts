/**
 * Player object
 */

type Props = {
  name: string;
  id: string;
};

export default class Player {
  name: string;
  id: string;
  score: number = 0;

  constructor(props: Props) {
    this.name = props.name;
    this.id = props.id;
  }
}
