import { http, HttpResponse } from 'msw';
import { api } from '../src/services/api';
import { server } from '../src/mocks/server';

describe('Axios interceptor', () => {
  const expiredToken = 'expired-jwt-token';
  const newToken = 'new-valid-jwt-token';

  it('should queue failed requests and retry them after refreshing the token', async () => {
    // Spies to count how many times each mock endpoint is called
    const refreshTokenSpy = jest.fn();
    const vagasSpy = jest.fn();

    // 1. Mock the REFRESH TOKEN endpoint
    server.use(
      http.post('https://api.example.com/refresh-token', () => {
        refreshTokenSpy();
        // This mock simulates a successful token refresh
        return HttpResponse.json({ accessToken: newToken }, { status: 200 });
      }),
    );

    // 2. Mock the DATA endpoint (/vagas)
    server.use(
      http.get('https://api.example.com/vagas', ({ request }) => {
        vagasSpy();
        // This mock behaves like a real server:
        // It fails if the token is old, and succeeds if it's new.
        const token = request.headers.get('Authorization')?.split(' ')[1];

        if (token === expiredToken) {
          return HttpResponse.json({ error: 'Token expired' }, { status: 401 });
        }

        if (token === newToken) {
          return HttpResponse.json(
            { data: [{ id: 1, title: 'Mocked Vacancy' }] },
            { status: 200 },
          );
        }

        // Fails any request without a valid token
        return HttpResponse.json({ error: 'Invalid token' }, { status: 403 });
      }),
    );

    // Set the initial "expired" token for the API instance before the test
    api.defaults.headers.common.Authorization = `Bearer ${expiredToken}`;

    // 3. Fire all three requests concurrently
    const promise1 = api.get('/vagas');
    const promise2 = api.get('/vagas');
    const promise3 = api.get('/vagas');

    // 4. Wait for all promises to resolve
    const responses = await Promise.all([promise1, promise2, promise3]);

    // 5. Assert the results
    // All requests should have eventually succeeded with the correct data
    responses.forEach(response => {
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        data: [{ id: 1, title: 'Mocked Vacancy' }],
      });
    });

    // The refresh endpoint should have been called EXACTLY ONCE.
    // This is the most important assertion.
    expect(refreshTokenSpy).toHaveBeenCalledTimes(1);

    // The /vagas endpoint should have been called 4 times in total:
    // - 1 initial failure with the expired token
    // - 3 successful retries with the new token
    expect(vagasSpy).toHaveBeenCalledTimes(4);
  });
});
