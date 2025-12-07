import { IEmployeeResponse } from '@/interfaces/funcionarios/getListOfEmployeesResponse';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IEmployeeBody } from '@/interfaces/funcionarios/registerEmployee';
import { IEmployeeDetailsResponse } from '@/interfaces/funcionarios/employeeDetailsResponse';
import { Result } from '@/interfaces/apiResult';
import handleError from '@/utils/handleError';
import { EditEmployeeBodyRequest } from '@/interfaces/funcionarios/editEmployeeBodyRequest';
import { EditEmployeeAddressBodyRequest } from '@/interfaces/funcionarios/editEmployeeAddressBodyRequest';
import { api } from '../api';

export const getListOfEmployees = async (): Promise<
  Result<IEmployeeResponse[]>
> => {
  const url = '/funcionario';
  try {
    const response: AxiosResponse<IEmployeeResponse[]> = await api.get(url);

    const activeEmployees = response.data.filter(
      employee => employee.status !== 'desligado',
    );

    return { data: activeEmployees, error: null };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return { data: null, error: axiosError.response.data as string };
      }
    }
    return { data: null, error: 'Erro ao buscar funcionários' };
  }
};

export const createEmployee = async (
  employeeData: IEmployeeBody,
): Promise<Result<string>> => {
  const url = '/funcionario';
  try {
    const response: AxiosResponse<string> = await api.post(url, employeeData);

    const { data } = response;
    return { data, error: null };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        if (axiosError.response.data) {
          return { data: null, error: axiosError.response.data as string };
        }
        if (axiosError.response.status === 400) {
          return { data: null, error: 'Dados inválidos fornecidos' };
        }
        return { data: null, error: axiosError.response.data as string };
      }
    }
    return { data: null, error: 'Erro ao cadastrar funcionário' };
  }
};

export const getEmployeeData = async (): Promise<
  Result<IEmployeeDetailsResponse>
> => {
  const url = '/funcionario/meuperfil';
  try {
    const response: AxiosResponse<IEmployeeDetailsResponse> = await api.get(
      url,
    );
    return { data: response.data, error: null };
  } catch (error: any) {
    return handleError(error, 'Erro ao buscar detalhes do funcionário');
  }
};

export const getEmployeeById = async (
  id: string,
): Promise<Result<IEmployeeDetailsResponse>> => {
  const url = `/funcionario/${id}`;
  try {
    const response: AxiosResponse<IEmployeeDetailsResponse> = await api.get(
      url,
    );
    return { data: response.data, error: null };
  } catch (error: any) {
    return handleError(error, 'Erro ao buscar detalhes do funcionário');
  }
};

export const deleteEmployeeById = async (
  id: string,
): Promise<Result<boolean>> => {
  const url = `/funcionario/${id}`;
  try {
    await api.delete(url);
    return { data: true, error: null };
  } catch (error: any) {
    return handleError(error, 'Erro ao deletar funcionário');
  }
};

export const updateEmployee = async (
  body: EditEmployeeBodyRequest,
): Promise<Result<boolean>> => {
  const url = '/funcionario';
  try {
    await api.put(url, body);
    return { data: true, error: null };
  } catch (error: any) {
    return handleError(error, 'Erro ao atualizar funcionário');
  }
};

export const updateEmployeeAddress = async (
  body: EditEmployeeAddressBodyRequest,
): Promise<Result<boolean>> => {
  const url = '/funcionario/atualizarEndereco';

  try {
    await api.put(url, body);
    return { data: true, error: null };
  } catch (error: any) {
    return handleError(error, 'Erro ao atualizar endereço do funcionário');
  }
};

export const sellEmployeeVacationDays = async (
  employeeId: string,
  daysToSell: number,
): Promise<Result<boolean>> => {
  const url = '/ferias/venderferias';

  const body = {
    funcionarioid: employeeId,
    quantidadeDias: daysToSell,
  };

  try {
    await api.put(url, body);
    return { data: true, error: null };
  } catch (error: any) {
    return handleError(error, 'Erro ao vender dias de férias');
  }
};

export const applySickLeave = async (
  employeeId: string,
  daysOfSickLeave: number,
): Promise<Result<boolean>> => {
  const url = '/espelho/atestado';

  const body = {
    funcionarioid: employeeId,
    diasDeAtestado: daysOfSickLeave,
  };

  try {
    await api.put(url, body);
    return { data: true, error: null };
  } catch (error: any) {
    return handleError(error, 'Erro ao aplicar atestado médico');
  }
};
export const getCSVofDeletedEmployee = async (
  id: string,
): Promise<Result<string>> => {
  const endpoint = `/funcionario/csvdesligamento/${id}`;

  try {
    const response = await api.get(endpoint, {
      responseType: 'blob', // Important for binary data
    });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: 'application/zip' }),
    );

    return { error: null, data: url };
  } catch (error) {
    return handleError(
      error,
      'Erro ao gerar CSV de desligamento do funcionário.',
    );
  }
};
