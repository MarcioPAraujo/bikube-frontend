import { Result } from '@/interfaces/apiResult';
import axios, { AxiosError } from 'axios';

const handleError = <T>(error: any, defaultMessage: string): Result<T> => {
  if (!axios.isAxiosError(error)) {
    return { data: null, error: defaultMessage };
  }
  const axiosError = error as AxiosError;
  if (axiosError.response) {
    return { data: null, error: axiosError.response.data as string };
  }
  return { data: null, error: defaultMessage };
};
export default handleError;
