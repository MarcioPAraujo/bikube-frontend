/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/vagas', () => {
    return HttpResponse.json(
      { data: [{ id: 1, title: 'Mocked Vacancy' }] },
      { status: 200 },
    );
  }),

  http.get('/vagas', () => {
    return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }),
];
