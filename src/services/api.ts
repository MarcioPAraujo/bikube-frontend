/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from 'axios';
import { LOCAL_STORAGE_KEYS, SESSION_STORAGE_KEYS } from '@/utils/localStorageKeys';

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL,
});

const PUBLIC_ENDPOINTS = [
  '/auth/login',
  '/auth/refresh',
  'usuario/novasenha',
  'codigosenha',
  'codigosenha/validar',
];

api.interceptors.request.use(
  config => {
    const isPublicEndpoint = PUBLIC_ENDPOINTS.some(endpoint =>
      config.url?.startsWith(endpoint)
    );
    if (!isPublicEndpoint) {
      const token = sessionStorage.getItem(SESSION_STORAGE_KEYS.token) ||
        localStorage.getItem(LOCAL_STORAGE_KEYS.token);

      if (token) {
        if (config.headers) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
    }
    return config;
  }
)
