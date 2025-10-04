export interface IVacancyApplicantsByStepResponse {
  candidato: Candidato;
  compatibilidadeEmPorcentagem: number;
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
  formacoes: Formacoe[];
  experiencias: Experiencia[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
}

export interface Experiencia {
  id: number;
  empresa: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
}

export interface Formacoe {
  id: number;
  instituicao: string;
  curso: string;
  situacao: string;
  dataInicio: string;
  dataFim: string;
}
