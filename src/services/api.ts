/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { LOCAL_STORAGE_KEYS } from '@/utils/localStorageKeys';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';

interface RetryQueueItem {
  resolve: (value?: string | null) => void;
  reject: (error?: AxiosError | null) => void;
}

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: RetryQueueItem[] = [];

const clearLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.refreshToken);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.candidate);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.employee);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.email);
};
const clearSessionStorage = () => {
  sessionStorage.removeItem(SESSION_STORAGE_KEYS.token);
  sessionStorage.removeItem(SESSION_STORAGE_KEYS.candidate);
  sessionStorage.removeItem(SESSION_STORAGE_KEYS.employee);
  sessionStorage.removeItem(SESSION_STORAGE_KEYS.email);
};

const PUBLIC_ENDPOINTS = [
  '/auth/login',
  '/auth/logincandidato',
  '/auth/refresh',
  '/confirmaremail',
  '/confirmaremail/validar',
  '/candidato/aceitartermos',
];

/**
 * Attaches the Authorization header with the access token to each request
 * if the endpoint is not public
 */
api.interceptors.request.use(
  async config => {
    const isPublicEndpoint = PUBLIC_ENDPOINTS.some(endpoint =>
      config.url?.startsWith(endpoint),
    );
    if (isPublicEndpoint) return config;

    const token =
      sessionStorage.getItem(SESSION_STORAGE_KEYS.token) ||
      localStorage.getItem(LOCAL_STORAGE_KEYS.token);

    if (token === null) return config;

    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.refreshToken);

  // If no refresh token is found, the user must log in again.
  if (refreshToken === null) {
    // return error to trigger logout in interceptor
    return Promise.reject(
      new Error('No refresh token found. User must log in again.'),
    );
  }

  try {
    const refreshPayload = JSON.parse(refreshToken);
    // The returned data is the new access token.
    const { data } = await api.post('/auth/refresh', {
      token: refreshPayload,
    });

    if (data) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.token, data);
      return data;
    }

    return Promise.reject(
      new Error('Refresh token endpoint did not return a new access token.'),
    );
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * Processes the queue of failed requests after token refresh
 * @param error - The error encountered during the refresh process
 * @param token - The new access token, if refresh was successful
 */
const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  if (error) {
    failedQueue.forEach(prom => prom.reject(error));
  } else {
    failedQueue.forEach(prom => prom.resolve(token));
  }
  failedQueue = [];
};

/**
 * Response interceptor to handle 401 errors and token refresh
 */
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config as AxiosRequestConfig & {
      retry?: boolean;
    };
    const originalResponse = error.response;

    // Check for a 401 status and that the request hasn't been retried yet.
    // Also, ensure it's not a request to the refresh endpoint itself.
    if (
      originalResponse?.status !== 401 ||
      originalRequest.url?.includes('/auth/refresh')
    ) {
      return Promise.reject(error);
    }

    // If we've already retried this request, logout the user.
    if (originalRequest.retry) {
      clearLocalStorage();
      clearSessionStorage();
      window.location.href = '/';
      return Promise.reject(error);
    }

    // If a refresh is already in progress, add the request to a queue.
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(token => {
          // Once the refresh is done, a new promise is created and fulfilled
          // with the new token. The original request is retried with the new token.
          originalRequest.headers!.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }

    // This is the first 401. Start the refresh process.
    originalRequest.retry = true;
    isRefreshing = true;

    try {
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // If succsss, update the token in the headers for the original request.
        originalRequest.headers!.Authorization = `Bearer ${newAccessToken}`;

        // Process all the requests in the queue.
        processQueue(null, newAccessToken);

        // Retry the original request.
        return api(originalRequest);
      }
      // If the refresh function returns a non-token value, reject all pending requests.
      return Promise.reject(error);
    } catch (refreshError) {
      // If the refresh fails, clear storage and redirect to login.
      clearLocalStorage();
      clearSessionStorage();
      window.location.href = '/';
    } finally {
      isRefreshing = false;
    }
  },
);
