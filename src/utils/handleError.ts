import { Result } from '@/interfaces/apiResult';
import { AxiosError } from 'axios';

const handleError = <T>(error: any, defaultMessage: string): Result<T> => {
  const axiosError = error as AxiosError;
  if (axiosError.response) {
    return { data: null, error: axiosError.response.data as string };
  }
  return { data: null, error: defaultMessage };
};
export default handleError;
