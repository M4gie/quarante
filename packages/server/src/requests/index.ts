import Game from 'quarante-api/build/app/Models/Game';
import Round from 'quarante-api/build/app/Models/Round';

import request from './axiosWrap';

export async function getGames(): Promise<Game[]> {
  return request({
    url: `/games`,
    method: 'GET',
  });
}

export async function getRandomRounds(themes: number[]): Promise<Round[]> {
  return request({
    url: `/rounds/random`,
    method: 'POST',
    data: {
      themes,
    },
  });
}
