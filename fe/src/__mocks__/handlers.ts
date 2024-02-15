import fetchTokeValidResponse from './api/data/fetchTokenValid';
import { BASE_URL } from './constance';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(`${BASE_URL}/auths/tests`, ({ request }) => {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (token === 'correct') {
      return HttpResponse.json(fetchTokeValidResponse.correct);
    }
    throw new Error('UnAuthorized');
  }),
];
