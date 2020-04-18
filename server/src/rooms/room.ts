/**
 * Room object
 */

import { Namespace } from 'socket.io';

type Props = {
  nameSpace: Namespace;
};

export default class Room {
  /* Socket.io room namespace */
  nameSpace: Namespace;

  /* Number of connected clients in the room */
  clients: number = 0;

  constructor({ nameSpace }: Props) {
    this.nameSpace = nameSpace;
  }
}
