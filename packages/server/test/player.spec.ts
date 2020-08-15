import test from 'japa';

import Player from '../src/player';

test('Create new user', (assert) => {
  const player = new Player({ id: '0', name: 'Pialex996' });
  assert.containsAllKeys(player, ['id', 'name', 'score', 'canGuess', 'avatar']);
  assert.equal(player.name, 'Pialex996');
  assert.equal(player.id, '0');
});

test('Random Avatar', (assert) => {
  const player = new Player({ id: '0', name: 'Clapota' });
  assert.isAbove(player.avatar, -1);
  assert.isBelow(player.avatar, 10);
}).retry(20); // Just to check we are not lucky
