import { ILoginResponse } from '@/interfaces/login/loginResponse';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { api } from '../api';

interface ILoginBody {
  registro: string;
  senha: string;
}

type Result<T> = { data: T; error: null } | { data: null; error: string };

export const loginAuth = async (
  body: ILoginBody,
): Promise<Result<ILoginResponse>> => {
  const url = '/auth/login';
  try {
    const response: AxiosResponse<ILoginResponse> = await api.post(url, body);

    sessionStorage.setItem(
      SESSION_STORAGE_KEYS.token,
      JSON.stringify(response.data.access_token),
    );

    const { data } = response;
    return { data, error: null };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { data: null, error: axiosError.response.data as string };
      }
    }
    return { data: null, error: 'Erro ao fazer login' };
  }
};
