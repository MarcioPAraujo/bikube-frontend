export interface IMonthMirrorResponse {
  id: number;
  periodoInicio: string;
  periodoFim: string;
  empresa: string;
  cnpj: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  nomeFuncionario: string;
  funcao: string;
  registro: string;
  listaEntradas: ListaEntrada[];
}

export interface ListaEntrada {
  id: number;
  data: string;
  entradas: Entrada[];
  ausencia: boolean;
  descricaoAbono: string | null;
}

export interface Entrada {
  id: number;
  tipo: string;
  hora: string;
}
