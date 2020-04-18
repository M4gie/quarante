/**
 * Room object
 */

import { Namespace } from 'socket.io';

type Props = {
  name: string;
  nameSpace: Namespace;
};

export default class Room {
  /* Name of the room and also the socket.io room name */
  name: string;

  /* Socket.io room namespace */
  nameSpace: Namespace;

  /* Number of connected clients in the room */
  clients: number = 0;

  constructor({ name, nameSpace }: Props) {
    this.name = name;
    this.nameSpace = nameSpace;
  }
}
