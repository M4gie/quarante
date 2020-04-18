/**
 * Room object
 */

type Props = {
  roomName: string;
};

export default class Room {
  /* Name of the room and also the socket.io room name */
  roomName: string;

  /* Number of connected clients in the room */
  connected: number = 0;

  constructor({ roomName }: Props) {
    this.roomName = roomName;
  }
}
