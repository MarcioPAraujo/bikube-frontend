export interface IAppliedVacanciesListResponse {
  id: number;
  candidato: Candidato;
  vaga: Vaga;
  etapa: string;
}

export interface Candidato {
  id: number;
  nome: string;
  email: string;
  estado: string;
  cidade: string;
  telefone: string;
  linkedin: string;
  github: string;
  aceitouTermo: boolean;
  formacoes: Formacao[];
  experiencias: IExperiecias[];
  status: string;
  tentativas: number;
  databloqueio: null;
  username: string;
  authorities: any[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
}

export interface Formacao {
  id: number;
  instituicao: string;
  curso: string;
  situacao: string;
  dataInicio: string;
  dataFim: string;
}

export interface Vaga {
  id: number;
  titulo: string;
  modelo: string;
  descricao: string;
  tipoContrato: string;
  localizacao: string;
  informacoes: string;
  palavrasChave: string;
  nivel: string;
  status: string;
}

export interface IExperiecias {
  id: number;
  empresa: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
}
