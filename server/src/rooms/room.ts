/**
 * Room object
 */

import { Namespace } from 'socket.io';

type Props = {
  name: string;
  nameSpace: Namespace;
  roomNumber: string;
};

export default class Room {
  name: string;
  nameSpace: Namespace; // Socket.io room namespace
  id: string;
  clients: number = 0;

  constructor({ name, nameSpace, roomNumber }: Props) {
    this.name = name;
    this.nameSpace = nameSpace;
    this.id = roomNumber;
  }

  gameLoop = (): void => {
    this.nameSpace.on('connection', function (socket) {
      console.log('Welcome to the game !');

      socket.on('disconnect', function () {
        console.log('Left the game !');
      });
    });
  };
}
