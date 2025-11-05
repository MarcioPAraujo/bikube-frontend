import { Result } from '@/interfaces/apiResult';
import { IEmployeeMirrorResponse } from '@/interfaces/mirror/employeeMirrorResponse';
import { AxiosResponse } from 'axios';
import handleError from '@/utils/handleError';
import { api } from '../api';

export interface IJustificationRequest {
  iditem: number;
  descricao: string;
}

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
