interface Regiao {
  id: number;
  sigla: string;
  nome: string;
}

interface UF {
  id: number;
  sigla: string;
  nome: string;
  regiao: Regiao;
}

interface Mesorregiao {
  id: number;
  nome: string;
  UF: UF;
}

interface Microrregiao {
  id: number;
  nome: string;
  mesorregiao: Mesorregiao;
}

export interface City {
  id: number;
  nome: string;
  microrregiao: Microrregiao;
}

const IBGE_API_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

export const fetchCitiesByState = async (stateCode: string) => {
  try {
    const response = await fetch(`${IBGE_API_URL}/${stateCode}/municipios`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: City[] = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};
