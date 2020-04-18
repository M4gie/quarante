/**
 * RoomPool object
 */

import Room from './room';

type Props = {
  defaultRooms: string[];
};

export default class RoomPool {
  /* All rooms */
  rooms: Room[] = [];

  constructor({ defaultRooms }: Props) {
    /* Create all default rooms */
    for (let i = 0; i < defaultRooms.length; i++) {
      this.rooms.push(new Room({ roomName: defaultRooms[i] }));
    }
  }
}
