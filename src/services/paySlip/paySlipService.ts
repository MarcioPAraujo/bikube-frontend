import { Result } from '@/interfaces/apiResult';
import handleError from '@/utils/handleError';
import { api } from '../api';

export const generatePaySlipPdf = async (
  id: number,
): Promise<Result<string>> => {
  const endpoint = '/espelho/gerarPDF';

  const body = {
    idespelho: id,
  };

  try {
    const response = await api.post(endpoint, body, {
      responseType: 'blob', // Important for binary data
    });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: 'application/pdf' }),
    );

    return { error: null, data: url };
  } catch (error) {
    return handleError(error, 'Erro ao gerar PDF do espelho de pagamento.');
  }
};

export const generatePaySlipCsv = async (
  date: string,
): Promise<Result<string>> => {
  const endpoint = `/espelho/gerarCSV/${date}`;

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
    return handleError(error, 'Erro ao gerar CSV do espelho de pagamento.');
  }
};
