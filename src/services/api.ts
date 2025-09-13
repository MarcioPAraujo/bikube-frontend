/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios, { AxiosRequestConfig } from 'axios';
import { LOCAL_STORAGE_KEYS } from '@/utils/localStorageKeys';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import {
  CandidatePublicRoutes,
  EmployeePublicRoutes,
} from '@/utils/routes/routes';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const clearLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.refreshToken);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.user);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.email);
};
const clearSessionStorage = () => {
  sessionStorage.removeItem(SESSION_STORAGE_KEYS.token);
  sessionStorage.removeItem(SESSION_STORAGE_KEYS.user);
  sessionStorage.removeItem(SESSION_STORAGE_KEYS.email);
};

const PUBLIC_ENDPOINTS = [
  CandidatePublicRoutes.LOGIN,
  CandidatePublicRoutes.EMAIL_VERIFICATION,
  CandidatePublicRoutes.CODE_VERIFICATION,
  CandidatePublicRoutes.PASSWORD_RESET,

  CandidatePublicRoutes.REGISTER.STEP1,
  CandidatePublicRoutes.REGISTER.STEP1_EMAIL,
  CandidatePublicRoutes.REGISTER.STEP2,
  CandidatePublicRoutes.REGISTER.STEP3,
  CandidatePublicRoutes.REGISTER.STEP4,
  CandidatePublicRoutes.REGISTER.STEP5,

  EmployeePublicRoutes.LOGIN,
  EmployeePublicRoutes.EMAIL_VERIFICATION,
  EmployeePublicRoutes.CODE_VERIFICATION,
  EmployeePublicRoutes.PASSWORD_RESET,
];

api.interceptors.request.use(
  async config => {
    const isPublicEndpoint = PUBLIC_ENDPOINTS.some(endpoint =>
      config.url?.startsWith(endpoint),
    );
    if (!isPublicEndpoint) {
      const token =
        sessionStorage.getItem(SESSION_STORAGE_KEYS.token) ||
        localStorage.getItem(LOCAL_STORAGE_KEYS.token);

      if (token) {
        if (config.headers) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
        }
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let failedQueue: {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}[] = [];

export async function refreshAccessToken(): Promise<string> {
  const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.refreshToken);

  // If no refresh token is found, or it's a security measure to ensure the user is authenticated.
  if (!refreshToken) {
    // Redirect to login or handle as a session end.
    window.location.href = '/';
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

    console.log('New access token received:', data);

    if (data) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.token, data);
      return data;
    }

    return Promise.reject(
      new Error('Refresh token endpoint did not return a new access token.'),
    );
  } catch (error) {
    // If the refresh token itself is invalid, clear storage and force login.
    console.error('Refresh token failed:', error);
    clearLocalStorage();
    clearSessionStorage();
    window.location.href = '/';
    return Promise.reject(error);
  }
}
/*
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.refreshToken);
  if (!refreshToken) {
    clearLocalStorage();
    clearSessionStorage();
    window.location.href = '/';
    return '';
  }
  try {
    const refresh = JSON.parse(refreshToken);
    // the returned data is the new access token
    const { data } = await api.post('/auth/refresh', {
      token: refresh,
    });
    console.log('New access token received:', data);
    if (data) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.token, data);
      return data;
    }
  } catch (error) {
    clearLocalStorage();
    clearSessionStorage();
    window.location.href = '/';
  }
};
*/

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

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
      originalResponse?.status === 401 &&
      !originalRequest.retry &&
      originalRequest.url !== '/auth/refresh'
    ) {
      // If a refresh is already in progress, add the request to a queue.
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            // Once the refresh is done, a new promise is created and fulfilled
            // with the new token. The original request is retried with the new token.
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
            }
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
          if (originalRequest.headers) {
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${newAccessToken}`;
          }
          // Process all the requests in the queue.
          processQueue(null, newAccessToken);

          // Retry the original request.
          return api(originalRequest);
        }
        // If the refresh function returns a non-token value, reject all pending requests.
        processQueue(new Error('Refresh token failed'), null);
        return Promise.reject(error);
      } catch (refreshError) {
        // If the refresh token itself fails, reject all pending requests and log the user out.
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Reject all other errors.
    return Promise.reject(error);
  },
);

/*
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest.retry &&
      originalRequest.url !== '/auth/refresh'
    ) {
      originalRequest.retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);
*/
