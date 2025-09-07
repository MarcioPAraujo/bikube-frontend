import { Result } from '@/interfaces/apiResult';
import handleError from '@/utils/handleError';
import { api } from '../api';

export const sendCodeToEmail = async (
  email: string,
): Promise<Result<boolean>> => {
  const ENDPOINT = '/confirmaremail';

  const body = {
    email,
  };

  try {
    await api.post(ENDPOINT, body);
    return { data: true, error: null };
  } catch (error: any) {
    return handleError(error, 'Erro ao enviar código para o email');
  }
};

export const verifyEmailCode = async (
  email: string,
  code: string,
): Promise<Result<boolean>> => {
  const ENDPOINT = '/confirmaremail/validar';
  try {
    await api.post(ENDPOINT, { email, codigo: code });
    return { data: true, error: null };
  } catch (error: any) {
    return handleError(error, 'Erro ao verificar o código do email');
  }
};
