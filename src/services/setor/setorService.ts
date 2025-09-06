import { ISectorResponse } from '@/interfaces/setor/getSectorsList';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { api } from '../api';

type Result<T> = { data: T; error: null } | { data: null; error: string };

const handerError = (error: any): string | null => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      return axiosError.response.data as string;
    }
  }
  return null;
};

export const getsectors = async (): Promise<Result<ISectorResponse[]>> => {
  const url = '/setor';
  try {
    const response: AxiosResponse<ISectorResponse[]> = await api.get(url);

    const { data } = response;

    return { data, error: null };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { data: null, error: axiosError.response.data as string };
      }
    }
    return { data: null, error: 'Erro ao buscar setores' };
  }
};

export const createSector = async (
  sectorName: string,
): Promise<Result<string>> => {
  const url = '/setor';
  try {
    const response: AxiosResponse<string> = await api.post(url, {
      nome: sectorName,
    });

    const { data } = response;

    return { data, error: null };
  } catch (error: any) {
    const errorMessage = handerError(error);
    if (errorMessage) {
      return { data: null, error: errorMessage };
    }
    return { data: null, error: 'Erro ao criar setor' };
  }
};
