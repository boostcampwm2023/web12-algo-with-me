import fetchTokeValidResponse from './api/data/fetchTokenValid';
import { BASE_URL } from './constance';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(`${BASE_URL}/auths/tests`, () => {
    return HttpResponse.json(fetchTokeValidResponse.correct);
  }),
];
