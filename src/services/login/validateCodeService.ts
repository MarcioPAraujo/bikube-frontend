import axios, { AxiosError } from 'axios';
import { LOCAL_STORAGE_KEYS } from '@/utils/localStorageKeys';
import { decryptPassword } from '@/utils/encryptPassword';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { api } from '../api';

type Result =
  | { isValid: boolean; error: null }
  | { isValid: boolean; error: string };

export const validateCode = async (code: string): Promise<Result> => {
  const url = 'codigosenha/validar';

  try {
    const body = {
      codigo: code,
      email: localStorage.getItem(LOCAL_STORAGE_KEYS.email),
    };

    await api.post(url, body);

    return { isValid: true, error: null };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        return { isValid: false, error: axiosError.response.data as string };
      }
    }

    return { isValid: false, error: 'falha ao validar o código' };
  }
};

export const confirmCode = async (code: string): Promise<Result> => {
  const ENDPOINT = '/confirmaremail/validar';

  const encryptedEmail = sessionStorage.getItem(SESSION_STORAGE_KEYS.email);
  if (!encryptedEmail) {
    return { isValid: false, error: 'Email inexistente' };
  }

  const decryptedEmail = await decryptPassword(encryptedEmail);

  const body = {
    codigo: code,
    email: decryptedEmail,
  };

  try {
    await api.post(ENDPOINT, body);

    return { isValid: true, error: null };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        return { isValid: false, error: axiosError.response.data as string };
      }
    }

    return { isValid: false, error: 'Falha ao validar o código' };
  }
};
