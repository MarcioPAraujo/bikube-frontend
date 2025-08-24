interface IRegion {
  id: number;
  sigla: string;
  nome: string;
}
export interface IState {
  id: number;
  nome: string;
  regiao: IRegion;
  sigla: string;
}

const IBGE_API_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

export const fetchBrazilianStates = async (): Promise<IState[]> => {
  try {
    const response = await fetch(IBGE_API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: IState[] = await response.json();
    const sortedData = data.slice().sort((a, b) => a.nome.localeCompare(b.nome));
    return sortedData;
  } catch (error) {
    console.error('Error fetching Brazilian states:', error);
    return [];
  }
};
