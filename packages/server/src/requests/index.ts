import Round from 'quarante-api/build/app/Models/Round';
import Theme from 'quarante-api/build/app/Models/Theme';

import request from './axiosWrap';

export async function getThemes(): Promise<Theme[]> {
  return request({
    url: `/themes`,
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
