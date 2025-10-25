import { Result } from '@/interfaces/apiResult';
import { AxiosError, AxiosResponse } from 'axios';
import handleError from '@/utils/handleError';
import { api } from '../api';

export interface ILanguagesListResponse {
  id: number;
  idioma: string;
}

export const getLanguages = async (): Promise<
  Result<ILanguagesListResponse[]>
> => {
  const ENDPOINT = '/idioma';

  try {
    const response: AxiosResponse<ILanguagesListResponse[]> = await api.get(
      ENDPOINT,
    );
    return { data: response.data, error: null };
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return { data: null, error: axiosError.response.data as string };
    }
    return { data: null, error: 'falha ao buscar idiomas' };
  }
};

export const createLanguage = async (
  language: string,
): Promise<Result<boolean>> => {
  const ENDPOINT = '/idioma';

  const body = { idioma: language };

  try {
    await api.post(ENDPOINT, body);
    return { data: true, error: null };
  } catch (error: any) {
    return handleError(error, 'falha ao criar idioma');
  }
};
