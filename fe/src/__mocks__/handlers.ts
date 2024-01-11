import { BASE_URL } from './constance';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(`${BASE_URL}/test`, () => {
    return HttpResponse.json({
      data: '테스트 OK',
    });
  }),
];
