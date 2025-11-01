import { IEmployeeResponse } from '@/interfaces/funcionarios/getListOfEmployeesResponse';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IEmployeeBody } from '@/interfaces/funcionarios/registerEmployee';
import { IEmployeeDetailsResponse } from '@/interfaces/funcionarios/employeeDetailsResponse';
import { Result } from '@/interfaces/apiResult';
import handleError from '@/utils/handleError';
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
        return { data: null, error: axiosError.response.data as string };
      }
    }
    return { data: null, error: 'Erro ao cadastrar funcionário' };
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
