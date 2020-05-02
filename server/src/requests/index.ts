import { Theme } from '../typings/data';
import request from './axiosWrap';

export async function getThemes(): Promise<Theme[]> {
  return request({
    url: `/themes`,
    method: 'GET',
  });
}
