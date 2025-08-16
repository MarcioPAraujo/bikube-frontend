import { ILogsresponse } from '@/interfaces/logs/logsResponse';
import { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import { api } from '../api';

type Result<T> = { data: T; error: null } | { data: null; error: string };

export const getLogs = async (): Promise<Result<ILogsresponse[]>> => {
  const url = '/log';

  try {
    const response: AxiosResponse<ILogsresponse[]> = await api.get(url);

    return { data: response.data, error: null };
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { data: null, error: axiosError.response.data as string };
      }
    }
    return { data: null, error: 'Erro ao buscar logs' };
  }
};
