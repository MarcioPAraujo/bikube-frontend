import { Result } from '@/interfaces/apiResult';
import { AxiosError, AxiosResponse } from 'axios';
import { SESSION_STORAGE_KEYS } from '@/utils/sessionStorageKeys';
import { api } from '../api';

export interface ICandidaetLoginResponse {
  access_token: string;
  termo: string;
  id: string;
}

export interface ICandidateLoginBody {
  email: string;
  password: string;
}

export const candidateLogin = async (
  body: ICandidateLoginBody,
): Promise<Result<ICandidaetLoginResponse>> => {
  const ENDPOINT = '/auth/logincandidato';

  try {
    const response: AxiosResponse<ICandidaetLoginResponse> = await api.post(
      ENDPOINT,
      body,
    );

    sessionStorage.setItem(
      SESSION_STORAGE_KEYS.token,
      JSON.stringify(response.data.access_token),
    );

    return { data: response.data, error: null };
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return { data: null, error: axiosError.response.data as string };
    }
    return { data: null, error: 'falha ao realizar login' };
  }
};
