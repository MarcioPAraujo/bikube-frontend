import { Result } from '@/interfaces/apiResult';
import { IEmployeeMirrorResponse } from '@/interfaces/mirror/employeeMirrorResponse';
import axios, { AxiosResponse } from 'axios';
import handleError from '@/utils/handleError';
import { api } from '../api';

export interface IHolidayResponse {
  date: string; // format: 'YYYY-MM-DD'
  name: string;
  type: string;
}

export interface IJustificationRequest {
  iditem: number;
  descricao: string;
}

export const getMyMirrors = async (): Promise<
  Result<IEmployeeMirrorResponse[]>
> => {
  const END_POINT = '/espelho/meuespelho';

  try {
    const response: AxiosResponse<IEmployeeMirrorResponse[]> = await api.get(
      END_POINT,
    );
    return { data: response.data, error: null };
  } catch (error: any) {
    return handleError(error, 'Falha ao recuperrar os espelhos de ponto');
  }
};

export const getEmployeeMirrors = async (
  employeeId: string,
): Promise<Result<IEmployeeMirrorResponse[]>> => {
  const END_POINT = `/espelho/${employeeId}`;

  try {
    const response: AxiosResponse<IEmployeeMirrorResponse[]> = await api.get(
      END_POINT,
    );
    return { data: response.data, error: null };
  } catch (error: any) {
    return handleError(error, 'Falha ao recuperrar os espelhos de ponto');
  }
};

export const markMirror = async (
  employeeId: string,
): Promise<Result<boolean>> => {
  const END_POINT = `/espelho/baterponto/${employeeId}`;

  try {
    await api.post(END_POINT, null);
    return { data: true, error: null };
  } catch (error: any) {
    return handleError(error, 'Falha ao bater o ponto');
  }
};

export const createAbsencyJustification = async (
  body: IJustificationRequest,
): Promise<Result<boolean>> => {
  const END_POINT = '/espelho/abono';

  try {
    await api.post(END_POINT, body);
    return { data: true, error: null };
  } catch (error: any) {
    return handleError(error, 'Falha ao criar o abono de ausência');
  }
};

export const getHolidaysOfYear = async (
  year: number,
): Promise<Result<Record<string, IHolidayResponse>>> => {
  const END_POINT = `https://brasilapi.com.br/api/feriados/v1/${year}`;

  try {
    const response: AxiosResponse<IHolidayResponse[]> = await axios.get(
      END_POINT,
    );

    const hashMap: Record<string, IHolidayResponse> = {};
    response.data.forEach(holiday => {
      hashMap[holiday.date] = holiday;
    });

    return { data: hashMap, error: null };
  } catch (error: any) {
    return handleError(error, 'Falha ao recuperar os feriados');
  }
};

export const createHoliday = async (date: Date): Promise<Result<boolean>> => {
  const END_POINT = '/espelho/gerarFeriado';

  const body = {
    data: date,
  };

  try {
    await api.post(END_POINT, body);
    return { data: true, error: null };
  } catch (error: any) {
    return handleError(error, 'Falha ao criar o feriado');
  }
};
